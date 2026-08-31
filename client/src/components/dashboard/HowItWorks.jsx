export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Report an Issue",
      description: "Citizens report local problems like potholes, broken streetlights, or damaged infrastructure with photos and location details."
    },
    {
      number: 2,
      title: "Government Review",
      description: "Local authorities review reported issues, verify the problem, and estimate the cost for repairs or improvements."
    },
    {
      number: 3,
      title: "Community Funding",
      description: "Community members can contribute to fund the solution through crowdfunding campaigns, ensuring transparency and engagement."
    },
    {
      number: 4,
      title: "Implementation",
      description: "Once funded, the government proceeds with the repair work, keeping citizens updated on progress and completion."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <h2 className="how-it-works__title">How It Works</h2>
        <div className="how-it-works__steps">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works__step">
              <div className="how-it-works__step-number">{step.number}</div>
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}