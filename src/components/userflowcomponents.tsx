import React from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowNodes } from '../hooks/useFlowNodes';
import { cloudServices, Compute, Storage, Network } from '../constants/cloudServices'; // Adjust the import based on your needs
import { ConfigForm } from '../config/configform'; // Create this modal component if not done

const UserFlowComponent: React.FC = () => {
  const {
    nodes,
    edges,
    onNodeClick,
    selectedNode,
    nodeConfig,
    updateNodeConfig,
    isConfigModalOpen,
    closeConfigModal,
    onDrop,
    onDragOver,
  } = useFlowNodes();

  return (
    <div className="user-flow-container">
      <div className="cloud-services-sidebar">
        {/* Map over cloudServices to display each category and items */}
        {cloudServices.map((category) => (
          <div key={category.category}>
            <h3>{category.category}</h3>
            <div>
              {category.items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, item.id)}
                  className="cloud-service-item"
                >
                  <item.icon />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flow-canvas"
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{ width: '100%', height: '100vh' }}
      >
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} />
      </div>

      {/* Configuration Modal */}
      {isConfigModalOpen && selectedNode && (
        <ConfigForm
          nodeConfig={nodeConfig}
          onClose={closeConfigModal}
          onSave={updateNodeConfig}
          selectedNode={selectedNode}
        />
      )}
    </div>
  );
};

export default UserFlowComponent;
