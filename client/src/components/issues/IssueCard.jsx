export default function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      {issue.photos?.[0] && (
        <img src={issue.photos[0]} alt={issue.title} className="issue-card__photo" />
      )}
      <div className="issue-card__body">
        <h3>{issue.title}</h3>
        <span className="issue-card__category">{issue.category}</span>
        <p>{issue.locationText}</p>
        <span className={`issue-card__status issue-card__status--${issue.status}`}>
          {issue.status.replace(/_/g, " ")}
        </span>
        {issue.campaign && (
          <div className="issue-card__campaign">
            Raised {issue.campaign.currentAmount} / {issue.campaign.goalAmount}
          </div>
        )}
      </div>
    </div>
  );
}
