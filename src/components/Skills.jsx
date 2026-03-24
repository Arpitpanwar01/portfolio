import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/skills";

export default function Skills() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "Mobile", "Tools"];

  const filteredSkills =
    filter === "All"
      ? skills
      : skills.filter((skill) => skill.category === filter);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 text-white overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full top-10 left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full bottom-10 right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          Tech{" "}
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Stack
          </span>{" "}
          ⚡
        </h2>

        <p className="text-gray-400 mb-12">
          Technologies and tools I use to build modern applications.
        </p>

        {/* 🔥 Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-14">

          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm transition backdrop-blur-md border ${
                filter === cat
                  ? "bg-gradient-to-r from-green-400 to-cyan-400 text-black border-transparent shadow-lg shadow-green-500/30"
                  : "border-white/10 hover:border-green-400 text-gray-300"
              }`}
            >
              {cat}
            </motion.button>
          ))}

        </div>

        {/* ⚡ Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.12, rotate: 1 }}
                  className="relative group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center overflow-hidden"
                >

                  {/* ✨ Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition" />

                  {/* Icon */}
                  <Icon className="text-4xl text-green-400 mb-3 relative z-10 group-hover:scale-125 transition" />

                  {/* Name */}
                  <p className="text-sm text-gray-300 relative z-10">
                    {skill.name}
                  </p>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}