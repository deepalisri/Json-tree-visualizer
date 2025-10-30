export function searchNode(nodes, query) {
  if (!query) return null;
  return nodes.find((n) => n.data.label === query || 
  n.data.label.toLowerCase().includes(query) || 
  n.data.label.toUpperCase().includes(query) ||
  n.data.label.includes(query.toLowerCase()) ||
  n.data.label.includes(query.toUpperCase()) ||
  n.data.label.includes(query)
);
}
