import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import for Gemini API
import { useFlowNodes } from '../hooks/useFlowNodes';
import { prompt } from '../hooks/useFlowNodes'; // Import the global prompt



const CodePanel: React.FC = () => {
  const [prompt2, setPrompt] = useState('');
  const [terraformCode, setTerraformCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace with your actual API key
  const apiKey = 'AIzaSyBYaoERV-sNSmzh6qeC3jvrEd3jMz32of8';

  const generateTerraformCode = async () => {
    setLoading(true);
    try {
      // Initialize GoogleGenerativeAI client with your API key
      const genAI = new GoogleGenerativeAI(apiKey);
      console.log('Prompt from FlowNodes:', prompt); // Access the updated prompt

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const promptText = `Write Terraform code to ${prompt2}`; // Construct the prompt

      const result = await model.generateContent(promptText);

      // Ensure result.response.text is a string before trimming
      const generatedCode = (await result.response.text()).trim();
      setTerraformCode(generatedCode);
    } catch (error) {
      console.error('Error generating Terraform code:', error);
      setTerraformCode('Error generating Terraform code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-900 p-4 text-white overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Generated Terraform Code</h3>
        <button
          onClick={generateTerraformCode}
          className={`px-3 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600 ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      <textarea
        value={prompt2}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your resource requirements..."
        rows={4}
        className="w-full bg-gray-800 text-white p-2 rounded mb-4 text-sm"
      />

      <pre className="text-sm font-mono bg-gray-800 p-4 rounded">
        <code>
          {terraformCode || 'No Terraform code generated yet. Enter a prompt and click Generate.'}
        </code>
      </pre>
    </div>
  );
};

export default CodePanel;
