import type { Market } from "./fetch-market";

export function getTradingData(data: Market["symbol"], symbol: string) {
  const sum = Number(data?.yes) + Number(data?.no);
  const Yes = ((data?.yes / sum) * 10).toFixed(2);
  const No = ((data?.no / sum) * 10).toFixed(2);

  return { [symbol]: { Yes, No } };
}
