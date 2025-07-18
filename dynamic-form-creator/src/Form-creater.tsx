import React from 'react';
import { useForm, Control, FieldErrors } from 'react-hook-form';
import FormField from './coponents/Form-Field';
import { FormConfig } from './types/formTypes';
import axios from 'axios';

interface FormCreatorProps {
  formConfig: FormConfig;
  onSubmit: (data: any) => Promise<void>;
}

interface UploadResponse {
  success: boolean;
  fileUrl?: string;
  error?: string;
}

const FormCreator: React.FC<FormCreatorProps> = ({ formConfig, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const uploadFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      
      return {
        success: true,
        fileUrl: response.data.fileUrl
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'File upload failed'
      };
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // Handle file upload if exists
      if (data.profilePic && data.profilePic[0]) {
        const uploadResult = await uploadFile(data.profilePic[0]);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error);
        }
        data.profilePicUrl = uploadResult.fileUrl; // Add file URL to form data
      }

      // Submit form data
      await onSubmit(data);
      
    } catch (error) {
      console.error('Form submission error:', error);
      // You might want to show this error to the user
      alert(`Submission failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {formConfig.map((field) => (
        <FormField 
          key={field.name}
          field={field}
          control={control as Control}
          errors={errors as FieldErrors}
        />
      ))}
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FormCreator;