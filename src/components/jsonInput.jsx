import { useState } from 'react';
import '../styles/input.scss';

const sampleJson = `{
  "user": {
    "name": "Deepali",
    "age": 26,
    "skills": ["React", "JavaScript", "CSS"],
    "address": { "city": "Lucknow", "zip": 226010 }
  }
}`;

function JsonInput({ onVisualize }) {
  const [text, setText] = useState(sampleJson);
  const [error, setError] = useState('');

  const handleClick = () => {
    try {
      const parsed = JSON.parse(text);
      setError('');
      onVisualize(parsed);
    } catch (err) {
      setError('Invalid JSON 😅');
    }
  };

  return (
    <div className="json-input">
      <textarea
        className="json-input__area"
        rows="15"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="json-input__error">{error}</p>}
      <button className="json-input__btn" onClick={handleClick}>
        Visualize
      </button>
    </div>
  );
}

export default JsonInput;
