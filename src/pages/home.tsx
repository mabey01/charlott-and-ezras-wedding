import { MediaGrid } from "../components/media-grid/media-grid";
import { useImageGroups } from "../hooks/use-image-groups";

export function HomePage() {
  const imageGroups = useImageGroups();

  return (
    <main className="min-h-screen p-2 md:p-4 lg:p-8 container mx-auto flex flex-col gap-32 md:gap-64">
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Night Before
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.nightBefore} />
      </div>
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Morning Of
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.morning} />
      </div>
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Arrival
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.arrival} />
      </div>
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Walk
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.walk} />
      </div>
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Ceremony
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.ceremony} />
      </div>
      <div>
        <h2 className="font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-9xl">
          The Reception
        </h2>
        <MediaGrid className="mt-16 lg:mt-32" media={imageGroups.reception} />
      </div>
    </main>
  );
}
