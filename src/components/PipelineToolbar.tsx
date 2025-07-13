import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, LayoutDashboard, Code, Sparkles } from 'lucide-react';

interface PipelineToolbarProps {
  onAddNode: (label?: string) => void;
  onAutoLayout: () => void;
  onToggleJson: () => void;
  canAutoLayout: boolean;
}

export const PipelineToolbar: React.FC<PipelineToolbarProps> = ({
  onAddNode,
  onAutoLayout,
  onToggleJson,
  canAutoLayout,
}) => {
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');

  const handleAddNode = () => {
    onAddNode(nodeLabel.trim() || undefined);
    setNodeLabel('');
    setIsAddNodeOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Add Node Dialog */}
      <Dialog open={isAddNodeOpen} onOpenChange={setIsAddNodeOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Node
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Add a new node to the pipeline</TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Node Label</label>
              <Input
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                placeholder="Enter node name..."
                className="mt-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddNode();
                  }
                }}
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddNodeOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddNode}>
                <Plus className="w-4 h-4 mr-1" />
                Add Node
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto Layout */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={onAutoLayout}
            disabled={!canAutoLayout}
          >
            <Sparkles className="w-4 h-4" />
            Auto Layout
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Automatically arrange nodes in a clean layout
        </TooltipContent>
      </Tooltip>

      {/* Toggle JSON Preview */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={onToggleJson}
          >
            <Code className="w-4 h-4" />
            JSON
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Toggle JSON preview panel
        </TooltipContent>
      </Tooltip>
    </div>
  );
};