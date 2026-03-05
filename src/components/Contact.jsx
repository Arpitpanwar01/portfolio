import { useState } from "react";
import emailjs from "@emailjs/browser";
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
        (error) => {
          console.log(error);
          alert("Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-black to-gray-900 text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}

        <div>
          <h2 className="text-4xl font-bold mb-6">
            Let's Connect 👋
          </h2>

          <p className="text-gray-400 mb-8">
            I'm always open to discussing new projects,
            collaborations, or opportunities.
          </p>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-400" />
              <span>arpitpanwar971@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaGithub className="text-green-400" />
              <a
                href="https://github.com/Arpitpanwar01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                github.com/Arpitpanwar01
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaLinkedin className="text-green-400" />
              <a
                href="https://linkedin.com/in/arpit-panwar-537a34323"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                linkedin.com/in/arpit-panwar-537a34323
              </a>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-green-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-500 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </form>
      </div>
    </section>
  );
}