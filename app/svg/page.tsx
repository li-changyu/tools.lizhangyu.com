'use client';
import Button from "@/ui/button";
import { useRef, useState } from "react";

export default function Page() {
  const textareaInput = useRef<HTMLTextAreaElement>(null)
  const [svgOutput, setSvgOutput] = useState('')

  return (
    <>
      <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black overflow-hidden">
          <textarea className="w-full bg-inherit rounded-lg border-none  min-h-[300px]" name="" id="svg-input" ref={textareaInput}></textarea>
        </div>
      </div>

      <Button onClick={async () => {
        const result = await (await fetch('/api/svgCompress', {
          method: 'POST',
          body: JSON.stringify({
            svg: textareaInput.current!.value
          })
        })).json()
        setSvgOutput(result.data.svg)
      }}>压缩</Button>

      <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <div className="prose prose-sm prose-invert max-w-none min-h-[300px]">
            {svgOutput}
          </div>
        </div>
      </div>
    </>
  );
}
