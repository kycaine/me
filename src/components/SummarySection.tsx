const SummarySection = () => {
return (
  <section id="summary" className="py-20 bg-card">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        <span className="gold-gradient">Summary</span>
      </h2>
      <div className="bg-secondary/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border">
        <p className="text-lg md:text-xl leading-relaxed text-foreground text-justify indent-12">
          {/* <span className="text-primary font-semibold"></span> */}
          <span className="text-primary font-semibold">Started coding journey in 2017</span>, With over 
          three years of professional experience in the IT industry, I have worked across diverse roles 
          including <span className="text-primary font-semibold">backend, fullstack, and general software engineering roles</span>. 
          My journey includes building scalable backend systems, integrating API, and delivering high performance 
          solutions for various sectors from e-commerce platforms to government projects. Collaborating with cross 
          functional teams across countries to deliver secure, efficient, and maintainable software solutions. My technical expertise 
          spans Java, Golang, JavaScript, and multiple frameworks, alongside deep knowledge of databases, 
          containerization, and cloud services.
        </p>
        <br />
        <p className="text-lg md:text-xl leading-relaxed text-foreground text-justify indent-12">
          Currently, my focus is on <span className="text-primary font-semibold">AI engineering and blockchain 
          development</span>, mastering the end-to-end processes of building intelligent, data-driven, and 
          decentralized systems. On the AI side, I’m actively developing machine learning and deep learning 
          pipelines for predictive analytics, model optimization, and real-world deployment. In blockchain, I’ve 
          implemented foundational Proof of Work mechanisms, dynamic reward systems, and REST API for 
          decentralized transactions. This dual focus enables me to combine data science, AI, and blockchain 
          to create innovative solutions that are both intelligent and secure.
        </p>
      </div>
    </div>
  </section>
);

};

export default SummarySection;