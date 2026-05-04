"use client";

import { motion } from "framer-motion";
import { Globe, User, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  const contacts = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+62 895 3771 02776",
      link: "https://wa.me/62895377102776",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "ariwijayantowork@gmail.com",
      link: "mailto:ariwijayantowork@gmail.com",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "LinkedIn",
      value: "https://www.linkedin.com/in/ariwijayanto/",
      link: "https://www.linkedin.com/in/ariwijayanto/",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "GitHub",
      value: "https://github.com/ariwiwork",
      link: "https://github.com/ariwiwork",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      title: "Instagram",
      value: "https://www.instagram.com/arwi.2000/",
      link: "https://www.instagram.com/arwi.2000/",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Punya ide proyek atau butuh editor untuk sosial media Anda? Mari berdiskusi!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-6 border border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center group h-full"
            >
              <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {contact.icon}
              </div>
              <h4 className="font-bold mb-2">{contact.title}</h4>
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto px-4 py-3 bg-slate-800 border border-slate-700 text-primary hover:bg-primary hover:text-white hover:border-primary rounded-xl text-sm font-bold transition-all w-full break-words"
              >
                Hubungi Saya
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
