"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { createWaitlistEntry } from "@/lib/care-repository";

export function WeightLossWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "",
    ageRange: "",
    primaryInterest: "",
    knownConditions: "",
    consent: false,
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createWaitlistEntry(form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card card--hero">
        <p className="eyebrow">Waitlist joined</p>
        <h1>We’ll notify you when doctor-led metabolic care is available in your city.</h1>
        <p>No treatment, prescription, medicine access, or outcome is guaranteed from the waitlist.</p>
        <div className="button-row">
          <Link href="/account" className="button button--primary">
            View account
          </Link>
          <Link href="/weight-loss" className="button button--secondary">
            Back to Weight Loss
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="card card--form" onSubmit={submit}>
      <div className="form-grid">
        <label className="field">
          <span>Name</span>
          <input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <label className="field">
          <span>Phone or email</span>
          <input required value={form.contact} onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))} />
        </label>
        <label className="field">
          <span>City</span>
          <input required value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
        </label>
        <label className="field">
          <span>Age range</span>
          <select required value={form.ageRange} onChange={(event) => setForm((current) => ({ ...current, ageRange: event.target.value }))}>
            <option value="">Select</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-plus">55+</option>
          </select>
        </label>
        <label className="field">
          <span>Primary interest</span>
          <select required value={form.primaryInterest} onChange={(event) => setForm((current) => ({ ...current, primaryInterest: event.target.value }))}>
            <option value="">Select</option>
            <option value="weight-loss">Weight loss</option>
            <option value="diabetes-risk">Diabetes risk</option>
            <option value="metabolic-health">Metabolic health</option>
          </select>
        </label>
        <label className="field">
          <span>Known conditions</span>
          <input value={form.knownConditions} onChange={(event) => setForm((current) => ({ ...current, knownConditions: event.target.value }))} placeholder="Optional" />
        </label>
        <label className="check-row field--full">
          <input required type="checkbox" checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))} />
          <span>I consent to being contacted about this waitlist. I understand this is not care, diagnosis, prescribing, or emergency support.</span>
        </label>
      </div>

      <div className="checkout-actions">
        <button type="submit" className="button button--primary">
          Join waitlist
        </button>
        <p className="subtle">Stored locally for this demo until the waitlist backend is connected.</p>
      </div>
    </form>
  );
}
