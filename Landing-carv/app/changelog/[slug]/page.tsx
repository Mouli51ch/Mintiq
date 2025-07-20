import { notFound } from "next/navigation";
import Link from "next/link";
import { BaseHubImage } from "basehub/next-image";
import { RichText } from "basehub/react-rich-text";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { Heading } from "../../../common/heading";
import { authorFragment, optimizedImageFragment } from "../../../lib/basehub/fragments";
import { CodeSnippet } from "../../../components/code-snippet";
import { richTextBaseComponents, richTextClasses } from "../../../components/rich-text";
import { ButtonLink } from "../../../common/button";
import { AvatarsGroup } from "../../../common/avatars-group";
import { Author } from "../../../common/avatar";
import { basehub } from "basehub";
import { formatDate } from "../../_utils/dates";
import { PageView } from "../../../components/page-view";

export const dynamic = "force-static";
export const revalidate = 30;

interface ChangelogPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = async ({
  params: _params,
}: ChangelogPageParams): Promise<Metadata | undefined> => {
  const params = await _params;
  const data = await basehub().query({
    site: {
      settings: {
        metadata: {
          titleTemplate: true,
          sitename: true,
        },
      },
      changelog: {
        posts: {
          __args: {
            filter: {
              _sys_slug: { eq: params.slug },
            },
            first: 1,
          },
          items: {
            _title: true,
            excerpt: true,
            ogImage: { url: true },
            _id: true,
          },
        },
      },
    },
  });

  const post = data.site.changelog.posts.items[0];

  if (!post) return undefined;

  const images = [{ url: post.ogImage.url }];

  return {
    title: post._title,
    description: post.excerpt,
    openGraph: {
      images,
    },
    twitter: {
      images,
      card: "summary_large_image",
      site: data.site.settings.metadata.sitename,
    },
  };
};

export default function ChangelogPostPage() {
  // Placeholder for changelog post page
  return <div className="container mx-auto py-20 text-center text-xl text-gray-400">Changelog post not available.</div>;
}
