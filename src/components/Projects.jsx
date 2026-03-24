import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 text-white overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full top-10 left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full bottom-10 right-[-100px]" />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-16">
          My{" "}
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </span>{" "}
          🚀
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
            >

              {/* 🖼 Image */}
              {project.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* 🔥 Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-green-400 hover:text-black transition"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-green-400 hover:text-black transition"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}

                  </div>
                </div>
              )}

              {/* 📦 Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* ⚡ Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gradient-to-r from-green-400/20 to-cyan-400/20 text-green-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 🚀 Buttons */}
                <div className="flex gap-4">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-cyan-400 text-black font-medium hover:scale-105 transition"
                    >
                      <FaExternalLinkAlt />
                      Live
                    </a>
                  )}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}