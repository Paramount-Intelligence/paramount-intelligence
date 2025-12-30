"use client";

import { useState } from "react";
import CaseStudiesHero from "@/components/casestudies/Hero";
import CaseStudiesGrid from "@/components/casestudies/CaseStudiesGrid";

export default function CaseStudiesClient() {
  const [selectedIndustry, setSelectedIndustry] = useState(
    "Education & EduTech"
  );
  const [selectedBusinessFunction, setSelectedBusinessFunction] =
    useState("All");

  return (
    <>
      <CaseStudiesHero
        onIndustryChange={setSelectedIndustry}
        onBusinessFunctionChange={setSelectedBusinessFunction}
      />
      <CaseStudiesGrid
        selectedIndustry={selectedIndustry}
        selectedBusinessFunction={selectedBusinessFunction}
      />
    </>
  );
}
