import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden text-white">

      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>
      </div>

      <div className="max-w-4xl text-center">

        {/* 🔥 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Arpit Panwar
          </span>
        </motion.h1>

        {/* ✨ Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xl md:text-2xl text-gray-300"
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "React Developer",
              2000,
              "React Native Developer",
              2000,
              "Node.js Developer",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* 🧠 Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          I build scalable web and mobile applications using React,
          Node.js, and modern technologies.  
          Focused on performance, clean UI, and real-world problem solving.
        </motion.p>

        {/* 🚀 Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-5 mt-10 justify-center flex-wrap"
        >
          <a
            href="#projects"
            className="px-7 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold rounded-xl hover:scale-105 transition shadow-lg shadow-green-500/30"
          >
            View Projects
          </a>

          <a
            href="/resume/ArpitPanwarResume (2).pdf"
            download
            className="px-7 py-3 border border-white/20 rounded-xl backdrop-blur-md hover:bg-white/10 transition"
          >
            Download Resume
          </a>
        </motion.div>

        {/* 🔗 Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex gap-6 justify-center mt-10 text-xl text-gray-400"
        >
          {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.2, y: -3 }}
              href={
                i === 0
                  ? "https://github.com/Arpitpanwar01"
                  : i === 1
                  ? "https://linkedin.com/in/arpit-panwar-537a34323"
                  : "mailto:arpitpanwar971@gmail.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}