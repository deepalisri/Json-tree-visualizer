import { useEffect, useState } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { jsonToNodes } from '../utils/jsonToNode';
import { searchNode } from '../utils/searchNode';
import '../styles/visualizer.scss';

function TreeVisualizer({ data, searchQuery, onHighlight }) {
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { nodes, edges } = jsonToNodes(data);
    setElements({ nodes, edges });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (searchQuery) {
      const match = searchNode(elements.nodes, searchQuery);
      if (match) {
        setMessage('✅ Match found');
        onHighlight(match.id);
        setElements((prev) => ({
          ...prev,
          nodes: prev.nodes.map((n) =>
            n.id === match.id
              ? { ...n, style: { ...n.style, border: '2px solid red' } }
              : { ...n, style: { ...n.style, border: 'none' } }
          ),
        }));
      } else {
        setMessage('❌ No match found');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="tree-container">
      {message && <p className="tree-msg">{message}</p>}
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        fitView
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#999', strokeWidth: 1 },
        }}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default TreeVisualizer;
