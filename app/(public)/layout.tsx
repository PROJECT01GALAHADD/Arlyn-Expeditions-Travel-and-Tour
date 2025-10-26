import { Providers } from "@/components/providers";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </Providers>
  );
}
