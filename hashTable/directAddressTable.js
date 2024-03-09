/**
* A dynamic set S is represented by a direct-address table T of length m. Describe a procedure that finds the maximum element of S. What is the worst-case performance of your procedure?

* We should take in consideration that array might not be fully populated and there might be empty slots.
* We should look for largest non empty slot. To do so, we need to iterate backwards and first non empty slot will be largest element (because keys correspond to values).
* Worst case scenario, there won't be any element in the array and we would have to iterate over whole array.
* So search would be linear O(n) where n is array's length.
*/

function largestEl(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null && arr[i] !== undefined) {
            return arr[i];
        }
    };
};
