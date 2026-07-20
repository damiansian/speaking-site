import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

/* TODO: real content: replace topic abstracts with your own framing. */
const TOPICS = [
  {
    title: "WCAG 2.2 in practice",
    body: "What actually changed at AA, and how teams turn the success criteria into review checklists, component requirements, and testable acceptance criteria.",
  },
  {
    title: "ADA Title II readiness",
    body: "What the April 2026 compliance deadline means for public universities and the vendors that serve them, and how to prioritize remediation with limited time.",
  },
  {
    title: "Building an accessibility program",
    body: "Moving beyond one-off audits to a repeatable program: policy, tooling, review gates, and the tiered champion model that scales capability across teams.",
  },
  {
    title: "Accessibility in higher education",
    body: "Where automated LMS tools help, where they mislead, and how instructors can interpret results and remediate course content with confidence.",
  },
];

/* TODO: real content: replace with your actual talks, dates, and venues. */
const ENGAGEMENTS = [
  {
    date: "2026",
    title: "Scaling accessibility across product teams",
    venue: "Adobe Product Equity, Champion Program cohort",
  },
  {
    date: "2026",
    title: "Interpreting automated accessibility results",
    venue: "Rutgers University, accessibility curriculum",
  },
  {
    date: "2025",
    title: "ADA Title II and the road to compliance",
    venue: "Higher education accessibility workshop",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="overview" className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <h1>Accessibility that teams can actually ship</h1>
              <p className={styles.lede}>
                I am Damian Sian. I speak and teach on digital accessibility,
                helping organizations turn standards into practice, from WCAG 2.2
                to ADA Title II readiness and accessibility programs that scale.
              </p>
              <p>
                <a className={styles.cta} href="#contact">
                  Book me for your event
                </a>
              </p>
            </div>
            <Image
              className={styles.headshot}
              src="/Damian-Headshot_Sized.jpg"
              width={600}
              height={597}
              alt="Damian Sian"
              priority
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.alt}>
        <div className="container">
          <h2>About</h2>
          {/* TODO: real content: tighten this bio and confirm your exact title. */}
          <p>
            I work in accessibility at Adobe on the Product Equity team, where the
            work spans digital accessibility policy, enablement, and a tiered
            champion program that builds accessibility capability across product
            teams. I also teach accessibility at Rutgers University, where students
            learn to apply WCAG 2.2 and reason about real evaluation results
            rather than trust a tool blindly.
          </p>
          <p>
            My talks are practical and standards-grounded. Audiences leave with
            specific next steps, not just an argument for why accessibility
            matters.
          </p>
        </div>
      </section>

      {/* Speaking topics */}
      <section id="topics">
        <div className="container">
          <h2>Speaking topics</h2>
          <ul className={styles.cardGrid} role="list">
            {TOPICS.map((topic) => (
              <li key={topic.title} className={styles.card}>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Past engagements */}
      <section id="engagements" className={styles.alt}>
        <div className="container">
          <h2>Past engagements</h2>
          <ul className={styles.timeline} role="list">
            {ENGAGEMENTS.map((item) => (
              <li key={item.title} className={styles.timelineItem}>
                <span className={styles.date}>{item.date}</span>
                <div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.venue}>{item.venue}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <h2>Contact and booking</h2>
          <p>
            Tell me about your event and I will get back to you by email. You can
            also reach me directly at{" "}
            {/* TODO: real content: replace with your real email. */}
            <a href="mailto:hello@example.com">hello@example.com</a> or connect on{" "}
            {/* TODO: real content: replace with your real LinkedIn URL. */}
            <a
              href="https://www.linkedin.com/"
              rel="me noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            .
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
