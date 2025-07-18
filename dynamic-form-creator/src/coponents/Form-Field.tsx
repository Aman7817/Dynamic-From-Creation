import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import InputField from './Input-Field';
import SelectField from './Select-Field';
import FileUpload from './File-Upload';
import FormCard from './Form-Card';
import { FormField } from '../types/formTypes';

interface FormFieldProps {
  field: FormField;
  control: Control;
  errors: FieldErrors;
}

const FormFieldComponent: React.FC<FormFieldProps> = ({ field, control, errors }) => {
  switch(field.type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'number':
    case 'date':
    case 'datetime':
    case 'textarea':
      return <InputField field={field} control={control} errors={errors} />;
    case 'select':
    case 'multiselect':
      return <SelectField field={field} control={control} errors={errors} />;
    case 'file':
      return <FileUpload field={field} control={control} errors={errors} />;
    case 'card':
      return <FormCard field={field} control={control} errors={errors} />;
    default:
      console.warn(`Unsupported field type: ${field.type}`);
      return null;
  }
};

export default FormFieldComponent;