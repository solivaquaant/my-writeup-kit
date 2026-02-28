import React from 'react';

const WRITEUP_TAGS = [
  'web', 'android', 'reverse-engineering', 'cryptography', 
  'forensics', 'windows', 'linux', 'binary-exploitation', 
  'steganography', 'network', 'osint', 'scripting', 'ai-ml'
];

export function WriteupForm({ data, onChange }) {
  const handleTagToggle = (tag) => {
    const newTags = data.tags.includes(tag)
      ? data.tags.filter(t => t !== tag)
      : [...data.tags, tag];
    onChange({ ...data, tags: newTags });
  };

  const handleInfoChange = (field, value) => {
    onChange({
      ...data,
      generalInfo: { ...data.generalInfo, [field]: value }
    });
  };

  const handleSectionToggle = (sectionId) => {
    onChange({
      ...data,
      sections: {
        ...data.sections,
        [sectionId]: {
          ...data.sections[sectionId],
          enabled: !data.sections[sectionId].enabled
        }
      }
    });
  };

  const handleSectionContentChange = (sectionId, content) => {
    onChange({
      ...data,
      sections: {
        ...data.sections,
        [sectionId]: {
          ...data.sections[sectionId],
          content
        }
      }
    });
  };

  return (
    <div className="form-section animate-fade-in">
      {/* Tags */}
      <div className="form-group glass-panel p-4">
        <label className="form-label">1. Tags</label>
        <p className="text-secondary text-sm mb-2">Select one or multiple tags.</p>
        <div className="tags-container">
          {WRITEUP_TAGS.map(tag => (
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

      {/* Title */}
      <div className="form-group glass-panel p-4">
        <label className="form-label" htmlFor="title">2. Title</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Enter write-up title..."
        />
      </div>

      {/* General information */}
      <div className="form-group glass-panel p-4">
        <label className="form-label">3. General information</label>
        <p className="text-secondary text-sm mb-4">Leave field empty to omit from template.</p>
        
        <div className="flex-col gap-3">
          <input
            type="text"
            value={data.generalInfo.Description}
            onChange={(e) => handleInfoChange('Description', e.target.value)}
            placeholder="Description"
            className="mb-2"
          />
          <input
            type="text"
            value={data.generalInfo.Difficulty}
            onChange={(e) => handleInfoChange('Difficulty', e.target.value)}
            placeholder="Difficulty"
            className="mb-2"
          />
          <input
            type="text"
            value={data.generalInfo.Scenario}
            onChange={(e) => handleInfoChange('Scenario', e.target.value)}
            placeholder="Scenario"
            className="mb-2"
          />
          <input
            type="text"
            value={data.generalInfo.Link}
            onChange={(e) => handleInfoChange('Link', e.target.value)}
            placeholder="Link"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="form-group glass-panel p-4">
        <label className="form-label">4. Sections</label>
        
        <div className="mb-4">
          <label className="checkbox-label mb-2">
            <input 
              type="checkbox" 
              checked={data.sections.overview.enabled}
              onChange={() => handleSectionToggle('overview')}
            />
            🎯 Overview
          </label>
          {data.sections.overview.enabled && (
             <textarea
               value={data.sections.overview.content}
               onChange={(e) => handleSectionContentChange('overview', e.target.value)}
               placeholder="Overview content..."
               rows={3}
               className="ml-6 mt-2"
             />
          )}
        </div>

        <div className="mb-4">
          <label className="checkbox-label mb-2">
            <input 
              type="checkbox" 
              checked={data.sections.solution.enabled}
              onChange={() => handleSectionToggle('solution')}
            />
            🔎 Solution
          </label>
          {data.sections.solution.enabled && (
             <textarea
               value={data.sections.solution.content}
               onChange={(e) => handleSectionContentChange('solution', e.target.value)}
               placeholder="Solution content..."
               rows={3}
               className="ml-6 mt-2"
             />
          )}
        </div>

        <div className="mb-4">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={data.sections.taskAnswers.enabled}
              onChange={() => handleSectionToggle('taskAnswers')}
            />
            ✏️ Task answers
          </label>
          {data.sections.taskAnswers.enabled && (
             <div className="ml-6 mt-2 flex items-center gap-2">
               <label className="text-sm text-secondary">Number of questions:</label>
               <input
                 type="number"
                 min="1"
                 className="w-32"
                 value={data.sections.taskAnswers.count || 1}
                 onChange={(e) => {
                   const val = parseInt(e.target.value) || 1;
                   const newSections = { ...data.sections };
                   newSections.taskAnswers.count = val;
                   onChange({ ...data, sections: newSections });
                 }}
               />
             </div>
          )}
        </div>

        <div className="mb-2">
          <label className="checkbox-label mb-2">
            <input 
              type="checkbox" 
              checked={data.sections.flag.enabled}
              onChange={() => handleSectionToggle('flag')}
            />
            🚩 Flag
          </label>
          {data.sections.flag.enabled && (
            <div className="ml-6 mt-2 flex flex-col gap-3">
              <div className="flex gap-4">
                <label className="checkbox-label text-sm">
                  <input 
                    type="radio" 
                    name="flagCount"
                    checked={data.sections.flag.count === 1}
                    onChange={() => {
                      const newSections = { ...data.sections };
                      newSections.flag.count = 1;
                      onChange({ ...data, sections: newSections });
                    }}
                  />
                  1 Flag
                </label>
                <label className="checkbox-label text-sm">
                  <input 
                    type="radio" 
                    name="flagCount"
                    checked={data.sections.flag.count === 2}
                    onChange={() => {
                      const newSections = { ...data.sections };
                      newSections.flag.count = 2;
                      onChange({ ...data, sections: newSections });
                    }}
                  />
                  2 Flags
                </label>
              </div>
              
              {data.sections.flag.count === 1 ? (
                <input
                  type="text"
                  value={data.sections.flag.flag1 || ''}
                  onChange={(e) => {
                    const newSections = { ...data.sections };
                    newSections.flag.flag1 = e.target.value;
                    onChange({ ...data, sections: newSections });
                  }}
                  placeholder="Enter flag..."
                />
              ) : (
                <div className="flex-col gap-2">
                  <input
                    type="text"
                    value={data.sections.flag.flag1 || ''}
                    onChange={(e) => {
                      const newSections = { ...data.sections };
                      newSections.flag.flag1 = e.target.value;
                      onChange({ ...data, sections: newSections });
                    }}
                    placeholder="Enter user flag..."
                    className="mb-2"
                  />
                  <input
                    type="text"
                    value={data.sections.flag.flag2 || ''}
                    onChange={(e) => {
                      const newSections = { ...data.sections };
                      newSections.flag.flag2 = e.target.value;
                      onChange({ ...data, sections: newSections });
                    }}
                    placeholder="Enter root flag..."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
