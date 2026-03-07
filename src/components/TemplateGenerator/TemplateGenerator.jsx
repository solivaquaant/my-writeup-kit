import React, { useState, useEffect } from 'react';
import { ClipboardCopy, CheckCircle2 } from 'lucide-react';
import { WriteupForm } from './WriteupForm/WriteupForm';
import { BlogForm } from './BlogForm/BlogForm';
import './TemplateGenerator.css';

export function TemplateGenerator() {
  const [type, setType] = useState('writeup');
  const [copied, setCopied] = useState(false);
  const [markdownOutput, setMarkdownOutput] = useState('');

  // Write-up state
  const [writeupData, setWriteupData] = useState({
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

  // Blog state
  const [blogData, setBlogData] = useState({
    frontMatter: {
      authors: 'tndt',
      description: ''
    },
    tags: [],
    title: '',
    summary: '',
    sections: []
  });

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
    if (type === 'writeup') {
      setMarkdownOutput(generateWriteupMarkdown());
    } else {
      setMarkdownOutput(generateBlogMarkdown());
    }
  }, [type, writeupData, blogData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="generator-container animate-fade-in">
      {/* Type selector */}
      <div className="type-selector">
        <button 
          className={`type-btn ${type === 'writeup' ? 'active' : ''}`}
          onClick={() => setType('writeup')}
        >
          Write-up
        </button>
        <button 
          className={`type-btn ${type === 'blog' ? 'active' : ''}`}
          onClick={() => setType('blog')}
        >
          Blog
        </button>
      </div>

      <div className="form-split flex-1 min-h-0">
        {/* Left side: Form inputs */}
        <div className="h-full overflow-hidden">
          {type === 'writeup' ? (
            <WriteupForm data={writeupData} onChange={setWriteupData} />
          ) : (
            <BlogForm data={blogData} onChange={setBlogData} />
          )}
        </div>

        {/* Right side: Markdown preview (Click to copy) */}
        <div className="preview-section h-full relative group">
          <div 
            className={`
              h-full w-full bg-[rgba(13,17,23,0.8)] border rounded-lg 
              font-mono text-sm text-[var(--accent-color-hover)] p-4 
              overflow-y-auto whitespace-pre-wrap cursor-pointer
              transition-all duration-300
              ${copied ? 'border-[var(--success-color)] shadow-[0_0_15px_rgba(46,160,67,0.3)]' : 'border-[var(--border-color)] hover:border-[var(--accent-color)] hover:shadow-[0_0_15px_rgba(88,166,255,0.15)]'}
            `}
            onClick={handleCopy}
            title="Click to copy markdown"
          >
            {markdownOutput || <span className="text-secondary opacity-50">Start typing to generate markdown...</span>}
            
            {/* Hover overlay hint */}
            <div className={`
              absolute inset-0 bg-[rgba(13,17,23,0.7)] backdrop-blur-[2px] 
              flex items-center justify-center rounded-lg
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${copied ? 'opacity-100 bg-[rgba(13,17,23,0.85)] z-10' : ''}
              pointer-events-none
            `}>
              <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {copied ? (
                  <>
                    <CheckCircle2 size={48} color="var(--success-color)" className="animate-bounce" />
                    <span className="text-[var(--success-color)] font-bold text-lg">
                      Copied to Clipboard!
                    </span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={48} color="var(--accent-color)" />
                    <span className="text-[var(--accent-color)] font-bold text-lg">
                      Click to Copy
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
