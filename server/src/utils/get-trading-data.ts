import type { Market } from "./fetch-stock-balance";

export function getTradingData(data: Market["symbol"], symbol: string) {
  const sum = Number(data?.yes) + Number(data?.no);
  const yesRaw = (data?.yes / sum) * 10;
  const noRaw = (data?.no / sum) * 10;

  const Yes = roundToNearestHalf(yesRaw);
  const No = roundToNearestHalf(noRaw);

  return { [symbol]: { Yes, No } };
}

function roundToNearestHalf(value: number): string {
  const rounded = Math.round(value * 2) / 2;
  return rounded.toFixed(1);
}
