import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Firebase configuration is now fetched dynamically from the backend
let globalDb: any = null;
let firebaseInitPromise: Promise<any> | null = null;

const initFirebaseGlobal = async () => {
  if (firebaseInitPromise) return firebaseInitPromise;

  firebaseInitPromise = (async () => {
    try {
      // Check cache first to prevent API hit on page refresh
      const cachedConfig = sessionStorage.getItem('firebaseConfigCache');
      if (cachedConfig) {
        const parsedConfig = JSON.parse(cachedConfig);
        const app = initializeApp(parsedConfig);
        globalDb = getFirestore(app);
        return globalDb;
      }

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const API_BASE_URL = isLocal ? 'http://localhost:8787' : 'https://ky-key-management.rizkyap90s.workers.dev';
      
      const response = await fetch(`${API_BASE_URL}/config/firebase`);
      if (!response.ok) {
        throw new Error('Failed to fetch Firebase config');
      }
      
      const data = await response.json();
      if (data && data.firebase) {
        // Save to cache so next refresh doesn't hit API
        sessionStorage.setItem('firebaseConfigCache', JSON.stringify(data.firebase));

        const app = initializeApp(data.firebase);
        globalDb = getFirestore(app);
        return globalDb;
      }
    } catch (error) {
      console.warn("Firebase initialization failed:", error);
    }
    return null;
  })();

  return firebaseInitPromise;
};

// Initiate fetch immediately when the script loads
initFirebaseGlobal();

// --- GAME CONSTANTS ---
const GRID_SIZE = 25; // increased from 20 to 25
const CELL_SIZE = 22; // increased from 20 to 22 (Total 550x550)
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 550
const INITIAL_SPEED = 150; // ms per tick (Semakin besar angkanya, semakin lambat ularnya)

type Point = { x: number; y: number };
type GameState = 'welcome' | 'playing' | 'gameover';

interface ScoreEntry {
  id: string;
  name: string;
  score: number;
  date: Date | null;
}

