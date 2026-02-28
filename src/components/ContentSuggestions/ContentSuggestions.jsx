import React from 'react';
import { Lightbulb } from 'lucide-react';

export function ContentSuggestions() {
  return (
    <div className="content-suggestions glass-panel p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-[var(--accent-color)]">
        <Lightbulb size={24} />
        Useful snippets
      </h2>
      <p className="text-secondary mb-4">
        Here are some common Markdown snippets that you can copy and use directly in your content.
      </p>

      <div className="snippet-card">
        <h3>Image insertion (with auto-scaling)</h3>
        <p className="text-secondary text-sm mb-2">
          Use this syntax to perfectly center and scale an image.
        </p>
        <pre className="code-block">
          <code>
{`<div style={{ width: '100%', margin: '0 auto' }}>
  <img src={require("./flag.png").default} style={{ width: '100%', height: 'auto' }} />
</div>`}
          </code>
        </pre>
      </div>
    </div>
  );
}
