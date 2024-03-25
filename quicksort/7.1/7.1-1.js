/** 
 * Illustrate the operation of PARTITION on the array A = (13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11). 
*/

function quicksort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const partitionIndex = partition(arr, start, end);

        quicksort(arr, start, partitionIndex - 1);
        quicksort(arr, partitionIndex + 1, end);
    }
    return arr;
} 

function partition(arr, start, end){
    let partitionIndex = start;
    const pivot = arr[end];

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            partitionIndex++;
        }
    }
    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    return partitionIndex;
}

const arr = [13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11];
const sorted = quicksort(arr);
console.log('Sorted: ' ,sorted);