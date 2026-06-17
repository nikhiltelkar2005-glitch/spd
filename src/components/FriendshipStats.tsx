import { motion } from "framer-motion";
import { Heart, Calendar, MessageCircle, ShieldAlert } from "lucide-react";
import FadeIn from "./motion/FadeIn";
import SectionHeading from "./motion/SectionHeading";

export default function FriendshipStats() {
  const stats = [
    {
      label: "Years of Friendship",
      value: "3+ Years",
      icon: Calendar,
      desc: "Through thick and thin, always standing strong.",
      color: "text-red-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    },
    {
      label: "Memories Created",
      value: "Infinite",
      icon: Heart,
      desc: "Every second filled with stories to tell.",
      color: "text-rose-500",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    },
    {
      label: "Laughs Shared",
      value: "Millions",
      icon: MessageCircle,
      desc: "Inside jokes, silliest conversations, and endless joy.",
      color: "text-amber-500",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    },
    {
      label: "Trust Level",
      value: "100%",
      icon: ShieldAlert,
      desc: "An unbreakable bond of loyalty and belief.",
      color: "text-emerald-500",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    },
  ];

  return (
    <section id="stats" className="py-16 md:py-24 relative overflow-hidden bg-black/40">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sam-red/5 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
      </div>

      <SectionHeading title="Friendship Stats" />
      
      <FadeIn className="px-4 md:px-12 lg:px-16 max-w-6xl mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl border border-white/5 bg-sam-surface p-6 shadow-xl hover:border-sam-red/30 transition-all duration-300 ${stat.glow}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-sam-muted">
                  {stat.label}
                </h4>
                
                <p className="mt-2 font-display text-3xl font-extrabold text-white tracking-wide">
                  {stat.value}
                </p>
                
                <p className="mt-3 text-xs text-sam-muted leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
