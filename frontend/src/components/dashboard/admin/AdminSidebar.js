import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: '/admin', icon: '📊', label: 'Dashboard', end: true },
        { path: '/admin/members', icon: '👥', label: 'Members' },
        { path: '/admin/requests', icon: '🔔', label: 'Member Requests' },
        { path: '/admin/classes', icon: '🏋️', label: 'Classes' },
    ];

    return (
        <>
            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>⚡ Admin Panel</h3>
                    <p>Manage your gym</p>
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

export default AdminSidebar;
