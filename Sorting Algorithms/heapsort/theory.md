# 
<b></b>
<b><i></i></b>

## Step: 1: Getting To Know

Heapsort is a comparison-based sorting algorithm that uses binary heap data structure. It's efficient and performs in $O(n log n)&$time complexity.

1. Building a max heap from the input array.
2. Repeatedly extracting the maximum element from the heap and rebuilding the heap until all elements are sorted.

Algorithm:
```js
// i = index of the element that needs to be heapified
function heapify(arr, heapSize, i) {
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // left child
  let right = 2 * i + 2; // right child

  if (left < heapSize && arr[left > arr[largest]]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    heapify(arr, heapSize, largest);
  }
}

function heapSort(arr) {
  let heapSize = arr.length;
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(arr, heapSize, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0)
  }
}
```


Explanation:
1. 
2. 
3. 
4. 


## Step: 2: Pros and Cons

Pros:


Cons:


## Step: 3: Code Example (JS)



## Step: 4: Big <i>O</i>: <b>$$</b>