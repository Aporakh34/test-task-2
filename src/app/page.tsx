import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTitleBanner from "@/components/page-title";
import CartTable from "@/components/cart-table";
import VisualizationGrid from "@/components/visualization-grid";
import OrderSummaryPanel from "@/components/order-summary";
import desktopBg from "@/assets/backgrounds/desktop_bg.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Background zone — grows with content, scrolls when viewport is short */}
      <div
        className="flex flex-col flex-1"
        style={{
          backgroundImage: `url(${desktopBg.src})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 68px)",
        }}
      >
        <PageTitleBanner />

        <main className="flex-1 py-6 xl:py-8 mx-auto max-w-[1800px]">
          <div className="grid bg-transparent grid-cols-[530px_622px_500px] max-[1752px]:grid-cols-[530px_622px_300px]">
            <div className="flex flex-col bg-transparent w-[530px] min-w-[530px] max-w-[530px] shrink-0">
              <CartTable />
            </div>
            <div className="flex flex-col bg-transparent w-[622px] min-w-[622px] max-w-[622px] shrink-0">
              <VisualizationGrid />
            </div>
            <div className="flex flex-col bg-transparent w-[500px] min-w-[500px] max-w-[500px] max-[1752px]:w-[300px] max-[1752px]:min-w-[300px] max-[1752px]:max-w-[300px] shrink-0">
              <OrderSummaryPanel />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
