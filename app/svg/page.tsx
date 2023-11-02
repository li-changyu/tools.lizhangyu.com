'use client';
import Button from "@/ui/button";
import { useEffect, useRef, useState } from "react";
import ClipboardJS from 'clipboard'
import toast, { Toaster } from 'react-hot-toast';

const SVG_COPY_ID = 'svg-clipboard-input'

export default function Page() {
  const textareaInput = useRef<HTMLTextAreaElement>(null)
  const [svgOutput, setSvgOutput] = useState('')
  useEffect(() => {
    const clipboard = new ClipboardJS(`#${SVG_COPY_ID}`)
    clipboard.on('success', () => toast.success('复制成功'))
    clipboard.on('error', () => toast.error('复制失败'))
    return () => {
      clipboard.destroy()
    }
  }, [])

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
        <div className="relative rounded-lg bg-black p-3.5 lg:p-6">
          <div className="absolute right-[8px] top-[8px] w-[24px] h-[24px] bg-[url('/copy.svg')] bg-center bg-no-repeat opacity-70 cursor-pointer hover:opacity-90" id={SVG_COPY_ID} data-clipboard-text={svgOutput}></div>
          <div className="prose prose-sm prose-invert max-w-none min-h-[300px]">
            {svgOutput}
          </div>
        </div>
      </div>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 2000, 
          style: {
            background: "rgba(63, 63, 70)",
            color: "rgba(244, 244, 245)",
            fontSize: "14px"
          },
        }}
      />
    </>
  );
}
