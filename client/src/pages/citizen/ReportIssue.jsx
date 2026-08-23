import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportIssue } from "../../api/issues";

const CATEGORIES = ["pothole", "streetlight", "sewage", "water_supply", "waste_management", "other"];

export default function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "pothole",
    locationText: "",
    photos: [], // TODO: wire up actual image upload (Cloudinary/S3) before go-live
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await reportIssue(form);
      navigate(`/issues/${data.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="report-issue" onSubmit={handleSubmit}>
      <h1>Report an issue</h1>

      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
          ))}
        </select>
      </label>

      <label>
        Location
        <input name="locationText" value={form.locationText} onChange={handleChange} required />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit report"}
      </button>
    </form>
  );
}
