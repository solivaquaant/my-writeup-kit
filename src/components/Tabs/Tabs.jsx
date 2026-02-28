import React from "react";
import "./Tabs.css";

export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs-container">
      <nav className="tabs-nav glass-panel">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}>
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
        <div
          className="tab-indicator"
          style={{
            transform: `translateX(${tabs.findIndex((t) => t.id === activeTab) * 100}%)`,
            width: `${100 / tabs.length}%`,
          }}
        />
      </nav>
      <div className="tab-content">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
