/** */

/** 
 * # Problem:
 * You use a hash function h to hash n distinct keys into an array T of length m. Assuming independent uniform hashing, 
 * what is the expected number of collisions? More precisely, what is the expected cardinality of {{k1, k2} : k1 ≠ k2 and h(k1) = h(k2)}?
 * 
 * # My Approach:
 * - m potential slots. Hash function can map keys to m distinct slots. 1/m probability that any two distinct keys hash to the same slot.
 * - n(n-1)/2 total number of unique pairs of keys.
 * - n(n-1)/2m expected number of collisions in independent uniform hashing case.
 * 
 * @namespace Expected_Number_Of_Collisions
*/

/** 
 * Consider a hash table with 9 slots and the hash function h(k) = k mod 9. Demonstrate what happens upon inserting the keys 
 * 5, 28, 19, 15, 20, 33, 12, 17, 10 with collisions resolved by chaining.
*/
class Node01 {
    constructor(key) {
        this.key = key;
        this.nextNode = null;
    }
}
class HashTable01 {
    constructor() {
        this.hashTable = new Array(9);
    }
    insert(node) {
        const hash = this.hash(node.key);

        if (!this.hashTable[hash]) {
            this.hashTable[hash] = node;
        } else {
            let current = this.hashTable[hash];
            while (current) {
                if (current.nextNode) {
                    current = current.nextNode;
                } else {
                    current.nextNode = node;
                    break;
                }
            }
        }
    }
    hash(key) {
        return key % 9;
    }
}
/* 
const arr01 = [5, 28, 19, 15, 20, 33, 12, 17, 10];
const HashTable011 = new HashTable01();

function test01 (arr) {
    arr01.forEach(el => {
        const newNode01 = new Node01(el);
        HashTable011.insert(newNode01);
    });
}

test01(arr01);
console.log(HashTable011.hashTable);
 */

/** 
 * Professor Marley hypothesizes that he can obtain substantial performance gains by modifying the chaining scheme to keep each list in 
 * sorted order. How does the professor's modification affect the running time for successful searches, unsuccessful searches, insertions, 
 * and deletions?
 * 
 * - Successful search / Unsuccessful search:
 *      - Average case: improved efficiency. Gives us ability of early termination if search reached point where element being searched would 
 * have been.
 *      - Worst case: O(n) linear search. We will have to go through whole list if an element is at the end or is not at all in the list.
 * - Deletion:
 *      - Average case: improved efficiency. Deletion consists of these phases: search of the element (average case: improved efficiency), removal of the element (O(1)), maintaining order (when an element is removed from the sorted list, order of the list is preserved).
 *      - Worst case: O(n) linear search. We will have to go through whole list if an element is at the end or is not at all in the list. removal of the element and maintaining order are constant in time (O(1)).
 * - Insertion:
 *      - O(n) linear search. Is costly because we need to check each item until we find correct position.
*/

/** 
 * Suggest how to allocate and deallocate storage for elements within the hash table itself by creating a "free list": a linked list of all the 
 * unused slots. Assume that one slot can store a flag and either one element plus a pointer or two pointers. All dictionary and free-list 
 * operations should run in O(1) expected time. Does the free list need to be doubly linked, or does a singly linked free list suffice?
*/

/** 
 * You need to store a set of n keys in a hash table of size m. Show that if the keys are drawn from a universe U with |U| > (n − 1)m, then U 
 * has a subset of size n consisting of keys that all hash to the same slot, so that the worst-case searching time for hashing with chaining is 
 * Θ(n).
*/

/** 
 * You have stored n keys in a hash table of size m, with collisions resolved by chaining, and you know the length of each chain, including the 
 * length L of the longest chain. Describe a procedure that selects a key uniformly at random from among the keys in the hash table and returns 
 * it in expected time O(L · (1 + 1/α)).
*/
