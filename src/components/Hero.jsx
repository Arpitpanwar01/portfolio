import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">

      <div className="max-w-4xl text-center">

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Hi, I'm <span className="text-green-400">Arpit Panwar</span>
        </motion.h1>

        {/* Typing */}

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

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto"
        >
          I build scalable web and mobile applications using React,
          Node.js, React Native and modern technologies.  
          Passionate about creating real-world solutions, dashboards,
          and high-performance applications.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-5 mt-10 justify-center flex-wrap"
        >

          <a
            href="#projects"
            className="px-6 py-3 bg-green-500 rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transition shadow-lg shadow-green-500/20"
          >
            View Projects
          </a>

          <a
            href="/resume/ArpitPanwarResume (2).pdf"
            download
            className="px-6 py-3 border border-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition"
          >
            Download Resume
          </a>

        </motion.div>

        {/* Social Links */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex gap-6 justify-center mt-10 text-xl text-gray-400"
        >

          <a
            href="https://github.com/Arpitpanwar01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/arpit-panwar-537a34323"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:arpitpanwar971@gmail.com"
            className="hover:text-green-400 transition hover:scale-110"
          >
            <FaEnvelope />
          </a>

        </motion.div>

      </div>
    </section>
  );
}