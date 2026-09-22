import { Hero } from "../features/showroom/Hero";
import { HeritageStrip } from "../features/showroom/HeritageStrip";
import { ModelCollection } from "../features/showroom/ModelCollection";
import { StorySection } from "../features/showroom/StorySection";
import { PersonalizationSection } from "../features/showroom/PersonalizationSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <HeritageStrip />
      <ModelCollection />
      <StorySection />
      <PersonalizationSection />
    </>
  );
}
