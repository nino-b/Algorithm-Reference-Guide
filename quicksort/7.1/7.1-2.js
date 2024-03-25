/** 
 * What value of q does PARTITION return when all elements in the subarray A[p:r] have the same value? 
 * Modify PARTITION so that q = [(p+r)/2] when all elements in the subarray A[p:r] have the same value. 
*/

function quicksort (arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const partitionIndex = partition(arr, start, end)

        quicksort(arr, start, partitionIndex - 1);
        quicksort(arr, partitionIndex + 1, end);
    }
    return arr;
}

function partition (arr, start, end) {
    const mid = Math.floor(arr.length / 2);
    [arr[mid], arr[end]] = [arr[end], arr[mid]]; // To stick with end pivot strategy

    const pivot = arr[end];
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            partitionIndex++;
        }
    }
    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    return partitionIndex;
}

const arrToSort = [1, 1, 1, 1, 1];
const sorted = quicksort(arrToSort);

console.log(sorted);