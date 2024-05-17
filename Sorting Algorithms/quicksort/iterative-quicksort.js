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
   * Choose pivot element
  */
  const pivot = arr[end];
  /** 
   * Choose index where will go the elements smaller than a pivot
  */
  let i = start;

  /** 
   * Iterate over a segment of an array and reorder elements:
   * elements smaller than a pivot go to the left of the pivot
   * elements greater than a pivot go to the right of the pivot
  */
  for (let j = start; j < end; j++) {
    /** 
     * compare current element to the pivot.
     * If the current element is less than a pivot, 
     * swap places with the current element and 'i'
    */
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      /** 
       * Increment the index to indicate where next smaller element will be placed
       * or in the end, where the pivot will be placed.
       * because 'i' is always one step ahead and it shows where the next element should be
      */
      i++;
    }
  }
  /** 
   * Swap places between 'i' and pivot element
   * this way pivot element will be right after all elements smaller than it
   * and right before greater elements
  */
  [arr[i], arr[end]] = [arr[end], arr[i]];
  /** 
   * now 'i' points to the current index of the pivot element.
   * Because array was sorted in-place, and the segment was just a part of the original
   * array, just determined with 'start' and 'end' indices,
   * and partition modified the original array,
   * now 'i' points to the actually sorted pivot element, at the original array.
   * and after this, sorting the current pivot element won't be necessary,
   * so it will become the divider between two segments of the original segment.
   * and now on, sorting the current element won't be necessary,
   * thus pushing its index on the stack is not needed.
   * And that is why we say in the 'iterativeQuickSort' function:
   * stack.push(start, pivotIndex - 1);
   * stack.push(pivotIndex + 1, end);
   * Also, returning
  */
  return i;
}