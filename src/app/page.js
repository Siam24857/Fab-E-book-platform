import Image from "next/image";
import HeroBanner from "./components/Banner";
import FeaturedEbooks from "./components/Feauters";
import TopWriters from "./components/Topwriters";
import EbookGenres from "./components/EbookGerace";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
       <HeroBanner></HeroBanner>
       <FeaturedEbooks></FeaturedEbooks>
       <TopWriters></TopWriters>
       <EbookGenres></EbookGenres>
    </div>
  );
}
