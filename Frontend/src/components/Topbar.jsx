
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
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
  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu"
        aria-label="Open dashboard navigation"
        onClick={onMenuClick}
      >
        <Menu size={21} />
      </button>

      <label className="search-box">
        <Search size={21} />

        <input
          type="search"
          placeholder="Search services, locations, buildings..."
          value={searchQuery}
          onChange={(event) => {
            onSearchChange(event.target.value);

            if (event.target.value.trim()) {
              onNavigate("Services");
            } else {
              onNavigate("Dashboard");
            }
          }}
          aria-label="Search campus services"
        />

        <span className="search-shortcut">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </label>

      <div className="top-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
          title="Toggle theme"
        >
          <span className={!darkMode ? "selected" : ""}>
            <Sun size={19} />
          </span>

          <span className={darkMode ? "selected" : ""}>
            <Moon size={19} />
          </span>
        </button>

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

        <button
          type="button"
          className="user-button"
          onClick={() => onNavigate("My Tokens")}
          aria-label="Open my tokens"
        >
          <span className="avatar small-avatar">A</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
