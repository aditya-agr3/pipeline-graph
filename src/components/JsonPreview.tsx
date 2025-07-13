import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { Node, Edge } from '@xyflow/react';
import { DAGValidation } from '../utils/dagValidation';
import { useToast } from '@/hooks/use-toast';

interface JsonPreviewProps {
  nodes: Node[];
  edges: Edge[];
  validation: DAGValidation;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ nodes, edges, validation }) => {
  const { toast } = useToast();

  const pipelineData = {
    pipeline: {
      id: `pipeline-${Date.now()}`,
      name: 'Untitled Pipeline',
      version: '1.0.0',
      status: validation.isValid ? 'valid' : 'invalid',
      created: new Date().toISOString(),
    },
    nodes: nodes.map(node => ({
      id: node.id,
      type: node.type,
      label: node.data?.label,
      position: node.position,
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
    })),
    validation: {
      isValid: validation.isValid,
      nodeCount: validation.nodeCount,
      edgeCount: validation.edgeCount,
      issues: validation.issues,
    },
  };

  const jsonString = JSON.stringify(pipelineData, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      toast({
        title: 'Copied to clipboard',
        description: 'Pipeline JSON has been copied to your clipboard',
      });
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex-none border-b p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Pipeline JSON</h3>
          <Badge variant={validation.isValid ? 'default' : 'destructive'}>
            {validation.isValid ? 'Valid' : 'Invalid'}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="flex-1"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={downloadJson}
            className="flex-1"
          >
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap break-words">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};