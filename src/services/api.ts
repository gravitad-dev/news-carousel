import axios from "axios";
import type { Campaign, Image, Project } from "../types";

const STRAPI_URL =
  import.meta.env.VITE_STRAPI_URL || "http://localhost:1340";
const REALTIME_URL =
  import.meta.env.VITE_REALTIME_URL || "http://localhost:9001";

const strapi = axios.create({
  baseURL: `${STRAPI_URL}/api`
});

const realtime = axios.create({
  baseURL: REALTIME_URL
});

type StrapiRecord = Record<string, unknown>;

const asRecord = (value: unknown): StrapiRecord | undefined => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  return value as StrapiRecord;
};

const asString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const asBoolean = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined;

const asArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

const mapImage = (value: unknown): Image => {
  const raw = asRecord(value) ?? {};
  const publicId = asString(raw.public_id);

  return {
    _id: publicId ?? asString(raw.id),
    active: asBoolean(raw.active) ?? true,
    secure_url: asString(raw.secure_url),
    public_id: publicId
  };
};

const mapProject = (value: unknown): Project => {
  const raw = asRecord(value) ?? {};

  return {
    _id: asString(raw.documentId) ?? asString(raw.id) ?? "",
    title: asString(raw.title) ?? "",
    advertisingIds: []
  };
};

const mapCampaign = (value: unknown): Campaign => {
  const raw = asRecord(value) ?? {};
  const project = asRecord(raw.project);

  return {
    _id: asString(raw.documentId) ?? asString(raw.id) ?? "",
    title: asString(raw.title) ?? "",
    images: asArray(raw.images).map(mapImage),
    active: asBoolean(raw.active) ?? true,
    projectId: asString(project?.documentId) ?? ""
  };
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await strapi.get("/projects", {
    params: { fields: "documentId,title" }
  });
  return asArray(asRecord(response.data)?.data).map(mapProject);
};

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await strapi.get("/advertisings", {
    params: {
      fields: "documentId,title,active",
      "populate[images]": "true",
      "populate[project][fields]": "documentId"
    }
  });
  return asArray(asRecord(response.data)?.data).map(mapCampaign);
};

export const trackClick = async (
  advertisingId: string,
  count: number,
  country: string = "ESP"
): Promise<void> => {
  await realtime.post(`/clickCounts/${advertisingId}`, {
    counts: count,
    country
  });
};
