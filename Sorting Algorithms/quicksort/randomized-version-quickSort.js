/** */

/** 
 * Randomized version of the QuickSort.
 * 
 * It chooses random pivot for partitioning the array, 
 * which reduces chance of repeatedly getting smallest
 * or largest elements as a pivot.
*/


function quickSort(arr, start = 0, end = arr.length - 1) {
  /** 
   * Make sure that there are at least two elements in a segment.
   * 'start > end' - empty segment ('start' = 0, 'end' = -1 
   * ('end = length - 1 = 0 - 1 = -1'))
   * 'start = end' - one element in a segment.
  */
  if (start >= end) return;

  /** 
   * Compute pivot index.
  */
 const pivotIndex = randomizedPartition(arr, start, end);

 /** 
  * Recursively call 'quickSort' to sort the whole array,
  * because each call sorts only the pivot element.
  * This is why we omit pivot element from each recursive call.
 */
  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
  /** 
   * Returning sorted array is not needed because 
   * qiockSort sorts elements in-place and
   * JS arrays are Reference Type, so changes are reflected in the original array.
  */
}

function randomizedPartition(arr, start, end) {
  /** 
   * Compute random index for pivot.
  */
  const pivotIndex = randomInBetween(start, end);
  /** 
   * Swap the randomly chosen pivot with the last element 
   * (standard pivot position).
  */
 [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

 /** 
  * Call tha 'partition' and return the value - 
  * index of a sorted pivot element.
 */
  return partition(arr, start, end);
}

function randomInBetween(min, max) {
  /** 
   * Calculate random index between first and last indices.
   * 
   * 'Math.random()' - generates random number between 'min' and 'max'
   * '+1' - ensures that 'max' is also included.
   * 
   * 'Math.random() * (max - min + 1)' generates random number between '0' and 'max'.
   * But because 'min' might not be '0', we add 'min' to the result,
   * so the result will be between 'min' and 'max'.
  */
 return Math.floor(Math.random() * (max - min + 1) + min);
}

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