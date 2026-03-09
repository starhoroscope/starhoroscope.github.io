import { promises as fs } from "node:fs";
import path from "node:path";

import { type ZodiacForecast, type ZodiacSign, zodiacMetadata } from "@/lib/zodiac-data";

interface RawZodiacEntry {
  QFriend?: string;
  color?: string;
  number?: number | string;
  summary?: string;
  love?: string;
  work?: string;
}

interface RawDailyPayload {
  today?: Record<string, RawZodiacEntry>;
  week?: Record<string, RawPeriodEntry>;
  month?: Record<string, RawPeriodEntry>;
}

interface RawPeriodEntry {
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

interface ResolvedRawDataFile {
  filePath: string;
  resolvedDateKey: string;
  hasExactMatch: boolean;
  minDateKey: string;
  maxDateKey: string;
}

export interface ZodiacDataResult {
  signs: ZodiacSign[];
  selectedDate: string;
  resolvedDate: string;
  hasExactMatch: boolean;
  minDate: string | null;
  maxDate: string | null;
  timeZone: string;
}

const RAW_DATA_DIR = path.join(process.cwd(), "public", "raw");

function normalizeTimeZone(timeZone?: string) {
  if (!timeZone) {
    return "UTC";
  }

  try {
    Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return "UTC";
  }
}

function getDateKey(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date).replaceAll("-", "");
}

function dateKeyToInputValue(dateKey: string) {
  return `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`;
}

function parseDateInput(dateInput: string) {
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

function dateInputToDate(dateInput: string) {
  return parseDateInput(dateInput);
}

function normalizeDateInput(dateInput?: string) {
  if (!dateInput) {
    return null;
  }

  const date = dateInputToDate(dateInput);
  return date ? dateInput : null;
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

async function resolveRawDataFileForTimeZone(
  targetDate: Date,
  timeZone: string,
): Promise<ResolvedRawDataFile | null> {
  const files = await fs.readdir(RAW_DATA_DIR);
  const dateKeys = files
    .map((file) => path.parse(file).name)
    .filter((name) => /^\d{8}$/.test(name))
    .sort();

  if (dateKeys.length === 0) {
    return null;
  }

  const targetKey = getDateKey(targetDate, timeZone);
  const previousMatch = [...dateKeys].reverse().find((key) => key <= targetKey);
  const fallbackKey = previousMatch ?? dateKeys[dateKeys.length - 1];

  return {
    filePath: path.join(RAW_DATA_DIR, `${fallbackKey}.json`),
    resolvedDateKey: fallbackKey,
    hasExactMatch: fallbackKey === targetKey,
    minDateKey: dateKeys[0],
    maxDateKey: dateKeys[dateKeys.length - 1],
  };
}

async function loadDailyPayload(targetDate: Date, timeZone: string) {
  const resolvedFile = await resolveRawDataFileForTimeZone(targetDate, timeZone);

  if (!resolvedFile) {
    return null;
  }

  const rawText = await fs.readFile(resolvedFile.filePath, "utf8");

  return {
    payload: JSON.parse(rawText) as RawDailyPayload,
    ...resolvedFile,
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

export async function getZodiacData(
  dateInput?: string,
  timeZoneInput?: string,
): Promise<ZodiacDataResult> {
  const timeZone = normalizeTimeZone(timeZoneInput);
  const normalizedDateInput = normalizeDateInput(dateInput);
  const targetDate = normalizedDateInput
    ? dateInputToDate(normalizedDateInput) ?? new Date()
    : new Date();
  const selectedDate =
    normalizedDateInput ?? dateKeyToInputValue(getDateKey(targetDate, timeZone));
  const loadedData = await loadDailyPayload(targetDate, timeZone);
  const payload = loadedData?.payload;
  const todayData = payload?.today ?? {};
  const weekData = payload?.week ?? {};
  const monthData = payload?.month ?? {};

  const signs = zodiacMetadata.map((meta) => {
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

  return {
    signs,
    selectedDate,
    resolvedDate: loadedData
      ? dateKeyToInputValue(loadedData.resolvedDateKey)
      : selectedDate,
    hasExactMatch: loadedData?.hasExactMatch ?? false,
    minDate: loadedData ? dateKeyToInputValue(loadedData.minDateKey) : null,
    maxDate: loadedData ? dateKeyToInputValue(loadedData.maxDateKey) : null,
    timeZone,
  };
}

export async function getZodiacSigns(targetDate = new Date()): Promise<ZodiacSign[]> {
  const data = await getZodiacData(dateKeyToInputValue(getDateKey(targetDate, "UTC")), "UTC");
  return data.signs;
}
