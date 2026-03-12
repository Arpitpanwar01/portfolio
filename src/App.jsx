import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills"; // add this
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AIChatbot from "./components/AIChatbot";

function App() {
  return (
    <div className="bg-black text-white h-screen w-screen">
      <AIChatbot />
      <Navbar />
      <Hero />
      <About />
      
      <Skills /> {/* add this */}
      <Projects />
      <Contact />
    </div>
  );
}

export default App;