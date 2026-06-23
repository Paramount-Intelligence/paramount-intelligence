"use client";

import { useState } from "react";
import CaseStudiesHero from "@/components/casestudies/Hero";
import CaseStudiesGrid from "@/components/casestudies/CaseStudiesGrid";

export default function CaseStudiesClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CaseStudiesHero onSearchChange={setSearchQuery} />
      <CaseStudiesGrid searchQuery={searchQuery} />
    </>
  );
}
