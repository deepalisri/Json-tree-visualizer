import React, { useState } from 'react';
import '../styles/search.scss';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search JSON path"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-bar__btn" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
