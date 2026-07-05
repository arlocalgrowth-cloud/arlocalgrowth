import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE_URL = "https://arlocalgrowth.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          de: BASE_URL,
          en: `${BASE_URL}/en`,
          ru: `${BASE_URL}/ru`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ru`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          de: `${BASE_URL}/blog`,
          en: `${BASE_URL}/en/blog`,
          ru: `${BASE_URL}/ru/blog`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ru/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/en/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/ru/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/en/impressum`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/ru/impressum`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/leistungen/google-business-profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          de: `${BASE_URL}/leistungen/google-business-profile`,
          en: `${BASE_URL}/en/leistungen/google-business-profile`,
          ru: `${BASE_URL}/ru/leistungen/google-business-profile`,
        },
      },
    },
    {
      url: `${BASE_URL}/leistungen/local-seo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          de: `${BASE_URL}/leistungen/local-seo`,
          en: `${BASE_URL}/en/leistungen/local-seo`,
          ru: `${BASE_URL}/ru/leistungen/local-seo`,
        },
      },
    },
    {
      url: `${BASE_URL}/leistungen/bewertungsmanagement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          de: `${BASE_URL}/leistungen/bewertungsmanagement`,
          en: `${BASE_URL}/en/leistungen/bewertungsmanagement`,
          ru: `${BASE_URL}/ru/leistungen/bewertungsmanagement`,
        },
      },
    },
    {
      url: `${BASE_URL}/fur-russischsprachige`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          de: `${BASE_URL}/fur-russischsprachige`,
          ru: `${BASE_URL}/ru/fur-russischsprachige`,
        },
      },
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) => [
    {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          de: `${BASE_URL}/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
          ru: `${BASE_URL}/ru/blog/${post.slug}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ru/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
