export function isSortedAscending(values: number[]): boolean {
  return values.every((val, i) => i === 0 || values[i - 1] <= val);
}

export function isSortedDescending(values: number[]): boolean {
  return values.every((val, i) => i === 0 || values[i - 1] >= val);
}
