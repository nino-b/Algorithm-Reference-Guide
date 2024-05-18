/** */

/** 
 * QuickSort algorithm with Hoare partition scheme.
*/


function quickSort(arr, start, end) {
  /** 
   * Ensure array segment has at least two elements.
  */
  if (start < end) {
    let pivotIndex = hoarePartition(arr, start, end);
    quickSort(arr, start, pivotIndex);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function hoarePartition(arr, start, end) {
  /** 
   * Middle element is chosen as a pivot.
  */
  let pivot = arr[Math.floor((start + end) / 2)];
  let i = start - 1;
  let j = end + 1;

  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);

    do {
      j--;
    } while (arr[j] > pivot);

    if (i >= j) {
      return j;
    }

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}