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
    desc: "Core ML concepts, types, and real-world applications.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    title: "Overfitting vs Underfitting",
    desc: "Bias–variance tradeoff explained with examples.",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    title: "Neural Networks & Deep Learning",
    desc: "ANN, CNN, RNN, and real-world NNDL use cases.",
    img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
  },
];

// Reusable motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("home");

  /* ---------- THREE.JS BACKGROUND ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const geometry = new THREE.BufferGeometry();
    const count = 400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 120;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: dark ? 0xe5e7eb : 0x111827,
      size: 1.3,
      opacity: 0.55,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [dark]);

  /* ---------- FETCH GITHUB REPOS ---------- */
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => res.json())
      .then((data) =>
        setRepos(
          data
            .filter((r: any) => !r.fork)
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
        )
      );
  }, []);

  /* ---------- ACTIVE SECTION (SCROLL SPY) ---------- */
  useEffect(() => {
    const sections = ["home", "skills", "projects", "blog"];
    const handler = () => {
      const scrollY = window.scrollY;
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.offsetTop - 120;
        if (scrollY >= top) current = id;
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = ["home", "skills", "projects", "blog"];

  return (
    <div className={dark ? "bg-black text-white" : "bg-slate-50 text-slate-900"}>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/70 dark:bg-black/60 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400" />
            <span className="font-semibold tracking-tight text-sm md:text-base">
              Nihal KP
            </span>
          </div>

          <div className="hidden md:flex gap-6 text-xs uppercase tracking-[0.15em]">
            {navItems.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative transition hover:opacity-80 ${
                  activeSection === id
                    ? "text-indigo-500 dark:text-sky-400"
                    : ""
                }`}
              >
                {id}
                {activeSection === id && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-black/40 shadow-sm hover:shadow-md transition"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-black/40"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            {navItems.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-1 text-sm capitalize ${
                  activeSection === id
                    ? "text-indigo-500 dark:text-sky-400 font-medium"
                    : ""
                }`}
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
        <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-100 dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-950/90" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-[1.1fr,0.9fr] gap-12 items-center"
        >
          <motion.div variants={fadeUp} className="text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">
              Data Science • AI • ML
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Muhammed Nihal{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                KP
              </span>
            </h1>
            <p className="mb-6 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              Data Scientist and AI/ML developer focused on turning messy data
              into clean, deployable solutions and intuitive products.
            </p>

            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <motion.a
                variants={fadeUp}
                href="/Muhammed_Nihal_KP_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 text-sm shadow-lg shadow-slate-900/15 dark:shadow-white/10 hover:-translate-y-[1px] hover:shadow-xl transition"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </motion.a>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 text-slate-500 dark:text-slate-400"
              >
                <a
                  href="https://github.com/nihalnoushad54"
                  className="p-2 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nihalkp"
                  className="p-2 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:pvtacc331@gmail.com"
                  className="p-2 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  <Mail size={18} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 text-[11px] text-slate-500 dark:text-slate-400"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open to ML / Data roles
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 px-3 py-1">
                End‑to‑end ML pipelines
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative hidden md:block"
          >
            <div className="relative h-64">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 blur-3xl opacity-70" />
              <div className="relative h-full rounded-3xl bg-white/80 dark:bg-slate-950/80 border border-white/60 dark:border-slate-800 backdrop-blur-xl shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col justify-between p-6">
                <div>
                  <p className="text-xs text-slate-400 mb-2">Current Focus</p>
                  <p className="text-sm font-medium mb-6">
                    Building production‑ready ML systems, experiment tracking,
                    and evaluation for real‑world data problems.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400 mb-1">Core</p>
                    <p>Python, SQL, Git</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">ML</p>
                    <p>sklearn, imblearn</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Data</p>
                    <p>Pandas, NumPy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <Section id="skills" title="Skills & Tools">
        <SkillCategory
          title="Programming & Core"
          skills={[
            [
              "Python",
              "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            ],
            [
              "SQL",
              "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
            ],
          ]}
        />
        <SkillCategory
          title="Machine Learning & NNDL"
          skills={[
            [
              "NumPy",
              "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg",
            ],
            [
              "Pandas",
              "https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_mark.svg",
            ],
            [
              "Scikit-Learn",
              "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
            ],
            [
              "Imbalanced-Learn",
              "https://raw.githubusercontent.com/scikit-learn-contrib/imbalanced-learn/main/doc/logos/imbalanced-learn-logo.png",
            ],
          ]}
        />
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="GitHub Projects">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {repos.map((repo) => (
            <motion.a
              variants={fadeUp}
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              className="group bg-white/80 dark:bg-slate-950/70 border border-slate-100/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-indigo-500/10 via-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                {repo.name}
                {repo.stargazers_count > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                    ⭐ {repo.stargazers_count}
                  </span>
                )}
              </h3>
              <p className="text-xs mb-4 text-slate-600 dark:text-slate-400 line-clamp-3">
                {repo.description || "No description provided"}
              </p>
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>{repo.language}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                  View on GitHub
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Section>

      {/* BLOG */}
      <Section id="blog" title="Blogs (ML & NNDL)">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group bg-white/80 dark:bg-slate-950/70 border border-slate-100/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={blog.img}
                  className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base mb-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {blog.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ id, title, children }: any) {
  return (
    <section id={id} className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-semibold mb-10 text-center"
      >
        <span className="relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-16 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
        </span>
      </motion.h2>
      {children}
    </section>
  );
}

function SkillCategory({ title, skills }: any) {
  return (
    <div className="mb-16">
      <h3 className="text-lg font-semibold mb-6 text-center text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
      >
        {skills.map(([name, img]: any) => (
          <motion.div
            key={name}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 dark:bg-slate-950/80 border border-slate-100/80 dark:border-slate-800 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition"
          >
            <div className="h-16 flex items-center justify-center mb-3">
              <img src={img} className="h-12 mx-auto object-contain" />
            </div>
            <p className="text-sm">{name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
