import { HomeHeroSect, HomeContent01 } from './elements/sections';


export default function Home(): JSX.Element {
  return (
    //  remarks: overriding main container's padding
    <>
    <div className="relative h-screen w-full -mt-4 md:-mt-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-screen z-0">
        <HomeHeroSect />
      </div>
    </div>
    <HomeContent01 />
    </>
  );
}
