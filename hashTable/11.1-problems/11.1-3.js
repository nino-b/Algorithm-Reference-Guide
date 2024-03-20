/** 
 * @namespace problem
 * #Problem
 * Suggest how to implement a direct-address table in which the keys of stored elements do not need to be distinct and 
 * the elements can have satellite data. 
 * All three dictionary operations (INSERT, DELETE, and SEARCH) should run in O(1) time. 
 * (Don’t forget that DELETE takes as an argument a pointer to an object to be deleted, not a key.)
 * 
 * # My Approach:
 * - 'keys of stored elements do not need to be distinct' - we might have same keys with different (or same) satellite data.
 *      - Here emerges a problem: 
 *      we might have two distinct elements with exact same keys and satellite data 
 *      (like: element1 = {cat: 'tabby'} and element2 = {cat: 'tabby'}) and condition does not specify that we can replace 
 *      one element with another if we encounter same elements during Direct-Address Table creation process.
 *      - To distinguish two distinct elements with same keys and satellite data we can use unique identifiers.
 * - Hash Tables are form of Direct-Address Table that can store elements with same key (when two keys hash to the same index, it is called a collision).
 * - One of the way to handle collisions is to group all elements with same hash as an array, or linked list.
 * - 'DELETE takes as an argument a pointer to an object to be deleted, not a key' - elements are connected to each other with pointers (so we use linked list).
 * - So, we need to create a Hash Table that takes element with unique id as an argument and handles collisions with chaining elements as a linked list.
*/


/**
 * Represents a single node in a Linked List.
 * Each node holds key, value, reference to the next node and unique id.
 *
 * @class Node
 */
class Node {
    
    /**
     * Static counter to assign unique id to each node instance.
     *
     * @static
     * @memberof Node
     */
    static id = 0;
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
        this.id = Node.id++;
    }
}

class HashTable {
    /**
     * @private
     * @type {number}
     * This property couts number of used slots in Hash Table.
     * If #elementCount reaches resetThreshold, insert method invokes resize() method.
    */
    #elementCount = 0;
    constructor(length) {
        this.length = length;
        this.hashTable = new Array(this.length).fill(null);
        this.resetThreshold = this.length / 2;
    }
    
    /**
     * Inserts a new node in the Hash Table.
     * If a collision occurs (i.e. another node already exists at the calculated hash index)
     * the new node is added to the end of the linked list at that index
     * If element count is equal to reset threshold, the table is resized and rehashed.
     *
     * @param {*} node
     * @memberof HashTable
     */
    insert(node) {
        const hashIndex = this.hashGenerator(node.key);

        if (!this.hashTable[hashIndex]) {
            this.hashTable[hashIndex] = node;
        } else {
            let current = this.hashTable[hashIndex];
            while (current) {
                if (current.nextNode) {
                    current = current.nextNode;
                } else {
                    current.nextNode = node;
                    break;
                }
            }
        }
        this.#elementCount++;
        if (this.#elementCount >= this.resetThreshold) {
            this.resize();
        }
    }
    
    search(key, id) {
        const index = this.hashGenerator(key);
        let current = this.hashTable[index];

        if (!current) {
            return null;
        }
        while (current) {
            if (current.key === key && current.id === id) {
                return current;
            }
            current = current.nextNode;
        }
        return null; // hash does exist but there is no element with that key
    
    }
    delete(node) {
        const index = this.hashGenerator(node.key);
        let current = this.hashTable[index];

        if (!current) {
            throw new Error('Element you are trying to delete does not exist!');
        }

        if (current === node) {
            this.hashTable[index] = node.nextNode;
            return;
        } 
        while (current) {
            if (current.nextNode === node) {
                current.nextNode = node.nextNode;
                return;
            }
            current = current.nextNode;
        }
        throw new Error('Element you are trying to delete does not exist!');
    }
    hashGenerator(key) {
        let sum = 0;
        let typePrefix;
        if (typeof key === 'string') {
            typePrefix = 'STR:';
        } else if (typeof key === 'number') {
            typePrefix = 'NUM:';
        } else if (typeof key === 'object') {
            typePrefix = 'OBJ:';
            key = JSON.stringify(key);
        } else if (typeof key === 'boolean') {
            typePrefix = 'BOOL:';
        } else {
            typePrefix = 'OTHER'
        }

        const string = typePrefix + key.toString();

        for (let i = 0; i < string.length; i++) {
            sum += string.charCodeAt(i) * 3;
        }
        return sum % this.length;
    } 
    resize() {
        const oldHashTable = this.hashTable;
        this.length *= 2;
        this.hashTable = new Array(this.length).fill(null);
        this.#elementCount = 0;
        this.resetThreshold = this.length / 2;

        oldHashTable.forEach(node => {
            while(node) {
                const nextNode = node.nextNode;
                node.nextNode = null;
                this.insert(node);
                node = nextNode;
            }
        });
    }
}

const node1 = new Node('cat', 'siamese');
const node2 = new Node('cat', 'siamese');
const node3 = new Node('dog', 'black');
const node4 = new Node('rabbit', 'white');

const newHashTable = new HashTable(7);
console.log('Empty Hash Table: ', newHashTable);

newHashTable.insert(node1);
newHashTable.insert(node2);
newHashTable.insert(node3);

console.log('Populated Hash Table: ', newHashTable);

newHashTable.insert(node4);

console.log('Resized Hash Table: ', newHashTable);

const firstSiameseCat = newHashTable.search('cat', 1);

console.log('Searched first instance of "siamese cat": ', firstSiameseCat);

newHashTable.delete(node3);

console.log('Hash Table after I deleted node3: ', newHashTable);
