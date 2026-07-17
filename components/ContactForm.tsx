"use client";

import { useRef, useState } from "react";
import styles from "./ContactForm.module.css";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!message) next.message = "Enter a short message about your event.";
    return next;
  }

  function focusFirstError(nextErrors: Errors) {
    const order: (keyof Errors)[] = ["name", "email", "message"];
    const firstKey = order.find((k) => nextErrors[k]);
    if (firstKey) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      focusFirstError(nextErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={styles.error}>
            <span aria-hidden="true">&#9888; </span>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={styles.error}>
            <span aria-hidden="true">&#9888; </span>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">About your event</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={styles.error}>
            <span aria-hidden="true">&#9888; </span>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {/* Live region announces submission outcome to assistive tech. */}
      <div className={styles.status} role="status" aria-live="polite">
        {status === "success" &&
          "Thanks. Your message has been sent and I will reply by email."}
        {status === "error" &&
          "Something went wrong sending your message. Please email me directly instead."}
      </div>
    </form>
  );
}
