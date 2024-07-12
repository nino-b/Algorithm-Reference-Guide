


function mergeSort(array) {
  // Base case: if the array has 1 or 0 elements, it's already sorted
  if (array.length <= 1) return array;

  // Divide the array into two halves

  const middleIndex = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex);

  const sortedLeftArray = mergeSort(leftArray);
  const sortedRightArray = mergeSort(rightArray);

  // Merge two sorted halves
  return merge(sortedLeftArray, sortedRightArray);
}


function merge(leftArray, rightArray) {
  const sortedArray = [];
  const leftIndex = 0;
  const rightIndex = 0;

  // Compare elements in the left and right arrays and merge them in sorted order
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      sortedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // If tehre are remaining elements in the left array, add them to the sorted array
  while (leftIndex < leftArray.length) {
    sortedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

   // If there are remaining elements in the right array, add them to the sorted array
   while (rightIndex < rightArray.length) {
    sortedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return sortedArray;
}