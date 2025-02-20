import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import * as actions from "@/action";

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return <h1>Invalid ID</h1>;
  }

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return <h1>Snippet not found</h1>;
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="container mx-auto my-6 px-4 sm:px-6 md:px-8">
      <h1 className="font-semibold text-2xl sm:text-3xl mb-4">{snippet.title}</h1>

      {/* Button Group */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <Link href={`/snippet/${snippet.id}/edit`}>
          <Button className="text-lg px-4 py-2" variant="outline">
            Edit
          </Button>
        </Link>

        <form action={deleteSnippetAction}>
          <Button type="submit" className="text-lg px-4 py-2" variant="destructive">
            Delete
          </Button>
        </form>
      </div>

      {/* Code Display */}
      <pre className="bg-gray-100 border p-4 sm:p-6 rounded-lg my-4 overflow-auto">
        <code className="text-sm sm:text-base">{snippet.code}</code>
      </pre>
    </div>
  );
}
