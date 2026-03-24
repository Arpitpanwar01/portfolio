import { useState } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo with gradient */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-white cursor-pointer"
        >
          Arpit{" "}
          <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Panwar
          </span>
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.1 }}
              className="relative group transition"
            >
              {item}
              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}

          {/* Social Icons with hover glow */}
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com/Arpitpanwar01"
            target="_blank"
            className="hover:text-green-400 transition"
          >
            <FaGithub size={20} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://linkedin.com/in/arpit-panwar-537a34323"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaLinkedin size={20} />
          </motion.a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg text-center py-6 space-y-6"
          >
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block text-lg hover:text-green-400 transition"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}