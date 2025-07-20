import { notFound } from "next/navigation";
import { RichText } from "basehub/react-rich-text";
import type { Metadata } from "next";
import { Section } from "../../../common/section-wrapper";
import { authorFragment, darkLightImageFragment } from "../../../lib/basehub/fragments";
import { Heading } from "../../../common/heading";
import { Avatar } from "../../../common/avatar";
import {
  FaqItemComponentFragment,
  FaqRichtextComponent,
  richTextBaseComponents,
  RichTextCalloutComponent,
  richTextCalloutComponentFragment,
  richTextClasses,
} from "../../../components/rich-text";
import { CodeSnippet, codeSnippetFragment } from "../../../components/code-snippet";
import { basehub } from "basehub";
import { cx } from "class-variance-authority";
import { DarkLightImage } from "../../../common/dark-light-image";
import { PageView } from "../../../components/page-view";
import { formatDate } from "../../_utils/dates";

export const dynamic = "force-static";
export const revalidate = 30;

// Remove any generateStaticParams, getStaticProps, or basehub data fetching. Replace with static placeholder or notFound().
export default function BlogPostPage() {
  // Placeholder for blog post page
  return <div className="container mx-auto py-20 text-center text-xl text-gray-400">Blog post not available.</div>;
}
