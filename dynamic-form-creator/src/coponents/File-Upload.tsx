import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormError from './Form-Error';
import { uploadFile } from '../utils/fileUpload'; // Assuming you have a utility function for file uploads
import { FormField } from '../types/formTypes';

const FileUpload: React.FC<any> = ({ field, control, errors }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadConfig = field.data;
      const response = await uploadFile(file, uploadConfig, (progress) => {
        setUploadProgress(progress);
      });
      onChange(response.url); // Store the URL in the form data
      setUploadError('');
    } catch (error) {
      setUploadError('File upload failed');
      onChange(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.title}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.name}
        control={control}
        rules={{ required: field.required }}
        render={({ field: { onChange } }) => (
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, onChange)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
      />
      {uploadError && <p className="text-red-500 text-xs italic">{uploadError}</p>}
      <FormError errors={errors} name={field.name} message={field.error} />
    </div>
  );
};

export default FileUpload;