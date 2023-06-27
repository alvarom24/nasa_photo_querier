import { ApiEndpoint, ApiKey } from '../constants/content';

export const getPhotos = async (params: string): Promise<ApiResponse[]> => {
  const response = await fetch(`${ApiEndpoint}${params}&api_key=${ApiKey}`)
    .then(res => res.json())
    .then(data => {
      return data.photos;
    })
    .catch(err => {
      console.log(err);
      return null;
    });

  return response;
};
