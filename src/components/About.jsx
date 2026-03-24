import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { value: "6+", label: "Projects Built" },
    { value: "10+", label: "Technologies" },
    { value: "3+", label: "Mobile Apps" },
    { value: "2+", label: "Real-time Systems" },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 text-white overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full top-10 left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full bottom-10 right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>{" "}
            👨‍💻
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I'm{" "}
            <span className="text-green-400 font-semibold">
              Arpit Panwar
            </span>
            , a passionate{" "}
            <span className="text-green-400">
              Full Stack Developer
            </span>{" "}
            focused on building scalable web and mobile applications.
          </p>

          <p className="text-gray-400 mb-6 leading-relaxed">
            I work mainly with{" "}
            <span className="text-green-400">React</span>,{" "}
            <span className="text-green-400">Node.js</span>, and{" "}
            <span className="text-green-400">React Native</span> to create
            high-performance applications including dashboards, APIs,
            IoT systems, and real-time platforms.
          </p>

          <p className="text-gray-400 leading-relaxed">
            My focus is on clean UI, scalable backend systems, and solving
            real-world problems with efficient solutions.
          </p>
        </motion.div>

        {/* RIGHT SIDE - STATS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.07 }}
              className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center overflow-hidden"
            >
              {/* Glow hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition" />

              <h3 className="text-3xl font-bold text-green-400 relative z-10">
                {item.value}
              </h3>

              <p className="text-gray-400 mt-2 relative z-10">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}