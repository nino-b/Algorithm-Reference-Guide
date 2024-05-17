/** 
 * QuickSort
*/

/** */

/** 
 * Perform Quicksort on the array
 * @param {number[]} arr - The entire array to be sorted.
 * @param {number} [start = 0] - Marks starting index of the array segment that will be sorted.
 *                               Marking first and last indices allows 'quicksort' to work with segment of original array.
 * @param {number} [end = arr.length - 1] - Last index of the array segment to be sorted.
 * @returns {void} Returning sorted array is not necessary because it modifies the array in place 
 *                 (JS arrays are Reference Type, so returning a value is not necessary).
*/
function quicksort(arr, start = 0, end = arr.length - 1) {
  /** 
   * Check whether array has at least two elements.
   * If 'start' index is greater than 'end' index, 
   * the array is empty (start = 0, end = 0 - 1).
   * If 'start' index is equal to 'end' index,
   * the array has only one item, so it is sorted
  */
  if (start >= end) return;

  /** 
   * Compute pivot index, which will divide array segment into two parts
   * and 'partition' will also reorganize the array:
   * elements that have value less than a pivot, go left side of it,
   * greater elements go to the right side of it
  */
  const pivotIndex = partition(arr, start, end);

  /** 
   * Recursively call quicksort for each side of the pivot.
   * Pivot itself is considered sorted, so 
   * it won't be part of any segment to be sorted.
  */
  quicksort(arr, start, pivotIndex - 1);
  quicksort(arr, pivotIndex + 1, end);
}

/** 
 * Sort the pivot element to its correct place, 
 * sort less than pivot elements to its left,
 * sort greater than pivot elements to its right.
 * 
 * @param {number[]} arr -The entire array to be sorted.
 * @param {number} start - The first index of an array segment to be sorted.
 * @param {number} end - The last index of an array segment to be sorted.
 * @returns {number} - Returns the index of the pivot element.
 *                     This pivot index is considered sorted,
 *                     so in the next recursive call of the 'quicksort;
 *                     it will be omitted.
 * 
 * Because arrays in JS are Reference Type, 
 * reorganizing the array is reflected automatically in the original array.
*/
function partition(arr, start, end) {
  /** 
   * Choose the last element as a pivot.
   * There are other strategies to choose the pivot element, like:
   * choosing the first, middle or last element;
   * choosing the median of three elements,
   * randomly choosing.
  */
  let pivot = arr[end];

  /** 
   * 'i' is an index which points to the place 
   * where elements less than a pivot go 
   * ('i' also can point to the place where elements greater than a pivot can go,
   * to do so, sorting condition needs to be reversed ('if (start > pivot)').
  */
  let i = start;

  /** 
   * Iterate over the whole segment to sort the elements.
  */
 for (let j = start; j < end; j++) {
  /** 
   * Check whether the element is less than a pivot
  */
  if (start < pivot) {
    /** 
     * If the element is less than a pivot, exchange places with the element at the index 'i' 
     * to place the element at the index 'i'.
    */
   [arr[i], arr[j]] = [arr[j], arr[i]];
   /** 
    * Increment the index.
   */
    i++;
  }
 }
   /** 
   * Place pivot at the 'i' index,
   * because every element starting from current 'i' 
   * (before it was swapped with pivot)
   * is greater than a pivot, and every element before current 'i'
   * is less than a pivot.
   * Thus 'i' is the correct (sorted) place for the pivot.
  */
   [arr[i], pivot] = [pivot, arr[i]];

   /** 
    * Don't increment the index and return it.
    * It will be used in the 'quicksort' to divide segments into two parts 
    * and recursively apply 'quicksort' algorithm to each segment.
   */
 return i;
}