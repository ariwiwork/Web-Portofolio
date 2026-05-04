"use client";

import { motion } from "framer-motion";
import { Film, Palette, Camera } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Video Editing",
      icon: <Film className="w-6 h-6 text-primary" />,
      skills: ["Adobe Premiere Pro", "CapCut", "Filmora"],
    },
    {
      title: "Desain Grafis",
      icon: <Palette className="w-6 h-6 text-primary" />,
      skills: ["Adobe Photoshop", "Canva"],
    },
    {
      title: "Kamera",
      icon: <Camera className="w-6 h-6 text-primary" />,
      skills: ["DSLR"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-surface p-8 rounded-2xl border border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground/70 font-medium">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
