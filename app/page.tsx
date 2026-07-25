export default function Home() {
  return (
    <main className="container">
      <p className="badge">Week 1 of 12 · Building in public</p>

      <h1>
        I&rsquo;m 16. I&rsquo;m building AI tools for students —{" "}
        <span className="accent">in public.</span>
      </h1>

      <p className="sub">
        No stealth mode. No excuses. One real product, shipped by{" "}
        <strong>September 5, 2026</strong>, documented the whole way. I&rsquo;m
        a student, so I build for students — the problems I live with are the
        ones I solve.
      </p>

      <section className="card">
        <h2>Build log</h2>
        <ul>
          <li>
            <span className="week">Week 1</span>
            Infrastructure + going public. This site is ship #1. Right now
            I&rsquo;m collecting the 10 most annoying problems from real
            student life — one of them becomes product #1.
          </li>
        </ul>
      </section>

      <section className="card">
        <h2>The rules I play by</h2>
        <ul>
          <li>Ship first. Ideas only die after a real, promoted launch.</li>
          <li>Free for students, always useful, no fluff.</li>
          <li>Honest numbers, honest struggles, posted weekly.</li>
        </ul>
      </section>

      <p className="follow">
        Follow the journey on X → <span className="handle">@yourhandle</span>
      </p>
    </main>
  );
}
