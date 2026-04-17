import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { WriteupForm } from './WriteupForm/WriteupForm';
import { BlogForm } from './BlogForm/BlogForm';
import './TemplateGenerator.css';

const STORAGE_KEYS = {
  writeup: 'my-writeup-kit.writeup-data',
  blog: 'my-writeup-kit.blog-data'
};

const createDefaultWriteupData = () => ({
  tags: [],
  title: '',
  generalInfo: {
    Description: '',
    Difficulty: '',
    Scenario: '',
    Link: ''
  },
  sections: {
    overview: {
      enabled: false,
      content: ''
    },
    solution: {
      enabled: true,
      content: ''
    },
    taskAnswers: {
      enabled: false,
      count: 1,
      prefix: 'Task',
      items: [{ q: '', a: '' }]
    },
    flag: {
      enabled: true,
      count: 1,
      flag1: '',
      flag2: ''
    }
  }
});

const createDefaultBlogData = () => ({
  frontMatter: {
    authors: 'tndt',
    description: ''
  },
  tags: [],
  title: '',
  summary: '',
  sections: []
});

const loadStoredData = (storageKey, fallbackFactory) => {
  if (typeof window === 'undefined') return fallbackFactory();

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return fallbackFactory();

  try {
    return JSON.parse(raw);
  } catch {
    return fallbackFactory();
  }
};

