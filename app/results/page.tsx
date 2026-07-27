"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ResultItem {
  id: number;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [animatedOffset, setAnimatedOffset] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("kwyk_results");
    if (stored) {
      const parsed: ResultItem[] = JSON.parse(stored);
      const keyWords = [
        "mitosis",
        "meiosis",
        "photosynthesis",
        "newton",
        "mitochondria",
        "kinetic",
      ];
      const graded = parsed.map((item) => {
        const answerLower = item.userAnswer.toLowerCase();
        const isCorrect =
          item.userAnswer.length > 10 &&
          keyWords.some((word) => answerLower.includes(word));
        return { ...item, isCorrect };
      });
      setResults(graded);
    } else {
      router.push("/");
    }
  }, [router]);

  const correctCount = results ? results.filter((r) => r.isCorrect).length : 0;
  const total = results ? results.length : 0;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const correctItems = results ? results.filter((r) => r.isCorrect) : [];
  const incorrectItems = results ? results.filter((r) => !r.isCorrect) : [];
  const allCorrect = incorrectItems.length === 0 && total > 0;

  const circumference = 2 * Math.PI * 70;
  const targetOffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (results) {
      setAnimatedOffset(circumference);
      const timer = setTimeout(() => setAnimatedOffset(targetOffset), 50);
      return () => clearTimeout(timer);
    }
  }, [results, targetOffset]);

  const handleStartFresh = () => {
    sessionStorage.removeItem("kwyk_results");
    router.push("/");
  };

  if (!results) {
    return (
      <main className="container" style={{ textAlign: "center", paddingTop: 120 }}>
        <div className="spinner" style={{ margin: "0 auto 16px" }} />
        <p style={{ color: "var(--text-variant)" }}>Loading your results...</p>
      </main>
    );
  }

  return (
    <>
      <header className="product-header">
        <h1>KnowWhatYouKnow</h1>
      </header>

      <main className="container">
        <div className="card" style={{ textAlign: "center", marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-variant)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
            Your Overall Score
          </p>

          <div className="score-ring">
            <svg viewBox="0 0 160 160">
              <circle className="bg" cx="80" cy="80" r="70" />
              <circle
                className="fill"
                cx="80" cy="80" r="70"
                strokeDasharray={circumference}
                strokeDashoffset={animatedOffset ?? targetOffset}
              />
            </svg>
            <div className="score-text">
              <span className="percent">{percentage}%</span>
              <span className="label">{correctCount}/{total} correct</span>
            </div>
          </div>

          <p style={{ color: "var(--text-variant)", fontSize: 15, lineHeight: 1.5 }}>
            {percentage >= 80
              ? allCorrect
                ? "Perfect score. You know this material inside out."
                : "Strong work. You know this material well."
              : percentage >= 50
              ? "You're getting there. Review the gaps below."
              : "Focus on the topics below — that's where the real learning happens."}
          </p>
        </div>

        {correctItems.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--primary)" }}>✓</span>
              What you know
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {correctItems.map((item) => (
                <div key={item.id} className="feedback-item correct">
                  <div className="icon" style={{ color: "var(--primary)" }}>✓</div>
                  <div>
                    <p className="q">{item.question}</p>
                    <p className="a">{item.userAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {incorrectItems.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--secondary)" }}>!</span>
              What to review
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {incorrectItems.map((item) => (
                <div key={item.id} className="feedback-item incorrect">
                  <div className="icon" style={{ color: "var(--secondary)" }}>!</div>
                  <div>
                    <p className="q">{item.question}</p>
                    <p className="a">
                      <strong style={{ color: "var(--text)" }}>Correct answer:</strong>{" "}
                      {item.correctAnswer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {allCorrect ? (
          <button className="btn btn-primary" onClick={handleStartFresh} style={{ marginBottom: 12 }}>
            Start a new quiz
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => router.push("/quiz")} style={{ marginBottom: 12 }}>
            🔄 Retry What You Missed
          </button>
        )}

        <div style={{ textAlign: "center" }}>
          <button className="link" onClick={handleStartFresh}>
            📝 Start fresh with new notes
          </button>
        </div>
      </main>
    </>
  );
}
