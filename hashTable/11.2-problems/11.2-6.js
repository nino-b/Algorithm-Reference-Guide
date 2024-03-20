/** 
 * # Problem:
 * You have stored n keys in a hash table of size m, with collisions resolved by chaining, and you know the length of each chain, including the 
 * length L of the longest chain. Describe a procedure that selects a key uniformly at random from among the keys in the hash table and returns 
 * it in expected time O(L · (1 + 1/α)).
*/

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class HashTable {
    #elementCount = 0;
    #longestChain = 0;
    #keyCount = 0;
    constructor (length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
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
        this.#elementCount++;
        this.#keyCount++;
        if (this.#elementCount >= this.resetThreshold) {
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
                this.#keyCount--;
                this.#elementCount--;
                return;
            }
            let prevNode = null;
            while (current !== null) {
                if (current.key === key && current.value === value) {
                    prevNode.nextNode = current.nextNode;
                    this.#keyCount--;
                    this.#elementCount--;
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
        this.#elementCount = 0;
        this.resetThreshold = this.length / 2;
        this.#keyCount = 0;
        const oldTable = this.hashTable;
        this.hashTable = new Array(this.length).fill(null);

        for (const el of oldTable) {
            let current = el;
            while (current !== null) {
                this.insert(current.key, current.value);
                current = current.nextNode;
            }
        }
    }
    selectKeyUniformly() {
        if (this.#keyCount === 0) {
            throw new Error('The hash table is empty.');
        }
        let attempt = 0;

        while (attempt <= this.length) {
            const hashIndex = Math.floor(Math.random() * this.length);
            let current = this.hashTable[hashIndex];

            if (current !== null) {
                const chainLength = this.#getChainLength(current);
                const randomIndex = Math.floor(Math.random() * chainLength);

                for (let i = 0; i < randomIndex; i++) {
                    current = current.nextNode;
                }
                return current.key;
            }
            attempt++;
        }
        throw new Error('Unable to select key.')
    }
    #getChainLength(node){
        let current = node;
        let length = 0;

        while (current !== null) {
            length++;
            current = current.nextNode;
        }
        if (length > this.#longestChain) {
            this.#longestChain = length;
        }
        return length;
    }
}

const HashTable = new HashTable(3);

HashTable.insert('key', 'data1');
HashTable.insert('bob', 'data2');
HashTable.insert('key2', 'data3');

console.log('Hash Table: ', HashTable.hashTable);
console.log('Search for "key": ', HashTable.search('key2'));
HashTable.delete('key2', 'data3');
console.log('Hash Table after Deleting "key2, data3": ', HashTable.hashTable);
