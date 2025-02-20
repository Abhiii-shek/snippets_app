import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

async function Hero() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="container mx-auto my-10 px-6 sm:px-8 lg:px-12">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">SnippetApp</h1>
        <Link href="/snippet/new">
          <Button className="text-lg sm:text-xl px-4 py-2">New</Button>
        </Link>
      </div>

      {/* Snippet List */}
      <section className="mt-6 grid gap-4 md:gap-6">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="flex flex-wrap justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-medium">{snippet.title}</h3>
            <Link href={`/snippet/${snippet.id}`}>
              <Button variant="link" className="text-sm sm:text-base">
                View
              </Button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Hero;
