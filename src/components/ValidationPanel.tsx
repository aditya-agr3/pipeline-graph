import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { DAGValidation } from '../utils/dagValidation';

interface ValidationPanelProps {
  validation: DAGValidation;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ validation }) => {
  const getStatusIcon = () => {
    if (validation.isValid) {
      return <CheckCircle className="w-4 h-4 text-success" />;
    }
    return <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getStatusBadge = () => {
    if (validation.isValid) {
      return (
        <Badge className="bg-success text-success-foreground">
          Valid DAG
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive text-destructive-foreground">
        Invalid DAG
      </Badge>
    );
  };

  return (
    <Card className="p-4 min-w-[280px] bg-card/95 backdrop-blur-sm border-border shadow-lg">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-semibold text-foreground">Pipeline Status</span>
          {getStatusBadge()}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">
            Nodes: <span className="font-mono text-foreground">{validation.nodeCount}</span>
          </div>
          <div className="text-muted-foreground">
            Edges: <span className="font-mono text-foreground">{validation.edgeCount}</span>
          </div>
        </div>

        {/* Issues */}
        {validation.issues.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-destructive">
              <AlertCircle className="w-3 h-3" />
              <span className="text-xs font-medium">Issues Found:</span>
            </div>
            <div className="space-y-1">
              {validation.issues.map((issue, index) => (
                <div
                  key={index}
                  className="text-xs text-muted-foreground p-2 bg-destructive/10 rounded border-l-2 border-destructive"
                >
                  {issue}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success message */}
        {validation.isValid && (
          <div className="flex items-start gap-2 text-success">
            <Info className="w-3 h-3 mt-0.5" />
            <div className="text-xs">
              Pipeline is valid and ready for execution!
            </div>
          </div>
        )}

        {/* Hints */}
        {validation.nodeCount === 0 && (
          <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
            💡 Start by adding nodes to your pipeline
          </div>
        )}
        
        {validation.nodeCount === 1 && (
          <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
            💡 Add more nodes and connect them to create a pipeline
          </div>
        )}
      </div>
    </Card>
  );
};