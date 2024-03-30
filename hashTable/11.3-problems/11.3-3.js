/** 
 * # Problem
 * Consider a version of the division method in which h(k) = k mod m, where m = 2^p − 1 and k is a character string interpreted in radix 2^p. 
 * Show that if string x can be converted to string y by permuting its characters, then x and y hash to the same value. 
 * Give an example of an application in which this property would be undesirable in a hash function.
 * 
 * This type of behavior is undesirable if all keys are permutations of each other.
 * In this case every element will hash to the same place, and we won't be able to profit with dirrect-address nature of the Hash Table. 
 * Instead, we will have to linearly search through collided elements.
 * Thus this will cause the worst case scenario of search time (O(n) where n is number of elements in the table).
*/

function hash (string, p) {
    if (typeof string !== 'string') throw new Error('Please enter a valid string!');
    if (typeof p !== 'number') throw new Error('Please enter a valid number!');

    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        console.log(string.charCodeAt(i));
        hash = (hash + string.charCodeAt(i)) % (Math.pow(2, p) - 1);
    }
    return hash;
}

const p = 3;

const str1 = 'ABC';
const str2 = 'BAC';
const str3 = 'CBA';

console.log('Hash 1: ', hash(str1, p));
console.log('Hash 2: ', hash(str2, p));
console.log('Hash 3: ', hash(str3, p));