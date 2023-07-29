import { Outlet } from "react-router";
import { Helmet } from "react-helmet";
import { useTranslation } from "../../hooks/use-translation";

export function RootLayout() {
  const title = useTranslation("home.headline");
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Outlet />
    </>
  );
}
