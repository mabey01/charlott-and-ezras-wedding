export type Resolution = {
  width: number;
  height: number;
};

export type VisualQuality = "80sq" | "640sq" | "2560";

export type VisualFormat = "webp" | "avif" | "webm" | "jpeg";

export type VisualVariantData = {
  quality: VisualQuality;
  src: string;
  resolution: Resolution;
  formats: VisualFormat[];
};

export type ImageData = {
  type: "image";
  id: string;
  images: VisualVariantData[];
  meta: {
    name: string;
    dateTaken?: Date;
  };
};

export type VideoMeta = {
  name: string;
  title: string;
  dateTaken?: Date;
};

export type VideoData = {
  type: "video";
  id: string;
  videos: VisualVariantData[];
  poster?: ImageData;
  meta: VideoMeta;
};

export type AudioMeta = {
  name: string;
  title: string;
  artist: string;
};

export type AudioData = {
  type: "audio";
  id: string;
  src: string;
  meta: AudioMeta;
};

export type VisualMediaData = ImageData | VideoData;
export type AudioMediaData = VideoData | AudioData;
export type AnyMedia = VisualMediaData | AudioMediaData;

export type Orientations<K extends string> = {
  [P in K]: Resolution;
};
