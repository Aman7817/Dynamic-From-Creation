import axios from 'axios';

interface UploadConfig {
  url: string;
  method?: string;
  headers?: Record<string, string>;
}

export const uploadFile = async (
  file: File,
  config: UploadConfig,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios({
      method: config.method || 'POST',
      url: config.url,
      data: formData,
      headers: config.headers,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('File upload failed');
  }
};