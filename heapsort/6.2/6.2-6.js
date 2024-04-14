/** 
 * The code for MAX-HEAPIFY is quite efficient in terms of constant factors, except possibly for the recursive call in line 10, 
 * for which some compilers might produce inefficient code. Write an efficient MAX-HEAPIFY that uses an iterative control 
 * construct (a loop) instead of recursion. 
*/

function maxHeapify(arr, i) {
    let largestIndex = i;
    let leftIndex = 2 * i + 1;
    let rightIndex = 2 * i + 2;

    while (true) {
        if (leftIndex < arr.length && arr[leftIndex] > arr[largestIndex]) {
            largestIndex = leftIndex;
        }
        if (rightIndex < arr.length && arr[rightIndex] > arr[largestIndex]) {
            largestIndex = rightIndex;
        }
        if (largestIndex !== initialIndex) {
            [arr[initialIndex], arr[largestIndex]] = [arr[largestIndex], arr[initialIndex]];
            i = largestIndex;
        } else {
            break;
        }
    }
}