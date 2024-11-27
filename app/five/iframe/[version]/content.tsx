"use client";

import Button from "@/ui/button";
import { FiveInitArgs, Mode, type Five } from "@realsee/five";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

declare var FiveSDK: {
  Five: typeof Five;
};

/**
 * Use UMD version of FiveSDK, wait for it to be loaded
 */
export function waitForFiveSDK() {
  const { promise, resolve } = Promise.withResolvers()
  const loop = () => {
    if (typeof FiveSDK !== 'undefined') {
      return resolve(true);
    }
    requestAnimationFrame(loop);
  }

  loop();

  return promise;
}

// copied from https://open-platform.realsee.com/developer/docs/five/quick-start/
const fiveArgs = {
  imageOptions: {
    size: 512,
  },
  textureOptions: {
    autoResize: false,
  },
} satisfies FiveInitArgs;

export default function Content({ waitFiveSDK }: { waitFiveSDK: Promise<unknown> }) {
  use(waitFiveSDK)
  const searchParams = useSearchParams();
  const [five] = useState(() => new FiveSDK.Five(fiveArgs));
  // @ts-ignore
  const currVersion = five.constructor.version;
  const modes = ["Panorama", "Floorplan", "Mapview", "Model"] satisfies Mode[];
  const work = JSON.parse(searchParams.get('work')!);
  // @ts-ignore for debug
  if (!window.$five) Object.assign(window, { $five: five });

  return (
    <div className="relative">
      <span className="absolute z-10 p-2">current version: {currVersion}</span>

      <div className="absolute z-10 space-x-1 top-2 right-2">
        {modes.map((mode) => (
          <Button
            key={mode}
            onClick={() => {
              five.changeMode(mode);
            }}
          >
            {mode}
          </Button>
        ))}
      </div>
      <div
        ref={(app) => {
          five.appendTo(app!);
          five.load(work);
        }}
      ></div>
    </div>
  );
}
