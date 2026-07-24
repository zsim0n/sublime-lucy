import { useEffect, useState } from "react";
import nameGenerator from "@stackbit/artisanal-names";

const meta = {
  title: "Sublime-lucy",
  description: "This is a working title generator for your next project",
  date: "2020",
  repo: "https://github.com/zsim0n/sublime-lucy",
};

const randomImage = () => `https://picsum.photos/640/360?${crypto.randomUUID()}`;

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const CopyIcon = () => (
  <svg {...icon} width="14" height="14">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const RefreshIcon = () => (
  <svg {...icon} width="16" height="16">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.834 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
);

export default function App() {
  const [name, setName] = useState(() => nameGenerator.generate());
  const [imageSrc, setImageSrc] = useState(randomImage);
  const [copiedAt, setCopiedAt] = useState(0);

  // Re-runs on every copy because the timestamp changes, so rapid copies
  // restart the countdown instead of letting the first one close the toast.
  useEffect(() => {
    if (!copiedAt) return;
    const timer = setTimeout(() => setCopiedAt(0), 1600);
    return () => clearTimeout(timer);
  }, [copiedAt]);

  const regenerate = () => {
    setName(nameGenerator.generate());
    setImageSrc(randomImage());
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedAt(Date.now());
    } catch {
      // Clipboard is unavailable on insecure origins or if the user denied
      // permission. The name stays on screen to be selected by hand.
    }
  };

  return (
    <main className="card">
      <div className="pure-g">
        <div className="pure-u-1 pure-u-md-3-5">
          <div className="card-body">
            <h1 className="card-title">{meta.title}</h1>
            <p className="card-meta">
              {meta.description} &middot; {meta.date} &middot;{" "}
              <a href={meta.repo} className="repo-link">
                <GitHubIcon /> GitHub repo
              </a>
            </p>

            <p className="name-row">
              <span className="name">{name}</span>
              <button
                type="button"
                className="icon-button"
                onClick={copy}
                aria-label={`Copy ${name} to clipboard`}
              >
                <CopyIcon />
              </button>
            </p>

            <button
              type="button"
              className="pure-button pure-button-primary"
              onClick={regenerate}
            >
              <RefreshIcon /> Click!
            </button>
          </div>
        </div>

        <div className="pure-u-1 pure-u-md-2-5 card-media">
          {/* Decorative random photo - no alt text to announce. */}
          <img src={imageSrc} alt="" />
        </div>
      </div>

      <div className="toast" role="status" aria-live="polite">
        {copiedAt ? <span className="toast-body">Copied to clipboard!</span> : null}
      </div>
    </main>
  );
}
