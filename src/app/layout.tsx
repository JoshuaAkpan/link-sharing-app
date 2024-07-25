import { Toaster } from "react-hot-toast";
import "../styles/globals.css";



export const metadata = {
  title: "Devlinks",
  description: "Share your developer profile with the world!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen box-border overflow-auto">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
