import EditContent from '@/components/EditContent'
import { prisma } from '@/lib/prisma';
import React from 'react'

const EditPage = async ({ params }: { params: { id: string } }) => {
    const id = parseInt(params.id);

    const snippet = await prisma.snippet.findUnique({
        where: { id },
    });

    if (!snippet) return <h1>Not a snippet</h1>;

    return <EditContent snippet={snippet} />;
};

export default EditPage;
