import { useCallback, useState } from 'react';
import { useNodesState, useEdgesState, Node } from 'reactflow';
import { useStore } from '../store/useStore';

export function useFlowNodes() {
  const [nodes, setNodes] = useNodesState<Node[]>([]);
  const [edges, setEdges] = useEdgesState([]);
  const addNode = useStore((state) => state.addNode);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeConfig, setNodeConfig] = useState<{ [key: string]: string }>({});
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);

  const onNodeClick = useCallback((nodeId: string) => {
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setNodeConfig(node.data.configurations);
      setConfigModalOpen(true);
    }
  }, [nodes]);

  const updateNodeConfig = (newConfig: { [key: string]: string }) => {
    if (selectedNode) {
      setNodeConfig(newConfig);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id ? { ...node, data: { ...node.data, configurations: newConfig } } : node
        )
      );
      setConfigModalOpen(false);
    }
  };

  const closeConfigModal = () => {
    setConfigModalOpen(false);
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const serviceId = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX, y: event.clientY };

      const newNode: Node = {
        id: `${serviceId}-${Date.now()}`,
        type: 'custom',
        position,
        data: { id: serviceId, label: serviceId, configurations: {} },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode(newNode);
    },
    [setNodes, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return {
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
  };
}
