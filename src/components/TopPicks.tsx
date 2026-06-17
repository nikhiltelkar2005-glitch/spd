import { motion } from "framer-motion";
import { Cog, FlaskConical, Heart } from "lucide-react";
import { TOP_PICKS } from "../data/content";
import FadeIn from "./motion/FadeIn";
import SectionHeading from "./motion/SectionHeading";
import { Link } from "react-router-dom";

const iconMap = {
  flask: FlaskConical,
  cog: Cog,
  heart: Heart,
} as const;

export default function TopPicks() {
  return (
    <section id="about" className="py-16 md:py-24">
      <SectionHeading title="Top Picks For Snehal" />
      <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-16">
        {TOP_PICKS.map((pick, index) => {
          const Icon = iconMap[pick.icon];
          const isProud = pick.id === "trust";
          const isPray = pick.id === "kind";
          const isSpecial = pick.id === "creator";
          
          let hoverBorderColor = "hover:border-sam-red/30";
          let hoverShadow = "hover:shadow-red-glow-sm";
          let hoverIconBg = "group-hover:border-sam-red/40 group-hover:bg-sam-red/10";
          let hoverIconColor = "group-hover:text-sam-red";
          let barColor = "bg-sam-red";

          if (isProud) {
            hoverBorderColor = "hover:border-[#FFD166]/50";
            hoverShadow = "hover:shadow-[0_0_30px_rgba(255,209,102,0.3)]";
            hoverIconBg = "group-hover:bg-[#FFD166]/20 group-hover:border-[#FFD166]/50";
            hoverIconColor = "group-hover:text-[#FFD166]";
            barColor = "bg-[#FFD166]";
          } else if (isPray) {
            hoverBorderColor = "hover:border-[#A78BFA]/50";
            hoverShadow = "hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]";
            hoverIconBg = "group-hover:bg-[#A78BFA]/20 group-hover:border-[#A78BFA]/50";
            hoverIconColor = "group-hover:text-[#A78BFA]";
            barColor = "bg-[#A78BFA]";
          } else if (isSpecial) {
            hoverBorderColor = "hover:border-[#FDA4AF]/50";
            hoverShadow = "hover:shadow-[0_0_30px_rgba(253,164,175,0.3)]";
            hoverIconBg = "group-hover:bg-[#FDA4AF]/20 group-hover:border-[#FDA4AF]/50";
            hoverIconColor = "group-hover:text-[#FDA4AF]";
            barColor = "bg-[#FDA4AF]";
          }

          const cardContent = (
            <motion.article
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group relative h-[320px] overflow-hidden rounded-xl border border-white/5 bg-sam-surface transition-all duration-500 ${hoverBorderColor} ${hoverShadow} md:h-[380px]`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${pick.gradient} transition-opacity duration-500 group-hover:opacity-90`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,9,20,0.12),transparent_55%)]" />

              {/* Golden shine effect on hover for the proud card */}
              {isProud && (
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[#FFD166]/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              )}
              {/* Lavender glow effect on hover for the pray card */}
              {isPray && (
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              )}
              {/* Soft Rose glow effect on hover for the special card */}
              {isSpecial && (
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[#FDA4AF]/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              )}

              <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors ${hoverIconBg}`}
                >
                  <Icon
                    size={36}
                    className={`text-white/80 transition-colors ${hoverIconColor}`}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3 className="font-display text-3xl tracking-wide text-white md:text-4xl">
                  {pick.title}
                </h3>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-sam-muted">
                  {pick.subtitle}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 ${barColor} transition-transform duration-500 group-hover:scale-x-100`} />
              </div>
            </motion.article>
          );

          let wrappedCard = cardContent;
          if (isProud) {
            wrappedCard = <Link to="/top-pick/proud" className="block w-full h-full">{cardContent}</Link>;
          } else if (isPray) {
            wrappedCard = <Link to="/top-pick/pray" className="block w-full h-full">{cardContent}</Link>;
          } else if (isSpecial) {
            wrappedCard = <Link to="/top-pick/special" className="block w-full h-full">{cardContent}</Link>;
          }

          return (
            <FadeIn key={pick.id} delay={index * 0.12}>
              {wrappedCard}
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
