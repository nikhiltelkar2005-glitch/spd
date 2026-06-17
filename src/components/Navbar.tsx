import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "../data/content";
import { useScrollY } from "../hooks/useScrollY";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 20;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-sam-bg/80 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <a href="#home" className="group flex flex-col">
          <span className="font-display text-2xl tracking-[0.2em] text-sam-red transition-colors group-hover:text-white md:text-3xl">
            SNEHALFLIX
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-sam-muted md:text-xs">
            The Best Friend Season
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-sam-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Profile & Logout */}
        <div className="group relative hidden items-center gap-3 lg:flex cursor-pointer pb-2 mb-[-8px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-sam-red to-red-900 text-sm font-bold text-white">
            S
          </div>
          <span className="text-sm font-medium text-white">Snehal</span>
          
          <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2">
            <div className="rounded-md border border-white/10 bg-[#1A1A1A] p-2 shadow-xl backdrop-blur-md">
              <button 
                onClick={logout}
                className="whitespace-nowrap px-4 py-2 text-sm text-sam-muted hover:text-white hover:bg-white/10 rounded-md w-full text-left transition-colors"
              >
                Sign out of SNEHALFLIX
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 bg-sam-bg/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-3 text-base text-sam-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Profile & Logout */}
          <div className="flex flex-col border-t border-white/10 px-4 py-6 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-sam-red to-red-900 font-bold text-white">
                S
              </div>
              <span className="font-medium text-white">Snehal</span>
            </div>
            <button 
              onClick={logout}
              className="text-left text-sm font-bold tracking-wider uppercase text-sam-red hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
