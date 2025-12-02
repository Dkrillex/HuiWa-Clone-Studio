import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ToolPanel } from './components/ToolPanel';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState('fission');

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeToolId={activeToolId} onSelectTool={setActiveToolId} />
        <ToolPanel tool={activeTool} />
      </div>
    </div>
  );
};

export default App;