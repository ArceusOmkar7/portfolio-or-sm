export interface Project {
  slug: string
  name: string
  description: string
  images: string[]
  tags: string[]
  type: "ML" | "Backend" | "OSS" | "Full Stack"
  url?: string
  github: string
  problem: string
  what: string
  techDecisions: string
  results: string
}

const projects: Project[] = [
  {
    slug: "gniem",
    name: "GNIEM",
    description:
      "Global News Intelligence & Event Monitoring — a geopolitical dashboard built on GDELT, without the multi-terabyte cloud bill.",
    images: [
      "/images/projects/gniem/dashboard-1.png",
      "/images/projects/gniem/dashboard-2.png",
      "/images/projects/gniem/events-map.png",
      "/images/projects/gniem/gniem-min-arch.png",
      "/images/projects/gniem/sidebar-1.png",
      "/images/projects/gniem/sidebar-2.png",
    ],
    tags: ["Python", "TypeScript", "DuckDB", "BigQuery", "FastAPI", "React"],
    type: "Backend",
    github: "https://github.com/ArceusOmkar7/gniem",
    problem:
      "GDELT 2.1 is a global events database that updates every 15 minutes and runs into multi-terabyte scale. Querying it for near-real-time geopolitical monitoring the naive way — hitting BigQuery on every request — gets expensive fast, and full-history warehousing isn't something a student project can just spin up.",
    what:
      "A hybrid OLAP dashboard that splits GDELT data into two tiers: a hot tier (last 90 days) ingested via daily BigQuery batch pulls plus 15-minute streaming fetches, stored as Parquet and queried in-process with DuckDB for low latency; and a cold tier (historical, >90 days) that stays in BigQuery behind a routing engine. On top of that sits an ML layer — Prophet for 30-day forecasts of conflict-event volume, IsolationForest for anomaly/'black swan' detection, TF-IDF + K-Means to cluster raw CAMEO event codes into readable themes, and a nightly Llama 3 (via Groq) pass that generates written regional briefings. The frontend is a React 19 + TypeScript + Vite bento-grid dashboard with Mapbox GL JS heatmaps, Wikipedia entity enrichment, and on-demand article scraping via Jina AI Reader.",
    techDecisions:
      "DuckDB in-process over a hosted OLAP DB for the hot tier — Parquet + DuckDB gives fast analytical scans without running a database server. BigQuery is only touched for cold-tier historical queries, and even then every call goes through column pruning, SQLDATE partition filters, and a dry-run byte-estimate check before executing, capped at ~2GB scanned per query — necessary guardrails to keep this runnable on a personal GCP budget. TF-IDF + K-Means over heavier embedding-based clustering for the theme grouping, since it runs on a nightly schedule and needs to stay cheap, not real-time. Supercronic instead of full cron/Kubernetes for scheduling, since the whole stack ships as Docker Compose.",
    results:
      "Ships as a self-contained Docker Compose stack (FastAPI backend, Nginx-served frontend, cron scheduler container). Hot tier refreshes every 15 minutes; nightly jobs regenerate anomaly flags and AI-written regional briefings automatically without manual intervention.",
  },
  {
    slug: "mlops-telco-churn",
    name: "MLOps Pipeline (Telco Churn)",
    description:
      "Production-grade, end-to-end MLOps pipeline for customer churn — every stage of the ML lifecycle wired together, not just a notebook.",
    images: [
      "/images/projects/telco-churn/prefect_pipeline_dashboard.png",
      "/images/projects/telco-churn/mlflow_runs.png",
      "/images/projects/telco-churn/mlflow_run_overview.png",
      "/images/projects/telco-churn/mlflow_run_artifact_cm.png",
    ],
    tags: ["Python", "Prefect", "MLflow", "Evidently", "FastAPI", "scikit-learn"],
    type: "ML",
    github: "https://github.com/ArceusOmkar7/telco-churn-pipeline",
    problem:
      "Most churn-prediction demos stop at a Jupyter notebook with a decent AUC. The real gap is everything around the model: no experiment tracking, no automated quality gate before deploying, no way to know when the model has gone stale, and no repeatable retrain path once new data shows up.",
    what:
      "A full MLOps pipeline — ingest (Kaggle download via kagglehub with schema/null/class-balance checks) → preprocess (encoding, scaling, stratified split, reference batch saved for drift baselines) → train (RandomForestClassifier with MLflow autologging) → evaluate (accuracy/F1/AUC computed independently as a quality gate, confusion matrix logged) → register (promoted to the MLflow Model Registry under a 'production' alias only if the gate passes) → serve (FastAPI /predict + /health, loading model and preprocessor together from the registry) → monitor (Evidently drift detection comparing a fixed reference batch against simulated production traffic) → auto-retrain if drift is flagged. Every step is wrapped as a Prefect task, so the whole thing runs as one orchestrated flow with retries and a visual dashboard.",
    techDecisions:
      "MLflow Model Registry using aliases (e.g. @production) instead of the deprecated stage-based API — cleaner promotion logic with no stage-lifecycle bookkeeping. Preprocessor is logged as an artifact inside the same MLflow run as the model, and the serving API pulls both from that same run_id — guarantees the API never loads a model paired with the wrong preprocessor. Evidently v0.7 requires wrapping data in Dataset.from_pandas() + an explicit DataDefinition instead of the old ColumnMapping, otherwise it silently tries to run NLP-style drift tests on numeric columns. A hard quality gate (accuracy ≥ 0.70, weighted F1 ≥ 0.65, AUC ≥ 0.75) blocks registration — retraining can never silently promote a worse model.",
    results:
      "Runs on the Kaggle Telco Customer Churn dataset (7,043 rows, 21 features, ~73/27 class split) handled via stratified splits and weighted F1. Full pipeline orchestrated by Prefect with automatic retries on flaky steps; CI runs 3 fully-mocked tests on every push with zero external dependencies (no live MLflow server, Kaggle credentials, or data files needed).",
  },
  {
    slug: "vizzy",
    name: "Vizzy",
    description:
      "Streamlit-powered data visualization and cleaning dashboard with automated quality scoring and Gemini LLM-powered business insights.",
    images: [
      "/images/projects/vizzy/analysis-dashboard.png",
      "/images/projects/vizzy/main-interface.png",
      "/images/projects/vizzy/data-quality.png",
      "/images/projects/vizzy/distribution-analysis.png",
      "/images/projects/vizzy/ai-insights.png",
      "/images/projects/vizzy/preprocessing.png",
    ],
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "Seaborn", "Gemini API"],
    type: "OSS",
    github: "https://github.com/ArceusOmkar7/Vizzy",
    problem:
      "Data scientists and analysts spend a significant amount of time performing repetitive exploratory data analysis (EDA), checking null counts, writing boilerplate plotting code, and cleaning dirty datasets. Existing profiling tools are either static and slow, or lock qualitative business summaries behind proprietary, paid web applications.",
    what:
      "An interactive EDA and preprocessing dashboard that provides a structured, visually rich overview of any tabular dataset (CSV or Excel). It computes a 5-dimension Data Quality Score (Completeness, Consistency, Accuracy, Uniqueness, Validity) using an internal metrics engine. Vizzy displays auto-generated, copy-pasteable Python code snippets for 8 preprocessing scenarios (such as handling missing values, scaling, encoding, and memory optimization) and connects to Google's Gemini API to produce context-aware regional/business insights and summaries.",
    techDecisions:
      "Utilized Streamlit for UI rapid prototyping but implemented state-management helper functions in session state to maintain interactive navigation without encountering full-page tab resets. Paired Plotly with Matplotlib and Seaborn, employing interactive Plotly components for metric gauges and distribution charts while rendering complex subplots (such as multivariate correlation networks and missing data patterns) using static Seaborn heatmaps to optimize render times.",
    results:
      "Allows instant multi-tab analytics on CSV and Excel uploads. The application outputs data health summaries graded on an A-F scale, visualizes null-correlation patterns, highlights detected outlier limits, generates customized cleaning scripts, and prepares downloadable issue reports alongside synthesized Gemini summaries.",
  },
  {
    slug: "atlas",
    name: "Atlas",
    description:
      "Geographical memory journal mobile app that lets users map, tag, and preserve personal life events with automated weather logging.",
    images: [
      "/images/projects/atlas/homepage.jpg",
      "/images/projects/atlas/memories_list_page.jpg",
      "/images/projects/atlas/search_page.jpg",
      "/images/projects/atlas/sidemenu_page.jpg",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    type: "Full Stack",
    github: "https://github.com/ArceusOmkar7/Atlas",
    problem:
      "Traditional journal entries and photos are typically categorized by date alone, yet personal milestones are fundamentally tied to physical spaces. Existing journal solutions lack geographical integration, whereas map applications omit private storytelling features such as image galleries, customized tags, and local environmental context.",
    what:
      "A cross-platform React Native mobile application built on Expo and TypeScript that allows users to geographically record, search, and navigate their memories. Powered by Supabase for authentication, relational PostgreSQL tables, and bucket-based image storage. Each logged memory contains custom tags (capped at 5), coordinates, a description, and historic local weather metrics (temperature, condition, and humidity) retrieved via the OpenWeather API at the time of creation.",
    techDecisions:
      "Adopted Supabase to handle relational queries and client authentication, and configured row-level security (RLS) policies for user isolation. Applied NativeWind (Tailwind CSS) to share a styling scheme across screens. Optimized media bandwidth by configuring on-the-fly image transformations via Supabase Storage, requesting compressed thumbnails for list cards and fetching raw high-resolution files only on-demand within full-screen modal overlays. Integrated Expo Location to query GPS data, fallback-geocoding coordinates through the Google Places API.",
    results:
      "Features a fully complete mobile flow containing JWT-based user authentication, drawer-navigation menus, real-time Google Maps marker positioning categorized by tag colors, and a memory calendar displaying historical timelines. The application supports direct camera capture, gallery selection, tag creations, and multi-filter search capabilities.",
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
