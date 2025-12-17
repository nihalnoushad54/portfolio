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
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("home");

  /* ---------- THREE.JS BACKGROUND (DISABLED ON MOBILE) ---------- */
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

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
    const count = 300; // Reduced for performance
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
      if (window.innerWidth < 768) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
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
        setGithubRepos(
          data
            .filter((r: any) => !r.fork)
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
        )
      )
      .catch(console.error);
  }, []);

  /* ---------- ACTIVE SECTION (SCROLL SPY) ---------- */
  useEffect(() => {
    const sections = ["home", "skills", "projects"];
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

  const navItems = ["home", "skills", "projects"];

  return (
    <div className={dark ? "bg-black text-white" : "bg-slate-50 text-slate-900"}>
      {/* NAVBAR - MOBILE OPTIMIZED */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400" />
            <span className="font-semibold tracking-tight text-sm sm:text-base">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-black/40 shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-black/40 shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-4 space-y-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50">
            {navItems.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 text-sm capitalize rounded-lg transition-colors ${
                  activeSection === id
                    ? "text-indigo-500 dark:text-sky-400 font-semibold bg-indigo-50/50 dark:bg-sky-900/30"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO - MOBILE OPTIMIZED */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 px-4 sm:px-6"
      >
        <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-50/95 via-slate-50/90 to-slate-100/80 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/90" />

        <div className="relative z-10 max-w-xl sm:max-w-2xl md:max-w-5xl mx-auto w-full grid md:grid-cols-[1.1fr,0.9fr] gap-8 sm:gap-12 items-center text-center md:text-left">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="order-2 md:order-1"
          >
            <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Data Science • AI • ML
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Muhammed Nihal{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  KP
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Data Scientist and AI/ML developer focused on turning messy data
                into clean, deployable solutions and intuitive products.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              <motion.a
                variants={fadeUp}
                href="/Muhammed_Nihal_KP_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </motion.a>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 sm:gap-3 text-slate-500 dark:text-slate-400"
              >
                <a
                  href="https://github.com/nihalnoushad54"
                  className="p-2.5 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-200 hover:scale-105"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nihalkp"
                  className="p-2.5 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-200 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:pvtacc331@gmail.com"
                  className="p-2.5 rounded-full border border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-200 hover:scale-105"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center md:justify-start gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/70 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Open to ML / Data roles
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/70 shadow-sm backdrop-blur-sm">
                End-to-end ML pipelines
              </span>
            </motion.div>
          </motion.div>

          {/* ENHANCED CURRENT FOCUS */}
          <motion.div
            variants={fadeUp}
            className="relative order-1 md:order-2 hidden sm:block md:h-80 lg:h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 blur-3xl opacity-60" />
            <div className="relative h-full rounded-3xl bg-white/85 dark:bg-slate-950/85 border border-white/70 dark:border-slate-800/70 backdrop-blur-xl shadow-2xl shadow-slate-900/25 dark:shadow-slate-900/40 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold mb-3">
                    Current Focus
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-md text-slate-900 dark:text-slate-100">
                    Building production‑ready ML systems, experiment tracking, MLOps pipelines, 
                    and evaluation frameworks for real‑world data problems.
                  </p>
                </div>
                
                {/* Tech Stack Highlights */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-semibold">Primary Stack</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full border border-indigo-200/50 dark:border-indigo-800/50 font-medium">
                      MLflow
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs rounded-full border border-emerald-200/50 dark:border-emerald-800/50 font-medium">
                      Docker
                    </span>
                    <span className="px-3 py-1.5 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs rounded-full border border-sky-200/50 dark:border-sky-800/50 font-medium">
                      FastAPI
                    </span>
                    <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full border border-purple-200/50 dark:border-purple-800/50 font-medium">
                      Weights & Biases
                    </span>
                  </div>
                </div>

                {/* Core Tech Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div>
                    <p className="text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Core</p>
                    <p className="font-semibold text-sm">Python, SQL, Git</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">ML</p>
                    <p className="font-semibold text-sm">sklearn, imblearn</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">Data</p>
                    <p className="font-semibold text-sm">Pandas, NumPy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS - MOBILE OPTIMIZED */}
      <Section id="skills" title="Skills & Tools">
        <SkillCategory
          title="Programming & Development"
          skills={[
            [
              "Python",
              "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            ],
            [
              "SQL",
              "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
            ],
            [
              "VS Code",
              "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
            ],
            [
              "Git",
              "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_mark.svg",
            ],
            [
              "GitHub",
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            ],
          ]}
        />
        <SkillCategory
          title="Data Science & ML"
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
        <SkillCategory
          title="Cloud & Visualization"
          skills={[
            [
              "AWS",
              "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            ],
            [
              "Power BI",
              "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
            ],
          ]}
        />
      </Section>

      {/* PROJECTS - MOBILE OPTIMIZED */}
      <Section id="projects" title="GitHub Projects">
        {githubRepos.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {githubRepos.map((repo, index) => (
              <motion.a
                key={repo.id}
                variants={fadeUp}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/90 dark:bg-slate-950/80 border border-slate-100/80 dark:border-slate-800/70 rounded-2xl p-6 sm:p-5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative hover:bg-white dark:hover:bg-slate-950"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-indigo-500/10 via-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2 z-10 relative">
                  {repo.name}
                  {repo.stargazers_count > 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-medium shadow-sm">
                      ⭐ {repo.stargazers_count}
                    </span>
                  )}
                </h3>
                <p className="text-xs sm:text-sm mb-4 sm:mb-5 text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed z-10 relative">
                  {repo.description || "No description provided"}
                </p>
                <div className="flex justify-between items-center text-xs sm:text-[11px] text-slate-500 z-10 relative">
                  <span className="font-medium">{repo.language}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-500 dark:hover:text-sky-400 transition-colors font-medium">
                    View on GitHub →
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Github className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Loading Projects...</h3>
            <p className="text-slate-500 dark:text-slate-400">Fetching latest GitHub repositories</p>
          </div>
        )}
      </Section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-12 sm:mb-16 text-center"
      >
        <span className="relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 sm:h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
        </span>
      </motion.h2>
      {children}
    </section>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: [string, string][] }) {
  return (
    <div className="mb-16 sm:mb-20 last:mb-0">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-lg sm:text-xl font-semibold mb-8 text-center text-slate-900 dark:text-slate-100 tracking-tight"
      >
        {title}
      </motion.h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
      >
        {skills.map(([name, img], index) => (
          <motion.div
            key={`${name}-${index}`}
            variants={fadeUp}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white/90 dark:bg-slate-950/80 border border-slate-100/80 dark:border-slate-800/70 rounded-2xl p-6 sm:p-5 text-center shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-slate-950 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="h-14 sm:h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <img
                src={img}
                alt={name}
                loading="lazy"
                className="h-10 sm:h-12 w-10 sm:w-12 mx-auto object-contain max-w-full max-h-full opacity-90 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-400">${name}</div>`;
                  }
                }}
              />
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors">
              {name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
