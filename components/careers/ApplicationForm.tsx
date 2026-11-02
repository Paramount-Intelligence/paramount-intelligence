"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import Icon from "@/components/site/Icon";
import { initSiteBehaviours } from "@/lib/site-behaviours";

const AREAS = [
  "Forward-deployed AI engineering",
  "Software engineering",
  "Data and analytics",
  "Cloud and platform engineering",
  "Quality and evaluation",
  "Product and consulting",
  "Other",
];

const MAX_MB = 4;

/**
 * The application form on the job pages, in the reference's layout. Validation and sending are the site's careers
 * form pipeline (lib/site-behaviours.ts: form[data-form="careers"], the same field IDs and messages, POST to
 * /api/send-application-email); `data-role` puts the role at the top of the cover letter.
 */
export default function ApplicationForm({ role, area = "" }: { role: string; area?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [fname, setFname] = useState("");

  // The site's form behaviours, on this form only (the page's tabs are React).
  useEffect(() => (box.current ? initSiteBehaviours(box.current) : undefined), []);

  const showFile = () => {
    const f = file.current?.files?.[0];
    setFname(!f || f.size > MAX_MB * 1024 * 1024 ? "" : `Selected: ${f.name}`);
  };
  const drag = (on: boolean) => (e: DragEvent) => {
    e.preventDefault();
    setOver(on);
  };
  const drop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const input = file.current;
    if (!input || !e.dataTransfer?.files.length) return;
    try {
      input.files = e.dataTransfer.files;
    } catch {}
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <div ref={box}>
      <form className="j-form" data-form="careers" data-role={role} noValidate onReset={() => setFname("")}>
        <div className="j-applying">
          <span>Applying for</span>
          <b>{role}</b>
        </div>
        <div className="field j-f">
          <label htmlFor="c-name">Full Name<span className="req">*</span></label>
          <input id="c-name" name="c-name" type="text" autoComplete="name" placeholder="Type here…" data-err="Full name is required." />
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <label htmlFor="c-email">Email<span className="req">*</span></label>
          <input id="c-email" name="c-email" type="email" autoComplete="email" placeholder="hello@example.com" data-err="Enter a valid email address." />
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <label htmlFor="c-loc">Location and time zone<span className="req">*</span></label>
          <input id="c-loc" name="c-loc" type="text" placeholder="Type here…" data-err="Location and time zone are required." />
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <label htmlFor="c-area">Area of expertise<span className="req">*</span></label>
          <select id="c-area" name="c-area" defaultValue={area} data-err="Select an area of expertise.">
            <option value="">Start typing or select…</option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <span className="j-lab">Resume</span>
          <label className={over ? "j-drop over" : "j-drop"} htmlFor="c-cv" onDragEnter={drag(true)} onDragOver={drag(true)} onDragLeave={drag(false)} onDrop={drop}>
            <span className="j-up">
              <Icon name="file" /> Upload File
            </span>
            <span>or drag and drop here</span>
            <input
              ref={file}
              id="c-cv"
              type="file"
              accept=".pdf,.docx"
              data-max-mb={MAX_MB}
              data-err="This file is larger than 4 MB. Please choose a smaller PDF or DOCX file."
              aria-describedby="c-cv-err"
              onChange={showFile}
            />
          </label>
          <span className="j-hint">PDF or DOCX, up to 4 MB. Please exclude confidential client information.</span>
          <span className="j-fname" aria-live="polite">{fname}</span>
          <span className="err" id="c-cv-err" aria-live="polite" hidden />
        </div>
        <div className="field j-f">
          <label htmlFor="c-url">LinkedIn or portfolio URL</label>
          <input id="c-url" name="c-url" type="url" placeholder="Type here…" />
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <label htmlFor="c-work">Brief description of relevant work<span className="req">*</span></label>
          <textarea id="c-work" name="c-work" placeholder="Type here…" data-err="Describe your relevant work." />
          <span className="err" aria-live="polite" />
        </div>
        <div className="field j-f">
          <label className="j-check">
            <input type="checkbox" id="c-ok" data-err="Please confirm to continue." />
            <span>I agree to be contacted about relevant opportunities.</span>
          </label>
          <span className="err" aria-live="polite" />
        </div>
        <button className="btn btn-cyan j-submit" type="submit">
          Submit Application{" "}
          <span className="arr">
            <Icon name="arrow" />
          </span>
        </button>
        <p className="send-err" role="alert" hidden>The submission could not be sent. Please try again. Your profile has not been received.</p>
      </form>
      <div className="form-ok j-ok" tabIndex={-1} hidden>
        <span className="j-tick">
          <Icon name="check" />
        </span>
        <h3>Profile received</h3>
        <p>The team will review the submission and follow up if a relevant opportunity becomes available.</p>
        <button className="btn btn-line" type="button" data-reset>
          Submit another profile
        </button>
      </div>
    </div>
  );
}
