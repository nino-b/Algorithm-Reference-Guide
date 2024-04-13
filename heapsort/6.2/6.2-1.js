/** 
 * llustrate the operation of MAX-HEAPIFY (A, 3) on the array A = (27; 17; 3; 16; 13; 10; 1; 5; 7; 12; 4; 8; 9; 0).
*/

function maxHeapify(arr, index) {
    let leftIndex = 2 * index + 1; // because JS arrays have 0 based indexing
    let rightIndex = 2*index + 2;
    let largestIndex = index;

    if (largestIndex <= arr.length - 1 && arr[leftIndex] > arr[largestIndex]) {
        largestIndex = leftIndex;
    } else {
        largestIndex = index;
    }

    if (rightIndex <= arr.length && arr[rightIndex] > arr[largestIndex]) {
        largestIndex = rightIndex;
    }

    if (largestIndex !== index) {
        [arr[index], arr[largestIndex]] = [arr[largestIndex], arr[index]];
        maxHeapify(arr, largestIndex);
    }
}

const arr = [27, 17, 3, 16, 13, 10, 1, 5, 7, 12, 4, 8, 9, 0];

const result = maxHeapify(arr, 2);
console.log(arr)