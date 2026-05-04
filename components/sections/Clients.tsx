"use client";

import { motion } from "framer-motion";
import { MonitorPlay, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getYoutubeChannelData } from "@/app/actions/youtube";

interface ClientData {
  channelName: string;
  subs: string;
  link: string;
  masaKerja: string;
  statusKerjasama: "Aktif" | "Non-Aktif";
  thumbnail?: string;
}

const CLIENT_LINKS = [
  {
    link: "https://www.youtube.com/@IcammmSport",
    subs: "270K+",
    masaKerja: "April 2025 - Sekarang",
    statusKerjasama: "Aktif" as const,
  },
  {
    link: "https://www.youtube.com/@bbyslaa",
    subs: "100K+",
    masaKerja: "Maret 2026 - Sekarang",
    statusKerjasama: "Aktif" as const,
  },
  {
    link: "https://www.youtube.com/@kayusada",
    subs: "10K+",
    masaKerja: "Februari 2026 - Sekarang",
    statusKerjasama: "Aktif" as const,
  },
  {
    link: "https://www.youtube.com/@Rajamovie-r7x/videos",
    subs: "10K+",
    masaKerja: "Maret 2025 - Sekarang",
    statusKerjasama: "Non-Aktif" as const,
  },
  {
    link: "https://www.youtube.com/@recapkingofficial",
    subs: "10K+",
    masaKerja: "Januari 2023 - Januari 2024",
    statusKerjasama: "Non-Aktif" as const,
  },
];

export default function Clients() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [clients, setClients] = useState<ClientData[]>(
    CLIENT_LINKS.map(c => ({
      ...c,
      channelName: "Loading...",
      subs: "...",
      thumbnail: "",
    }))
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
    const fetchClients = async () => {
      const updatedClients = await Promise.all(
        CLIENT_LINKS.map(async (client) => {
          const ytData = await getYoutubeChannelData(client.link);
          return {
            ...client,
            channelName: ytData?.name && ytData.name !== "Gagal memuat nama" ? ytData.name : "Channel Tidak Ditemukan",
            subs: ytData?.subs === "N/A" ? client.subs : (ytData?.subs || client.subs),
            thumbnail: ytData?.thumbnail || "",
          };
        })
      );
      setClients(updatedClients);
    };

    fetchClients();
  }, []);

  return (
    <section id="clients" className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Clients</h2>
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

        {/* Wrapper for horizontal scrolling */}
        <div ref={scrollRef} className="flex overflow-x-auto pt-6 pb-10 px-4 -mx-4 snap-x snap-mandatory gap-6 md:gap-8 hide-scrollbar">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-700 group flex flex-col items-center text-center h-full w-[85vw] sm:w-[320px] lg:w-[calc(33.333%-1.4rem)] flex-none snap-center"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-primary/20 group-hover:border-primary group-hover:scale-105 transition-all shadow-md">
                {client.thumbnail ? (
                  <img src={client.thumbnail} alt={client.channelName} className="w-full h-full object-cover" />
                ) : (
                  <MonitorPlay className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {client.channelName}
              </h3>
              <p className="text-foreground/70 mb-4 text-sm font-semibold">
                {client.subs} Subscribers
              </p>

              <div className="w-full text-left bg-slate-800 text-slate-100 p-4 rounded-xl mb-6 shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Status</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${client.statusKerjasama === 'Aktif' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-700 text-slate-300 border border-slate-600'}`}>
                    {client.statusKerjasama}
                  </span>
                </div>
                <div className="font-medium text-sm mt-3">
                  <span className="block text-slate-400 mb-1 text-[10px] uppercase tracking-wider">Masa Kerja</span>
                  <span className="text-white">{client.masaKerja}</span>
                </div>
              </div>

              <div className="mt-auto pt-2 w-full">
                <a
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors rounded-lg text-sm font-bold"
                >
                  Kunjungi Channel
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
