

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i]; // The element to be positioned.
    let j = i - 1; // Start comparing with the previous element.
                   // If previous element is less than a key, no changes will be applied.
    // If the previous element is greater than a key, changes will be applied.
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]; // Element that we are currently comparing to, is moved one spot to the right, to free up the space for a Key element.
      j = j - 1; // Move to the previous element.
      // By doing this, we are iterating backwards through the elements that are already in the sorted subarray.
      // We compare the key element with these elements to find the correct insertion point.
      // The condition 'j >= 0' ensures that we do not check negative indices, which would be out of bounds.
    }
    array[j + 1] = key; // Place the key at the correct index.
    // '[j + 1]' is a correct index because '[j]' (the index of the last element we compared to the Key element) was decremented one step before comparing the next element in the sorted subarray to the Key element.
    // But when it couldn't satisfy the condition '(j >= 0 && array[j] > key)', this indicated that either 'array[j]' is the first element in the array, or it is less than or equal to the current key. 
    // Which means that Key element should be inserted immediately after 'array[j]'.
  }
  return array; // Return the sorted subarray.
}



/* ****************************************************************************************************************************************************************************************************************************** */


function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return array;
}
