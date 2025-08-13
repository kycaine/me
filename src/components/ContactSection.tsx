import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { FaCode, FaLaptopCode, FaWhatsapp } from 'react-icons/fa';


const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "rizkyap90s@gmail.com",
      link: "mailto:rizkyap90s@gmail.com"
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "Rezki Ade",
      link: "https://www.linkedin.com/in/rizkyap90s/"
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "kycaine", 
      link: "https://github.com/kycaine"
    },
    {
      icon: <FaCode size={24} />,
      label: "HackerRank",
      value: "kycaine",
      link: "https://www.hackerrank.com/profile/kycaine"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gold-gradient">Get In Touch</span>
        </h2>
        
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target={contact.label === 'LinkedIn' || contact.label === 'GitHub' ? '_blank' : undefined}
              rel={contact.label === 'LinkedIn' || contact.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border smooth-transition hover:border-primary/50 hover:bg-card/70 group flex items-center space-x-4"
            >
              <div className="text-primary group-hover:scale-110 smooth-transition">
                {contact.icon}
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">{contact.label}</p>
                <p className="text-foreground font-semibold group-hover:text-primary smooth-transition">
                  {contact.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <MapPin size={18} />
            <span>Available for remote and on-site opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;