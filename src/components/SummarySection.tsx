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
         <span className="text-primary font-semibold">Started coding journey in 2017</span> when in collage, I have over three years of professional experience in the IT industry, specializing 
          as a Backend Engineer and AI Systems developer. My career includes building scalable backend services, implementing 
          high-volume APIs , and delivering high-performance solutions for diverse sectors, ranging from WhatsApp-based e-commerce
           platforms to government-grade real estate systems. I am experienced in collaborating with cross-functional teams to 
           deliver secure, efficient, and maintainable software. My technical expertise spans Go, Java, and Python , alongside 
           deep knowledge of databases, containerization, and asynchronous processing. 
          <br />
          <br />
          <span className="text-primary font-semibold">Currently, my focus is on AI Engineering</span>, mastering the end-to-end processes of building intelligent, data-driven
          systems. On the AI side, I am actively developing Machine Learning and Deep Learning pipelines for predictive analytics,
           model optimization, and production-ready deployment. This specialization enables me to combine robust backend 
           architecture with AI inference capabilities to create innovative, intelligent, and scalable solutions.
        </p>
      
      </div>
    </div>
  </section>
);

};

export default SummarySection;