import apiClient from './api-client';

interface CountriesResponse {
  items: Array<{
    id: number;
    name: string;
    countryCode: string;
    phoneCode: string;
  }>;
}

export const getCountries = async () => {
  const response = await apiClient.get<CountriesResponse>('/countries');
  return response.data.items;
};
