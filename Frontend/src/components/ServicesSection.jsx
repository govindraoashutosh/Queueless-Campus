
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({
  services = [],
  tokens = [],
  onJoinQueue,
  onViewAll,
  showAll = false,
}) {
  return (
    <section className="services-section">
      <div className="section-heading">
        <div>
          <h2>
            {showAll ? "All Campus Services" : "Campus Services"}
          </h2>

          <p>
            {showAll
              ? "Find a service and join its virtual queue."
              : "Choose a service to join the queue."}
          </p>
        </div>

        {!showAll && onViewAll && (
          <button
            type="button"
            className="view-all"
            onClick={onViewAll}
          >
            View All Services
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {services.length > 0 ? (
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              tokens={tokens}
              onJoinQueue={onJoinQueue}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={32} />
          <h3>No services found</h3>
          <p>Try searching with a different service name.</p>
        </div>
      )}
    </section>
  );
}
