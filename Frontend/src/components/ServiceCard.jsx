
import {
  Coffee,
  Printer,
  GraduationCap,
  HeartPulse,
  ArrowRight,
  Users,
} from "lucide-react";

const serviceIcons = {
  canteen: Coffee,
  printout: Printer,
  "student-services": GraduationCap,
  "health-center": HeartPulse,
};

export default function ServiceCard({
  service,
  tokens = [],
  onJoinQueue,
}) {
  const Icon = serviceIcons[service.id] || Coffee;

  const alreadyJoined = tokens.some(
    (token) => token.serviceId === service.id
  );

  return (
    <article className={`service-card ${service.color}`}>
      <div className="service-card-top">
        <img
          className="service-photo"
          src={service.image}
          alt={`${service.name} on campus`}
          loading="lazy"
        />

        <div className={`service-icon ${service.color}`}>
          <Icon size={22} />
        </div>
      </div>

      <h3>{service.name}</h3>

      <p className="service-waiting">
        <Users size={14} />
        <span>{service.waiting} people waiting</span>
      </p>

      <div className="service-card-footer">
        <strong>~ {service.estimatedWait} min</strong>

        <button
          type="button"
          onClick={() => onJoinQueue?.(service)}
          disabled={alreadyJoined}
        >
          {alreadyJoined ? "Joined" : "Join Queue"}
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
