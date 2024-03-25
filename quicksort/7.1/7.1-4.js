/** 
 * Modify QUICKSORT to sort into monotonically decreasing order.
*/

function quicksort (arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const partitionIndex = partition(arr, start, end);

        quicksort(arr, start, partitionIndex - 1);
        quicksort(arr, partitionIndex + 1, end);
    }
    return arr;
}

function partition (arr, start, end) {
    const pivot = arr[end];
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] > pivot) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            partitionIndex++;
        }
    }
    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    return partitionIndex;
}

const arr = [4, 2, 5, 6, 3, 7];
const sorted = quicksort(arr);
console.log(sorted);