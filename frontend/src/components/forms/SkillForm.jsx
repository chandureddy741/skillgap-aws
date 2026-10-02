import TargetRole from './TargetRole.jsx';

export default function SkillForm({
  technologies,
  targetRoles,
  technology,
  setTechnology,
  selectedTopics,
  toggleTopic,
  targetRole,
  setTargetRole,
}) {
  const topics = technologies[technology] || [];

  return (
    <div>
      <div className="field">
        <label>Select a Technology</label>
        <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
          <option value="">Choose a technology…</option>
          {Object.keys(technologies).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <TargetRole roles={targetRoles} value={targetRole} onChange={setTargetRole} />

      {technology && (
        <div>
          <p style={{ fontWeight: 600, margin: '14px 0 10px' }}>
            What topics have you completed? ({selectedTopics.length}/{topics.length})
          </p>
          <div className="topic-grid">
            {topics.map((topic) => (
              <label key={topic} className={`topic-item${selectedTopics.includes(topic) ? ' selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                />
                {topic}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
