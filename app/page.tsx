import SitePage from "@/components/site/SitePage";
import HomePage from "@/components/home/HomePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Paramount Intelligence | AI Engineering & Consulting",
  description:
    "Build useful AI, improve software, and take stalled projects into production with Paramount Intelligence's consulting and forward-deployed engineering.",
  path: "/",
});

export default function Home() {
  return (
    <SitePage>
      <HomePage />
    </SitePage>
  );
}
