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
  let i = start - 1;

  /** 
   * Iterate over the whole segment to sort the elements.
  */
 for (let j = start; j < end; j++) {
  /** 
   * Check whether the element is less than a pivot
  */
  if (start < pivot) {
    /** 
     * Increment the index.
    */
    i++;
    /** 
     * If the element is less than a pivot, exchange places with the element at the index 'i' 
     * to place the element at the index 'i'.
    */
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
 }
  /** 
   * Add '1' to 'i'  and swap its places with the pivot.
   * Attention: code doesn't increment 'i', rather it adds '1' to it.
   * This is important for semantical reason:
   * The goal of the existence of 'i' is to point to the location
   * where element less than a pivot is located.
   * So, because pivot is not less than itself, code doesn't increment 'i'.
   * This way 'i' always points to the place, where 
   * element less than a pivot is located.
   * 
   * -- After incrementing and before swapping, 
   * 'i' points to the element that is greater than a pivot,
   * while pivot is still located at the last place.
   * so by swapping them, element, greater than a pivot gets placed at the last index,
   * and pivot gets placed between elements greater and less than a pivot.
   * Thus 'i' is the correct (sorted) place for the pivot.
   * 
  */
   [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];

   /** 
    * Because 'i' still points to the place before the pivot,
    * code still needs to add '1' to 'i' to point to the pivot's position.
    * Returning the index of the pivot's position 
    * will help 'quicksort' to omit current pivot from sorting it again, 
    * because pivot element is already sorted.
   */
 return i + 1;
}