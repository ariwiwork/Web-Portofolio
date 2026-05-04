"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          <div className="w-full lg:w-1/2 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                HALO, SAYA ARI WIJAYANTO
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Freelancer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Video Editor.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl leading-relaxed">
                Memulai karier freelance sejak 2023 hingga sekarang. Terbiasa menangani berbagai macam genre konten YouTube dengan fokus pada kualitas visual dan alur cerita yang menarik.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-hover transition-all hover:scale-105 active:scale-95"
              >
                Lihat Karya Saya <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-surface text-foreground px-8 py-4 rounded-full font-medium border border-slate-700 hover:border-primary/30 hover:bg-primary-light/30 transition-all hover:scale-105 active:scale-95"
              >
                Hubungi Saya
              </a>
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-96 md:w-[480px] md:h-[600px] group cursor-pointer">
              {/* Image without border/card, standalone with bottom fade */}
              <img
                src="/profile.png"
                alt="Ari Wijayanto"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                }}
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Ari+Wijayanto&size=500&background=transparent&color=6366f1";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
