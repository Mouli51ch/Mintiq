import { Heading } from "../../common/heading";

export const dynamic = "force-static";
export const revalidate = 30;

export default function BlogPage() {
  return (
    <div className="container mx-auto py-20 text-center text-xl text-gray-400">
      <Heading align="center" subtitle="Mintiq Blog">
        <h1>Blog</h1>
      </Heading>
      <div className="mt-8">
        <p>No blog posts available.</p>
      </div>
    </div>
  );
}
