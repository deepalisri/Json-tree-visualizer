// src/utils/jsonToFlowNodes.js
let nodeId = 1;
const NODE_WIDTH = 140;
const NODE_HEIGHT = 60;
const HORIZONTAL_GAP = 220;
const VERTICAL_GAP = 90;

export function jsonToNodes(json, parentId = null, depth = 0, yOffset = 0) {
  const nodes = [];
  const edges = [];

  function traverse(key, value, parentId, depth, yPos) {
    const id = `${nodeId++}`;
    let label = "";
    let bgColor = "";

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        label = key ? `${key} [ ]` : "[ ]";
        bgColor = "#34d399"; // array color (greenish)
      } else {
        label = key ? `${key} { }` : "{ }";
        bgColor = "#818cf8"; // object color (blue/purple)
      }
    } else {
      label = `${key}: ${String(value)}`;
      bgColor = "#fbbf24"; // primitive color (yellow/orange)
    }

    const node = {
      id,
      data: { label },
      position: { x: depth * HORIZONTAL_GAP, y: yPos },
      style: {
        backgroundColor: bgColor,
        color: "#000",
        padding: 10,
        borderRadius: 10,
        width: NODE_WIDTH,
        textAlign: "center",
        fontSize: 14,
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `e${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: false,
        style: { stroke: "#999" },
      });
    }

    // Recursively add children
    if (typeof value === "object" && value !== null) {
      const entries = Array.isArray(value)
        ? Array.from(value.entries())
        : Object.entries(value);

      let childY = yPos;
      for (const [childKey, childValue] of entries) {
        const subtree = traverse(childKey, childValue, id, depth + 1, childY);
        childY += subtree.totalHeight + VERTICAL_GAP;
      }

      // total height of this subtree
      const totalHeight =
        (entries.length - 1) * (NODE_HEIGHT + VERTICAL_GAP) || NODE_HEIGHT;
      return { totalHeight };
    }

    return { totalHeight: NODE_HEIGHT };
  }

  if (typeof json === "object" && json !== null) {
    const rootNode = {
      id: "root",
      data: { label: "root" },
      position: { x: 0, y: yOffset },
      style: {
        backgroundColor: "#6366f1",
        color: "#fff",
        padding: 10,
        borderRadius: 10,
        width: NODE_WIDTH,
        textAlign: "center",
        fontSize: 15,
        border: "1px solid #444",
      },
    };
    nodes.push(rootNode);

    let childY = yOffset;
    for (const [key, value] of Object.entries(json)) {
      const subtree = traverse(key, value, "root", 1, childY);
      childY += subtree.totalHeight + VERTICAL_GAP;
    }
  } else {
    nodes.push({
      id: "root",
      data: { label: String(json) },
      position: { x: 0, y: yOffset },
      style: {
        backgroundColor: "#fbbf24",
        borderRadius: 10,
        width: NODE_WIDTH,
        textAlign: "center",
      },
    });
  }

  return { nodes, edges };
}
