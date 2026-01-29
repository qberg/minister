import type { Person, WithContext } from "schema-dts";

export function PersonJsonLd() {
  const data: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "T M Anbarasan",
    jobTitle: "Minister for MSME",
    nationality: "Indian",
    url: "https://alandur.minsky.dev",
    sameAs: [
      "https://twitter.com/thamoanbarasan",
      "https://facebook.com/thamoanbarasan",
      "https://en.wikipedia.org/wiki/T._M._Anbarasan",
    ],
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is safe here
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
