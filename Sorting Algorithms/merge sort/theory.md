# Merge Sort

## Step: 1: Getting To Know

Merge Sort is a divide-and-conquer algorithm for sorting an array or list. It works by breaking the array down into smaller subarrays, sorting those subarrays and then merging them back together to form the sorted array.


Algorithm:


Explanation:
1. Divide: Divide the unsorted array into two approximately equal parts.
2. Conquer: Recursively sort each part.
3. Combine: Merge the two sorted parts into a single sorted array.



## Step: 2: Pros and Cons

Pros:
- Stable Sorting - maintains the relative order of equal elements.
- Consistent performance: $O (n log n)$.
- Efficient for Large Databases - Merge sort is particularly effective for sorting large datasets that do not fit entirely in memory (external sorting) because it works in a predictable manner and can be implemented to handle large amounts of data efficiently.


Cons:
- Space Complexity $O (n)$ - requires additional space.
- Slower for smaller arrays.
- Recursive nature which might lead to a high stack depth and might cause stack overflow.


## Step: 3: Code Example (JS)

```js
function merge (leftArray, rightArray) {
  const sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Merge elements from both arrays in sorted order
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      sortedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from leftArray
  while (leftIndex < leftArray.length) {
    sortedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from rightArray
  while (rightIndex < rightArray.length) {
    sortedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return sortedArray;
}
```



## Step: 4: Big <i>O</i>: <b>$O (n log n)$</b>

1. Best Case: O(n log n)
2. Average Case: O(n log n)
3. Worst Case: O(n log n)


![alt text](/Sorting%20Algorithms/merge%20sort/merge-sort.png)