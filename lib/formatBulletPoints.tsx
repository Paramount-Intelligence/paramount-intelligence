import { ReactNode } from "react";

export function formatBulletPoints(text: string): ReactNode {
  if (!text) return null;

  // Split by newline, but we'll filter them carefully
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let bulletItems: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Regex to detect bullet points (•, -, *, >)
    const bulletMatch = trimmed.match(/^([•\-\*>])\s+(.*)/);

    if (bulletMatch) {
      bulletItems.push(bulletMatch[2]);
    } else {
      // 1. If we were collecting bullets and hit a non-bullet line, render the list first
      if (bulletItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc pl-6 space-y-2 text-gray-700 text-base leading-relaxed marker:text-[#17599d] mb-8">
            {bulletItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        bulletItems = [];
      }

      // 2. Handle Paragraphs
      if (trimmed) {
        elements.push(
          <p key={`p-${index}`} className="mb-6 text-gray-700 leading-relaxed text-base last:mb-0">
            {trimmed}
          </p>
        );
      }
    }
  });

  // 3. Final check for remaining bullets at the end of the text
  if (bulletItems.length > 0) {
    elements.push(
      <ul key="ul-end" className="list-disc pl-6 space-y-2 text-gray-700 text-base leading-relaxed marker:text-[#17599d] mb-8">
        {bulletItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }

  return <>{elements}</>;
}