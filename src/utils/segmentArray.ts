/** Split data into an array of paginated data with length rows per page for each page
 * @param {any[]} rowData - Data to be paginated
 * @param {number} rowsPerPage - Number of data in each page
 * @returns Paginated data where each page contains `rowsPerPage` number of data
 *
 * @deprecated use segmentArray instead
 * @example const data = [
 * {name: "A"},
 * {name: "B"},
 * {name: "C"}
 * ];
 *
 * const paginated = paginateData(data, 2);
 * console.log(paginated); // [[{name: "A"}, {name: "B"}], [{name: "C"}]]
 */
export const paginateData = (rowData, rowsPerPage) => {
  const paginatedData = [];
  if (!rowData) return paginatedData;

  for (let i = 0; i < rowData.length; i += rowsPerPage) {
    paginatedData.push(rowData.slice(i, i + rowsPerPage));
  }
  return paginatedData;
};

/** Segment array into array of array with defined length
 * @example const data = [
 * {name: "A"},
 * {name: "B"},
 * {name: "C"}
 * ];
 *
 * const segmented = segmentArray(data, 2);
 * console.log(paginated); // [[{name: "A"}, {name: "B"}], [{name: "C"}]]
 */
export function segmentArray<T>(arr: T[], segmentLength: number): T[][] {
  return arr.reduce((result: T[][], item: T, index: number) => {
    const segmentIndex = Math.floor(index / segmentLength);

    if (!result[segmentIndex]) {
      result[segmentIndex] = [];
    }

    result[segmentIndex].push(item);
    return result;
  }, []);
}
