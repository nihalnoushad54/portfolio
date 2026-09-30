// All portfolio content lives here. Edit this file to customize the site.

export const profile = {
  name: "Muhammed Nihal KP",
  title: "AI/ML Engineer",
  tagline:
    "I build retrieval-augmented generation systems and real-time computer vision applications in Python.",
  about: [
    "I'm an AI/ML engineer with hands-on experience in machine learning, deep learning, computer vision, NLP and generative AI. My recent work centers on RAG pipelines, LLM applications and vector search.",
    "I completed a ten-month Data Science internship at Luminar Technolab, where I built RAG-based data pipelines and AI workflows for document processing and semantic retrieval. I hold a B.Tech in Computer Science and Business Systems, and I'm interested in roles that combine machine learning, AI and security.",
  ],
  location: "Kannur, Kerala, India",
  email: "nihalnoushad76@gmail.com",
  phone: "+91 7907884345",
  links: {
    github: "https://github.com/nihalnoushad54",
    linkedin: "https://www.linkedin.com/in/nihalkp",
  },
};

// Hero panel: the real stages of the PDF Q&A project.
export const pipeline = [
  { label: "Ingest", detail: "Load the PDF" },
  { label: "Chunk", detail: "Split text into passages" },
  { label: "Embed", detail: "Hugging Face embeddings" },
  { label: "Search", detail: "FAISS similarity search" },
  { label: "Answer", detail: "Mistral via Ollama, run locally" },
];

export const projects = [
  {
    name: "PDF Question-Answering System using RAG",
    github: "https://github.com/nihalnoushad54",
    stack: ["LangChain", "FAISS", "Ollama", "Streamlit", "Hugging Face", "Mistral"],
    problem: "Finding specific answers inside long PDF documents is slow when you have to read them manually.",
    solution:
      "An end-to-end retrieval-augmented generation app: it ingests a PDF, chunks the text, embeds it, retrieves the most relevant passages and generates a context-aware answer.",
    contribution:
      "Built the full pipeline: document ingestion, text chunking, Hugging Face embeddings, FAISS vector search and response generation with Mistral, wrapped in a Streamlit interface.",
    outcome: "Answers questions about a PDF using a local LLM, with no external LLM service needed.",
  },
  {
    name: "AI-Based Smart Shopping Assistant",
    github: "https://github.com/nihalnoushad54",
    stack: ["YOLOv8", "MediaPipe", "OpenCV", "Python"],
    problem: "Shopping interfaces usually need touch or typing; this explores hands-free, camera-based interaction.",
    solution: "A real-time assistant that detects products and responds to hand gestures.",
    contribution:
      "Integrated a custom-trained YOLOv8 model (640×480 input, 0.5 confidence threshold) with MediaPipe gesture tracking and OpenCV.",
    outcome:
      "Real-time detection across 5 product categories, with about 2–5 ms preprocessing and 200–914 ms inference depending on hardware.",
  },
  {
    name: "Phishing Website Detection",
    github: "https://github.com/nihalnoushad54",
    stack: ["Python", "Scikit-learn", "XGBoost", "Flask"],
    problem: "Malicious URLs need to be told apart from legitimate ones quickly.",
    solution: "A supervised ML classifier that labels URLs as legitimate or malicious using engineered URL features.",
    contribution:
      "Engineered URL-based features, evaluated the models with standard classification metrics, and built a Flask REST API.",
    outcome:
      "Sends automated email notifications when phishing activity is detected. The work was published as \"Phishing Website detection using Machine Learning and Real Time Email notification System\".",
  },
];

export const experience = [
  {
    role: "Data Science Intern",
    org: "Luminar Technolab, Kochi",
    period: "Jul 2025 – Apr 2026",
    points: [
      "Implemented RAG-based data pipelines using FAISS vector indexing and Hugging Face embeddings for semantic retrieval and context-aware LLM responses.",
      "Designed AI workflows for document processing, semantic retrieval and LLM-based response generation for career-related queries.",
      "Cleaned data, ran exploratory analysis and built classification and regression models with Python, Pandas, NumPy and Scikit-learn.",
      "Applied feature engineering, data visualization, hyperparameter tuning and SQL querying on real-world datasets.",
    ],
  },
  {
    role: "Web Developer",
    org: "TheWebsiteMakers, Bengaluru",
    period: "Jul 2023 – Aug 2024",
    points: ["Worked with a team on web design tasks, using Git for version control and task coordination."],
  },
];

export const skills = [
  { group: "Generative AI & LLMs", items: ["LangChain", "RAG pipelines", "Prompt engineering", "FAISS", "Ollama", "Hugging Face embeddings", "Vector databases"] },
  { group: "Machine Learning", items: ["Classification", "Regression", "Clustering", "Feature engineering", "Model evaluation", "Hyperparameter tuning", "Class imbalance handling", "XGBoost"] },
  { group: "Deep Learning & NLP", items: ["CNN", "LSTM", "GRU", "Transformers", "NLP", "Transfer learning", "PyTorch", "TensorFlow", "Speech recognition"] },
  { group: "Computer Vision", items: ["OpenCV", "YOLO", "MediaPipe", "Face recognition", "Tesseract OCR", "Real-time object detection"] },
  { group: "Languages & Backend", items: ["Python", "SQL", "Bash", "REST API", "FastAPI"] },
  { group: "Data & Tools", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Power BI", "Streamlit", "Docker", "AWS (EC2, S3, IAM)", "Git", "Jupyter"] },
];

export const education = {
  degree: "B.Tech, Computer Science and Business Systems",
  school: "JCT College of Engineering and Technology, Coimbatore (Anna University)",
  period: "2021 – 2025",
  detail: "CGPA 7.19 / 10",
};

export const certifications = [
  "Data Science Certification, NACTET",
  "Python for Data Science, IBM",
  "Introduction to Data Science, IBM",
  "Network Essentials",
  "Introduction to Ethical Hacking",
  "Ethical hacking training, Offenso Hackers Academy (Jan–Feb 2023)",
];
