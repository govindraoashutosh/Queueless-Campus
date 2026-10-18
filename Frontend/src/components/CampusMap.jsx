
import { ArrowRight } from "lucide-react";
import campusMapImage from "../assets/campus-map.png";

export default function CampusMap({
  services = [],
  onExplore,
  expanded = false,
}) {
  return (
    <section
      className={`campus-feature ${
        expanded ? "campus-feature-expanded" : ""
      }`}
    >
      <img
        className="campus-map-image"
        src={campusMapImage}
        alt="Illustrated map of the campus"
      />

      <div className="campus-feature-overlay" />

      <div className="feature-copy">
        <span className="eyebrow">YOUR CAMPUS, SIMPLIFIED</span>

        <h2>
          Explore
          <br />
          Campus Services
        </h2>

        <p>
          Find nearby services, check live queues and navigate
          easily across campus.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={onExplore}
        >
          {expanded ? "View All Services" : "View Campus Map"}
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
