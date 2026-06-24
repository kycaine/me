import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { FaLaptopCode, FaWhatsapp } from 'react-icons/fa';


const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "talkto.rezki@gmail.com",
      link: "mailto:talkto.rezki@gmail.com"
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
      value: "Kycaine",
      link: "https://github.com/kycaine"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          <span className="gold-gradient">Ping me!</span>
        </h2>

        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready for a fistfight? Muay Thai? Boxing? ...No thanks, I’m not built for that. Let’s just collaborate instead!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card backdrop-blur-sm rounded-xl p-6 border border-border smooth-transition hover:border-primary hover:bg-card/70 group flex items-center space-x-4"
            >
              <div className="text-primary group-hover:scale-110 smooth-transition">
                {contact.icon}
              </div>
              <div className="text-left">
                <p className="text-base text-muted-foreground">{contact.label}</p>
                <p className="text-lg md:text-xl text-foreground font-semibold group-hover:text-primary smooth-transition">
                  {contact.value}
                </p>
              </div>
            </a>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ContactSection;