import { type ZodiacForecast, type ZodiacSign, zodiacMetadata } from "@/lib/zodiac-data";

export interface RawZodiacEntry {
  QFriend?: string;
  color?: string;
  number?: number | string;
  summary?: string;
  love?: string;
  work?: string;
  money?: string;
  health?: string;
  datetime?: string;
}

export interface RawPeriodEntry {
  date?: string;
  all?: string;
  love?: string;
  work?: string;
  job?: string;
  health?: string;
  money?: string;
  resultcode?: string;
  error_code?: number;
}

export interface RawDailyPayload {
  today?: Record<string, RawZodiacEntry>;
  week?: Record<string, RawPeriodEntry>;
  month?: Record<string, RawPeriodEntry>;
}

export function parseDateInput(dateInput: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return null;
  }

  const [year, month, day] = dateInput.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function normalizeDateInput(dateInput?: string | null) {
  if (!dateInput) {
    return null;
  }

  return parseDateInput(dateInput) ? dateInput : null;
}

export function dateKeyToInputValue(dateKey: string) {
  return `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`;
}

export function inputValueToDateKey(dateInput: string) {
  return dateInput.replaceAll("-", "");
}

export function getDateInputForTimeZone(timeZone: string, date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
}

function toScore(value?: number | string) {
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}

function describeScore(label: string, rawScore?: number | string) {
  const score = toScore(rawScore);

  if (score === null) {
    return `${label}数据暂未更新。`;
  }

  if (score >= 95) {
    return `${label}指数 ${score}，状态很强，适合主动推进。`;
  }

  if (score >= 85) {
    return `${label}指数 ${score}，整体顺畅，保持当前节奏即可。`;
  }

  if (score >= 70) {
    return `${label}指数 ${score}，表现平稳，重在稳住节奏。`;
  }

  return `${label}指数 ${score}，波动偏多，先收紧预期更稳妥。`;
}

function isSuccessfulPeriodEntry(entry?: RawPeriodEntry) {
  return entry?.resultcode === "200" && entry.error_code === 0;
}

function buildUnavailableForecast(rangeLabel: string, periodLabel: string): ZodiacForecast {
  return {
    rangeLabel,
    summary: `${periodLabel}暂未更新。`,
    love: "感情运势暂未更新。",
    career: "事业运势暂未更新。",
    health: "健康运势暂未更新。",
    money: "财务运势暂未更新。",
  };
}

function buildPeriodForecast(
  entry: RawPeriodEntry | undefined,
  periodLabel: string,
): ZodiacForecast | null {
  if (!isSuccessfulPeriodEntry(entry)) {
    return null;
  }

  return {
    rangeLabel: entry?.date?.trim() || periodLabel,
    summary: entry?.all?.trim() || `${periodLabel}暂未更新。`,
    love: entry?.love?.trim() || "感情运势暂未更新。",
    career: entry?.work?.trim() || entry?.job?.trim() || "事业运势暂未更新。",
    health: entry?.health?.trim() || "健康运势暂未更新。",
    money: entry?.money?.trim() || "财务运势暂未更新。",
  };
}

function buildFallbackSign(name: string): ZodiacSign {
  const meta = zodiacMetadata.find((item) => item.name === name);

  if (!meta) {
    throw new Error(`Unknown zodiac sign metadata: ${name}`);
  }

  return {
    ...meta,
    horoscope: "今日运势数据暂未更新。",
    love: "爱情数据暂未更新。",
    career: "事业数据暂未更新。",
    lucky: {
      number: 0,
      color: "未知",
    },
    forecasts: {
      daily: buildUnavailableForecast("今日", "日运"),
      weekly: null,
      monthly: null,
    },
  };
}

export function buildFallbackSigns() {
  return zodiacMetadata.map((meta) => buildFallbackSign(meta.name));
}

export function buildZodiacSigns(payload?: RawDailyPayload) {
  const todayData = payload?.today ?? {};
  const weekData = payload?.week ?? {};
  const monthData = payload?.month ?? {};

  return zodiacMetadata.map((meta) => {
    const entry = todayData[meta.name];

    if (!entry) {
      return buildFallbackSign(meta.name);
    }

    return {
      ...meta,
      horoscope: entry.summary?.trim() || "今日运势数据暂未更新。",
      love: describeScore("爱情", entry.love),
      career: describeScore("事业", entry.work),
      lucky: {
        number: toScore(entry.number) ?? 0,
        color: entry.color?.trim() || "未知",
      },
      compatibility: entry.QFriend?.trim() || meta.compatibility,
      forecasts: {
        daily: {
          rangeLabel: entry.datetime?.trim() || "今日",
          summary: entry.summary?.trim() || "日运暂未更新。",
          love: describeScore("爱情", entry.love),
          career: describeScore("事业", entry.work),
          health: describeScore("健康", entry.health),
          money: describeScore("财运", entry.money),
        },
        weekly: buildPeriodForecast(weekData[meta.name], "本周运势"),
        monthly: buildPeriodForecast(monthData[meta.name], "本月运势"),
      },
    };
  });
}
