/** 
 * Give a brief argument that the running time of PARTITION on a subarray of size n is O(n). 
 * 
 * PARTITION checks each element of the subarray whether that element is bigger than pivot or not. 
 * It performs constant amount of work in the loop: compares element to the pivot, if the value is less than a pivot, 
 * algorithm swaps element with partition element, increments partition index.
 * There are no nested subarrays, so there is no additional iteration.
 * It performs constant amount of work before and after the loop.
 * Thus running time of PARTITION is linear (O(n)).
*/

function partition (arr, start, end) {
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