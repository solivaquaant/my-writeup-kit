import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const BLOG_TAGS = ['malware', 'forensics', 'ctf', 'steganography'];

export function BlogForm({ data, onChange }) {
  const handleTagToggle = (tag) => {
    const newTags = data.tags.includes(tag)
      ? data.tags.filter(t => t !== tag)
      : [...data.tags, tag];
    onChange({ ...data, tags: newTags });
  };

  const handleFrontMatterChange = (field, value) => {
    onChange({
      ...data,
      frontMatter: { ...data.frontMatter, [field]: value }
    });
  };

  const addSection = () => {
    onChange({
      ...data,
      sections: [
        ...data.sections,
        { id: Date.now().toString(), name: '', content: '' }
      ]
    });
  };

  const removeSection = (id) => {
    onChange({
      ...data,
      sections: data.sections.filter(s => s.id !== id)
    });
  };

  const updateSection = (id, field, value) => {
    onChange({
      ...data,
      sections: data.sections.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    });
  };

  return (
    <div className="form-section animate-fade-in">
      {/* Front matter */}
      <div className="form-group glass-panel p-4">
        <label className="form-label">1. Front matter</label>
        
        <div className="flex-col gap-3">
          <div>
            <label className="text-sm text-secondary mb-1 block">Authors</label>
            <input
              type="text"
              value={data.frontMatter.authors}
              onChange={(e) => handleFrontMatterChange('authors', e.target.value)}
              placeholder="e.g. tndt"
              className="mb-3"
            />
          </div>

          <div>
            <label className="text-sm text-secondary mb-1 block">Tags <span className="text-xs opacity-70">(Select multiple)</span></label>
            <div className="tags-container mb-3">
              {BLOG_TAGS.map(tag => (
                <div
                  key={tag}
                  className={`tag ${data.tags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-secondary mb-1 block">Description</label>
            <textarea
              value={data.frontMatter.description}
              onChange={(e) => handleFrontMatterChange('description', e.target.value)}
              placeholder="A blog about..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Title & summary */}
      <div className="form-group glass-panel p-4">
        <label className="form-label">2. Title & summary</label>
        <div className="flex-col gap-3">
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Blog title"
            className="mb-3"
          />
          <textarea
            value={data.summary}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            placeholder="Blog summary"
            rows={3}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="form-group glass-panel p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="form-label mb-0">3. Sections</label>
          <button 
            className="btn btn-secondary text-sm py-1 px-2 flex items-center gap-1"
            onClick={addSection}
          >
            <Plus size={14} /> Add section
          </button>
        </div>
        
        <div className="flex-col gap-4 mt-2">
          {data.sections.length === 0 ? (
            <p className="text-secondary text-sm italic text-center py-4">No sections added yet.</p>
          ) : (
            data.sections.map((section, index) => (
              <div key={section.id} className="p-3 border border-[var(--border-color)] rounded-md bg-[rgba(0,0,0,0.2)] relative">
                <button 
                  className="btn-icon absolute top-2 right-2 text-error hover:text-error hover:bg-[rgba(248,81,73,0.1)]"
                  onClick={() => removeSection(section.id)}
                  title="Remove Section"
                >
                  <Trash2 size={16} color="var(--error-color)" />
                </button>
                
                <h4 className="text-sm font-medium mb-2 pr-8">Section {index + 1}</h4>
                
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => updateSection(section.id, 'name', e.target.value)}
                  placeholder="Section Name"
                  className="mb-2"
                />
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  placeholder="Section Content..."
                  rows={4}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
