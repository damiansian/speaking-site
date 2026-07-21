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

type Engagement = {
  date: string;
  title: string;
  venue: string;
  url?: string; // recording, slides, or event page
};

const ENGAGEMENTS: Engagement[] = [
  {
    date: "2026",
    title: "Getting to Zero: Fixing Your Blackboard Ally Errors",
    venue: "RUOnlineCon 2026, Rutgers University",
  },
  {
    date: "2024",
    title: "Creating accessibility annotations in design compositions",
    venue: "Axe-con",
    url: "https://www.deque.com/axe-con/speakers/damian-sian/",
  },
  {
    date: "2022",
    title: "Leveraging metadata in accessible image workflows",
    venue: "IPTC Photo Metadata Conference",
    url: "https://iptc.org/download/events/phmdc2022/Adobe_Accessibility_Update.pdf",
  },
  {
    date: "2019",
    title:
      "Building accessibility education programs centered on the IAAP certification process",
    venue: "M-Enabling Summit",
  },
  {
    date: "2018",
    title:
      "Building accessibility education programs centered on the IAAP certification process",
    venue: "CSUN Assistive Technology Conference",
  },
  {
    date: "2018",
    title:
      "Building a PDF accessibility practice in corporate marketing workflows",
    venue: "PDF Day at the National Archives",
    url: "https://www.pdfa.org/event/pdf-day-washington-dc/",
  },
  {
    date: "2017",
    title: "Building a PDF accessibility practice in higher education",
    venue: "AHEAD",
    url: "https://www.ahead-archive.org/conf/2017%20Conference/Handouts/4.1/PDF%20a11y%20Deck%20AHEAD.pdf",
  },
  {
    date: "2017",
    title:
      "Building accessibility education programs centered on the IAAP certification process",
    venue: "United Nations Convention on the Rights of Persons with Disabilities",
    url: "https://www.un.org/development/desa/disabilities/conference-of-states-parties-to-the-convention-on-the-rights-of-persons-with-disabilities-2/list-of-side-events.html",
  },
  {
    date: "2016",
    title:
      "Building a PDF accessibility practice in corporate marketing workflows",
    venue: "A11YNYC",
    url: "https://www.youtube.com/watch?v=QpbTYGBV7Lo",
  },
];

/* Format hint shown in an engagement link's text (and its accessible name). */
function linkKind(url: string): "PDF" | "video" | null {
  if (/\.pdf($|[?#])/i.test(url)) return "PDF";
  if (/youtube\.com|youtu\.be/i.test(url)) return "video";
  return null;
}

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
          <h2>Speaking engagements</h2>
          <ul className={styles.timeline} role="list">
            {ENGAGEMENTS.map((item) => {
              const kind = item.url ? linkKind(item.url) : null;
              return (
                <li
                  key={`${item.date}-${item.venue}`}
                  className={styles.timelineItem}
                >
                  <span className={styles.date}>{item.date}</span>
                  <div>
                    <h3 className={styles.timelineTitle}>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                          {kind && (
                            <span className={styles.linkMeta}> ({kind})</span>
                          )}
                          <span aria-hidden="true" className={styles.linkMeta}>
                            {" ↗"}
                          </span>
                          <span className="visually-hidden">
                            {" "}
                            (opens in new tab)
                          </span>
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className={styles.venue}>{item.venue}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <h2>Contact and booking</h2>
          <p>
            Tell me about your event using the form below, or connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/damiansian/"
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
