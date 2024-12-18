import { useCallback, useState } from 'react';
import { useNodesState, useEdgesState, addEdge, Node } from 'reactflow';
import { useStore } from '../store/useStore';
import ConfigForm from './ConfigForm'; // Import the ConfigForm component

export function useFlowNodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const addNode = useStore((state) => state.addNode);
  let sourceNode = null; // Declare globally
  let targetNode = null; // Declare globally

  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeConfig, setNodeConfig] = useState({});

  const [isConfigModalOpen, setConfigModalOpen] = useState(false); // To track the modal's state

  const generateCustomPrompt = (sourceNode, targetNode) => {
    const sourceConfig = sourceNode.data.configurations || {};
    const targetConfig = targetNode.data.configurations || {};

    return `${sourceNode.data.label} with configurations ${JSON.stringify(sourceConfig)} is connected with ${targetNode.data.label} with configurations ${JSON.stringify(targetConfig)}.`;
  };

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);

         sourceNode = nodes.find((node) => node.id === params.source);
         targetNode = nodes.find((node) => node.id === params.target);

        if (sourceNode && targetNode) {
          const prompt = generateCustomPrompt(sourceNode, targetNode);
          alert(prompt);
        }

        return newEdges;
      });
    },
    [setEdges, nodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - event.target.getBoundingClientRect().left,
        y: event.clientY - event.target.getBoundingClientRect().top,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: 'custom',
        position,
        data: { type, label: type, configurations: {} },
      };

      setNodes((nds) => nds.concat(newNode));
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((nodeId) => {
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setNodeConfig(node.data.configurations);
      setConfigModalOpen(true); // Open modal when a node is clicked
    }
  }, [nodes]);

  const updateNodeConfig = (newConfig) => {
    if (selectedNode) {
      setNodeConfig(newConfig);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id ? { ...node, data: { ...node.data, configurations: newConfig } } : node
        )
      );
      setConfigModalOpen(false); // Close modal after saving the configuration
    }
  };

  const closeConfigModal = () => {
    setConfigModalOpen(false); // Function to close the modal
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    onNodeClick,
    selectedNode,
    nodeConfig,
    updateNodeConfig,
    isConfigModalOpen,
    closeConfigModal, // Expose close function for modal
  };
}
