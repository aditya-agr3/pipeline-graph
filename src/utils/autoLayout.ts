import dagre from 'dagre';
import { Node, Edge, Position } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const autoLayout = (nodes: Node[], edges: Edge[]) => {
  // Configure dagre layout
  dagreGraph.setGraph({
    rankdir: 'LR', // Left to right layout
    nodesep: 100,  // Horizontal spacing between nodes
    ranksep: 150,  // Vertical spacing between ranks
    edgesep: 50,   // Edge separation
    marginx: 50,   // Margin
    marginy: 50,
  });

  // Clear previous graph
  nodes.forEach(node => {
    if (dagreGraph.hasNode(node.id)) {
      dagreGraph.removeNode(node.id);
    }
  });
  
  edges.forEach(edge => {
    if (dagreGraph.hasEdge(edge.source, edge.target)) {
      dagreGraph.removeEdge(edge.source, edge.target);
    }
  });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 140,  // Approximate node width
      height: 60,  // Approximate node height
    });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply new positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
      // Ensure handles are positioned correctly
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  });

  return {
    nodes: layoutedNodes,
    edges: edges.map(edge => ({
      ...edge,
      type: 'smoothstep',
    })),
  };
};