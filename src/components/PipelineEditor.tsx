import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  MarkerType,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PipelineNode } from './nodes/PipelineNode';
import { PipelineToolbar } from './PipelineToolbar';
import { ValidationPanel } from './ValidationPanel';
import { JsonPreview } from './JsonPreview';
import { validateDAG, DAGValidation } from '../utils/dagValidation';
import { autoLayout } from '../utils/autoLayout';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const nodeTypes = {
  pipeline: PipelineNode,
};

const edgeOptions = {
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: 'hsl(var(--pipeline-connection))',
  },
  style: {
    stroke: 'hsl(var(--pipeline-connection))',
    strokeWidth: 2,
  },
};

export const PipelineEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  
  const { fitView } = useReactFlow();

  // Validate DAG whenever nodes or edges change
  const validation: DAGValidation = useMemo(() => {
    return validateDAG(nodes, edges);
  }, [nodes, edges]);

  // Handle connection creation with validation
  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection rules
      if (params.source === params.target) {
        console.warn('Self-connections are not allowed');
        return;
      }

      // Check if connection follows outgoing -> incoming rule
      if (params.sourceHandle !== 'source' || params.targetHandle !== 'target') {
        console.warn('Invalid connection: must connect from outgoing to incoming');
        return;
      }

      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        ...edgeOptions,
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Add new node
  const addNode = useCallback((label?: string) => {
    const nodeLabel = label || `Node ${nodeIdCounter}`;
    const newNode: Node = {
      id: `node-${nodeIdCounter}`,
      type: 'pipeline',
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      },
      data: { label: nodeLabel },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((count) => count + 1);
  }, [setNodes, nodeIdCounter]);

  // Delete selected elements
  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !selectedElements.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => !selectedElements.includes(edge.id)));
    setSelectedElements([]);
  }, [selectedElements, setNodes, setEdges]);

  // Auto layout using dagre
  const handleAutoLayout = useCallback(() => {
    const layoutedElements = autoLayout(nodes, edges);
    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
    
    // Fit view after layout
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
  }, [nodes, edges, setNodes, setEdges, fitView]);

  // Track selected elements
  const onSelectionChange = useCallback((params: any) => {
    const selectedNodeIds = params.nodes.map((node: Node) => node.id);
    const selectedEdgeIds = params.edges.map((edge: Edge) => edge.id);
    setSelectedElements([...selectedNodeIds, ...selectedEdgeIds]);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onDelete: deleteSelected,
    onAddNode: () => addNode(),
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex-none border-b bg-card shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pipeline Editor</h1>
            <p className="text-sm text-muted-foreground">
              Build and validate your data processing pipeline
            </p>
          </div>
          
          <PipelineToolbar
            onAddNode={addNode}
            onAutoLayout={handleAutoLayout}
            onToggleJson={() => setShowJsonPreview(!showJsonPreview)}
            canAutoLayout={nodes.length > 0}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Flow editor */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={edgeOptions}
            fitView
            className="bg-pipeline-grid"
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              color="hsl(var(--border))"
              gap={20}
              size={1}
            />
            <Controls 
              className="bg-card border border-border shadow-lg rounded-lg"
              showInteractive={false}
            />
            <MiniMap 
              className="bg-card border border-border rounded-lg"
              nodeClassName="fill-primary/20 stroke-primary"
              maskColor="hsl(var(--muted) / 0.6)"
            />
          </ReactFlow>

          {/* Validation status overlay */}
          <div className="absolute top-4 left-4 z-10">
            <ValidationPanel validation={validation} />
          </div>
        </div>

        {/* JSON Preview sidebar */}
        {showJsonPreview && (
          <div className="w-80 border-l bg-card flex-none">
            <JsonPreview nodes={nodes} edges={edges} validation={validation} />
          </div>
        )}
      </div>
    </div>
  );
};