"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import * as THREE from "three";

/* ---------- Animation Variants ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dark, setDark] = useState(false);

  /* ---------- THREE Background ---------- */

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 40;

    const geometry = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 120;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: dark ? 0xffffff : 0x0f172a,
      size: 1.3,
      opacity: 0.6,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [dark]);

  const skills = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "MediaPipe", logo: "/mediapipe.png" },
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  ];

  const projects = [
    "Medical Insurance Prediction",
    "Phishing Website Detection",
    "Lung Cancer Detection",
    "Brain Tumor Detection",
    "Face Recognition System",
    "Attendance System using Face Recognition",
  ];

  return (
    <div className={`min-h-screen ${dark ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* Floating Gradient Blobs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse -z-20" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl opacity-20 animate-pulse -z-20" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/60 dark:bg-black/60 border-b border-white/10 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <span className="font-semibold text-lg">Muhammed Nihal KP</span>
          <div className="flex items-center gap-5">
            <a href="https://github.com/nihalnoushad54" target="_blank"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/nihalkp" target="_blank"><Linkedin size={20} /></a>
            <a href="mailto:Nihalnoushad76@gmail.com"><Mail size={20} /></a>
            <button onClick={() => setDark(!dark)}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-28">
        <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />

        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-6xl font-bold mb-6">
            AI &{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              Computer Vision
            </span>{" "}
            Engineer
          </h1>

          <p className="text-xl mb-6 text-slate-600 dark:text-slate-400">
            Designing intelligent systems with Deep Learning & scalable ML pipelines.
          </p>

          <p className="text-sm mb-10 text-slate-500">
            Nihalnoushad76@gmail.com
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/Nihal.pdf"
              download
              className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg hover:scale-105 transition-all"
            >
              Download Resume
            </a>

            <a
              href="mailto:Nihalnoushad76@gmail.com"
              className="px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-4xl font-semibold text-center mb-16">Skills & Tools</motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="p-6 text-center rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border shadow-xl transition-all"
            >
              <img src={skill.logo} alt={skill.name} className="h-12 mx-auto mb-4" />
              <p className="font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2 variants={fadeUp} className="text-4xl font-semibold text-center mb-16">Projects</motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border shadow-2xl transition-all hover:shadow-indigo-500/30"
            >
              <h3 className="text-xl font-semibold">{project}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
