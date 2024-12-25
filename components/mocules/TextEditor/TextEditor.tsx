"use client";
import { ITextEditorProps } from "@/types/components";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Button } from "antd";
import React, { useEffect } from "react";

export interface ITextEditor {
  content: string;
}

const TextEditor = (props: ITextEditorProps) => {
  const editor = useCreateBlockNote();

  const fetchContent = async () => {
    try {
      const block = await editor.tryParseHTMLToBlocks(props.htmlContent);

      await editor.replaceBlocks(editor.document, block);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchContent();
  }, []);

  const onSubmit = async () => {
    const blocks = editor.document;
    const html = await editor.blocksToFullHTML(blocks);
    console.log({ html });
    const htmlBlock = await editor.tryParseHTMLToBlocks(props.htmlContent);

    console.log({ htmlBlock });
  };

  return (
    <>
      <div className="overflow-y-auto">
        <BlockNoteView className="p-0" editor={editor} />
      </div>
    </>
  );
};

export default TextEditor;
