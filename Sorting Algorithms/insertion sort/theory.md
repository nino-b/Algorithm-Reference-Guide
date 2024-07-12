# 
<b></b>
<b><i></i></b>

## Step: 1: Getting To Know


Algorithm:
```js
INSERTION-SORT(A, n)
  for i = 2 to n
    key = A[i]
    // Insert A[i] into the sorted subarray A[1: i - 1].
    j = i - 1
    while j > 0 and A[j] > key
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key
```


Explanation:
1. <b>Outer loop:</b> Iterates over each elements in the array, starting from the <b>second</b> element.  
  - The first element is considered as a sorted subarray.
  - By starting the iteration from the second element (```i = 1```), the algorithm can start the the process of insertion directly into this initially sorted subarray.
  - The idea of insertion sort is to on every iteration on the array (the outer loop, ```i```) sort (<b>insert</b>) elements in a subarray that initially consists of the first element of the original array.
2. <b>Key</b> is an element to be sorted.
3. <b>Shifting Elements:</b> Elements greater than a Key, shift one position to the right to make a room for the Key element.
4. <b>Iterate Backwards:</b>   
```j = j - 1``` allowd the inner loop to move backwards through the sorted subarry, comparing the key with each element.
5. <b>Inserting the key: </b> The key element is placed at its correct posution.


## Step: 2: Pros and Cons

Pros:
- Simple.
- Stable (maintains the relative original order of equal elements.)
- In-placce - requires only consistent amount of additional memory space.
- Efficient for small Data Sets.



Cons:
- Inefficient for Large data sets: time complexity  $O(O n*2)$


## Step: 3: Code Example (JS)

```js
// Function to perform the Insertion Sort algorithm on an array
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i]; // The value of an element to be positioned.
    let j = i - 1; // Start comparing with the previous element.
                   // If previous element is less than a key, no changes will be applied.
    // If the previous element is greater than a key, changes will be applied.
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]; // Element that we are currently comparing to, is moved one spot to the right, to free up the space for a Key element.
      j = j - 1; // Move to the previous element.
      // By doing this, we are iterating backwards through the elements that are already in the sorted subarray.
      // We compare the key element with these elements to find the correct insertion point.
      // The condition 'j >= 0' ensures that we do not check negative indices, which would be out of bounds.
    }
    array[j + 1] = key; // Place the key at the correct index.
    // '[j + 1]' is a correct index because '[j]' (the index of the last element we compared to the Key element) was decremented one step before comparing the next element in the sorted subarray to the Key element.
    // But when it couldn't satisfy the condition '(j >= 0 && array[j] > key)', this indicated that either 'array[j]' is the first element in the array, or it is less than or equal to the current key. 
    // Which means that Key element should be inserted immediately after 'array[j]'.
  }
  return array; // Return the sorted subarray.
}
```


## Step: 4: Big <i>O</i>: <b>$O(O n^2)$</b>

1. <b>Best Case:</b> $O(O n)$ - The array is already sorted.
2. <b>Average Case:</b> $O(O n^2)$ -  Each element is compared to all other elements in the sorted portion.
3. <b>Worst Case:</b> $O(O n^2)$ - The array is sorted in reverse order.