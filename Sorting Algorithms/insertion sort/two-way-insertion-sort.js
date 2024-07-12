/**
 * This variation splits the array into two subarrays: one for elements smaller than the initial element and one for elements larger than the initial element. Then it sorts each subarray and merges them.
 */



function twoWayInsertionSort(array) {
  let n = array.length;
  let left = 0;
  let right = n - 1;
  let aux = new Array(n);
  aux[left] = array[0];

  for (let i = 1; i < n; i++) {
    if (array[i] < aux[left]) {
      left--;
      aux[left] = array[i];
    } else if (array[i] > aux[right]) {
      right++;
      aux[right] = array[i];
    } else {
      let j = right;
      while (j >= left && array[i] < aux[j]) {
        aux[j + 1] = aux[j];
        j--;
      }
      aux[j + 1] = array[i];
      right++;
    }
  }

  for (let i = 0; i < n; i++) {
    array[i] = aux[left + i];
  }
  return array;
}
