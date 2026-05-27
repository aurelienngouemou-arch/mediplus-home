// app/admin/layout.tsx
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {children}
      <Toaster position="top-center" richColors />
    </div>
  );
}