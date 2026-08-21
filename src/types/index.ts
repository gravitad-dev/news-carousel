export interface Image {
  _id?: string;
  active?: boolean;
  secure_url?: string;
  public_id?: string;
}

export interface Campaign {
  _id: string;
  title: string;
  images?: Image[];
  active?: boolean;
  projectId: string;
}

export interface Project {
  _id: string;
  title: string;
  advertisingIds: string[]; // IDs de las campañas asociadas
}

export type PortalType = "elpais" | "elmundo" | "bbc" | "cnn";

export interface PortalTemplateProps {
  bannerUrl: string;
  onBannerClick: () => void;
  externalUrl?: string;
  campaignName?: string;
  images?: Image[];
  rotationInterval?: number; // seconds
}
