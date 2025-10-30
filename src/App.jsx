import React, { useState } from 'react';
import JsonInput from './components/jsonInput';
import TreeVisualizer from './components/treeVisualizer';
import SearchBar from './components/searchBar';
import './App.scss';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightNode, setHighlightNode] = useState(null);

  const handleVisualize = (data) => {
    setJsonData(data);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleHighlight = (nodeId) => {
    setHighlightNode(nodeId);
  };

  return (
    <div className="app">
      <h1 className="app__title">JSON Tree Visualizer</h1>
      <div className="app__top">
        <div>
          <JsonInput onVisualize={handleVisualize} />
          <SearchBar onSearch={handleSearch} />
          {!jsonData ? 
          <p className="placeholder">Enter JSON and click Visualize to see the tree</p>
          : null}
        </div>

        {jsonData && (
          <TreeVisualizer
            data={jsonData}
            searchQuery={searchQuery}
            highlightNode={highlightNode}
            onHighlight={handleHighlight}
          />
        )}
      </div>
    </div>
  );
}

export default App;
