export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: '前端工具',
    items: [
      {
        name: 'svg 压缩',
        slug: 'svg',
      },
      {
        name: 'bundlephobia',
        slug: "https://bundlephobia.com/",
      },
      {
        name: 'bundlescanner',
        slug: "https://bundlescanner.com/",
      },
    ],
  }
];
