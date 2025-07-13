import { Node, Edge } from '@xyflow/react';

export interface DAGValidation {
  isValid: boolean;
  nodeCount: number;
  edgeCount: number;
  issues: string[];
}

export const validateDAG = (nodes: Node[], edges: Edge[]): DAGValidation => {
  const issues: string[] = [];
  
  // Check minimum nodes requirement
  if (nodes.length < 2) {
    issues.push('Pipeline must have at least 2 nodes');
  }
  
  // Check if all nodes are connected
  if (nodes.length > 0) {
    const connectedNodes = new Set<string>();
    edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });
    
    const disconnectedNodes = nodes.filter(node => !connectedNodes.has(node.id));
    if (disconnectedNodes.length > 0) {
      issues.push(`${disconnectedNodes.length} node(s) are not connected: ${disconnectedNodes.map(n => n.data?.label || n.id).join(', ')}`);
    }
  }
  
  // Check for cycles using DFS
  const hasCycles = detectCycles(nodes, edges);
  if (hasCycles) {
    issues.push('Pipeline contains cycles - DAGs must be acyclic');
  }
  
  // Check for self-loops (should be prevented by UI but double-check)
  const selfLoops = edges.filter(edge => edge.source === edge.target);
  if (selfLoops.length > 0) {
    issues.push('Self-connections are not allowed');
  }
  
  return {
    isValid: issues.length === 0 && nodes.length >= 2,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    issues,
  };
};

const detectCycles = (nodes: Node[], edges: Edge[]): boolean => {
  if (nodes.length === 0) return false;
  
  // Build adjacency list
  const adjacencyList: Record<string, string[]> = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });
  
  edges.forEach(edge => {
    if (adjacencyList[edge.source]) {
      adjacencyList[edge.source].push(edge.target);
    }
  });
  
  // DFS cycle detection using colors
  // White: 0 (unvisited), Gray: 1 (visiting), Black: 2 (visited)
  const colors: Record<string, number> = {};
  nodes.forEach(node => {
    colors[node.id] = 0;
  });
  
  const dfs = (nodeId: string): boolean => {
    if (colors[nodeId] === 1) {
      return true; // Back edge found - cycle detected
    }
    
    if (colors[nodeId] === 2) {
      return false; // Already processed
    }
    
    colors[nodeId] = 1; // Mark as visiting
    
    for (const neighbor of adjacencyList[nodeId] || []) {
      if (dfs(neighbor)) {
        return true;
      }
    }
    
    colors[nodeId] = 2; // Mark as visited
    return false;
  };
  
  // Check all components
  for (const node of nodes) {
    if (colors[node.id] === 0 && dfs(node.id)) {
      return true;
    }
  }
  
  return false;
};