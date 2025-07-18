import React from 'react';

interface FormErrorProps {
  errors: any;
  name: string;
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ errors, name, message }) => {
  if (!errors || !errors[name]) return null;

  return (
    <p className="text-red-500 text-xs italic mt-1">
      {message || errors[name].message}
    </p>
  );
};

export default FormError;