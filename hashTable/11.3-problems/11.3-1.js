/** 
 * # Problem
 * You wish to search a linked list of length n, where each element contains a key k along with a hash value h(k). 
 * Each key is a long character string. How might you take advantage of the hash values when searching the list for an element with a given key?
 * 
 * # My Approach:
 * 1. Compute hash value for the key.
 * 2. Linearly go through linked list and compare Hash Values instead of long keys. This will reduce need for expensive string comparisons, 
 * especially if each element has unique Hash Value.
*/

class Node {
    constructor(key, hashVal) {
        this.key = key;
        this.hashVal = hashVal;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    insert(key) {
        const hashVal = this.#hash(key);
        const node = new Node(key, hashVal);
        let current = this.head;

        if (current === null) {
            this.head = node;
            return;
        } else {
            while (current !== null) {
                if (current.nextNode === null) {
                    current.nextNode = node;
                    return;
                }
                current = current.nextNode;
            }
        }
    }
    search(key) {
        const hashVal = this.#hash(key);
        let current = this.head;

        while (current !== null) {
            if (current.hashVal === hashVal) {
                if (current.key === key) {
                    return current;
                }
            }
            current = current.nextNode;
        }
    }
    #hash(key) {
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
        const prime = 31;

        let sum = 0;
        for (let i = 0; i < string.length; i++) {
            sum += string.charCodeAt(i);
        }
        return sum % prime;
    }
}

const linkedList = new LinkedList();

const keys = ['veryLongKey01', 'veryLongKey02', 'veryLongKey03', 'veryLongKey04', 'veryLongKey05'];

linkedList.insert('veryLongKey01');


keys.forEach(key => linkedList.insert(key));
console.log(linkedList.head)
console.log('Searched element: ', linkedList.search(keys[2]));
