/** 
 * Illustrate the operation of BUILD-MAX-HEAP on the array A = (5; 3; 17; 10; 84; 19; 6; 22; 9).
*/

function buildMaxHeap(arr) {
    for (let i = arr.length / 2; i >= 0; i--) {
        maxHeapify(arr, i);
    }
}

function maxHeapify(arr, index) {
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;
    let largestIndex = index;

    while(leftIndex < arr.length || rightIndex < arr.length) {
        if (leftIndex < arr.length && arr[leftIndex] > arr[largestIndex]) {
            largestIndex = leftIndex;
        }
        if (rightIndex < arr.length && arr[rightIndex] > arr[largestIndex]) {
            largestIndex = rightIndex;
        }
        if (largestIndex !== index) {
            [arr[largestIndex], arr[index]] = [arr[index], arr[largestIndex]];
            
            index = largestIndex;
            leftIndex = 2 * index + 1;
            rightIndex = 2 * index + 2;
        } else {
            break; 
        }
    }
}

const arr = [5, 3, 17, 10, 84, 19, 6, 22, 9];

buildMaxHeap(arr);
console.log(arr);