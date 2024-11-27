'use client'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { waitForFiveSDK } from "./content";

const Content = dynamic(() => import("./content"), { ssr: false });

export default function Page({ params }: { params: { version: string } }) {
  const promise = waitForFiveSDK();
  return (
    <>
      <script async src="https://unpkg.com/three@0.117.1/build/three.min.js"></script>
      <script
        async
        src={`https://unpkg.com/@realsee/five@${params.version}/umd/five.js`}
      ></script>

    <Suspense fallback={null}>
      <Content waitFiveSDK={promise} />
      </Suspense>
    </>
  );
}
