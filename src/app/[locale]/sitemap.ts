import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE_URL = "https://arlocalgrowth.de";

function localeUrl(path: string, locale: string) {
  return locale === "de" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

function trilingualPage(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
): MetadataRoute.Sitemap {
  return ["de", "en", "ru"].map((locale) => ({
    url: localeUrl(path, locale),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        de: localeUrl(path, "de"),
        en: localeUrl(path, "en"),
        ru: localeUrl(path, "ru"),
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Blog article entries (all locales)
  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    ["de", "en", "ru"].map((locale) => ({
      url: localeUrl(`/blog/${post.slug}`, locale),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          de: localeUrl(`/blog/${post.slug}`, "de"),
          en: localeUrl(`/blog/${post.slug}`, "en"),
          ru: localeUrl(`/blog/${post.slug}`, "ru"),
        },
      },
    })),
  );

  return [
    // Homepage
    ...trilingualPage("/", 1.0, "weekly"),

    // FAQ — high priority (GEO/AEO asset)
    ...trilingualPage("/faq", 0.9, "monthly"),

    // Blog index
    ...trilingualPage("/blog", 0.8, "weekly"),

    // Service pages
    ...trilingualPage("/leistungen", 0.9, "monthly"),
    ...trilingualPage("/leistungen/google-business-profile", 0.85, "monthly"),
    ...trilingualPage("/leistungen/local-seo", 0.85, "monthly"),
    ...trilingualPage("/leistungen/bewertungsmanagement", 0.85, "monthly"),

    // Niche page
    ...trilingualPage("/fur-russischsprachige", 0.7, "monthly"),

    // Blog articles
    ...blogEntries,

    // Legal
    ...trilingualPage("/datenschutz", 0.3, "yearly"),
    ...trilingualPage("/impressum", 0.2, "yearly"),
  ];
}
