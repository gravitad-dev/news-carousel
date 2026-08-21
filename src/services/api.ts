import axios from "axios";
import type { Project, Campaign } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const api = axios.create({
  baseURL: API_URL
});

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get("/advertising");
  return response.data;
};

export const trackClick = async (
  advertisingId: string,
  country: string = "ESP"
): Promise<void> => {
  await api.post(`/clickCounts/${advertisingId}`, {
    counts: 1,
    country: country
  });
};