export function TemplateGenerator({ type, onTypeChange }) {
  const [internalType, setInternalType] = useState('writeup');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const selectedType = type ?? internalType;

  const setSelectedType = (nextType) => {
    if (typeof onTypeChange === 'function') {
      onTypeChange(nextType);
      return;
    }
    setInternalType(nextType);
  };

  // Write-up state
  const [writeupData, setWriteupData] = useState(() =>
    loadStoredData(STORAGE_KEYS.writeup, createDefaultWriteupData)
  );

  // Blog state
  const [blogData, setBlogData] = useState(() =>
    loadStoredData(STORAGE_KEYS.blog, createDefaultBlogData)
  );

  // Markdown generation logic - writeup
  const generateWriteupMarkdown = () => {
    let md = '';
    
    // Tags
    md += '---\n';
    md += `tags: [${writeupData.tags.join(', ')}]\n`;
    md += '---\n';

    // Title
    if (writeupData.title) {
      md += `# ${writeupData.title}\n\n`;
    }
    
    // General info
    const info = writeupData.generalInfo;
    if (info.Description) 
      md += `- **Description:** ${info.Description}\n`;
    if (info.Difficulty) 
      md += `- **Difficulty:** ${info.Difficulty}\n`;
    if (info.Scenario) 
      md += `- **Scenario:** ${info.Scenario}\n`;
    if (info.Link) 
      md += `- **Link:** [${writeupData.title || 'Title'}](${info.Link})\n`;
    md += `\n`;

    // Sections
    if (writeupData.sections.overview.enabled) {
      md += `## 🎯 Overview\n`;
      if (writeupData.sections.overview.content) 
        md += `${writeupData.sections.overview.content}\n\n`;
    }
    
    if (writeupData.sections.solution.enabled) {
      md += `## 🔎 Solution\n`;
      if (writeupData.sections.solution.content) 
        md += `${writeupData.sections.solution.content}\n\n`;
    }
    
    if (writeupData.sections.taskAnswers.enabled) {
      md += `## ✏️ Task answers\n`;

      const count = writeupData.sections.taskAnswers.count || 1;
      const prefix = writeupData.sections.taskAnswers.prefix || 'Task';
      const items = writeupData.sections.taskAnswers.items || [];
      for (let i = 0; i < count; i++) {
        const q = items[i]?.q || ``;
        const a = items[i]?.a || ``;
        
        md += `**${prefix === 'Q' ? 'Q' : 'Task '}${i + 1}${q ? `: ${q}` : ''}**\n> ${a}\n\n`;
      }
    }
    
    if (writeupData.sections.flag.enabled) {
      md += `## 🚩 Flag\n`;
      if (writeupData.sections.flag.count === 1) {
        md += `> \`${writeupData.sections.flag.flag1 || ''}\`\n\n`;
      } else {
        md += `**User flag:**\n> \`${writeupData.sections.flag.flag1 || ''}\`\n\n**Root flag:**\n> \`${writeupData.sections.flag.flag2 || ''}\`\n\n`;
      }
    }
    
    return md;
  };

  // Markdown generation logic - Blog
  const generateBlogMarkdown = () => {
    let md = '';
    const date = new Date().toISOString().split('T')[0];
    
    // Front matter
    md += '---\n';
    md += `authors: ${blogData.frontMatter.authors}\n`;
    md += `tags: [${blogData.tags.join(', ')}]\n`;
    if (blogData.frontMatter.description) 
      md += `description: A blog about ${blogData.frontMatter.description}\n`;
    md += `date: ${date}\n`;
    md += '---\n';
    
    // Title & summary
    if (blogData.title) 
      md += `# ${blogData.title}\n`;
    if (blogData.summary) 
      md += `${blogData.summary}\n{/* truncate */}\n\n`;
    
    // Custom sections
    blogData.sections.forEach(section => {
      if (section.name) 
        md += `## ${section.name}\n`;
      if (section.content) 
        md += `${section.content}\n\n`;
    });
    
    return md;
  };

  // Update markdown when data changes
  useEffect(() => {
    if (selectedType === 'writeup') {
      setMarkdownOutput(generateWriteupMarkdown());
    } else {
      setMarkdownOutput(generateBlogMarkdown());
    }
  }, [selectedType, writeupData, blogData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.writeup, JSON.stringify(writeupData));
  }, [writeupData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.blog, JSON.stringify(blogData));
  }, [blogData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
  };

  const handleClearStoredData = () => {
    if (typeof window === 'undefined') return;

    const shouldClear = window.confirm('Clear all saved write-up and blog data?');
    if (!shouldClear) return;

    window.localStorage.removeItem(STORAGE_KEYS.writeup);
    window.localStorage.removeItem(STORAGE_KEYS.blog);
    setWriteupData(createDefaultWriteupData());
    setBlogData(createDefaultBlogData());
  };

  return (
    <div className="generator-container animate-fade-in">
      {type === undefined && (
        <div className="type-selector">
          <button
            className={`type-btn ${selectedType === 'writeup' ? 'active' : ''}`}
            onClick={() => setSelectedType('writeup')}
          >
            Write-up
          </button>
          <button
            className={`type-btn ${selectedType === 'blog' ? 'active' : ''}`}
            onClick={() => setSelectedType('blog')}
          >
            Blog
          </button>
        </div>
      )}

      <div className="generator-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClearStoredData}
        >
          <Trash2 size={16} /> Clear saved data
        </button>
      </div>

      <div className="form-split flex-1 min-h-0">
        {/* Left side: Form inputs */}
        <div className="h-full overflow-hidden">
          {selectedType === 'writeup' ? (
            <WriteupForm data={writeupData} onChange={setWriteupData} />
          ) : (
            <BlogForm data={blogData} onChange={setBlogData} />
          )}
        </div>

        {/* Right side: Markdown preview (Click to copy) */}
        <div className="preview-section h-full">
          <div 
            className="
              h-full w-full bg-[rgba(13,17,23,0.8)] border rounded-lg 
              font-mono text-sm text-[var(--accent-color-hover)] p-4 
              overflow-y-auto whitespace-pre-wrap cursor-pointer
              transition-all duration-300
              border-[var(--border-color)] hover:border-[var(--accent-color)] hover:shadow-[0_0_15px_rgba(88,166,255,0.15)]
            "
            onClick={handleCopy}
          >
            {markdownOutput || <span className="text-secondary opacity-50">Start typing to generate markdown...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
