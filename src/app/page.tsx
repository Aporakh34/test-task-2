import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTitleBanner from "@/components/page-title";
import CartTable from "@/components/cart-table";
import VisualizationGrid from "@/components/visualization-grid";
import OrderSummaryPanel from "@/components/order-summary";
import desktopBg from "@/assets/backgrounds/desktop_bg.png";
import mobileBg from "@/assets/backgrounds/mobile_bg.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Background zone — grows with content, scrolls when viewport is short */}
      <div
        className="flex flex-col flex-1 responsive-page-bg"
        style={{
          ["--desktop-bg" as string]: `url(${desktopBg.src})`,
          ["--mobile-bg" as string]: `url(${mobileBg.src})`,
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <PageTitleBanner />

        <main className="flex-1 py-6 xl:py-8 mx-auto max-w-[1800px] px-[50px] max-[528px]:px-[10px]">
          <div className="grid bg-transparent grid-cols-[530px_622px_500px] max-[1548px]:grid-cols-[530px_500px] max-[1108px]:grid-cols-1 max-[1108px]:gap-6">
            <div className="flex flex-col bg-transparent w-[530px] min-w-[530px] max-w-[530px] shrink-0 max-[1108px]:w-full max-[1108px]:min-w-0 max-[1108px]:max-w-none">
              <CartTable />
            </div>
            <div className="flex flex-col bg-transparent w-[622px] min-w-[622px] max-w-[622px] shrink-0 max-[1548px]:hidden">
              <VisualizationGrid />
            </div>
            <div className="flex flex-col bg-transparent w-[500px] min-w-[500px] max-w-[500px] shrink-0 max-[1548px]:col-start-2 max-[1548px]:row-start-1 max-[1108px]:w-full max-[1108px]:min-w-0 max-[1108px]:max-w-none max-[1108px]:col-start-auto max-[1108px]:row-start-auto">
              <OrderSummaryPanel />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
