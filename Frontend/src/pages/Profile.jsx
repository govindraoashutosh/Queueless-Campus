
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("queuelessUser") || "null"
  );

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>My Profile</h1>
        <p>Your QueueLess Campus account information.</p>

        <p><strong>Name:</strong> {user?.name || "Ashutosh"}</p>
        <p><strong>Email:</strong> {user?.email || "Not registered"}</p>
        <p><strong>Account:</strong> Student</p>

        <button
          type="button"
          className="primary-button"
          onClick={handleLogout}
        >
          Log Out
        </button>

        <p><Link to="/">Back to Dashboard</Link></p>
      </section>
    </main>
  );
}
