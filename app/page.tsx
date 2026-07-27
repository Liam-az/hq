"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_NOTES = `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.

The chemical equation is: 6CO2 + 6H2O → C6H12O6 + 6O2

Mitosis produces two identical diploid daughter cells. Meiosis produces four genetically different haploid cells.`;

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const canSubmit = wordCount > 0 && wordCount <= 2000;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/quiz");
    }, 1200);
  };

  const handleSample = () => {
    setNotes(SAMPLE_NOTES);
  };

  return (
    <>
      <header className="product-header">
        <h1>KnowWhatYouKnow</h1>
      </header>

      <main className="container">
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Generate a quiz
          </h2>
          <p style={{ color: "var(--text-variant)", fontSize: 16 }}>
            Paste your notes and get instant questions that show what you
            actually remember.
          </p>
        </div>

        <div
          className="card"
          style={{
            padding: 0,
            overflow: "hidden",
            marginBottom: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "var(--surface-high)",
              borderBottom: "1px solid var(--outline)",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--text-variant)" }}>
              Your notes
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: wordCount > 2000 ? "var(--secondary)" : "var(--text-variant)",
                background: "var(--surface-highest)",
                padding: "4px 10px",
                borderRadius: 999,
              }}
            >
              {wordCount} / 2000 words
            </span>
          </div>

          <div style={{ padding: 16 }}>
            <textarea
              className="textarea"
              rows={12}
              placeholder="Paste your notes here (or type them)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ minHeight: 240 }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          disabled={!canSubmit || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Generating quiz...
            </>
          ) : (
            <>
              Quiz Me
              <span>→</span>
            </>
          )}
        </button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          {notes.trim() === "" ? (
            <button
              className="link"
              onClick={handleSample}
              style={{ fontSize: 13 }}
            >
              Try with sample notes →
            </button>
          ) : (
            <p className="micro-copy" style={{ opacity: 0.7 }}>
              Nothing is saved anywhere. Your notes stay on your device.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