const SnakeGameSection = () => {
  // Firebase State
  const [db, setDb] = useState<any>(globalDb);

  // Initialize Firebase dynamically
  useEffect(() => {
    if (globalDb) {
      setDb(globalDb);
    } else {
      initFirebaseGlobal().then((firestoreDb) => {
        if (firestoreDb) {
          setDb(firestoreDb);
        } else {
          setLeaderboardLoading(false);
        }
      });
    }
  }, []);

  // Game State
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);

  // UI State
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const directionRef = useRef<Point>({ x: 1, y: 0 }); // To prevent rapid reverse input
  const scoreRef = useRef<number>(0);
  const userNameRef = useRef<string>('');
  const speedRef = useRef<number>(INITIAL_SPEED);

  // Fetch Leaderboard
  const fetchLeaderboard = useCallback(async () => {
    if (!db) {
      setLeaderboardLoading(false);
      return;
    }
    try {
      const q = query(collection(db, "snake_leaderboard"), orderBy("score", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const scores: ScoreEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let date = null;
        if (data.timestamp instanceof Timestamp) {
          date = data.timestamp.toDate();
        }
        scores.push({
          id: doc.id,
          name: data.name,
          score: data.score,
          date
        });
      });
      setLeaderboard(scores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [db]);

  useEffect(() => {
    if (db) {
      setLeaderboardLoading(true);
      fetchLeaderboard();
    }
  }, [db, fetchLeaderboard]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || gameState !== 'playing') return;

      // Prevent scrolling while playing
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const currentDir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, gameState]);

  // Update directionRef when direction changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Game Loop
  const gameLoop = useCallback((time: number) => {
    if (gameState !== 'playing') return;

    if (time - lastUpdateRef.current >= speedRef.current) {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + directionRef.current.x,
          y: prevSnake[0].y + directionRef.current.y
        };

        // Check Wall Collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        setFood((prevFood) => {
          if (newHead.x === prevFood.x && newHead.y === prevFood.y) {
            setScore(s => {
              const newScore = s + 10;
              scoreRef.current = newScore;
              if (newScore % 40 === 0) {
                speedRef.current = speedRef.current / 1.1;
              }
              return newScore;
            });
            return generateFood(newSnake);
          }
          newSnake.pop(); // Remove tail if no food eaten
          return prevFood;
        });

        return newSnake;
      });

      lastUpdateRef.current = time;
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, gameLoop]);

  // Draw Game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.fillStyle = '#0f172a'; // tailwind slate-900
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#1e293b'; // tailwind slate-800
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw Food
    ctx.fillStyle = '#ef4444'; // Neon red
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ef4444';
    ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    ctx.shadowBlur = 0; // reset

    // Draw Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e'; // Neon green head, slightly darker body
      ctx.shadowBlur = index === 0 ? 10 : 5;
      ctx.shadowColor = '#22c55e';
      ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });
    ctx.shadowBlur = 0; // reset

  }, [snake, food, gameState]);

  const generateFood = (currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Make sure food doesn't spawn on snake
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  };

  const startGame = () => {
    if (!userName.trim()) return;
    userNameRef.current = userName;
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    scoreRef.current = 0;
    speedRef.current = INITIAL_SPEED;
    setFood(generateFood([{ x: 10, y: 10 }, { x: 9, y: 10 }]));
    setGameState('playing');
    setIsFocused(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    // Auto-focus logic to ensure smooth UX
    setTimeout(() => {
      canvasRef.current?.focus();
    }, 100);
  };

  const handleGameOver = async () => {
    setGameState('gameover');
    setIsFocused(false);

    const finalScore = scoreRef.current;
    const finalName = userNameRef.current;

    if (finalScore > 0 && db && finalName) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await addDoc(collection(db, "snake_leaderboard"), {
          name: finalName,
          score: finalScore,
          timestamp: serverTimestamp()
        });
        setSubmitSuccess(true);
        fetchLeaderboard(); // Refresh leaderboard
      } catch (error: any) {
        console.error("Error submitting score:", error);
        setSubmitError(error.message || "Gagal menyimpan skor. Periksa Firebase Rules.");
      } finally {
        setIsSubmitting(false);
      }
    } else if (finalScore === 0) {
      setSubmitError("Skor 0 tidak disimpan.");
    } else if (!db) {
      setSubmitError("Firebase tidak terhubung.");
    }
  };

  const closeFocusMode = () => {
    setIsFocused(false);
    if (gameState === 'playing') {
      setGameState('gameover');
    }
  };

  return (
    <>
      {/* FOCUS OVERLAY */}
      {isFocused && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300"
          onClick={closeFocusMode}
        />
      )}

      <section id="snake-game" className={`py-20 bg-transparent relative min-h-screen flex items-center justify-center transition-all duration-300 ${isFocused ? 'z-[60]' : 'z-10'}`}>
        <div className={`container mx-auto px-6 max-w-6xl transition-all duration-500 ${isFocused ? 'scale-105' : ''}`}>

          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient">Take a Break</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Play a quick round of classic Snake. Top scores will be immortalized on the global leaderboard!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">

            {/* GAME PANEL */}
            <div className="w-full md:w-auto bg-card backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary">Snake</h3>
                <div className="text-lg font-mono text-primary font-semibold">
                  Score: <span>{score}</span>
                </div>
              </div>

              <div className="relative border-2 border-border rounded-lg overflow-hidden bg-slate-900" style={{ width: CANVAS_SIZE, maxWidth: '100%', aspectRatio: '1/1', margin: '0 auto' }}>
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="block outline-none w-full h-full"
                  tabIndex={0}
                />

                {/* OVERLAYS */}
                {gameState === 'welcome' && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                    <h4 className="text-2xl font-bold text-white mb-6">Ready to Play?</h4>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="mb-4 px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-primary w-full max-w-[200px] text-center"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value.substring(0, 15))}
                      maxLength={15}
                    />
                    <button
                      onClick={startGame}
                      disabled={!userName.trim()}
                      className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      [ Start Game ]
                    </button>
                    <p className="mt-4 text-xs text-slate-300">Use Arrow Keys or WASD to move.</p>
                  </div>
                )}

                {gameState === 'gameover' && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-md">GAME OVER</h4>
                    <p className="text-xl text-white mb-4">Final Score: {score}</p>

                    {isSubmitting ? (
                      <p className="text-sm text-yellow-400 mb-6 flex items-center gap-2">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></span>
                        Submitting Score...
                      </p>
                    ) : submitSuccess ? (
                      <p className="text-sm text-green-400 mb-6 font-semibold">✓ Score saved!</p>
                    ) : submitError ? (
                      <p className="text-sm text-red-400 mb-6 font-semibold text-center max-w-[80%]">{submitError}</p>
                    ) : (
                      <div className="mb-6"></div>
                    )}

                    <button
                      onClick={startGame}
                      className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      [ Play Again ]
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* LEADERBOARD PANEL */}
            <div className="w-full md:w-[400px] bg-card backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                🏆 Global Top 10
              </h3>

              <div className="flex-grow flex flex-col">
                {leaderboardLoading ? (
                  <div className="flex justify-center items-center h-40 flex-grow">
                    <span className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></span>
                  </div>
                ) : !db ? (
                  <div className="text-center text-muted-foreground p-4 bg-secondary/20 rounded-lg flex-grow flex flex-col justify-center">
                    <p>Firebase is not configured.</p>
                    <p className="text-sm mt-2">Add your config to enable the leaderboard.</p>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center text-muted-foreground p-4 flex-grow flex flex-col justify-center">
                    No scores yet. Be the first!
                  </div>
                ) : (
                  <div className="flex flex-col flex-grow h-full">
                    <div className="flex text-xs font-semibold text-muted-foreground pb-2 border-b border-border/50 px-2 mb-2">
                      <div className="w-8">#</div>
                      <div className="flex-1">NAME</div>
                      <div className="w-24 text-left">DATE</div>
                      <div className="text-right">SCORE</div>
                    </div>
                    <div className="flex flex-col flex-grow justify-between pb-1">
                      {[...leaderboard, ...Array(Math.max(0, 10 - leaderboard.length)).fill(null)].map((entry, idx) => (
                        <div key={entry?.id || `empty-${idx}`} className={`flex items-center text-sm px-2 py-1.5 rounded transition-colors ${entry ? 'bg-secondary/10 hover:bg-secondary/30 text-foreground' : 'text-muted-foreground/50'}`}>
                          <div className="w-8 font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1 font-bold truncate pr-2">
                            {entry ? entry.name : '---'}
                          </div>
                          <div className="w-24 text-xs font-bold truncate">
                            {entry?.date ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: '2-digit' }).format(entry.date) : '-'}
                          </div>
                          <div className="text-right font-mono font-bold">
                            {entry ? entry.score : '-'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default SnakeGameSection;
