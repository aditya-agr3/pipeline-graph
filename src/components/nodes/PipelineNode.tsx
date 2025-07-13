import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Database } from 'lucide-react';

interface PipelineNodeData {
  label: string;
}

export const PipelineNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as Partial<PipelineNodeData> | undefined;
  return (
    <div 
      className={`
        relative min-w-[120px] px-4 py-3 
        bg-gradient-to-br from-node to-node/95
        border-2 rounded-xl
        shadow-lg hover:shadow-xl
        transition-all duration-200
        ${selected 
          ? 'border-node-selected shadow-2xl shadow-primary/20 scale-105' 
          : 'border-border hover:border-primary/40'
        }
      `}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="w-3 h-3 !bg-primary border-2 border-background"
        style={{ left: -6 }}
      />

      {/* Node content */}
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm text-foreground">{nodeData?.label || 'Node'}</span>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="w-3 h-3 !bg-primary border-2 border-background"
        style={{ right: -6 }}
      />
    </div>
  );
});