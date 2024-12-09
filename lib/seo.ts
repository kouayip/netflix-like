import type { Metadata } from "next";
import { Robots } from "next/dist/lib/metadata/types/metadata-types";

const APP_TITLE = "Netflix Like";
const APP_DESCRIPTION = `${APP_TITLE} is a application for film fanatics`;
const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export function getMetadata({
  title,
  description,
  pathname,
  images,
  robots,
}: {
  title?: string;
  description?: string;
  pathname?: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
  robots?: null | string | Robots;
}): Metadata {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description ?? APP_DESCRIPTION;
  //   const metaImages = images ?? [
  //     {
  //       url: `${SITE_URL}/opengraph-image.jpg`,
  //       width: 1024,
  //       height: 580,
  //       alt: `${APP_TITLE} Image Alt`,
  //     },
  //   ];

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(process.env.BASE_URL as string),
    creator: "Yves kams",
    applicationName: APP_TITLE,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      locale: "en_US",
      url: pathname,
      siteName: APP_TITLE,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      card: "summary_large_image",
      creator: "@yveskams_",
    },
    robots,
  };
}
