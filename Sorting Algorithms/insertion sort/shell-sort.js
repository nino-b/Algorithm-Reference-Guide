/**
 * Shell Sort
 * 
 * A generalization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that starting anywhere, taking every h-th element produces a sorted list. This results in a decrease in the number of swaps needed compared to regular insertion sort.
 */


function shellSort(array) {
  let n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j;

      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
      }
      array[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return array;
}