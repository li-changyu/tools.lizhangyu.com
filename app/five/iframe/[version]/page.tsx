import { Suspense } from "react";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("./content"), { ssr: false });

export default async function Page({ params }: { params: { version: string } }) {
  return (
    <>
      <script async src="https://unpkg.com/three@0.117.1/build/three.min.js"></script>
      <script
        async
        src={`https://unpkg.com/@realsee/five@${params.version}/umd/five.js`}
      ></script>

    <Suspense fallback={null}>
      <Content />
      </Suspense>
    </>
  );
}
