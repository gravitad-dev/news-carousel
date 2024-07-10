import { axiosInstance } from './config';

export const getAllProjects = async () => {
  try {
    const { data } = await axiosInstance.get(`/projects`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
