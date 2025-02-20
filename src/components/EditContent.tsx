"use client";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "./ui/button";
import saveSnippet from "@/action";
import { Snippet } from "@prisma/client";

const EditContent = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);
  const router = useRouter(); 

  const changeEventHandler = (value: string = "") => {
    setCode(value);
  };

  const saveSnippetAction = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await saveSnippet(snippet.id, code); // Save snippet in the database
      router.push(`/snippet/${snippet.id}`); // Redirect to snippet page
    } catch (error) {
      console.error("Error saving snippet:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <form className="flex flex-wrap justify-between items-center my-4" onSubmit={saveSnippetAction}>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Code Editor</h1>
        <Button type="submit" className="mt-2 sm:mt-0">
          Save
        </Button>
      </form>

      <Editor
        className="my-4"
        height="50vh"
        width="100%" 
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={changeEventHandler}
      />
    </div>
  );
};

export default EditContent;
