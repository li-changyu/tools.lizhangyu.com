"use client";

import { useFiveVersions } from "@/data/fetch-five-versions";
import Button from "@/ui/button";
import { workSample } from "./work-sample";
import { useMemo, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SearchInput from "./search-input";

function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}

function Content({
  data,
}: {
  data: Exclude<ReturnType<typeof useFiveVersions>["data"], undefined>;
}) {
  const [workData, setWorkData] = useState(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && !window.$work) {
      Object.assign(window, { $work: workSample });
    }
    return workSample;
  });
  const [version, setVersion] = useState(data.latest);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div>
        <div className="p-px rounded-lg shadow-lg bg-vc-border-gradient shadow-black/20">
          <div className="overflow-hidden bg-black rounded-lg">
            <textarea
              ref={textareaRef}
              placeholder="Paste your work data here..."
              defaultValue={JSON.stringify(workData, null, 2)}
              className="w-full bg-inherit rounded-lg border-none min-h-[300px] p-3 lg:p-6"
              name=""
              id="svg-input"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center pt-4 space-x-2">
          <SearchInput
            searchListData={data.versions}
            ref={inputRef}
            placeholder={data.latest + "(latest)"}
            defaultValue={data.latest}
            type="text"
          />

          <Button
            onClick={() => {
              const workString = textareaRef.current!.value;
              const version = inputRef.current!.value;

              if (!version || !workString) {
                return toast.error("Please enter version and work data");
              }

              if (!data.versions.includes(version)) {
                return toast.error("Invalid version");
              }

              const workData = tryParseJSON(workString);
              if (!workData) {
                return toast.error("Invalid work data JSON");
              }

              setVersion(version);
              setWorkData(JSON.parse(workString));
              // data too large, use window.$work to pass data to iframe
              Object.assign(window, { $work: workData });
            }}
          >
            提交
          </Button>
        </div>

        <div className="pt-4">
          <iframe
            key={version + JSON.stringify(workData)}
            src={`/five/iframe/${version}`}
            className="w-full h-[400px] rounded-lg overflow-hidden"
          ></iframe>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgba(63, 63, 70)",
            color: "rgba(244, 244, 245)",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default function Page() {
  const { data, isLoading } = useFiveVersions();
  if (isLoading) return <div className="text-center">Loading...</div>;

  return <Content data={data!} />;
}
