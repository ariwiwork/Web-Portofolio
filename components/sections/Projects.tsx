"use client";

import { motion } from "framer-motion";
import { PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getYoutubeVideoData } from "@/app/actions/youtube";

interface ProjectData {
  title: string;
  desc: string;
  tech: string[];
  views: string;
  link: string;
  thumbnail?: string;
}

const PROJECT_LINKS = [
  {
    desc: "Konten sepak bola tentang Timnas Indonesia.",
    tech: ["Capcut"],
    views: "1.000K+",
    link: "https://www.youtube.com/watch?v=M5_c8k9kJP0&t=6s",
  },
  {
    desc: "Konten gaming dan meme.",
    tech: ["Capcut"],
    views: "3.4K+",
    link: "https://www.youtube.com/watch?v=rPT1W0Ol5KI&t=247s",
  },
  {
    desc: "Konten vlog tentang Festival Kebudayaan Indonesia di Jepang.",
    tech: ["Capcut"],
    views: "64K+",
    link: "https://www.youtube.com/watch?v=PkNfNAJ684U&t=14s",
  },
  {
    desc: "Konten alur cerita film Bahasa Indonesia.",
    tech: ["Capcut"],
    views: "7.5K+",
    link: "https://www.youtube.com/watch?v=jQzNTenGV7k&t=28s",
  },
  {
    desc: "Konten alur cerita film Bahasa Ingris.",
    tech: ["Premier Pro"],
    views: "1.900k+",
    link: "https://www.youtube.com/watch?v=nRXm30P7lLk&t=78s",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectData[]>(
    PROJECT_LINKS.map(p => ({ ...p, title: "Loading...", thumbnail: "" }))
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const updatedProjects = await Promise.all(
        PROJECT_LINKS.map(async (project) => {
          const ytData = await getYoutubeVideoData(project.link);
          return {
            ...project,
            title: ytData?.title && ytData.title !== "Gagal memuat judul" ? ytData.title : "Judul Tidak Ditemukan",
            views: ytData?.views === "N/A (Butuh API Key)" || ytData?.views === "N/A" ? project.views : (ytData?.views || project.views),
            thumbnail: ytData?.thumbnail || "",
          };
        })
      );
      setProjects(updatedProjects);
    };

    fetchProjects();
  }, []);


  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>

          {/* Scroll Controls */}
          <div className="flex justify-end gap-3 mb-4 pr-4">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-slate-800 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-slate-800 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="flex overflow-x-auto pt-6 pb-10 px-4 -mx-4 snap-x snap-mandatory gap-6 md:gap-8 hide-scrollbar">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-background rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-700 group flex flex-col h-full overflow-hidden w-[85vw] sm:w-[320px] lg:w-[calc(33.333%-1.4rem)] flex-none snap-center"
            >
              <div className="w-full aspect-video bg-slate-800 relative overflow-hidden">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">Loading...</div>
                )}
              </div>

              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2" title={project.title}>
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-5 text-sm leading-relaxed flex-1">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-light text-primary text-xs rounded-full font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto pt-5 border-t border-slate-700">
                  <span className="text-sm font-semibold text-foreground/80">
                    {project.views} Views
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold"
                  >
                    <PlayCircle className="w-4 h-4" /> Tonton
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
