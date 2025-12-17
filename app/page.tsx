"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import * as THREE from "three";

const GITHUB_USERNAME = "nihalnoushad54";

const blogs = [
  {
    title: "Introduction to Machine Learning",
    desc: "Core ML concepts and real-world use cases.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    title: "Overfitting vs Underfitting",
    desc: "Understanding bias–variance tradeoff.",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    title: "Neural Networks Explained",
    desc: "How ANN, CNN, and RNN work in practice.",
    img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
  },
];

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);

  /* ---------- BACKGROUND PARTICLES ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 90;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: dark ? 0xe5e7eb : 0x111111,
      size: 1.1,
      opacity: 0.6,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.00025;
      renderer.render(scene, camera);
    };

    animate();
    return () => renderer.dispose();
  }, [dark]);

  /* ---------- FETCH GITHUB REPOS ---------- */
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => res.json())
      .then((data) =>
        setRepos(data.filter((r: any) => !r.fork).slice(0, 6))
      );
  }, []);

  return (
    <div className={dark ? "bg-black text-white" : "bg-gray-100 text-gray-900"}>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur bg-white/70 dark:bg-black/60">
        <div className="flex justify-between px-6 py-4 max-w-7xl mx-auto">
          <span className="font-semibold">Nihal KP</span>

          <div className="hidden md:flex gap-6 text-sm">
            {["home", "skills", "experience", "projects", "blog"].map((id) => (
              <a key={id} href={`#${id}`} className="hover:opacity-60">
                {id}
              </a>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setDark(!dark)}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2">
            {["home", "skills", "experience", "projects", "blog"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                {id}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* LIGHTER OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b 
          from-white/70 via-white/90 to-white
          dark:from-black/20 dark:via-black/40 dark:to-black/60">
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            Muhammed Nihal KP
          </h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Data Scientist | AI / ML Developer
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-8 mb-8">
            <a href="https://github.com/nihalnoushad54" className="hover:opacity-60">
              <Github size={26} />
            </a>
            <a href="https://www.linkedin.com/in/nihalkp" className="hover:opacity-60">
              <Linkedin size={26} />
            </a>
            <a href="mailto:pvtacc331@gmail.com" className="hover:opacity-60">
              <Mail size={26} />
            </a>
          </div>

          <a
            href="/Muhammed_Nihal_KP_Resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-medium"
          >
            <Download size={18} /> Download Resume
          </a>
        </div>
      </section>

      {/* SKILLS */}
      <Section id="skills" title="Skills & Tools">
        <SkillCategory
          title="Programming & Core"
          skills={[
            ["Python", "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"],
            ["SQL", "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png"],
          ]}
        />

        <SkillCategory
          title="Data Science & Machine Learning"
          skills={[
            ["NumPy", "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg"],
            ["Pandas", "https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_mark.svg"],
            ["Scikit-Learn", "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"],
            ["Imbalanced-Learn", "https://raw.githubusercontent.com/scikit-learn-contrib/imbalanced-learn/main/doc/logos/imbalanced-learn-logo.png"],
          ]}
        />
      </Section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ id, title, children }: any) {
  return (
    <section id={id} className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold mb-12 text-center"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

function SkillCategory({ title, skills }: any) {
  return (
    <div className="mb-20">
      <h3 className="text-xl font-semibold mb-8 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {skills.map(([name, img]: any) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.08 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center"
          >
            <img src={img} className="h-16 mx-auto mb-4" />
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
