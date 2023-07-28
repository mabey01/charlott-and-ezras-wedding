import { useSearchParams } from "react-router-dom";
import { GridViewBlock } from "../components/grid-view-block/grid-view-block";
import { MediaGrid } from "../components/media-grid/media-grid";
import { useImageGroups } from "../hooks/use-image-groups";
import { useLayoutEffect } from "react";

export default function HomePage() {
  const imageGroups = useImageGroups();
  const [searchParams] = useSearchParams();

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
        <div className="flex-1 text-neutral-800 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <span className="text-neutral-400">22.07.2023</span>
            <h1 className="font-bold text-4xl xl:text-5xl font-serif text-center lg:mt-2">
              Charlott and Ezra's Wedding
            </h1>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col justify-center px-1 md:px-4 lg:px-16 xl:px-32">
          <div className="aspect-video">
            <video
              className="h-full object-cover rounded-xl"
              width="1920"
              height="1080"
              src="https://storage.googleapis.com/charlott-and-ezras-wedding-media-files/videos/Wedding%20Header%20v8.mp4"
              autoPlay
              muted
              loop
              controls
            />
          </div>
        </div>

        <div className="h-[33%] md:h-[15%] xl:h-[10%] pb-4 flex justify-center items-end">
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
      <main className="p-2 mt-32 md:p-4 lg:p-8 container mx-auto flex flex-col gap-32 md:gap-64">
        <GridViewBlock id="the-night-before" headline="The Night Before">
          <MediaGrid media={imageGroups.nightBefore} />
        </GridViewBlock>

        <GridViewBlock headline="The Morning Of">
          <MediaGrid media={imageGroups.morning} />
        </GridViewBlock>
        <GridViewBlock headline="The Arrival">
          <MediaGrid media={imageGroups.arrival} />
        </GridViewBlock>
        <GridViewBlock headline="The Walk">
          <MediaGrid media={imageGroups.walk} />
        </GridViewBlock>
        <GridViewBlock headline="The Ceremony">
          <MediaGrid media={imageGroups.ceremony} />
        </GridViewBlock>
        <GridViewBlock headline="The Reception">
          <MediaGrid media={imageGroups.reception} />
        </GridViewBlock>
      </main>
    </>
  );
}
