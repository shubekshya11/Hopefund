import { useEffect, useState } from "react";
import { fetchIssues } from "../../api/issues";
import IssueCard from "../../components/issues/IssueCard";
import Hero from "../../components/layout/Hero";
import HowItWorks from "../../components/layout/HowItWorks";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the public issue feed once, on mount.
  useEffect(() => {
    fetchIssues()
      .then(({ data }) => setIssues(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <Hero />
      <HowItWorks />

      <section className="recent-issues">
        <h2>Recently reported</h2>

        {loading && <p>Loading issues…</p>}
        {!loading && issues.length === 0 && <p>No issues reported yet — be the first.</p>}

        <div className="issue-grid">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>
    </div>
  );
}