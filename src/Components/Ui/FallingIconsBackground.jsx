// import React, { useMemo } from "react";
// import { 
//   Book, 
//   GraduationCap, 
//   Code2, 
//   Star, 
//   Laptop, 
//   Lightbulb 
// } from "lucide-react";


// // عدّل العدد حسب الحاجة (لا تزوّد قوي عشان الأداء)
// const COUNT = 35;

// const ICONS = [ Book, 
//   GraduationCap, 
//   Code2, 
//   Star, 
//   Laptop, 
//   Lightbulb ];

// function rand(min, max) {
//   return Math.random() * (max - min) + min;
// }

// export default function FallingIconsBackground({ zIndex = 0, opacity = 0.15 }) {
//   // نولّد المراكز/الأحجام/المدد مرة واحدة فقط
//   const drops = useMemo(() => {
//     return Array.from({ length: COUNT }).map((_, i) => {
//       const Icon = ICONS[i % ICONS.length];
//       return {
//         id: `drop-${i}`,
//         Icon,
//         left: rand(0, 100),           // left%
//         size: rand(16, 36),           // px
//         duration: rand(8, 18),        // s
//         delay: rand(0, 12),           // s
//         rotate: rand(-45, 45),        // deg (زاوية ابتدائية)
//         opacity: rand(0.6, 1) * opacity,
//       };
//     });
//   }, [opacity]);

//   return (
//     <>
//       {/* أنيميشن CSS (يفضّل نقلها لملف CSS عام) */}
//       <style>{`
//         @keyframes fall {
//           0%   { transform: translateY(-120%) rotate(0deg);    opacity: 0; }
//           10%  { opacity: 1; }
//           100% { transform: translateY(120vh) rotate(360deg);  opacity: 0; }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .falling-icon { animation: none !important; }
//         }
//       `}</style>

//       <div
//         aria-hidden
//         className="pointer-events-none fixed inset-0"
//         style={{ zIndex }}
//       >
//         {drops.map(({ id, Icon, left, size, duration, delay, rotate, opacity }) => (
//           <div
//             key={id}
//             className="falling-icon absolute top-0"
//             style={{
//               left: `${left}%`,
//               animation: `fall ${duration}s linear ${delay}s infinite`,
//               willChange: "transform, opacity",
//               transform: `rotate(${rotate}deg)`,
//               opacity,
//             }}
//           >
//             <Icon size={size} className="text-custom-yellow" />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }


import React, { useMemo } from "react";
import { 
  Book, 
  GraduationCap, 
  Code2, 
  Star, 
  Laptop, 
  Lightbulb,
  Trophy,
  Target,
  Zap,
  Rocket
} from "lucide-react";

// Configuration constants
const CONFIG = {
  COUNT: 40,
  SIZE_RANGE: { min: 18, max: 40 },
  DURATION_RANGE: { min: 8, max: 20 },
  DELAY_RANGE: { min: 0, max: 15 },
  ROTATION_RANGE: { min: -60, max: 60 },
  OPACITY_MULTIPLIER: 0.8
};

// Icon configurations with individual colors and weights
const ICON_CONFIG = [
  { Icon: Book, colors: ['text-blue-400', 'text-blue-500', 'text-indigo-400'], weight: 2 },
  { Icon: GraduationCap, colors: ['text-emerald-400', 'text-green-500', 'text-teal-400'], weight: 2 },
  { Icon: Code2, colors: ['text-purple-400', 'text-violet-500', 'text-fuchsia-400'], weight: 3 },
  { Icon: Star, colors: ['text-yellow-400', 'text-amber-500', 'text-orange-400'], weight: 1 },
  { Icon: Laptop, colors: ['text-slate-400', 'text-gray-500', 'text-zinc-400'], weight: 2 },
  { Icon: Lightbulb, colors: ['text-yellow-300', 'text-lime-400', 'text-green-400'], weight: 1 },
  { Icon: Trophy, colors: ['text-gold-400', 'text-yellow-500', 'text-amber-600'], weight: 1 },
  { Icon: Target, colors: ['text-red-400', 'text-rose-500', 'text-pink-400'], weight: 1 },
  { Icon: Zap, colors: ['text-cyan-400', 'text-sky-500', 'text-blue-400'], weight: 1 },
  { Icon: Rocket, colors: ['text-orange-400', 'text-red-500', 'text-pink-500'], weight: 1 }
];

