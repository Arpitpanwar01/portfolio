import { useState } from "react";
import { motion } from "framer-motion";
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
      className="py-24 px-6 bg-linear-to-b from-gray-900 to-black text-white"
    >

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-4">
          Tech Stack ⚡
        </h2>

        <p className="text-gray-400 mb-10">
          Technologies and tools I use to build modern applications.
        </p>

        {/* Filter Buttons */}

        <div className="flex justify-center flex-wrap gap-4 mb-12">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg border transition ${
                filter === cat
                  ? "bg-green-500 border-green-500"
                  : "border-gray-700 hover:border-green-400"
              }`}
            >
              {cat}
            </button>

          ))}

        </div>

        {/* Skills Grid */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {filteredSkills.map((skill, index) => {

            const Icon = skill.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.12 }}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center transition hover:border-green-400"
              >

                <Icon className="text-4xl text-green-400 mb-3 group-hover:scale-125 transition" />

                <p className="text-sm text-gray-300">
                  {skill.name}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}