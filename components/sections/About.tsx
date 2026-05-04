"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 bg-primary-light rounded-2xl rotate-3 flex items-center justify-center border-4 border-slate-700 shadow-xl overflow-hidden relative group transition-transform duration-500 hover:rotate-0 hover:scale-105 cursor-pointer">
              <img
                src="/profile_2.png"
                alt="About Ari Wijayanto"
                className="w-full h-full object-cover scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Ari+Wijayanto&size=400&background=6366f1&color=fff";
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-2xl font-semibold mb-4">
              Fokus pada <span className="text-primary">kreativitas</span> dan hasil yang maksimal.
            </h3>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Saya adalah lulusan SMK Jurusan Seni Broadcasing dan Film. Saya memiliki keahlian dalam mengoperasikan berbagai software video editing.
            </p>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Dengan kemampuan tersebut, saya telah menyelesaikan berbagai proyek video dari berbagai genre yang berfokus pada kebutuhan content creation YouTube.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-xl text-primary">2+</h4>
                <p className="text-sm text-foreground/60 font-medium">Tahun Pengalaman</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-primary">50+</h4>
                <p className="text-sm text-foreground/60 font-medium">Proyek Selesai</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
