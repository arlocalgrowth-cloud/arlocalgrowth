import { MetadataRoute } from "next";

const baseUrl = "https://ar-localgrowth.de";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: baseUrl,
          en: `${baseUrl}/en`,
          ru: `${baseUrl}/ru`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: new Date(),
    },
  ];
}
