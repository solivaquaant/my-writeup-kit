import React, { useState } from "react";
import { PanelLeftOpen, PanelLeftClose, FileText, BookText } from "lucide-react";
import "./Tabs.css";

export function Tabs({
  tabs,
  activeTab,
  onTabChange,
  generatorType = "writeup",
  onGeneratorTypeChange,
  sidebarFooter,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="tabs-container">
      <aside className={`tabs-sidebar glass-panel ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && <span className="sidebar-title">Tools</span>}
          <button
            type="button"
            className="collapse-toggle btn-icon"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="tabs-nav" aria-label="Tool tabs">
          {tabs.map((tab) => (
            <div key={tab.id} className="sidebar-item-group">
              <button
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => onTabChange(tab.id)}
                title={isCollapsed ? tab.label : undefined}
              >
                {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                <span className={`tab-label ${isCollapsed ? "sr-only" : ""}`}>{tab.label}</span>
              </button>

              {tab.id === "generator" && activeTab === "generator" && (
                <div className={`generator-subtabs ${isCollapsed ? "collapsed" : ""}`}>
                  <button
                    className={`subtab-btn ${generatorType === "writeup" ? "active" : ""}`}
                    onClick={() => onGeneratorTypeChange?.("writeup")}
                    title={isCollapsed ? "Write-up" : undefined}
                    aria-label="Write-up"
                  >
                    <FileText size={16} />
                    <span className={`tab-label ${isCollapsed ? "sr-only" : ""}`}>Write-up</span>
                  </button>
                  <button
                    className={`subtab-btn ${generatorType === "blog" ? "active" : ""}`}
                    onClick={() => onGeneratorTypeChange?.("blog")}
                    title={isCollapsed ? "Blog" : undefined}
                    aria-label="Blog"
                  >
                    <BookText size={16} />
                    <span className={`tab-label ${isCollapsed ? "sr-only" : ""}`}>Blog</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>

        {sidebarFooter && (
          <div className={`sidebar-footer ${isCollapsed ? "hidden" : ""}`}>
            {sidebarFooter}
          </div>
        )}
      </aside>

      <div className="tab-content">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
