import { GlobalNav } from "@/ui/global-nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36 h-screen">
      <GlobalNav />

      <div className="lg:pl-72">
        <div className="mx-auto max-w-4xl space-y-[30px] px-2 pt-20 lg:px-8 lg:py-8">
          <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">{/* <AddressBar /> */}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
