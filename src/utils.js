export function arrayRange(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
}

export function roundNumber(number, decimals) {
  let powerOfTen = Math.pow(10, decimals);
  let result = Math.round(number * powerOfTen) / powerOfTen;
  return result;
}
