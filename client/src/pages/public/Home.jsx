import { useEffect, useState } from "react";
import { fetchIssues } from "../../api/issues";
import IssueCard from "../../components/issues/IssueCard";
import Hero from "../../components/dashboard/Hero";
import HowItWorks from "../../components/dashboard/HowItWorks";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues()
      .then(({ data }) => setIssues(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <Hero />
      <HowItWorks />
      <section id="recent-issues" className="recent-issues">
        <div className="recent-issues__container">
          <h2 className="recent-issues__title">Recently Reported</h2>
          {loading ? (
            <p className="recent-issues__loading">Loading issues…</p>
          ) : (
            <div className="issue-grid">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
