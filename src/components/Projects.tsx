
import React from 'react';
import { ProjectModal } from './ProjectModal';

export interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
}

interface ProjectsProps {
  selectedProject: Project | null;
  onProjectClick: (project: Project) => void;
  onCloseModal: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ selectedProject, onProjectClick, onCloseModal }) => {
  const completedProjects: Project[] = [
   
{
  "title": "Simple Blockchain Proof-of-Work",
  "shortDescription": "Lightweight Proof of Work blockchain built with Go.",
  "fullDescription": "A minimalistic blockchain implementation using Go, featuring basic Proof of Work (PoW) consensus. The project supports transaction management, mining rewards with halving mechanism, and blockchain retrieval through RESTful API endpoints. Ideal for learning core blockchain principles such as hashing, mining, and mempool handling.",
  "technologies": ["Go", "REST API","Gin"],
  "features": [
    "Proof of Work mining algorithm",
    "Transaction mempool system",
    "Mining reward with halving every 1000 blocks",
    "Blockchain state retrieval via API",
    "Balance checking per address",
    "Simple and educational blockchain logic"
  ]
},
{
  "title": "COVID-19 ML Prediction Pipeline",
  "shortDescription": "End-to-end machine learning pipeline for structured COVID-19 data.",
  "fullDescription": "A structured ML workflow designed to predict COVID-19 trends using data preprocessing, EDA, feature engineering, modeling, and optimization. Built with Jupyter Notebook and Python, it supports both step-by-step execution and full automation via a Python script. Each stage saves outputs in an organized directory structure to track the process flow.",
  "technologies": ["Python", "Jupyter Notebook", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
  "features": [
    "Step-by-step ML pipeline in Jupyter Notebook",
    "Automated execution via app.py",
    "Structured I/O for each pipeline stage",
    "Visualizations with EDA and performance plots",
    "Feature engineering with transformation logic",
    "Model evaluation using MAE, RMSE, R²",
    "Hyperparameter optimization stage"
  ]
},
{
  "title": "Transfer Money Blockchain",
  "shortDescription": "A lightweight blockchain for handling secure transactions with node fee rewards.",
  "fullDescription": "A simplified Python-based blockchain focusing on peer-to-peer transactions without mining. Every transaction includes a fee, and node operators are rewarded based on those fees. Designed for educational purposes and fast prototyping of fee-based blockchain systems.",
  "technologies": ["Python", "Flask", "Blockchain"],
  "features": [
    "Create and broadcast secure transactions",
    "Reward node operators with transaction fees",
    "Validate the integrity of the blockchain",
    "Retrieve the entire transaction chain",
    "No mining involved — instant fee-based consensus",
    "Lightweight and easy to deploy"
  ]
}



  ];

  const ongoingProjects: Project[] = [
    {
      title: "Machine Learning & Deep Learning API",
      shortDescription: "End-to-end API for data processing, model training, and prediction.",
      fullDescription: "A comprehensive API solution that handles the complete machine learning pipeline from data preprocessing to model deployment. Built with Python, FastAPI, and TensorFlow, it provides scalable endpoints for training, validation, and predictions.",
      technologies: ["Python", "FastAPI", "TensorFlow"],
     features: [
    "Upload and process CSV/Excel datasets",
    "Automated data cleaning and type handling",
    "Exploratory Data Analysis with visualizations",
    "Feature engineering for model optimization",
    "Train and predict for regression & classification tasks",
    "Model evaluation with MAE, RMSE, and R² metrics",
    "Downloadable outputs (CSV, ZIP, plots)",
    "End-to-end ML pipeline accessible via API"
  ]
    },
    {
      title: "Blockchain-based Voting System",
      shortDescription: "Secure and transparent voting using Ethereum smart contracts.",
      fullDescription: "A decentralized voting platform built on Ethereum blockchain ensuring transparency, immutability, and security. Features include voter authentication, real-time vote counting, and tamper-proof results storage.",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      features: [
        "Smart contract-based voting logic",
        "Decentralized identity verification",
        "Real-time vote tracking",
        "Immutable result storage",
        "User-friendly voting interface"
      ]
    },
  ];

  return (
    <>
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        
        {/* Completed Projects */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-portfolio-gold mb-8 text-center">
            Completed Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => onProjectClick(project)}
              >
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.shortDescription}</p>
                <div className="mt-4 text-portfolio-gold text-sm">
                  Click to view details →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div>
          <h3 className="text-3xl font-bold text-portfolio-gold mb-8 text-center">
            Ongoing Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingProjects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => onProjectClick(project)}
              >
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.shortDescription}</p>
                <div className="mt-4 text-portfolio-gold text-sm">
                  Click to view details →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={onCloseModal} />
      )}
    </>
  );
};

export default Projects;
