import React from 'react';
import { Controller } from 'react-hook-form';
import FormError from './Form-Error';
import { FormField } from '../types/formTypes';

const SelectField: React.FC<any> = ({ field, control, errors }) => {
  const options = field.data as Array<{ id: string; title: string }>;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.title}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.value || (field.type === 'multiselect' ? [] : '')}
        rules={{ required: field.required }}
        render={({ field: controllerField }) => (
          field.type === 'multiselect' ? (
            <select
              {...controllerField}
              multiple
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          ) : (
            <select
              {...controllerField}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          )
        )}
      />
      <FormError errors={errors} name={field.name} message={field.error} />
    </div>
  );
};

export default SelectField;