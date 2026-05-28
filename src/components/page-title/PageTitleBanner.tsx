import Image from "next/image";
import titleLeft from "@/assets/page-title/title_left.png";
import titleRight from "@/assets/page-title/title_right.png";
import plateLeft from "@/assets/page-title/plate_left.png";
import plateRight from "@/assets/page-title/plate_right.png";

export default function PageTitleBanner() {
  return (
    <section className="w-full flex items-center justify-center pt-2 sm:pt-4 lg:pt-6 pb-2.5 px-4 shrink-0">
      <div className="flex items-center justify-center gap-2 lg:gap-4">
        <Image
          src={titleLeft}
          alt=""
          width={titleLeft.width}
          height={titleLeft.height}
          className="h-16 lg:h-20 w-auto object-contain shrink-0 select-none"
          priority
        />

        <div className="flex flex-col items-center text-center shrink-0">
          <h1 className="font-display text-[clamp(22px,3.5vw,56px)] font-normal uppercase tracking-wide text-black leading-none whitespace-nowrap">
            Ceramic Tile Order Form
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Image
              src={plateLeft}
              alt=""
              width={plateLeft.width}
              height={plateLeft.height}
              className="h-7 lg:h-8 w-auto object-contain select-none"
            />
            <p className="font-condensed text-[14px] lg:text-[18px] font-semibold uppercase tracking-[0.16em] text-black whitespace-nowrap">
              The Artisan Kiln
            </p>
            <Image
              src={plateRight}
              alt=""
              width={plateRight.width}
              height={plateRight.height}
              className="h-7 lg:h-8 w-auto object-contain select-none"
            />
          </div>
        </div>

        <Image
          src={titleRight}
          alt=""
          width={titleRight.width}
          height={titleRight.height}
          className="h-16 lg:h-20 w-auto object-contain shrink-0 select-none"
          priority
        />
      </div>
    </section>
  );
}
