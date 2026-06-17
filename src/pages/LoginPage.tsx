import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers: Record<string, string> = {
      "snehal@snehalflix.com": "snehal@08",
      "nikhil@snehalflix.com": "nikhil@17",
    };

    if (validUsers[email] === password) {
      setError(false);
      login();
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-sam-bg flex items-center justify-center overflow-hidden font-inter">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15),transparent_70%)]" />
        <div className="absolute -left-[20%] -top-[20%] h-[70%] w-[50%] rounded-full bg-sam-red/10 blur-[120px]" />
        <div className="absolute -right-[20%] -bottom-[20%] h-[70%] w-[50%] rounded-full bg-sam-red/10 blur-[120px]" />
      </div>

      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <span className="font-display text-3xl tracking-[0.2em] text-sam-red">
          SNEHALFLIX
        </span>
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="rounded-2xl border border-white/10 bg-black/60 p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <h1 className="mb-8 font-display text-4xl text-white">Sign In</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or ID"
                  className={`w-full rounded-md border bg-white/5 px-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/10 focus:ring-2 ${
                    error ? "border-sam-red focus:border-sam-red focus:ring-sam-red/30" : "border-white/20 focus:border-white/50 focus:ring-white/20"
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full rounded-md border bg-white/5 px-4 py-4 text-white placeholder-white/50 outline-none transition-all focus:bg-white/10 focus:ring-2 ${
                    error ? "border-sam-red focus:border-sam-red focus:ring-sam-red/30" : "border-white/20 focus:border-white/50 focus:ring-white/20"
                  }`}
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-sam-red mt-2">
                    Sorry, we can't find an account with these credentials. Please try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 w-full rounded-md bg-sam-red py-4 font-bold tracking-wider text-white transition-colors hover:bg-sam-red/90 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              Sign In
            </motion.button>

            <div className="mt-8 flex items-center justify-between text-sm text-sam-muted">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 accent-sam-red" defaultChecked />
                <span>Remember me</span>
              </label>
              <span className="hover:text-white transition-colors cursor-help">Need help?</span>
            </div>
            
            <p className="mt-12 text-sm text-sam-muted">
              This page is protected to ensure only the intended recipient can view this gift.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
