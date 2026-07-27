"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const DUMMY_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between mitosis and meiosis in terms of chromosome number in daughter cells?",
    correctAnswer: "Mitosis produces two diploid daughter cells with the same number of chromosomes as the parent cell. Meiosis produces four haploid daughter cells with half the chromosome number.",
  },
  {
    id: 2,
    question: "What is the chemical equation for photosynthesis?",
    correctAnswer: "6CO2 + 6H2O -> C6H12O6 + 6O2 (carbon dioxide + water -> glucose + oxygen in the presence of sunlight).",
  },
  {
    id: 3,
    question: "State Newton's First Law of Motion.",
    correctAnswer: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an external force.",
  },
  {
    id: 4,
    question: "What is the function of mitochondria in a cell?",
    correctAnswer: "Mitochondria produce ATP, the cell's main energy currency, through cellular respiration. They are often called the powerhouse of the cell.",
  },
  {
    id: 5,
    question: "What is the formula for kinetic energy?",
    correctAnswer: "KE = 1/2 mv^2, where m is mass and v is velocity.",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = DUMMY_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / DUMMY_QUESTIONS.length) * 100;

  useEffect(() => {
    setAnswer(answers[currentQuestion.id] || "");
    inputRef.current?.focus();
  }, [currentIndex, currentQuestion.id, answers]);

  const goNext = (currentAnswer: string) => {
    setSubmitting(true);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: currentAnswer.trim() }));

    setTimeout(() => {
      setSubmitting(false);
      if (currentIndex < DUMMY_QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        const results = DUMMY_QUESTIONS.map((q) => ({
          ...q,
          userAnswer: answers[q.id] || (q.id === currentQuestion.id ? currentAnswer.trim() : ""),
          isCorrect: false,
        }));
        sessionStorage.setItem("kwyk_results", JSON.stringify(results));
        router.push("/results");
      }
    }, 600);
  };

  const handleSubmit = () => {
    if (!answer.trim() || submitting) return;
    goNext(answer);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSkip = () => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: "" }));
    if (currentIndex < DUMMY_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const results = DUMMY_QUESTIONS.map((q) => ({
        ...q,
        userAnswer: answers[q.id] || "",
        isCorrect: false,
      }));
      sessionStorage.setItem("kwyk_results", JSON.stringify(results));
      router.push("/results");
    }
  };

  return (
    <>
      <header className="product-header">
        <h1>KnowWhatYouKnow</h1>
      </header>

      <main className="container">
        <div style={{ marginTop: 8, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-variant)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Question {currentIndex + 1} of {DUMMY_QUESTIONS.length}
            </span>
            <span style={{ fontSize: 13, color: "var(--primary)" }}>
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(142, 213, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 20 }}>
            🧠
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: "var(--text)" }}>
            {currentQuestion.question}
          </h2>
        </div>

        <div style={{ marginBottom: 24 }}>
          <textarea
            ref={inputRef}
            className="input"
            rows={6}
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ marginBottom: 16, minHeight: 140 }}
          />

          <button className="btn btn-primary" disabled={!answer.trim() || submitting} onClick={handleSubmit}>
            {submitting ? (
              <>
                <span className="spinner" />
                Checking...
              </>
            ) : (
              <>
                Submit Answer
                <span>→</span>
              </>
            )}
          </button>
        </div>

        {currentIndex < DUMMY_QUESTIONS.length - 1 && (
          <div style={{ textAlign: "center" }}>
            <button className="link" onClick={handleSkip}>
              Skip this question →
            </button>
          </div>
        )}
      </main>
    </>
  );
}
