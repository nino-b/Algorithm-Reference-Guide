
/** 
 * #Problem:
 * Suppose that you want to implement a dictionary by using direct addressing on a huge array. That is, if the array size is m and the 
 * dictionary contains at most n elements at any one time, then m >> n. At the start, the array entries may contain garbage, and initializing 
 * the entire array is impractical because of its size. Describe a scheme for implementing a direct-address dictionary on a huge array. Each 
 * stored object should use O(1) space; the operations SEARCH, INSERT, and DELETE should take O(1) time each; and initializing the data 
 * structure should take O(1) time. (Hint: Use an additional array, treated somewhat like a stack, whose size is the number of keys actually 
 * stored in the dictionary, to help determine whether a given entry in the huge array is valid or not.) 
 * 
 * # My Approach:
 * - 'implement a dictionary by using direct addressing on a huge array': implement a direct address array that holds dictionary values.
 * - 'array size is m and the dictionary contains at most n elements at any one time, then m >> n': implement an array with a length of m, 
 * which is larger than actual number of entries in the array - n.
 * - Because m > n, and we don't what is the difference between those two. E.g. m = 10 000 and n = 10, it will be waste of space and time to 
 * create array with length of m and initialize values (like null) for the whole array if we won't use initialized space.
 * - To avoid that problem, initialize a Direct-Address array with length of m but won't initialize its values.
 * - I will use Set as key holder and will hold indices (from main array) that are actually occupied. This is important, because if we 
 * insert value 'undefined' at index (example location) 346 in the main array and then directly try to retrieve data from index 346, 
 * we might not distingush actually inserted 'undefined' from the result unsefined if the value was absent.
 */

class DirectAddressDictionary {
    constructor(length) {
        this.mainArr = new Array(length);
        this.keySet = new Set();
    }
    insert(key, value) {
        if (!this.keySet.has(key)) {
            this.mainArr[key] = value;
            this.keySet.add(key);
        }
    }
    search(key) {
        if (this.keySet.has(key)) {
            return this.mainArr[key];
        }
        return null;
    }
    delete(key) {
        if (this.keySet.has(key)) {
            this.mainArr[key] = undefined;
            this.keySet.delete(key);
        }
    }
}

const directAddressDictionary = new DirectAddressDictionary(100);

directAddressDictionary.insert(5, 'Bob');
directAddressDictionary.insert(17, 'Charlie');
directAddressDictionary.insert(22, 'Meghan');
directAddressDictionary.insert(12, 'Vanessa');
directAddressDictionary.insert(88, 'Monroe');
directAddressDictionary.insert(59, 'Zoe');

console.log('Dirrect address dictionary: ', directAddressDictionary.mainArr);
console.log('Set - key holderS: ', directAddressDictionary.keySet);