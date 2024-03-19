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


class Node {
    constructor(key) {
        this.key = key;
        this.nextNode = null;
    }
}
class HashTable {
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

/* const arr = [5, 28, 19, 15, 20, 33, 12, 17, 10];
const table = new HashTable();

function test (arr) {
    arr.forEach(el => {
        const newNode01 = new Node(el);
        table.insert(newNode01);
    });
}

test(arr);
console.log(table.hashTable); */


/** 
 * # Problem:
 * Professor Marley hypothesizes that he can obtain substantial performance gains by modifying the chaining scheme to keep each list in 
 * sorted order. How does the professor's modification affect the running time for successful searches, unsuccessful searches, insertions, 
 * and deletions?
 * 
 * # My Approach:
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

class ChainNode {
    constructor (key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class OrderHashTable {
    constructor(length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
        this.elementCount = 0;
        this.resetThreshold = this.length / 2;
    }
    insert(key, value) {
        const index = this.hash(key);
        const node = new ChainNode(key, value);

        if (!this.hashTable[index]) {
            this.hashTable[index] = node;
        } else {
            let current = this.hashTable[index];
            let prevNode = null;
            while (current !== null && current.key > node.key) { 
                // this works if typeof key is either string or number. 
                // if it has other type, different key comparison methods should be implemented
                prevNode = current;
                current = current.nextNode;
            }
            if (current === this.hashTable[index]) {
                node.nextNode = current;
                this.hashTable[index] = node;
            } else {
                node.nextNode = current;
                prevNode.nextNode = node;
            }
        }
        this.elementCount++;
        if (this.elementCount >= this.resetThreshold) {
            this.#reset();
        }
    }
    search(key) {
        const index = this.hash(key);
        let current = this.hashTable[index];

        if (!current) throw new Error("Element you are looking for does not exist!");

        while (current) {
            if (current.key === key) {
                return current;
            } else if (current.key < key) {
                throw new Error("Element you are looking for does not exist!");
            }
            current = current.nextNode;
        }
    }
    delete(key, value) {
        const index = this.hash(key);
        let current = this.hashTable[index];
        let prevNode = null;
        
        if (!current) throw new Error("Element you are trying to delete does not exist!");

        if (current.key === key && current.value === value) {
            this.hashTable[index] = current.nextNode;
            return;
        } else {
            while(current) {
                if (current.key < key) {
                    throw new Error("Element you are trying to delete does not exist!");
                } else if (current.key === key && current.value === value) {
                    prevNode.nextNode = current.nextNode;
                    return;
                }
                prevNode = current;
                current = current.nextNode;
            }
            throw new Error("Element you are trying to delete does not exist!");
        }
    }
    hash(key) {
        let typeInitial = null;
        if (typeof key === 'string') {
            typeInitial = 'STR:';
        } else if (typeof key === 'number') {
            typeInitial = 'NUM:';
        } else if (typeof key === 'object') {
            typeInitial = 'OBJ:';
        } else if (typeof key === 'boolean') {
            typeInitial = 'BOOL:';
        } else {
            typeInitial = 'OTHER';
        }

        let string = typeInitial + key.toString();

        let sum = 0;
        for (let i = 0; i < string.length; i++) {
            sum += string.charCodeAt(i);
        }
        return sum % this.length;
    }
    #reset(){
        this.length *= 2;
        this.elementCount = 0;
        const oldTable = this.hashTable;
        this.hashTable = new Array(this.length).fill(null);
        this.resetThreshold = this.length / 2;

        for (const el of oldTable) {
            let current = el;
            while (current !== null) {
                this.insert(current.key, current.value);
                current = current.nextNode;
            }
        }
    }
}
/* 
const orderedTable = new OrderHashTable(10);

orderedTable.insert(32, 'Bob');
orderedTable.insert(32, 'Alice');
orderedTable.insert(32, 'Rebecca');
orderedTable.insert(34, 'Lynda');

console.log('Hash Table: ', orderedTable.hashTable);
console.log('Searched element: ', orderedTable.search(34));
orderedTable.delete(32, 'Alice')
console.log('Hash Table after Deleting an element: ', orderedTable.hashTable);
 */
/** 
 * # Problem:
 * Suggest how to allocate and deallocate storage for elements within the hash table itself by creating a "free list": a linked list of all the 
 * unused slots. Assume that one slot can store a flag and either one element plus a pointer or two pointers. All dictionary and free-list 
 * operations should run in O(1) expected time. Does the free list need to be doubly linked, or does a singly linked free list suffice?
 * 
 * # My Approach:
 * - We will use Node class to create each element instance.
 * - A linked list will store Node instances that were deleted (deallocate storage).
 * - Insert method will recycle those instances with new values (allocate storage) and if there are no more Node instances to allocate, then 
 * will create new Node instance.
*/

class FreeListNode {
    constructor(key, value, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

class FreeListHashTable {
    constructor(length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
        this.freeNodeList = null;
        this.elementCount = 0;
        this.resetThreshold = this.length / 2;
    }
    insert(key, value) {
        let node;
        if (this.freeNodeList !== null) {
            node = this.freeNodeList;
            node.key = key;
            node.value = value;

            this.freeNodeList = this.freeNodeList.nextNode;
        } else {
            node = new FreeListNode(key, value)
        }

        const index = this.hash(key);

        if (this.hashTable[index] === null) {
            this.hashTable[index] = node;
        } else {
            let current = this.hashTable[index];
            while (current) {
                if (current.nextNode === null) {
                    current.nextNode = node;
                    break;
                }
                current = current.nextNode;
            }
        }
        this.elementCount++;
        if (this.elementCount >= this.resetThreshold) {
            this.reset()
        }
    }
    search(key) {
        const index = this.hash(key);
        let current = this.hashTable[index];

        if (!current) {
            return null;
        }  else {
            while (current !== null) {
                if (current.key === key) {
                    return current;
                } else {
                    current = current.nextNode;
                }
            }
            return null;
        }
    }
    delete(key) {
        const index = this.hash(key);
        let current = this.hashTable[index];

        if (!current) {
            throw new Error("Element you are trying delete that does not exist!");
        }

        if (current.key === key) {
            if (current.nextNode) {
                this.hashTable[index] = current.nextNode;
            } else {
                this.hashTable[index] = null;
            }
            this.#addElToFreeNodeList(current);
        } else {
            while (current) {
                if (current.nextNode.key === key) {
                    let toDelete = current.nextNode;
                    if (toDelete.nextNode) {
                        current.nextNode = toDelete.nextNode;
                    } else {
                        current.nextNode = null;
                    }
                    this.#addElToFreeNodeList(toDelete);
                    return;
                } else {
                    current = current.nextNode;
                    return;
                }
            }
            throw new Error("Element you are trying delete that does not exist!");
        }
    }
    hash(key) {
        let typeInitial = null;
        if (typeof key === 'string') {
            typeInitial = 'STR:';
        } else if (typeof key === 'number') {
            typeInitial = 'NUM:';
        } else if (typeof key === 'object') {
            typeInitial = 'OBJ:';
        } else if (typeof key === 'boolean') {
            typeInitial = 'BOOL:';
        } else {
            typeInitial = 'OTHER';
        }

        let string = typeInitial + key.toString();

        let sum = 0;
        for (let i = 0; i < string.length; i++) {
            sum += string.charCodeAt(i);
        }
        return sum % this.length;
    }
    reset() {
        const oldTable = this.hashTable;
        this.hashTable = new Array(this.length * 2).fill(null);
        this.length *= 2;
        this.elementCount = 0;
        this.resetThreshold = this.length / 2;

        for (const el of oldTable) {
            let current = el;
            while (current !== null) {
                this.insert(current.key, current.value);
                current = current.nextNode;
            }
        }
    }
    #addElToFreeNodeList(el) {
        el.key = null;
        el.value = null;
        el.nextNode = null;

        if (this.freeNodeList !== null) {
            el.nextNode = this.freeNodeList;
        }
        this.freeNodeList = el;
    }
}

/** 
 * # Problem:
 * You need to store a set of n keys in a hash table of size m. Show that if the keys are drawn from a universe U with |U| > (n − 1)m, then U 
 * has a subset of size n consisting of keys that all hash to the same slot, so that the worst-case searching time for hashing with chaining is 
 * Θ(n).
 * 
 * # My Approach:
*/

/** 
 * # Problem:
 * You have stored n keys in a hash table of size m, with collisions resolved by chaining, and you know the length of each chain, including the 
 * length L of the longest chain. Describe a procedure that selects a key uniformly at random from among the keys in the hash table and returns 
 * it in expected time O(L · (1 + 1/α)).
 * 
 * # My Approach:
*/
