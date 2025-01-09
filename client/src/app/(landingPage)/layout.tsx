import "@/app/globals.css";
import LandingPageFooter from "@/components/landingPage/footer";
import Navbar from "@/components/landingPage/navbar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <LandingPageFooter />
    </div>
  );
}
