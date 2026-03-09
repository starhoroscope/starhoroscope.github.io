export interface ZodiacSign {
  name: string;
  nameEn: string;
  symbol: string;
  dates: string;
  element: "火" | "土" | "风" | "水";
  ruling: string;
  traits: string[];
  horoscope: string;
  love: string;
  career: string;
  lucky: { number: number; color: string };
  compatibility: string;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "白羊座",
    nameEn: "Aries",
    symbol: "\u2648",
    dates: "3月21日 - 4月19日",
    element: "火",
    ruling: "火星",
    traits: ["果敢", "热情", "充满活力"],
    horoscope:
      "今天你将迎来一股创造力的涌动。一个你一直压在心底的大胆想法已经准备好成形了。相信你的直觉，迈出第一步——宇宙正在奖赏此刻的勇气。",
    love: "今日激情高涨。如果你正在恋爱中，不妨策划一次意外惊喜。单身的白羊座可能会因为自信的魅力而吸引到某人的目光。",
    career:
      "一个领导机会可能会出现在你面前。不要怀疑自己的能力——你就是为这个时刻而生的。",
    lucky: { number: 9, color: "深红色" },
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
    horoscope:
      "财务问题今天成为关注焦点。对一个长期困扰的务实态度终将得到回报。花时间享受简单的快乐——一顿美食、一次自然中的散步。",
    love: "你的感情关系中稳定感在加深。通过贴心的举动来表达你的爱意。你稳定的付出比言语更有力量。",
    career:
      "一个需要耐心和坚持的项目完美契合你的优势。坚持下去——成功比你想象的更近。",
    lucky: { number: 6, color: "翡翠绿" },
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
    horoscope:
      "沟通是你今天的超能力。一次意外的对话可能会打开新的大门。你天生的好奇心将引领你发现迷人的事物——跟随每一条线索。",
    love: "智慧的碰撞点燃了浪漫的火花。自由地分享你的想法，你会找到一个能匹配你机智的人。深度对话将带来更深的羁绊。",
    career:
      "你的多才多艺在团队合作中大放异彩。头脑风暴中的一个新想法可能成为下一个重大突破。",
    lucky: { number: 5, color: "琥珀色" },
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
    horoscope:
      "今天情感上的洞察力特别深刻。相信你对一直困扰你的情况的直觉。家庭和亲情方面会带来意想不到的喜悦和清晰感。",
    love: "你温柔体贴的天性为爱人创造了一个安全的港湾。脆弱是你今天的力量——让某人看到真实的你。",
    career:
      "你的情商帮助你处理复杂的团队关系。相信你对人的直觉——它们很少会让你失望。",
    lucky: { number: 2, color: "银色" },
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
    horoscope:
      "聚光灯今天找到了你，而你穿戴得恰到好处。一个创意项目获得动力，你天生的魅力吸引着合适的人来到你身边。尽情闪耀——全世界都在看。",
    love: "浪漫今天成为主角。你的温暖和慷慨吸引着仰慕者。为特别的人策划一些盛大的事情。",
    career:
      "对你辛勤工作的认可即将到来。一次演示或提案进行得格外顺利。你的自信极具感染力。",
    lucky: { number: 1, color: "金色" },
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
    horoscope:
      "细节在今天至关重要，没有人比你更能捕捉它们。对复杂问题的系统化方法将带来突破性成果。你的健康和养生日程值得来一次更新。",
    love: "用实际行动来表达爱。细小而贴心的举动意义非凡。伴侣或潜在的心仪对象欣赏你对细节的关注。",
    career:
      "你的组织能力今天拯救了全局。同事们寻求你的专业意见——你务实的智慧正是他们需要的。",
    lucky: { number: 7, color: "森林绿" },
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
    horoscope:
      "平衡回归到之前感到混乱的生活领域。你的外交技巧优雅地化解了一个棘手的局面。美和艺术今天激发你的灵感——去寻找能打动你灵魂的事物。",
    love: "关系中的和谐带来深深的满足感。如果之前有过紧张，今天是用优雅和同理心化解它的好日子。",
    career:
      "合作机会看起来很有利。你能够看到问题各个方面的能力使你成为无价的调解者。",
    lucky: { number: 4, color: "玫瑰色" },
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
    horoscope:
      "变革的气息弥漫在空气中。你一直紧握不放的东西已经准备好被释放。拥抱这个变化——从中诞生的将远比你留下的更加强大。",
    love: "深刻的情感加深了你们的联系。一次坦诚的对话让你更接近理解伴侣的真实渴望。脆弱将成为你最大的力量。",
    career:
      "你的战略头脑发现了隐藏的机会。相信你的调查研究，在感觉对的时候果断出手。",
    lucky: { number: 8, color: "午夜蓝" },
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
    horoscope:
      "冒险今天在呼唤你的名字。无论是通过旅行、学习还是一个即兴的决定，扩展是你的主题。你的乐观极具感染力——与需要鼓励的人分享它。",
    love: "自由和连结对你来说并不矛盾。一个和你一样渴望冒险的伴侣变得更加有吸引力。一起探索新的体验吧。",
    career:
      "大局观的思维得到回报。一个有远见的想法获得了关注。不要害怕突破传统的界限。",
    lucky: { number: 3, color: "皇室蓝" },
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
    horoscope:
      "努力今天遇见了回报。一个你一直稳步攀爬的目标终于触手可及。你的纪律感激励着身边的人——以身作则，前路自然清晰。",
    love: "承诺进一步加深。你的可靠性对周围的人极具吸引力。在雄心勃勃的外表下展示一些柔软的一面吧。",
    career:
      "权威人士注意到了你的奉献精神。一次晋升或重要的责任与你的长期愿景完美契合。",
    lucky: { number: 10, color: "炭灰色" },
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
    horoscope:
      "你不拘一格的思维打破了僵局。社群和友谊带来意想不到的收获。对老问题的创新解决方案让你成为远见者。",
    love: "智慧的激发是你今天的爱情语言。寻找那些能挑战你思维、激发你对未来愿景的连结。",
    career:
      "科技和创新是你的盟友。前瞻性的思维给决策者留下深刻印象。你独特的视角就是你最大的资产。",
    lucky: { number: 11, color: "电光蓝" },
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
    horoscope:
      "今天你的直觉异常强烈。梦境和白日梦中携带着重要的信息。创作活动如流水般顺畅——顺从灵感的指引，让它带领你前行。",
    love: "情感的深度创造了触动灵魂的连结。你的同理心像温柔的潮水般吸引着他人。一个浪漫的举动会深深触动某人的心。",
    career:
      "创意项目在你的想象力下蓬勃发展。相信你的艺术直觉——它们正在引导你走向非凡。",
    lucky: { number: 12, color: "海青色" },
    compatibility: "巨蟹座",
  },
];

export const elementColors: Record<string, string> = {
  火: "text-orange-400",
  土: "text-emerald-400",
  风: "text-sky-300",
  水: "text-cyan-400",
};

export const elementBgColors: Record<string, string> = {
  火: "bg-orange-400/10 border-orange-400/20",
  土: "bg-emerald-400/10 border-emerald-400/20",
  风: "bg-sky-300/10 border-sky-300/20",
  水: "bg-cyan-400/10 border-cyan-400/20",
};
