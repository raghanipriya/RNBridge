import {Alert} from 'react-native';

const BASE_URL = 'https://stage.erp.promptgroup.co.in/';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ApiConfig = {
  method?: HttpMethod;
  endpoint: string;
  data?: any;
};

export const apiClient = async ({
  method = 'GET',
  endpoint,
  data,
}: ApiConfig) => {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `token fe96157e60f01be:64ed3cb071ac452`,
      'X-Frappe-CSRF-Token':
        'ab03ec0105e18693a8fccc00faff2862a99da749bca9e33550eb7f04',
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }
  console.log('\n\n 🚀 ~ apiClient ~ config:', url, config);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('🚀 ~ apiClient ~ errorText:', errorText);
      Alert.alert('Error', errorText);
      throw new Error(errorText || 'API Error');
    }

    console.log('\n\n 🚀 ~ apiClient ~ response:', response);
    return response.json();
  } catch (error) {
    throw error;
  }
};
