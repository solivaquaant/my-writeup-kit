import React, { useState } from 'react';
import { PencilLine, Lightbulb, Link } from 'lucide-react';
import { Tabs } from './components/Tabs/Tabs';
import { ContentSuggestions } from './components/ContentSuggestions/ContentSuggestions';
import { TemplateGenerator } from './components/TemplateGenerator/TemplateGenerator';
import { Slugify } from './components/Slugify/Slugify';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('slugify');
  const [templateType, setTemplateType] = useState('writeup');

  const tabs = [
    {
      id: 'slugify',
      label: 'Slugify',
      icon: <Link size={18} />,
      content: <Slugify />
    },
    {
      id: 'generator',
      label: 'Template generator',
      icon: <PencilLine size={18} />,
      content: (
        <TemplateGenerator type={templateType} onTypeChange={setTemplateType} />
      )
    },
    {
      id: 'suggestions',
      label: 'Content suggestion',
      icon: <Lightbulb size={18} />,
      content: <ContentSuggestions />
    }
  ];

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">
          <PencilLine className="text-accent" size={36} color="var(--accent-color)" />
          <span>My write-up kit</span>
        </h1>
      </header>

      <main className="main-content">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          generatorType={templateType}
          onGeneratorTypeChange={setTemplateType}
          sidebarFooter={(
            <p>
              A utility tool to instantly generate slugs and Markdown templates, making the process of writing
              <a href="https://blog.solivaquaant.site/" target="_blank" rel="noopener noreferrer">
                <span className="text-accent"> my write-ups and blogs </span>
              </a>
              seamless and easy.
            </p>
          )}
        />
      </main>
    </div>
  );
}

export default App;
