
import { Ticket, Clock3, X, ArrowRight } from "lucide-react";

export default function TokenSection({
  tokens = [],
  onCancel,
}) {
  return (
    <section className="tokens-section">
      <div className="section-heading">
        <div>
          <h2>My Tokens</h2>
          <p>Manage the queues you have joined.</p>
        </div>

        <span className="results-count">
          {tokens.length} active
        </span>
      </div>

      {tokens.length === 0 ? (
        <div className="empty-state">
          <Ticket size={35} />
          <h3>No active tokens</h3>
          <p>
            Join a campus service queue and your token
            will appear here.
          </p>
        </div>
      ) : (
        <div className="token-list">
          {tokens.map((token) => (
            <article className="token-row" key={token.id}>
              <div className="token-ticket-icon">
                <Ticket size={22} />
              </div>

              <div className="token-main-info">
                <strong>{token.serviceName}</strong>
                <span>Token: {token.id}</span>
              </div>

              <div className="token-wait">
                <small>
                  <Clock3 size={13} />
                  Estimated wait
                </small>
                <strong>~ {token.wait} min</strong>
              </div>

              <button
                type="button"
                className="cancel-token-button"
                onClick={() => onCancel?.(token.id)}
              >
                <X size={15} />
                Cancel
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
