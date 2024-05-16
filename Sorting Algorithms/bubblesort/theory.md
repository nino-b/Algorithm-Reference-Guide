# Bubble Sort
<b></b>
<b><i></i></b>

## Step: 1: Getting To Know

The Bubble Sort algorithm is a simple sorting technique used to rearrange a list in ascending or descending order.

Algorithm:
1. The algorithm iterates over a list, comparing adjacent items.
2. If an item is greater than the item next to it (for ascending order), they are swapped.
3. This process is repeated for each list item, making several passes through the list until no more swaps are needed, indicating the list is sorted.

```js
BUBBLESORT(A, n)
for i = 1 to n - 1
  for j = n downto i + 1
    if A[j] < A[j - 1]
      exchange A[j] with A[j - 1]
```


Explanation:
1. The outer loop runs from the first element to the second-to-last element.
2. The inner loop runs backwards from the last element to the element currently being considered by the outer loop.
3. If a pair of elements is out of order (earlier one is greater than the later one), they are swapped.
4. This action 'bubbles' the largest element to its correct position at the end if the list with each complete iteration of the inner loop
5. Each pass through the list places the next largest element in its correct position, reducing the number of comparisons needed in the successuve rounds.


## Step: 2: Pros and Cons

Pros:
- Simplicity.
- Space Efficiency: it is an <b>In Place</b> sorthing algorithm. Requires <b><i>O(1)</i></b> additional memory.
- Can easily detect if the list is already sorted. If so, it doesn't pass through again.
- Stable: does not change the sequence of equal elements.

Cons:
- Inefficient for large lists: <b><i>$O(n^2)$</i></b>.
- Excessive Swapping: element might need to be swapped many times before it reaches its correct position.
- Poor performance: It needs to pass through the entire list many times, until no more swaps are needed, so it might make more comparisons than necessary.


## Step: 3: Code Example (JS)

Bubbles up the smallest element at the beginnig (like in the pseudocode):
```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  return arr;
}
```

Bubbles up the largest element at the end:
```js
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
}
```

## Step: 4: Big <i>O</i>: <b>$O(n^2)$</b>

1. Best Case Scenario (array is already sorted): <b><i>$O(n)$</i></b>. Makes one pass through the array.

2. Average Case Scenario (elements are in random order): <b><i>$O(n^2)$</i></b>. Requires multiple swaps.

3. Worst Case Scenario (elements are in reverse order): <b><i>$O(n^2)$</i></b>. Requires maximum number of swaps.