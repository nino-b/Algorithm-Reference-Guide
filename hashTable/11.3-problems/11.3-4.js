/** 
 * # Problem
 * Consider a hash table of size m = 1000 and a corresponding hash function h(k) = [m (kA mod 1)] for A = (√5 − 1)/2. 
 * Compute the locations to which the keys 61, 62, 63, 64, and 65 are mapped.
*/

function hash (key, tableLength) {
    const A = (Math.sqrt(5) - 1) / 2;
    return Math.floor(tableLength * ((key * A) % 1));
}

const tableLength = 1000;

const arr = [61, 62, 63, 64, 65];
arr.forEach(el => {
    console.log(hash(el, tableLength));
})