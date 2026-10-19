
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatsCards from "./components/StatsCards";
import CampusMap from "./components/CampusMap";
import LiveQueue from "./components/LiveQueue";
import ServicesSection from "./components/ServicesSection";
import TokenSection from "./components/TokenSection";

import { services, dashboardStats } from "./data/services";
import { useQueue } from "./hooks/useQueue";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [toast, setToast] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Read the latest saved account on every render.
  const savedUser = JSON.parse(
    localStorage.getItem("queuelessUser") || "null"
  );

  const userName = savedUser?.name || "Ashutosh";

  const { tokens, joinQueue, cancelToken } = useQueue();

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return services;

    return services.filter((service) =>
      `${service.name} ${service.category}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const totalWaiting = services.reduce(
    (total, service) => total + service.waiting,
    0
  );

  const notify = (message) => {
    setToast(message);

    window.clearTimeout(window.__queueLessToastTimer);

    window.__queueLessToastTimer = window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleJoinQueue = (service) => {
    const result = joinQueue(service);

    if (result?.success) {
      notify(
        `Successfully joined ${service.name}! Token: ${result.token.id}`
      );
    } else {
      notify(result?.message || "Unable to join this queue.");
    }
  };

  const handleNavigation = (page) => {
    setMobileSidebarOpen(false);

    if (page === "My Profile") {
      navigate("/profile");
      return;
    }

    if (page === "Sign In") {
      navigate("/login");
      return;
    }

    if (page === "Log Out") {
      navigate("/login");
      return;
    }

    setActivePage(page);

    if (page === "Dashboard") {
      setSearchQuery("");
      navigate("/");
    }
  };

  const pageTitles = {
    Dashboard: `Welcome Back, ${userName}!`,
    Services: "Campus Services",
    "Live Queue": "Live Queue Status",
    "My Tokens": "My Tokens",
    "Campus Map": "Explore Your Campus",
    Announcements: "Campus Announcements",
    Feedback: "Your Feedback Matters",
    "Help Center": "How Can We Help?",
  };

  // Authentication-related pages
  if (location.pathname === "/login") {
    return <Login />;
  }

  if (location.pathname === "/signup") {
    return <Signup />;
  }

  if (location.pathname === "/profile") {
    return <Profile />;
  }

  return (
    <div
      className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}
      style={{
        backgroundImage: `url("${
          new URL("./assets/background.png", import.meta.url).href
        }")`,
      }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigation}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {mobileSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          darkMode={darkMode}
          onThemeToggle={() =>
            setDarkMode((current) => !current)
          }
          notificationCount={notificationCount}
          onNotifications={() => {
            setNotificationCount(0);
            notify("You're all caught up!");
          }}
          onNavigate={handleNavigation}
          onMenuClick={() =>
            setMobileSidebarOpen((current) => !current)
          }
        />

        <section className="welcome">
          <div className="welcome-copy">
            <span className="greeting">
              Good morning <span aria-hidden="true">☀️</span>
            </span>

            <h1>
              {pageTitles[activePage] || "QueueLess Campus"}
            </h1>

            <p>Your campus, without queues.</p>
          </div>

          <div className="welcome-date">
            <strong>Campus Dashboard</strong>
            <small>Less waiting. More campus life.</small>
          </div>
        </section>

        <StatsCards
          totalWaiting={totalWaiting}
          activeTokens={tokens.length}
          averageWait={dashboardStats.averageWait}
          activeCounters={dashboardStats.activeCounters}
          serviceUptime={dashboardStats.serviceUptime}
        />

        {activePage === "Dashboard" && (
          <>
            <section className="feature-grid">
              <CampusMap
                services={services}
                onExplore={() => handleNavigation("Campus Map")}
              />

              <LiveQueue
                service={services[0]}
                onViewQueue={() => handleNavigation("Live Queue")}
              />
            </section>

            <ServicesSection
              services={services}
              tokens={tokens}
              onJoinQueue={handleJoinQueue}
              onViewAll={() => handleNavigation("Services")}
            />

            {tokens.length > 0 && (
              <TokenSection
                tokens={tokens}
                onCancel={(tokenId) => {
                  cancelToken(tokenId);
                  notify(`Token ${tokenId} cancelled.`);
                }}
              />
            )}
          </>
        )}

        {activePage === "Services" && (
          <ServicesSection
            services={filteredServices}
            tokens={tokens}
            onJoinQueue={handleJoinQueue}
            showAll
          />
        )}

        {activePage === "My Tokens" && (
          <TokenSection
            tokens={tokens}
            onCancel={(tokenId) => {
              cancelToken(tokenId);
              notify(`Token ${tokenId} cancelled.`);
            }}
          />
        )}

        {activePage === "Live Queue" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <h2>Live Queue Overview</h2>
                <p>Current estimated waiting times.</p>
              </div>

              <span className="live-status-pill">
                <i /> Demo data
              </span>
            </div>

            <ServicesSection
              services={filteredServices}
              tokens={tokens}
              onJoinQueue={handleJoinQueue}
              showAll
            />
          </section>
        )}

        {activePage === "Campus Map" && (
          <CampusMap
            services={services}
            expanded
            onExplore={() => handleNavigation("Services")}
          />
        )}

        {activePage === "Announcements" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <h2>Announcements</h2>
                <p>Campus updates for students.</p>
              </div>
            </div>

            <article className="announcement-card">
              <div>
                <h3>Welcome to QueueLess Campus</h3>
                <p>
                  Check waiting times before visiting campus services
                  and use virtual tokens to reduce unnecessary waiting.
                </p>
              </div>
            </article>
          </section>
        )}

        {activePage === "Feedback" && (
          <section className="page-section feedback-panel">
            <h2>Share Your Feedback</h2>
            <p>Help us improve the campus experience.</p>
            <FeedbackForm onSubmit={notify} />
          </section>
        )}

        {activePage === "Help Center" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <h2>Help Center</h2>
                <p>Quick answers about using QueueLess Campus.</p>
              </div>
            </div>

            {[
              [
                "How do I join a queue?",
                "Choose a campus service and click Join Queue.",
              ],
              [
                "Where can I see my token?",
                "Open My Tokens from the sidebar.",
              ],
              [
                "Can I cancel a token?",
                "Open My Tokens and click Cancel.",
              ],
            ].map(([question, answer]) => (
              <details className="help-item" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
        )}

        <footer className="app-footer">
          <span>© 2026 QueueLess Campus</span>
          <span>Built for a smarter campus ✦</span>
        </footer>
      </main>

      {toast && (
        <div className="toast-message" role="status">
          <span>✓</span>
          {toast}

          <button
            type="button"
            onClick={() => setToast("")}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState("5");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!feedback.trim()) {
      onSubmit("Please enter your feedback first.");
      return;
    }

    onSubmit(`Thanks for your ${rating}-star feedback!`);
    setFeedback("");
    setRating("5");
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label htmlFor="feedback-rating">Your rating</label>

      <select
        id="feedback-rating"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
      >
        <option value="5">5 — Excellent</option>
        <option value="4">4 — Good</option>
        <option value="3">3 — Average</option>
        <option value="2">2 — Poor</option>
        <option value="1">1 — Very poor</option>
      </select>

      <label htmlFor="feedback-message">Your comments</label>

      <textarea
        id="feedback-message"
        rows={5}
        placeholder="Tell us about your experience..."
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
      />

      <button type="submit" className="primary-button">
        Submit Feedback →
      </button>
    </form>
  );
}

export default App;
