import Link from "next/link";
import { Heading } from "../../common/heading";
// import { ChangelogList } from "./_components/changelog-list";
// import { changelogListFragment } from "./_components/changelog-fragment";
// import { PageView } from "../../components/page-view";
import type { Metadata } from "next";
// import { basehub } from "basehub";
// import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 30;

export const generateMetadata = async (): Promise<Metadata | undefined> => {
  return {
    title: "Changelog | Mintiq",
    description: "Latest updates and changes for Mintiq.",
  };
};

export default function ChangelogPage() {
  // Static placeholder changelog page
  return (
    <div className="container mx-auto py-20 text-center text-xl text-gray-400">
      <Heading align="center" subtitle="Latest updates and changes for Mintiq.">
        <h1>Changelog</h1>
      </Heading>
      <div className="mt-8">
        <p>No changelog entries available.</p>
      </div>
    </div>
  );
}
