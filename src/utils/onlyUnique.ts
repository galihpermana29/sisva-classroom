// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
export function onlyUnique<T>(value: T, index: number, array: T[]): boolean {
  return array.indexOf(value) === index;
}
