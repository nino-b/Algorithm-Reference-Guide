/** 
 * Iterative QuickSort
 * Convert the Recursive QuickSort to a Iterative QuickSort
*/


function iterativeQuickSort(arr) {
  /** 
   * Ensure that there are at least two elements in the array
  */
  if (arr.length >= 2) {
    /** 
     * Create a Stack.
     * Stack will hold sub-arrays. 
     * Sub-arrays will hold first and last indices of the segments to be sorted
     * (segments of the original array)
     * QuickSort performs in-place sorting - no additional space needed except space for a stack
    */
    const stack = [];
    /** 
     * push first and last indices of the array as a sub-array in the stack
    */
    stack.push([0, arr.length - 1]);

    /** 
     * start a while loop to divide an array into smaller segments and sort them.
    */
    while (stack.length > 0) {
      /** 
       * Remove a sub-array from the stack
       * A sub-array contains first and last indices of the unsorted segment.
       * Destructure the sub-array into two values: 
       * 'start' as a starting index of a segment to be sorted.
       * 'end' as a last index of a segment to be sorted.
      */
      const [start, end] = stack.pop();

      /** 
       * Check whether a segment contains at least two elements.
       * 1. If segment contains at least 2 elements, 'start < end'.
       * 2. if 'start === end' this means that first and last indices are the same.
       * thus there is only one element in the segment
       * and one element segment is already sorted.
       * 3. if 'start > end' this means that:
       * - there is an empty array (start = 0, end = -1);
       * - there was an error during partitioning or sorting
       * and some elements ended up in reversed order
       * in such cases (2 and 3) code will stop executing what is left in the current
       * iteration to be executed and will move on the next iteration
      */
      if (start >= end) continue;

      /** 
       * Compute pivot index and reorganize elements of a segment
       * elements smaller than a pivot go to the left of the pivot
       * elements greater than a pivot go to the right of the pivot
      */
      const pivotIndex = partition(arr, start, end);
      
      /** 
       * add segments to be sorted in a stack
      */
      stack.push(start, pivotIndex - 1);
      stack.push(pivotIndex + 1, end);
    }
  }
  /** 
   * return the sorted array
  */
  return arr;
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