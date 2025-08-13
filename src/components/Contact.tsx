
import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'rizkyap90s@gmail.com',
      href: 'mailto:rizkyap90s@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 85176861181',
      href: 'tel:+6285176861181'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://linkedin.com'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View on GitHub',
      href: 'https://github.com'
    }
  ];

  return (
    <section id="contact" className="section pb-32">
      <h2 className="section-title">Get In Touch</h2>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <a
                key={index}
                href={contact.href}
                className="contact-item block"
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <IconComponent className="contact-icon" />
                <div>
                  <div className="text-sm text-portfolio-gold/80">
                    {contact.label}
                  </div>
                  <div className="contact-text">
                    {contact.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
