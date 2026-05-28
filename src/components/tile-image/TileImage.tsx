interface TileImageProps {
  productId: string;
  size?: number;
  className?: string;
}

export default function TileImage({ productId, size = 100, className = "" }: TileImageProps) {
  const svgProps = {
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    className,
  };

  switch (productId) {
    case "ocean-wave":
      return <OceanWaveSVG {...svgProps} />;
    case "forest-fern":
      return <ForestFernSVG {...svgProps} />;
    case "terracotta-dot":
      return <TerracottaDotSVG {...svgProps} />;
    case "yellow-star":
      return <YellowStarSVG {...svgProps} />;
    default:
      return (
        <svg {...svgProps}>
          <rect width="100" height="100" fill="#C4BAA8" />
        </svg>
      );
  }
}

type SVGProps = {
  viewBox: string;
  xmlns: string;
  width: number;
  height: number;
  className: string;
};

function OceanWaveSVG(props: SVGProps) {
  return (
    <svg {...props}>
      <rect width="100" height="100" fill="#2B4F8F" />
      <rect width="100" height="100" fill="url(#waveGrad)" opacity="0.3" />
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A3A7A" />
          <stop offset="100%" stopColor="#3B6AB5" />
        </linearGradient>
      </defs>
      {/* Wave bands across the tile */}
      <path
        d="M-5,15 C8,5 18,25 30,15 C42,5 52,25 65,15 C77,5 87,25 105,15"
        fill="none"
        stroke="#E8D5A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-5,32 C8,22 18,42 30,32 C42,22 52,42 65,32 C77,22 87,42 105,32"
        fill="none"
        stroke="#E8D5A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-5,50 C8,40 18,60 30,50 C42,40 52,60 65,50 C77,40 87,60 105,50"
        fill="none"
        stroke="#E8D5A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-5,68 C8,58 18,78 30,68 C42,58 52,78 65,68 C77,58 87,78 105,68"
        fill="none"
        stroke="#E8D5A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-5,86 C8,76 18,96 30,86 C42,76 52,96 65,86 C77,76 87,96 105,86"
        fill="none"
        stroke="#E8D5A8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Border */}
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="#1A3A7A"
        strokeWidth="2"
      />
    </svg>
  );
}

function ForestFernSVG(props: SVGProps) {
  return (
    <svg {...props}>
      <rect width="100" height="100" fill="#E8DFC4" />
      {/* Central vertical stem */}
      <line
        x1="50"
        y1="92"
        x2="50"
        y2="14"
        stroke="#3D6B2E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bottom leaf pair */}
      <path
        d="M50,80 C42,72 28,74 22,82"
        fill="#4A8030"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      <path
        d="M50,80 C58,72 72,74 78,82"
        fill="#4A8030"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      {/* Second leaf pair */}
      <path
        d="M50,64 C40,56 26,58 20,66"
        fill="#5A9040"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      <path
        d="M50,64 C60,56 74,58 80,66"
        fill="#5A9040"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      {/* Third leaf pair */}
      <path
        d="M50,48 C42,40 30,42 24,48"
        fill="#4A8030"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      <path
        d="M50,48 C58,40 70,42 76,48"
        fill="#4A8030"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      {/* Fourth leaf pair (upper) */}
      <path
        d="M50,33 C44,26 35,28 30,33"
        fill="#5A9040"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      <path
        d="M50,33 C56,26 65,28 70,33"
        fill="#5A9040"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      {/* Top frond */}
      <path
        d="M50,20 C47,15 46,11 50,8 C54,11 53,15 50,20"
        fill="#4A8030"
        stroke="#3D6B2E"
        strokeWidth="1.5"
      />
      {/* Border */}
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="#A89870"
        strokeWidth="2"
      />
    </svg>
  );
}

function TerracottaDotSVG(props: SVGProps) {
  return (
    <svg {...props}>
      <rect width="100" height="100" fill="#C47A62" />
      {/* 3x3 grid of large cream dots */}
      <circle cx="22" cy="22" r="8" fill="#E8D5A8" />
      <circle cx="50" cy="22" r="8" fill="#E8D5A8" />
      <circle cx="78" cy="22" r="8" fill="#E8D5A8" />
      <circle cx="22" cy="50" r="8" fill="#E8D5A8" />
      <circle cx="50" cy="50" r="8" fill="#E8D5A8" />
      <circle cx="78" cy="50" r="8" fill="#E8D5A8" />
      <circle cx="22" cy="78" r="8" fill="#E8D5A8" />
      <circle cx="50" cy="78" r="8" fill="#E8D5A8" />
      <circle cx="78" cy="78" r="8" fill="#E8D5A8" />
      {/* Smaller offset dots */}
      <circle cx="36" cy="36" r="4.5" fill="#E8D5A8" opacity="0.65" />
      <circle cx="64" cy="36" r="4.5" fill="#E8D5A8" opacity="0.65" />
      <circle cx="36" cy="64" r="4.5" fill="#E8D5A8" opacity="0.65" />
      <circle cx="64" cy="64" r="4.5" fill="#E8D5A8" opacity="0.65" />
      {/* Border */}
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="#8A4A35"
        strokeWidth="2"
      />
    </svg>
  );
}

function YellowStarSVG(props: SVGProps) {
  return (
    <svg {...props}>
      <rect width="100" height="100" fill="#1F3878" />
      {/* 8-pointed decorative star */}
      <polygon
        points="50,8 55,38 80,22 64,46 92,50 64,54 80,78 55,62 50,92 45,62 20,78 36,54 8,50 36,46 20,22 45,38"
        fill="#E8C44A"
      />
      {/* Inner circle accent */}
      <circle cx="50" cy="50" r="10" fill="#F5DFA0" />
      <circle cx="50" cy="50" r="5" fill="#E8C44A" />
      {/* Corner diamond accents */}
      <rect
        x="5"
        y="5"
        width="8"
        height="8"
        fill="#E8C44A"
        opacity="0.6"
        transform="rotate(45 9 9)"
      />
      <rect
        x="87"
        y="5"
        width="8"
        height="8"
        fill="#E8C44A"
        opacity="0.6"
        transform="rotate(45 91 9)"
      />
      <rect
        x="5"
        y="87"
        width="8"
        height="8"
        fill="#E8C44A"
        opacity="0.6"
        transform="rotate(45 9 91)"
      />
      <rect
        x="87"
        y="87"
        width="8"
        height="8"
        fill="#E8C44A"
        opacity="0.6"
        transform="rotate(45 91 91)"
      />
      {/* Border */}
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="#0F2050"
        strokeWidth="2"
      />
    </svg>
  );
}
