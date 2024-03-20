class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}


/** 
 * # Problem:
 * You need to store a set of n keys in a hash table of size m. Show that if the keys are drawn from a universe U with |U| > (n − 1)m, then U 
 * has a subset of size n consisting of keys that all hash to the same slot, so that the worst-case searching time for hashing with chaining is 
 * Θ(n). 
 * 
 * # My Approach:
 * - Because universe is larger than Hash Table, it is more likely that collisions will happen. 
 * - Chaining is one of the mehods of resolving collisions.
*/

class DenseSubsetHashTable {
    constructor (length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
        this.elementCount = 0;
        this.resetThreshold = this.length / 2;
    }
    insert(key, value) {
        const index = this.#hash(key);
        const node = new Node(key, value);
        let current = this.hashTable[index];

        if (!current) {
            this.hashTable[index] = node;
        } else {
            while (current !== null) {
                if (current.nextNode === null) {
                    current.nextNode = node;
                    return;
                }
                current = current.nextNode;
            }
        }
        this.elementCount++;
        if (this.elementCount >= this.resetThreshold) {
            this.#reset();
        }
    }
    search(key) {
        const index = this.#hash(key);
        let current = this.hashTable[index];

        if (!current) {
            return null;
        } else {
            while (current !== null) {
                if (current.key === key) {
                    return current;
                }
                current = current.nextNode;
            }
            return null;
        }
    }
    delete(key, value) {
        const index = this.#hash(key);
        let current = this.hashTable[index];
        
        if (!current) {
            throw new Error("Element you are trying delete does not exist!");
        } else {
            if (current.key === key && current.value === value) {
                this.hashTable[index] = current.nextNode;
                this.elementCount--;
                return;
            }
            let prevNode = null;
            while (current !== null) {
                if (current.key === key && current.value === value) {
                    prevNode.nextNode = current.nextNode;
                    this.elementCount--;
                    return;
                }
                prevNode = current;
                current = current.nextNode;
            }
            throw new Error("Element you are trying delete does not exist!");
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


const denseSubsetHashTable = new DenseSubsetHashTable(3);
denseSubsetHashTable.insert('key', 'data1');
denseSubsetHashTable.insert('key1', 'data2');
denseSubsetHashTable.insert('key', 'data3');
denseSubsetHashTable.insert('key', 'data4');
denseSubsetHashTable.insert('key', 'data5');
denseSubsetHashTable.insert('key1', 'data6');

console.log('Hash Table: ', denseSubsetHashTable.hashTable);
console.log('Search "key": ', denseSubsetHashTable.search('key'));
denseSubsetHashTable.delete('key', 'data1')
console.log('Hash Table after Deleting "key", "data1": ', denseSubsetHashTable.hashTable);