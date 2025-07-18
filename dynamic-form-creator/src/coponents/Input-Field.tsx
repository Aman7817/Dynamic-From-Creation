import React from 'react';
import { Controller } from 'react-hook-form';
import FormError from './Form-Error';
import { FormField } from '../types/formTypes';

interface InputFieldProps {
  field: FormField;
  control: any;
  errors: any;
}

const InputField: React.FC<InputFieldProps> = ({ field, control, errors }) => {
  const inputType = field.type === 'number' ? 'number' : 
                   field.type === 'textarea' ? 'textarea' :
                   field.type === 'date' || field.type === 'datetime' ? field.type :
                   'text';

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.title}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.value || ''}
        rules={{
          required: field.required,
          pattern: field.validator ? new RegExp(field.validator) : undefined,
          min: field.min,
          max: field.max
        }}
        render={({ field: controllerField }) => (
          inputType === 'textarea' ? (
            <textarea
              {...controllerField}
              placeholder={field.placeholder}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
            />
          ) : (
            <input
              {...controllerField}
              type={inputType}
              placeholder={field.placeholder}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={field.min}
              max={field.max}
              step={field.resolution}
            />
          )
        )}
      />
      <FormError errors={errors} name={field.name} message={field.error} />
    </div>
  );
};

export default InputField;