import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 bg-linear-to-b from-black to-gray-900 text-white w-full"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          My Projects 🚀
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg"
            >

              {/* Project Image */}

              {project.image && (
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              )}

              {/* Content */}

              <div className="p-6">

                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}

                <div className="flex flex-wrap gap-2 mb-4">

                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

                {/* Buttons */}

                <div className="flex gap-4">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-green-400"
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-green-400"
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