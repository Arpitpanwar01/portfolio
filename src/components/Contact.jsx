import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_mfn8yrf",
        "template_vl24z07",
        form,
        "Ey_85nSU_1z3D3mwB"
      )
      .then(
        () => {
          alert("Message sent successfully 🚀");
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          alert("Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 text-white overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full top-10 left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full bottom-10 right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Connect
            </span>{" "}
            👋
          </h2>

          <p className="text-gray-400 mb-8">
            Open for projects, collaborations, and opportunities.
            Let’s build something amazing together.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-3 hover:text-green-400 transition">
              <FaEnvelope className="text-green-400" />
              <span>arpitpanwar971@gmail.com</span>
            </div>

            <a
              href="https://github.com/Arpitpanwar01"
              target="_blank"
              className="flex items-center gap-3 hover:text-green-400 transition"
            >
              <FaGithub className="text-green-400" />
              github.com/Arpitpanwar01
            </a>

            <a
              href="https://linkedin.com/in/arpit-panwar-537a34323"
              target="_blank"
              className="flex items-center gap-3 hover:text-green-400 transition"
            >
              <FaLinkedin className="text-green-400" />
              linkedin.com/in/arpit-panwar
            </a>

          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-6 shadow-xl"
        >

          {/* Glow border */}
          <div className="absolute inset-0 rounded-2xl border border-green-400/10 pointer-events-none" />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none transition"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg shadow-green-500/30 hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </motion.button>

        </motion.form>
      </div>
    </section>
  );
}