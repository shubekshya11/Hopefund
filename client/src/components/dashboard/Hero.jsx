import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Empowering<br />
            Citizens to Build<br />
            <span className="hero__title--green">Better</span><br />
            <span className="hero__title--teal">Communities</span>
          </h1>
          <p className="hero__subtitle">
            Report civic issues instantly and track their resolution in real-time. Join thousands of citizens making a difference.
          </p>
          <div className="hero__actions">
            <Link to="/report" className="hero__btn hero__btn--primary">
              Report an Issue
            </Link>
            <Link to="/map" className="hero__btn hero__btn--secondary">
              View Map
            </Link>
          </div>
        </div>
        <div className="hero__image-wrapper">
  <img
    src="/NEPAL.jpg"
    alt="street in Nepal"
    className="hero__image"
  />
</div>
      </div>
    </section>
  );
}
