import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { PipelineEditor } from '../components/PipelineEditor';

const Index = () => {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
};

export default Index;
