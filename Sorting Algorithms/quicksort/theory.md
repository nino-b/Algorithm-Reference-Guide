# Quick Sort
<b></b>
<b><i></i></b>

## Step: 1: Getting To Know

Quick Sort is a highly efficient sorting algorithm and is based on the divide and conquer approach.

1. Pivot Selection.
2. Partitioning.
3. Reqursion.


Algorithm:
```js
function quickSort(array, low, high) {
  if (low < high) {
    partitionIndex = partition(array, low, high)
    quickSort(array, low, partitionIndex - 1)
    quickSort(array, partitionIndex + 1, high)
  }
  return array
}

function partition(array, low, high) {
  pivot = array[high]
  i = low - 1
  for j = low to high - 1 {
    if (array[j] < pivot) {
      i++
      swap array[i] with array[j]
    }
  }
  swap array[i + 1] with array [high]
  return i + 1
}
```


Explanation:
1. <b>Pivot Selection</b>: 
      ```
          Select a Pivot element from the array. 
          Common strategies: first element, last element, middle element, random element.
      ```
2. <b>Partitioning</b>: 

      ```
          Array is Partitioned into Two Sub-Arrays: 
          Elements less than a pivot are on one side, Elements greater than the pivot are on the other side.
      ```
      ```
        - Starting with Two Pointers at the beginning and the end of the array (excluding the pivot).
        - Two pointers move toward each other, and elements are swapped if they are on the wrong side of the pivot.
        - The process continues until the pointers meet, at which point the pivot is swapped with the pointer location, placing then pivot into its correct and sorted position.
      ```
3. <b>Reqursion</b>:
      ```
          The above steps are applied recursively to the two sub-arrays formend by splitting around the pivot. 
          This recursion continues until the base case is reaced (sub-array has one or zero elements).
      ```


## Step: 2: Pros and Cons

Pros:
- Efficient on Large Lists: average case  $O(n log n)$ .
- Space Efficiency: Operates in-place, requiring only $O(log n)$ additional space for the recursive call stack.

Cons:
- Worst Case Performance: $O(n^2)$ if the pivot chosen is consistently smallest or largest element.
- Unstable: does not maintain relative order of equal elements.


## Step: 3: Code Example (JS)

```js
// Function to perform the Quick Sort algorithm on an array
function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) { // Only proceed if there are at least two element to sort
    const pivotIndex = partition(arr, start, end) // Partition the array and get the pivot index
      quickSort(arr, start, pivotIndex - 1); // Recursively apply Quick Sort to the left sub-array
      quickSort(arr, pivotIndex + 1, end); // Recursively apply Quick Sort to the right sub-array
  }
  return arr; // Return the sorted array
}

// Function to partition the array around a pivot element
function partition(arr, start, end) {
  const pivot = arr[end]; // Choose the last element as the pivot
  let i = start; // Pointer where smaller elements than a pivot should go.
  // In the end it end it will be returned and used in the 'quickSort' function as Partition index
  
  // Reorder elements in the array such that elements less than the pivot are on the left,
  // and elements greater than the pivot are on the right
  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) { // If current element is smaller than the pivot
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the pivot with the element at the index i.
      i++; // Move the smaller elemen index forward
    }
  }
  // Place the pivot element after the last smaller element
  [arr[i], arr[end]] = [arr[end], arr[i]];
  return i; // Return the index of the pivot fot the 'quickSort' function
}
```



## Step: 4: Big <i>O</i>: <b>$O(n log n)$</b>

1. Best Case: <b>$O(n log n)$</b>. Array is split into two equal parts, so depth of recursive calls are reduced.
2. Average Case: <b>$O(n log n)$</b>. Array is split into two roughly equal parts.
3. Worst Case: <b>$O(n^2)$</b>. Array is sorted or pivot always is the smallest or largest element.