// Utility functions
const random = (min, max) => Math.random() * (max - min) + min;

const getRandomColor = (colors) => colors[Math.floor(Math.random() * colors.length)];

const createWeightedIconPool = () => {
  const pool = [];
  ICON_CONFIG.forEach(config => {
    for (let i = 0; i < config.weight; i++) {
      pool.push(config);
    }
  });
  return pool;
};

const generateDrops = (count, baseOpacity) => {
  const iconPool = createWeightedIconPool();
  
  return Array.from({ length: count }, (_, index) => {
    const iconConfig = iconPool[Math.floor(Math.random() * iconPool.length)];
    const { Icon, colors } = iconConfig;
    
    return {
      id: `icon-drop-${index}`,
      Icon,
      color: getRandomColor(colors),
      left: random(0, 100),
      size: random(CONFIG.SIZE_RANGE.min, CONFIG.SIZE_RANGE.max),
      duration: random(CONFIG.DURATION_RANGE.min, CONFIG.DURATION_RANGE.max),
      delay: random(CONFIG.DELAY_RANGE.min, CONFIG.DELAY_RANGE.max),
      rotation: random(CONFIG.ROTATION_RANGE.min, CONFIG.ROTATION_RANGE.max),
      opacity: random(0.4, 1) * baseOpacity * CONFIG.OPACITY_MULTIPLIER,
    };
  });
};

// CSS styles as a constant
const ANIMATION_STYLES = `
  @keyframes iconFall {
    0% { 
      transform: translateY(-10vh) rotate(0deg) scale(0.8); 
      opacity: 0; 
    }
    5% { 
      opacity: 1; 
      transform: translateY(-5vh) rotate(15deg) scale(1); 
    }
    95% { 
      opacity: 1; 
    }
    100% { 
      transform: translateY(110vh) rotate(360deg) scale(0.9); 
      opacity: 0; 
    }
  }
  
  .falling-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: opacity 0.3s ease;
  }
  
  .falling-icon:hover {
    opacity: 0.8 !important;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .falling-icon { 
      animation: none !important; 
      opacity: 0.3 !important;
    }
  }
  
  @media (max-width: 768px) {
    .falling-icon {
      animation-duration: 12s !important;
    }
  }
`;

/**
 * Professional falling icons background component
 * Features: individual icon colors, performance optimized, accessibility compliant
 */
export default function FallingIconsBackground({ 
  zIndex = 0, 
  opacity = 0.15,
  count = CONFIG.COUNT,
  className = "",
  testId = "falling-icons-bg"
}) {
  const drops = useMemo(() => 
    generateDrops(count, opacity), 
    [count, opacity]
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLES }} />
      
      <div
        data-testid={testId}
        role="presentation"
        aria-hidden="true"
        className={`
          pointer-events-none 
          fixed 
          inset-0 
          overflow-hidden
          ${className}
        `}
        style={{ zIndex }}
      >
        {drops.map(({ 
          id, 
          Icon, 
          color, 
          left, 
          size, 
          duration, 
          delay, 
          rotation, 
          opacity: iconOpacity 
        }) => (
          <div
            key={id}
            className={`falling-icon absolute`}
            style={{
              left: `${left}%`,
              top: '-10vh',
              animation: `iconFall ${duration}s linear ${delay}s infinite`,
              willChange: 'transform, opacity',
              transform: `rotate(${rotation}deg)`,
              opacity: iconOpacity,
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <Icon 
              size={size} 
              className={`${color} transition-all duration-200`}
              strokeWidth={1.5}
            />
          </div>
        ))}
      </div>
    </>
  );
}
