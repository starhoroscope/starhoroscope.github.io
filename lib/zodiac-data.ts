export type ZodiacElement = "火" | "土" | "风" | "水";

export interface ZodiacForecast {
  rangeLabel: string;
  summary: string;
  love: string;
  career: string;
  health: string;
  money: string;
}

export interface ZodiacSign {
  name: string;
  nameEn: string;
  symbol: string;
  dates: string;
  element: ZodiacElement;
  ruling: string;
  traits: string[];
  horoscope: string;
  love: string;
  career: string;
  lucky: { number: number; color: string };
  compatibility: string;
  forecasts: {
    daily: ZodiacForecast;
    weekly: ZodiacForecast | null;
    monthly: ZodiacForecast | null;
  };
}

export type ZodiacMeta = Omit<
  ZodiacSign,
  "horoscope" | "love" | "career" | "lucky" | "forecasts"
>;

export const zodiacMetadata: ZodiacMeta[] = [
  {
    name: "白羊座",
    nameEn: "Aries",
    symbol: "\u2648",
    dates: "3月21日 - 4月19日",
    element: "火",
    ruling: "火星",
    traits: ["果敢", "热情", "充满活力"],
    compatibility: "狮子座",
  },
  {
    name: "金牛座",
    nameEn: "Taurus",
    symbol: "\u2649",
    dates: "4月20日 - 5月20日",
    element: "土",
    ruling: "金星",
    traits: ["可靠", "耐心", "忠诚"],
    compatibility: "处女座",
  },
  {
    name: "双子座",
    nameEn: "Gemini",
    symbol: "\u264A",
    dates: "5月21日 - 6月20日",
    element: "风",
    ruling: "水星",
    traits: ["好奇", "多变", "机智"],
    compatibility: "天秤座",
  },
  {
    name: "巨蟹座",
    nameEn: "Cancer",
    symbol: "\u264B",
    dates: "6月21日 - 7月22日",
    element: "水",
    ruling: "月亮",
    traits: ["直觉敏锐", "温柔体贴", "有保护欲"],
    compatibility: "天蝎座",
  },
  {
    name: "狮子座",
    nameEn: "Leo",
    symbol: "\u264C",
    dates: "7月23日 - 8月22日",
    element: "火",
    ruling: "太阳",
    traits: ["魅力四射", "慷慨大方", "富有创意"],
    compatibility: "射手座",
  },
  {
    name: "处女座",
    nameEn: "Virgo",
    symbol: "\u264D",
    dates: "8月23日 - 9月22日",
    element: "土",
    ruling: "水星",
    traits: ["善于分析", "一丝不苟", "务实"],
    compatibility: "金牛座",
  },
  {
    name: "天秤座",
    nameEn: "Libra",
    symbol: "\u264E",
    dates: "9月23日 - 10月22日",
    element: "风",
    ruling: "金星",
    traits: ["善于外交", "追求和谐", "公正"],
    compatibility: "双子座",
  },
  {
    name: "天蝎座",
    nameEn: "Scorpio",
    symbol: "\u264F",
    dates: "10月23日 - 11月21日",
    element: "水",
    ruling: "冥王星",
    traits: ["充满激情", "善于谋略", "坚韧不拔"],
    compatibility: "巨蟹座",
  },
  {
    name: "射手座",
    nameEn: "Sagittarius",
    symbol: "\u2650",
    dates: "11月22日 - 12月21日",
    element: "火",
    ruling: "木星",
    traits: ["爱冒险", "乐观向上", "富有哲思"],
    compatibility: "狮子座",
  },
  {
    name: "摩羯座",
    nameEn: "Capricorn",
    symbol: "\u2651",
    dates: "12月22日 - 1月19日",
    element: "土",
    ruling: "土星",
    traits: ["自律", "有雄心", "负责任"],
    compatibility: "处女座",
  },
  {
    name: "水瓶座",
    nameEn: "Aquarius",
    symbol: "\u2652",
    dates: "1月20日 - 2月18日",
    element: "风",
    ruling: "天王星",
    traits: ["创新", "人道主义", "独立"],
    compatibility: "射手座",
  },
  {
    name: "双鱼座",
    nameEn: "Pisces",
    symbol: "\u2653",
    dates: "2月19日 - 3月20日",
    element: "水",
    ruling: "海王星",
    traits: ["共情", "富有创造力", "直觉强"],
    compatibility: "巨蟹座",
  },
];

export const elementColors: Record<ZodiacElement, string> = {
  火: "text-orange-400",
  土: "text-emerald-400",
  风: "text-sky-300",
  水: "text-cyan-400",
};

export const elementBgColors: Record<ZodiacElement, string> = {
  火: "bg-orange-400/10 border-orange-400/20",
  土: "bg-emerald-400/10 border-emerald-400/20",
  风: "bg-sky-300/10 border-sky-300/20",
  水: "bg-cyan-400/10 border-cyan-400/20",
};
