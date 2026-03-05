import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaPython,
  FaDocker
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiExpo,
  SiRedux,
  SiSocketdotio,
  SiStripe
} from "react-icons/si";

export const skills = [
  // Frontend
  { icon: FaReact, name: "React", category: "Frontend" },
  { icon: SiJavascript, name: "JavaScript", category: "Frontend" },
  { icon: SiTailwindcss, name: "Tailwind CSS", category: "Frontend" },
  { icon: SiRedux, name: "Redux Toolkit", category: "Frontend" },

  // Backend
  { icon: FaNodeJs, name: "Node.js", category: "Backend" },
  { icon: FaPython, name: "Python", category: "Backend" },
  { icon: SiSocketdotio, name: "Socket.io", category: "Backend" },

  // Database
  { icon: SiMysql, name: "MySQL", category: "Database" },
  { icon: SiMongodb, name: "MongoDB", category: "Database" },

  // Mobile
  { icon: SiExpo, name: "React Native / Expo", category: "Mobile" },

  // DevOps
  { icon: FaDocker, name: "Docker", category: "DevOps" },

  // Tools
  { icon: FaGitAlt, name: "Git", category: "Tools" },
  { icon: FaGithub, name: "GitHub", category: "Tools" },

  // Integration
  { icon: SiStripe, name: "Payment Gateway Integration", category: "Integration" }
];