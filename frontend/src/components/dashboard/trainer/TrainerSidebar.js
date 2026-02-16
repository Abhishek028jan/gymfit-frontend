import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const TrainerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { path: '/trainer', icon: '📊', label: 'Dashboard', end: true },
    { path: '/trainer/bookings', icon: '📅', label: 'Bookings' },
    { path: '/trainer/clients', icon: '👥', label: 'Clients' },
    { path: '/trainer/earnings', icon: '💰', label: 'Earnings' },
    { path: '/trainer/profile', icon: '⚙️', label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <aside className={`trainer-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>💪 Trainer Panel</h3>
          <p>Manage your sessions</p>
        </div>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </>
  );
};

export default TrainerSidebar;
