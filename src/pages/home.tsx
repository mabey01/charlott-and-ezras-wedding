import { useSearchParams } from "react-router-dom";
import { GridViewBlock } from "../components/grid-view-block/grid-view-block";
import { MediaGrid } from "../components/media-grid/media-grid";
import { useImageGroups } from "../hooks/use-image-groups";
import { useLayoutEffect, useMemo } from "react";
import { Translate } from "../components/translate/translate";
import { LanguageSwitcher } from "../components/language-switcher/language-switcher";
import { formatDate } from "../utils/format-date";

export default function HomePage() {
  const imageGroups = useImageGroups();
  const [searchParams] = useSearchParams();

  const formattedDate = useMemo(() => {
    return formatDate(navigator.language, new Date(Date.UTC(2023, 6, 22)));
  }, []);

  useLayoutEffect(() => {
    const lastSeenImage = searchParams.get("image");
    const imageComponent = document.querySelector(`#image-${lastSeenImage}`);
    if (imageComponent) {
      imageComponent.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <>
      <header className="flex flex-col w-screen h-screen overflow-hidden">
        <div className="text-neutral-800 flex flex-col justify-center">
          <div className="flex flex-col items-center py-16 md:py-24">
            <span className="text-neutral-400">{formattedDate}</span>
            <h1 className="font-bold text-4xl xl:text-5xl font-serif text-center lg:mt-2">
              <Translate k="home.headline" />
            </h1>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col justify-center px-1 md:px-4">
          <div className="aspect-video max-w-6xl mx-auto h-full">
            <video
              className="h-full object-contain rounded-xl overflow-hidden"
              width="1920"
              height="1080"
              src="https://storage.googleapis.com/charlott-and-ezras-wedding-media-files/videos/Wedding%20Header.mp4"
              autoPlay
              muted
              loop
              controls
            />
          </div>
        </div>

        <div className="flex-1 pb-4 mt-16 flex flex-col gap-1 justify-end items-center">
          <LanguageSwitcher className="text-neutral-400 text-sm" />
          <a
            href="#the-night-before"
            className="text-neutral-400 hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </a>
        </div>
      </header>
      <main className="p-2 mt-32 md:p-4 lg:p-8 container mx-auto flex flex-col gap-32 md:gap-64 xl:gap-80">
        <GridViewBlock
          id="the-night-before"
          headline={<Translate k="home.chapters.nightBefore" />}
        >
          <MediaGrid media={imageGroups.nightBefore} />
        </GridViewBlock>

        <GridViewBlock headline={<Translate k="home.chapters.morning" />}>
          <MediaGrid media={imageGroups.morning} />
        </GridViewBlock>
        <GridViewBlock headline={<Translate k="home.chapters.arrival" />}>
          <MediaGrid media={imageGroups.arrival} />
        </GridViewBlock>
        <GridViewBlock headline={<Translate k="home.chapters.walk" />}>
          <MediaGrid media={imageGroups.walk} />
        </GridViewBlock>
        <GridViewBlock headline={<Translate k="home.chapters.ceremony" />}>
          <MediaGrid media={imageGroups.ceremony} />
        </GridViewBlock>
        <GridViewBlock headline={<Translate k="home.chapters.reception" />}>
          <MediaGrid media={imageGroups.reception} />
        </GridViewBlock>
      </main>
    </>
  );
}
