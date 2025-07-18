export interface FormFieldOption {
  id: string;
  title: string;
}

export interface FileUploadConfig {
  url: string;
  method?: string;
  headers?: Record<string, string>;
}

export type FormField = {
  title: string;
  name: string;
  placeholder?: string;
  type: 'text' | 'buttons' | 'select' | 'multiselect' | 'typeahead' | 'number' | 
        'textarea' | 'tel' | 'email' | 'file' | 'date' | 'datetime' | 'card' | 'frormConfig';
  validator?: string;
  min?: string;
  max?: string;
  resolution?: string;
  data?: FormFieldOption[] | FormField[] | FileUploadConfig;
  value?: any;
  required?: boolean;
  error?: string;
};

export type FormConfig = FormField[];