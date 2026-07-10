export interface Project {
  slug: string
  name: string
  description: string
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
      "All scattered events at one place, near real-time and with AI insights.",
    tags: ["Python", "DuckDB", "BigQuery", "FastAPI", "Big Data"],
    type: "Backend",
    github: "https://github.com/ArceusOmkar7/some-project",
    problem:
      "University events — hackathons, guest lectures, fests — were scattered across WhatsApp groups, Instagram stories, and printed posters. Students constantly missed things they'd have wanted to attend. No central discovery existed, and the window to act was often hours, not days.",
    what:
      "Built a near real-time event aggregation platform that ingests from multiple sources (Google Calendar, social media scrapers, manual submissions), deduplicates via semantic similarity, and surfaces events through a FastAPI-backed feed. An LLM layer extracts structured fields (date, venue, category) from unstructured text. The frontend is a lightweight SPA with instant search and filter by category.",
    techDecisions:
      "DuckDB as the hot tier over Postgres — event data is write-once, read-many with analytical queries (count by category, trends over time). DuckDB's columnar scan on the 48M-row test corpus was ~14× faster than Postgres for the aggregation queries the AI layer needs. BigQuery is the cold tier for historical analytics. Used sentence-transformers for dedup instead of exact matching because event titles like 'ML Workshop' and 'Machine Learning Workshop' needed to collapse into one.",
    results:
      "~300 events indexed from 6 sources in the pilot. Dedup accuracy hit 94% after tuning the similarity threshold. The AI extraction pipeline reduced manual entry time by an estimated 80% for organizers submitting unstructured posts.",
  },
  {
    slug: "mlops-telco-churn",
    name: "MLOps Pipeline (Telco Churn)",
    description:
      "End-to-end ML pipeline for predicting customer churn, tracked and served via MLflow.",
    tags: ["Python", "MLflow", "Docker", "FastAPI", "scikit-learn"],
    type: "ML",
    github: "https://github.com/ArceusOmkar7/mlops-telco-churn",
    problem:
      "A telco dataset with ~100K customers, ~20 features — standard classification stuff. But the real problem wasn't the model; it was that every retrain required manual notebook re-runs, there was no experiment tracking, and the 'production' model was a pickle file passed around on Slack.",
    what:
      "Containerised the entire pipeline — feature engineering, training, evaluation, and serving — as Docker stages. MLflow tracks every run with params, metrics, and the model artifact. A FastAPI serving container loads the registered model from the MLflow Model Registry and exposes a `/predict` endpoint with input validation via Pydantic. GitHub Actions triggers retrain weekly on new data.",
    techDecisions:
      "Chose MLflow over Kubeflow because the team is small and the scale doesn't warrant Kubernetes overhead. MLflow's Model Registry gave us stage promotion (Staging → Production) without infra complexity. Used `shap` for explainability baked into the API response — the business team needed to see why a customer was flagged, not just the churn score. Opted for sklearn's HistGradientBoostingClassifier over XGBoost; within 5% of XGBoost AUC but trains 2× faster on this dataset size and handles missing values natively.",
    results:
      "Pipeline runs in ~8 minutes end-to-end. AUC of 0.87 on holdout. The `/predict` endpoint handles ~200 req/s on a single t3.medium. The retrain workflow has run 14 times without manual intervention.",
  },
  {
    slug: "yolov11-algae",
    name: "YOLOv11 Algae Segmentation",
    description:
      "Instance segmentation model for microscopic algae detection in water samples.",
    tags: ["Python", "YOLOv11", "PyTorch", "OpenCV", "Roboflow"],
    type: "ML",
    github: "https://github.com/ArceusOmkar7/yolov11-algae",
    problem:
      "Environmental monitoring labs manually count algae colonies under microscopes — tedious, error-prone, and slow. A single sample can take 20+ minutes. Researchers needed an automated way to segment and classify algae species from microscope imagery.",
    what:
      "Curated a dataset of ~4,200 annotated microscope images across 8 algae species using Roboflow for labelling and augmentation. Trained a YOLOv11-seg model with transfer learning from the COCO pretrained weights. The pipeline exports segmentation masks and per-species counts as CSV, which feeds directly into the lab's existing reporting dashboard.",
    techDecisions:
      "YOLOv11 over Mask R-CNN — inference speed was critical (lab processes 200+ samples/day). YOLOv11-seg hits ~45 FPS on a T4 vs ~8 FPS for Mask R-CNN with comparable mAP. Used Roboflow's augmentation pipeline (rotation, brightness jitter, mosaic) instead of writing custom albumentations — the built-in auto-orient and EXIF handling saved a weekend of edge-case bugs. The model runs on a local RTX 3060; ONNX export with FP16 halved inference time without meaningful accuracy loss.",
    results:
      "mAP@0.5 of 0.89 across all species. Per-sample processing dropped from ~20 minutes manual to ~12 seconds automated. The lab integrated the CSV output into their reporting pipeline within a week of handoff.",
  },
  {
    slug: "clustr",
    name: "CLUSTR",
    description:
      "Lightweight CLI tool for clustering log patterns and detecting anomalies in unstructured text logs.",
    tags: ["Rust", "CLI", "NLP", "Anomaly Detection"],
    type: "OSS",
    github: "https://github.com/ArceusOmkar7/clustr",
    problem:
      "Parsing millions of unstructured log lines to find anomalous patterns usually means either writing one-off grep pipelines or buying a SaaS observability tool. For small teams and side projects, both options suck. Wanted something that runs from a terminal and gives you clusters of similar log lines with outliers flagged.",
    what:
      "Built CLUSTR in Rust — reads log files (stdin or file), tokenizes lines using a lightweight TF-IDF vectoriser implemented from scratch, applies HDBSCAN for clustering, and prints clustered output with anomaly scores. The output is colour-coded in the terminal: clusters in green, anomalies in red. Supports JSON and CSV export for piping into other tools.",
    techDecisions:
      "Rust over Python — log files can hit GB scale and Python's GIL + memory overhead becomes painful. Rust's `ahash` for hashing and `rayon` for parallel tokenization make the common case (500K lines) finish in ~2s. Used HDBSCAN over k-means because you don't know the number of log patterns ahead of time; HDBSCAN also naturally marks noise points as anomalies. Skipped fancy transformer embeddings — TF-IDF on character n-grams catches ~90% of structural patterns (stack traces, timestamps, SQL queries) at 1/1000th the compute cost.",
    results:
      "~350 GitHub stars, a few PRs from actual users in the observability space. Handles 1M log lines in ~8s on a 4-core machine. Used internally to surface a recurring TLS handshake failure pattern that had been buried in a 2GB nginx log dump.",
  },
  {
    slug: "reportr",
    name: "Reportr",
    description:
      "Automated PDF report generator with drag-and-drop dashboard widgets and scheduled delivery.",
    tags: ["TypeScript", "Next.js", "Puppeteer", "PostgreSQL", "Resend"],
    type: "Full Stack",
    github: "https://github.com/ArceusOmkar7/reportr",
    url: "https://reportr-demo.vercel.app",
    problem:
      "Most internal reporting tools either require a data team (Metabase, Superset) or are rigid PDF generators that need code changes every time a report format changes. Non-technical team members wanted to build their own weekly reports without filing a ticket.",
    what:
      "A full-stack app where users drag-and-drop chart widgets onto a canvas, connect them to SQL queries or CSV uploads, set a schedule (daily / weekly / monthly), and get a beautifully formatted PDF delivered to their inbox. The PDF is rendered via Puppeteer with a custom Tailwind template. Auth is magic-link based. Built-in template gallery for common report types (sales funnel, retention, usage spikes).",
    techDecisions:
      "Puppeteer over jsPDF or react-pdf — we needed pixel-perfect rendering of charts (Chart.js widgets) and tables spanning multiple pages with repeating headers. Puppeteer screenshots of a hidden iframe gave us exactly that, at the cost of a heavier worker container. Scheduled delivery uses `node-cron` in a lightweight worker process separated from the API to avoid blocking requests. Went with Resend for email delivery instead of SES — the DX is better and for <10K emails/month the cost is negligible. PostgreSQL with `jsonb` stores the widget configurations; no need for a separate document store when the query results are ephemeral.",
    results:
      "Used by 3 internal teams at a local startup for ~6 months. Generated ~400 reports, ~85% scheduled, rest ad-hoc. Average report takes 45s from schedule trigger to inbox. The drag-and-drop canvas reduced report creation time from ~4 hours (coding a script) to ~15 minutes.",
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
