import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CollapsibleSidebar from './CollapsibleSidebar';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const excludedPaths = [
    '/',
    '/final-feedback',
    '/feedback-form', 
    '/ec-fitment',
    '/project-fitment',
    '/app-l2-technical'
  ];

  const shouldShowSidebar = !excludedPaths.includes(location.pathname);

  const sidebarItems = [
   // { name: "Dashboard", icon: "DashboardIcon", path: "/newdashboard" },
    { name: "Resume Analyzer", icon: "GroupIcon", path: "/apprecruit" },
   // { name: "RRF Tracking", icon: "AssignmentIcon", path: "/candidates" },
    { name: "Resume Dashboard", icon: "ListAltIcon", path: "/resume-analysis" },
    { name: "Reports", icon: "DashboardIcon", path: "/charts" },
    { name: "Logout", icon: "LogoutIcon", action: "logout" }
   
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className={`app-layout ${shouldShowSidebar ? 'with-sidebar' : ''}`}>
      {shouldShowSidebar && (
        <CollapsibleSidebar 
          menuItems={sidebarItems}
          onLogout={handleLogout}
          onToggle={setSidebarCollapsed}
        />
      )}
      <div className={`main-content-wrapper ${shouldShowSidebar ? (sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded') : 'no-sidebar'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;