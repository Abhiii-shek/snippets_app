"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function saveSnippet(id: number, code: string) {
    try {
        console.log(`Updating snippet ${id}...`); // Debugging

        const updatedSnippet = await prisma.snippet.update({
            where: { id },
            data: { code },
        });

        console.log(`Snippet ${id} updated successfully:`, updatedSnippet);

        revalidatePath(`/snippet/${id}`);

        return { success: true };
    } catch (error) {
        console.error("Error updating snippet:", error);
        return { success: false, message: "Failed to update snippet." };
    }
}

export const deleteSnippet = async (id: number) => {
    await prisma.snippet.delete({
        where: {
            id,
        },
    });
    redirect("/");
};

//create action
export async function createNewSnipp(
    prevState: { message: string },
    formData: FormData
) {
    try {
        "use server"
        const title = formData.get("title");
        const code = formData.get("code");

        if (typeof title !== "string" || title.length < 4) {
            return { message: "title is required and title shoule be longer" };
        }

        if (typeof code !== "string" || code.length < 4) {
            return { message: " is required and title shoule be longer" };
        }

        const snippet = await prisma.snippet.create({
            data: {
                title,
                code,
            },
        });
        console.log("snippet created", snippet);

        throw new Error();
    } catch (error: any) {
        return { message: error.message };
    }

    redirect("/");
}
