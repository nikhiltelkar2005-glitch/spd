import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  to?: string;
}

const variants = {
  primary:
    "bg-sam-red text-white hover:bg-[#f40612] shadow-red-glow-sm hover:shadow-red-glow",
  secondary:
    "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base font-medium",
};

const motionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  to,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      {...motionProps}
      onClick={onClick}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
