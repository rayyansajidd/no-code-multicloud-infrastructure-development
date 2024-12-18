import React, { useState, useEffect } from 'react';

interface ConfigFormProps {
  nodeConfig: { [key: string]: string };
  onClose: () => void;
  onSave: (config: { [key: string]: string }) => void;
  selectedNode: any; // Update with appropriate node type if needed
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ nodeConfig, onClose, onSave, selectedNode }) => {
  const [config, setConfig] = useState<{ [key: string]: string }>(nodeConfig);

  useEffect(() => {
    setConfig(nodeConfig); // Reset form when nodeConfig changes
  }, [nodeConfig]);

  const handleSave = () => {
    onSave(config);
  };

  return (
    <div className="config-form-modal" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div
        className="config-form"
        style={{
          backgroundColor: 'white',
          margin: '100px auto',
          padding: '20px',
          width: '300px',
          borderRadius: '8px',
        }}
      >
        <h2>Configure {selectedNode?.data.label}</h2>
        {/* Render your node configuration form here */}
        <div>
          {Object.keys(config).map((key) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label>{key}</label>
              <input
                type="text"
                value={config[key]}
                onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
