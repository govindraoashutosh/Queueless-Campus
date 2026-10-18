
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

      {/* Profile stays at the bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-profile">
          <button
            type="button"
            className="profile-summary"
            onClick={() =>
              setProfileOpen((current) => !current)
            }
            aria-expanded={profileOpen}
          >
            <span className="avatar">A</span>

            <span className="profile-info">
              <strong>Ashutosh</strong>
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
              <button
                type="button"
                onClick={() => handleNavigation("My Tokens")}
              >
                My Tokens
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("Help Center")}
              >
                Help Center
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
