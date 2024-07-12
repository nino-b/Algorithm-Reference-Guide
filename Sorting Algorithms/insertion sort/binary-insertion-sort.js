
/**
 * Binary Insertion Sort 
 * 
 * Used instead of linear search to find the correct position for the key.
 * This reduces number of comparisons, but does not change the overall time complexity.
 */


// Performs Binary Insertion Sort on an array
function binaryInsertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i]; // Select the value of an element to be sorted.
    // Purpose: The 'key' variable holds the value of the current element that needs to be inserted into the correct position within the sorted portion of the array.
    // Reason: Storing this value allows us to shift other elements in a subarray to make room for this key without losing its value.


    // Create pointers at the start and the end of a subarray of sorted elements
    let left = 0; // First Pointer is at the first element of the sorted element subarray.
    // Purpose: The left pointer is initialized to 0, representing the start of the subarray of sorted elements.
    // Reason: This ensures that the binary search starts from the beginning of the sorted subarray.
    
    let right = i - 1; // Second Pointer is at the last element of the sorted subarray. The pointer is at the element, right before the element to be sorted.
    // Purpose: The right pointer is initialized to 'i - 1', representing the end of the subarray of sorted elements (just before the current element to be sorted).
    // Reason: This ensures that the binary search ends at the last element of the sorted subarray. The sorted subarray is defined as the elements from the start of the array up to the element just before the current element 'i'.

    // Binary Search for the correct position
    // Looks for correct position, until Pointers point to the same position - which is the place Key element will be inserted.
    while (left <= right) {
      let mid = Math.floor((left + right) / 2); // Choose the middle element from the sorted subarray.
      // Code will compare Key element to the middle element and in case it is greater or less than a middle element, one half of the sorted subarray will be eliminated. Thus it halvs necessary comparisons.

      if (array[mid] > key) {
        right = mid - 1; // If the middle element value is greater than a Key value, elements starting from middle till the end of a sub array will be greater than a Key element (subarray is sorted in ascending order). So, no comparisons are needed for those elements and the second half is eliminated entirely.
      } else {
        left = mid + 1; // If the middle element is less than a Key value, elements before (and including) the middle element can't be greater than a Key, so no comparisons are needed for them and they are eliminated.
      }
    }

    // Shift elements to make space for the key
    // The correct index was found. Now it is time to just shift one place to the right elements that are at that index and after that index so we can make a place for a Key element.
    // The left index is considered as lowest one (even though there is a case when it might be equal to the right) and we shift elements (including left index element, which will hold a Key element) one index to the right to make a space for the key element.
    for (let j = i - 1; j >= left; j--) {
      array[j + 1] = array[j]; // Shift elements to the right.
    }
    array[left] = key; // Place Key element at the correct place.
  }
  return array; // Return the sorted array.
}