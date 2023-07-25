import { VisualFormat } from "../../types/media";

export function getFormatType(format: VisualFormat) {
  if (format === "webp") return "image/webp";
  if (format === "avif") return "image/avif";
  if (format === "webm") return "video/webm";
  if (format === "jpeg") return "video/jpg";

  throw Error(`${format} is not supported`);
}
