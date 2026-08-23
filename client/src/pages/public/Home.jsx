import { useEffect, useState } from "react";
import { fetchIssues } from "../../api/issues";
import IssueCard from "../../components/issues/IssueCard";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues()
      .then(({ data }) => setIssues(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading issues…</p>;

  return (
    <div className="home">
      <h1>Reported issues</h1>
      <div className="issue-grid">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
