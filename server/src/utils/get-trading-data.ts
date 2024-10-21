import type { Market } from "..";

export function getTradingData(data: Market["symbol"], symbol: string) {
  const sum = data.yes + data.no;
  const yes = ((data.yes / sum) * 10).toFixed(2);
  const no = ((data.no / sum) * 10).toFixed(2);

  return { [symbol]: { yes, no } };
}
