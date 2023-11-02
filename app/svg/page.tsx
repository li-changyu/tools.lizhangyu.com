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
          <textarea className="w-full bg-inherit rounded-lg border-none  min-h-[300px] p-3 lg:p-6" name="" id="svg-input" ref={textareaInput}></textarea>
        </div>
      </div>

      <div className="flex justify-center relative mt-0">
        <Button onClick={async () => {
          try {
            const result = await (await fetch('/api/svgCompress', {
              method: 'POST',
              body: JSON.stringify({
                svg: textareaInput.current!.value
              })
            })).json()

            if (result.code !== 0) throw new Error(result.msg)
  
            if (result.data.svg) {
              const percent = (textareaInput.current!.value.length - result.data.svg.length) /  textareaInput.current!.value.length
              toast.success(`🎉压缩成功, 减少了${(percent * 100).toFixed(1)}%大小！`)
            }
            setSvgOutput(result.data.svg)
          } catch (error: any) {
            console.error(error)
            toast.error(`压缩失败, 请检查输入 svg 是否正确`)
          }
        }}>压缩</Button>

        <div className="absolute left-0 top-[-10px] rounded-lg overflow-hidden">
          <div className="w-[40px] h-[40px]" dangerouslySetInnerHTML={{ __html: svgOutput }}></div>
        </div>
      </div>

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
