# 
<b></b>
<b><i></i></b>

## Step: 1: Getting To Know


Algorithm:
```js
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
```


Explanation:
1. 
2. 
3. 
4. 


## Step: 2: Pros and Cons

Pros:


Cons:


## Step: 3: Code Example (JS)



## Step: 4: Big <i>O</i>: <b>$$</b>