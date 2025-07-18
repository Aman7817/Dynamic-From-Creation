import React from 'react';
import FormField from './Form-Field';
import { FormField as FormFieldType } from '../types/formTypes';

interface FormCardProps {
  field: FormFieldType;
  control: any;
  errors: any;
}

const FormCard: React.FC<FormCardProps> = ({ field, control, errors }) => {
  const subFields = field.data as FormFieldType[];

  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3 className="font-bold mb-4 text-lg">{field.title}</h3>
      {subFields.map((subField) => (
        <FormField 
          key={subField.name}
          field={subField}
          control={control}
          errors={errors}
        />
      ))}
    </div>
  );
};

export default FormCard;