import { useState } from "react";
import { FaGithub, FaLinkedin, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-white">
          Arpit <span className="text-green-400">Panwar</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>

          <a href="#skills" className="hover:text-green-400 transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-green-400 transition">
            Projects
          </a>

          <a href="#contact" className="hover:text-green-400 transition">
            Contact
          </a>

          {/* Social Icons */}

          <a
            href="https://github.com/Arpitpanwar01"
            target="_blank"
            className="hover:text-green-400 transition"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://linkedin.com/in/arpit-panwar-537a34323"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-black/90 text-center py-6 space-y-4">
          <a href="#about" className="block hover:text-green-400">
            About
          </a>

          <a href="#skills" className="block hover:text-green-400">
            Skills
          </a>

          <a href="#projects" className="block hover:text-green-400">
            Projects
          </a>

          <a href="#contact" className="block hover:text-green-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
