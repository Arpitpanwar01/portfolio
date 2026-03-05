import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            About Me 👨‍💻
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I'm <span className="text-green-400 font-semibold">Arpit Panwar</span>,
            a passionate <span className="text-green-400">Full Stack Developer</span>
            focused on building scalable web and mobile applications.
          </p>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I work mainly with <span className="text-green-400">React</span>,
            <span className="text-green-400"> Node.js</span>, and
            <span className="text-green-400"> React Native</span> to create
            high-performance applications. I have experience developing
            dashboards, APIs, IoT monitoring systems, and real-time
            applications.
          </p>

          <p className="text-gray-400 leading-relaxed">
            My goal is to build efficient, scalable systems with clean UI/UX
            and strong backend architecture. I enjoy solving real-world
            problems and turning ideas into reliable digital products.
          </p>
        </motion.div>

        {/* RIGHT SIDE - STATS */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-6"
        >

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-green-400">6+</h3>
            <p className="text-gray-400 mt-2">Projects Built</p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-green-400">10+</h3>
            <p className="text-gray-400 mt-2">Technologies</p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-green-400">3+</h3>
            <p className="text-gray-400 mt-2">Mobile Apps</p>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-green-400">2+</h3>
            <p className="text-gray-400 mt-2">Real-time Systems</p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}