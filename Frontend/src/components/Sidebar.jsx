
import { useState } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Ticket,
  Users,
  Map,
  Bell,
  MessageSquare,
  CircleHelp,
  ChevronRight,
  X,
  GraduationCap,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Services", icon: BriefcaseBusiness },
  { label: "Live Queue", icon: Users },
  { label: "My Tokens", icon: Ticket },
  { label: "Campus Map", icon: Map },
  { label: "Announcements", icon: Bell },
  { label: "Feedback", icon: MessageSquare },
  { label: "Help Center", icon: CircleHelp },
];

export default function Sidebar({
  activePage,
  onNavigate,
  mobileOpen = false,
  onClose,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  // Read the currently saved account
  const user = JSON.parse(
    localStorage.getItem("queuelessUser") || "null"
  );

  const userName = user?.name || "Ashutosh";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleNavigation = (label) => {
    onNavigate(label);
    setProfileOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-logo">
            <GraduationCap size={25} />
          </div>

          <div className="brand-text">
            <h2>QueueLess</h2>
            <span>Campus</span>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-close"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <p className="nav-heading">MENU</p>

        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={`nav-item ${
              activePage === label ? "active" : ""
            }`}
            onClick={() => handleNavigation(label)}
            aria-current={
              activePage === label ? "page" : undefined
            }
          >
            <Icon size={20} />
            <span>{label}</span>

            {activePage === label && (
              <span className="active-indicator" />
            )}
          </button>
        ))}
      </nav>

      {/* Profile at the bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <button
            type="button"
            className="profile-summary"
            onClick={() =>
              setProfileOpen((open) => !open)
            }
            aria-expanded={profileOpen}
          >
            <span className="avatar">{firstLetter}</span>

            <span className="profile-info">
              <strong>{userName}</strong>
              <small>Student Account</small>
            </span>

            <ChevronRight
              size={17}
              className={`profile-chevron ${
                profileOpen ? "rotated" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-details">
                <strong>{userName}</strong>
                <small>
                  {user?.email || "Student Account"}
                </small>
                <small>QueueLess Campus</small>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleNavigation("My Profile")
                }
              >
                My Profile
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavigation("Sign In")
                }
              >
                Sign In / Create Account
              </button>

              <button
                type="button"
                className="logout-button"
                onClick={() =>
                  handleNavigation("Log Out")
                }
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
