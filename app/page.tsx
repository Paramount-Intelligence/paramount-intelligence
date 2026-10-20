import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Paramount Intelligence | AI Engineering & Consulting",
  description:
    "Build useful AI, improve software, and take stalled projects into production with Paramount Intelligence's consulting and forward-deployed engineering.",
};

export default function Home() {
  return (
    <SitePage>
      <HomePage />
    </SitePage>
  );
}
