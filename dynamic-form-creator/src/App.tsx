import React from 'react';
import FormCreator from './Form-creater';
import { FormConfig } from './types/formTypes';


// Basic form configuration for demonstration
const basicFormConfig: FormConfig = [
  {
    title: "Name",
    name: "name",
    placeholder: "Enter your name",
    type: "text",
    validator: "^[a-zA-Z ]{3,}$",
    value: "",
    required: true,
    error: "Name must be at least 3 letters."
  },
  {
    title: "Email",
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    validator: "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
    required: true,
    value: "",
    error: "Invalid email format."
  }
];



const App: React.FC = () => {
  const handleSubmit = async (data: any): Promise<void> => {
    console.log('Form submitted:', data);
    // You can send this data to your backend here
  };
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Dynamic Form Creator</h1>
      <FormCreator formConfig={basicFormConfig} onSubmit={handleSubmit} />
    </div>
  );
};

/*
const App: React.FC = () => {
  // Example form configuration
  const formConfig: FormConfig = [
    {
      "title": "education-summary",
      "type": "card",
      "name": "education",
      "data": [
        {
          "title": "education",
          "type": "text",
          "name": "educationLevel",
          "required": true,
          "error": "education level is required",
        }
      ]
    },
    {
      "title": "profile-photo",
      "type": "file",
      "name": "profilePic",
      "data": {
        "url": "http://localhost:3001/upload",
        "method": "POST"
      },
      "required": false,
      "error": "profile photo is required",
    }
  ];

  const handleSubmit = async (data: any) => {
    console.log('Form Data', data);
    
    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:3001/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      console.log('response', result);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Dynamic Form</h1>
      <FormCreator 
        formConfig={formConfig} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};
*/

export default App;