import { Outlet } from "react-router";
import { Helmet } from "react-helmet";
import { useTranslation } from "../../hooks/use-translation";
import { pickMediaById } from "../../utils/images/pick-media-by-id";
import { useImageContext } from "../../hooks/use-image-context";
import { getVariantDataByMediaData } from "../../utils/images/get-variant-data";

export function RootLayout() {
  const { allImages } = useImageContext();
  const title = useTranslation("home.headline");
  const description = useTranslation("seo.description");

  const image = pickMediaById(allImages, "00152");
  const variantData = getVariantDataByMediaData(image, "640sq");

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={description} />
        <meta property="og:image" content={`${variantData.src}.jpeg`}></meta>
      </Helmet>
      <Outlet />
    </>
  );
}
