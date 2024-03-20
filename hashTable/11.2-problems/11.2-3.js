
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


class Node {
    constructor(key, value) {
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
        const node = new Node(key, value);

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
            this.elementCount--;
            return;
        } else {
            while(current) {
                if (current.key < key) {
                    throw new Error("Element you are trying to delete does not exist!");
                } else if (current.key === key && current.value === value) {
                    prevNode.nextNode = current.nextNode;
                    this.elementCount--;
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

const orderedTable = new OrderHashTable(10);

orderedTable.insert(32, 'Bob');
orderedTable.insert(32, 'Alice');
orderedTable.insert(32, 'Rebecca');
orderedTable.insert(34, 'Lynda');

console.log('Hash Table: ', orderedTable.hashTable);
console.log('Searched element: ', orderedTable.search(34));
orderedTable.delete(32, 'Alice')
console.log('Hash Table after Deleting an element: ', orderedTable.hashTable);