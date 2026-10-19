
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  UserRound,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Topbar({
  searchQuery,
  onSearchChange,
  darkMode,
  onThemeToggle,
  notificationCount,
  onNotifications,
  onNavigate,
  onMenuClick,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("queuelessUser") || "null"
  );

  const userName = user?.name || "Ashutosh";
  const userEmail = user?.email || "Student Account";

  const openProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const openLogin = () => {
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="topbar">
      {/* Mobile Menu */}
      <button
        type="button"
        className="mobile-menu"
        aria-label="Open dashboard navigation"
        onClick={onMenuClick}
      >
        <Menu size={21} />
      </button>

      {/* Search */}
      <label className="search-box">
        <Search size={21} />

        <input
          type="search"
          placeholder="Search services, locations, buildings..."
          value={searchQuery}
          onChange={(event) => {
            const value = event.target.value;
            onSearchChange(value);

            onNavigate(
              value.trim() ? "Services" : "Dashboard"
            );
          }}
          aria-label="Search campus services"
        />

        <span className="search-shortcut">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </label>

      <div className="top-actions">
        {/* Professional Theme Switcher */}
        <div
          className="theme-switcher"
          role="group"
          aria-label="Appearance"
        >
          <button
            type="button"
            className={`theme-option ${
              !darkMode ? "active" : ""
            }`}
            onClick={() => {
              if (darkMode) onThemeToggle();
            }}
            aria-label="Switch to light mode"
            aria-pressed={!darkMode}
            title="Light mode"
          >
            <Sun size={17} strokeWidth={2} />
          </button>

          <button
            type="button"
            className={`theme-option ${
              darkMode ? "active" : ""
            }`}
            onClick={() => {
              if (!darkMode) onThemeToggle();
            }}
            aria-label="Switch to dark mode"
            aria-pressed={darkMode}
            title="Dark mode"
          >
            <Moon size={17} strokeWidth={2} />
          </button>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="icon-button notification-button"
          onClick={onNotifications}
          aria-label={`Notifications: ${notificationCount} unread`}
        >
          <Bell size={20} />

          {notificationCount > 0 && (
            <span className="notification-dot">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile Menu */}
        <div className="topbar-profile">
          <button
            type="button"
            className="user-button"
            onClick={() =>
              setProfileOpen((current) => !current)
            }
            aria-label="Open account menu"
            aria-expanded={profileOpen}
          >
            <span className="avatar small-avatar">
              {userName.charAt(0).toUpperCase()}
            </span>

            <ChevronDown
              size={16}
              className={profileOpen ? "rotated" : ""}
            />
          </button>

          {profileOpen && (
            <div className="topbar-profile-dropdown">
              <div className="topbar-profile-details">
                <strong>{userName}</strong>
                <small>{userEmail}</small>
                <small>QueueLess Campus</small>
              </div>

              <button type="button" onClick={openProfile}>
                <UserRound size={17} />
                My Profile
              </button>

              <button type="button" onClick={openLogin}>
                <LogIn size={17} />
                Sign In / Create Account
              </button>

              <button
                type="button"
                className="logout-button"
                onClick={openLogin}
              >
                <LogOut size={17} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
