import React, { useState, useEffect } from 'react';
import { Link, ClipboardCopy, CheckCircle2 } from 'lucide-react';

export function Slugify() {
  const [inputText, setInputText] = useState('');
  const [slugifiedText, setSlugifiedText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Slugify logic
    const slug = inputText
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
      
    setSlugifiedText(slug);
  }, [inputText]);

  const handleCopy = () => {
    if (!slugifiedText) return;
    navigator.clipboard.writeText(slugifiedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 w-full max-w-3xl mx-auto h-full p-4">
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-[var(--accent-color)]">
          <Link size={24} />
          Slugify generator
        </h2>
        <p className="text-secondary mb-6">
          Convert normal strings into URL-friendly slugs instantly.
        </p>

        <div className="form-group mb-6">
          <label className="form-label" htmlFor="slugInput">Input string</label>
          <input
            type="text"
            id="slugInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. What is slug?"
            className="text-lg py-3"
            autoFocus
          />
        </div>

        <div className="form-group relative group">
          <label className="form-label">Output slug</label>
          <div 
            className={`
              w-full bg-[rgba(13,17,23,0.8)] border rounded-lg 
              font-mono text-lg p-4 overflow-x-auto whitespace-nowrap
              transition-all duration-300 min-h-[60px] flex items-center
              ${slugifiedText ? 'cursor-pointer' : ''}
              ${copied ? 'border-[var(--success-color)] text-[var(--success-color)] shadow-[0_0_15px_rgba(46,160,67,0.3)]' : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-color)] hover:shadow-[0_0_15px_rgba(88,166,255,0.15)]'}
            `}
            onClick={handleCopy}
            title={slugifiedText ? "Click to copy" : ""}
          >
            {slugifiedText || <span className="opacity-50 text-secondary">slug-will-appear-here</span>}
            
            {slugifiedText && (
              <div className="absolute right-4 top-[50%] opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? <CheckCircle2 size={20} color="var(--success-color)" /> : <ClipboardCopy size={20} color="var(--accent-color)" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
