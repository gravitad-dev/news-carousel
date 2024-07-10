import { axiosInstance } from './config';

export const getImagesToAnalytics = async (projectId, advertisingId) => {
  try {
    const { data } = await axiosInstance.get(
      `carousel/project/${projectId}/advertising/${advertisingId}`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
