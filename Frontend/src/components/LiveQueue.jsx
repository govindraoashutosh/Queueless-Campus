
import {
  Coffee,
  ArrowRight,
  CircleDot,
} from "lucide-react";

export default function LiveQueue({
  service,
  onViewQueue,
}) {
  if (!service) return null;

  const currentToken = `${service.tokenPrefix}-012`;
  const estimatedWait = Math.max(service.estimatedWait - 9, 3);

  return (
    <section className="live-queue">
      <div className="live-heading">
        <span className="live-status">
          <CircleDot size={13} fill="currentColor" />
          LIVE NOW
        </span>

        <span className="live-sparkle">
          <Coffee size={23} />
        </span>
      </div>

      <h2>{service.name}</h2>

      <div className="queue-details">
        <div className="queue-token-info">
          <small>Current token</small>
          <strong>{currentToken}</strong>
          <p>Now Serving</p>
        </div>

        <img
          className="live-canteen-image"
          src={service.image}
          alt={`${service.name} service area`}
        />

        <div className="counter-box">
          <span>Counter</span>
          <strong>02</strong>
          <small>~ {estimatedWait} min</small>
          <small>estimated wait</small>
        </div>
      </div>

      <div
        className="queue-progress"
        role="progressbar"
        aria-label="Queue progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={42}
      >
        <span />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="queue-footer">
        <span>Queue is moving smoothly</span>

        <button
          type="button"
          className="live-queue-button"
          onClick={onViewQueue}
        >
          View Live Queue
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
