// Function to get unique objects based on a key
type ObjectType = {
  [key: string]: any;
};

export function getUniqueObjectsBy<T extends ObjectType>(
  array: T[],
  key: keyof T
): T[] {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}
