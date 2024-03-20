/** 
 * Consider a hash table with 9 slots and the hash function h(k) = k mod 9. Demonstrate what happens upon inserting the keys 
 * 5, 28, 19, 15, 20, 33, 12, 17, 10 with collisions resolved by chaining.
*/

class Node {
    constructor(keys) {
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

const arr = [5, 28, 19, 15, 20, 33, 12, 17, 10];
const table = new HashTable();

function test (arr) {
    arr.forEach(el => {
        const newNode = new Node(el);
        table.insert(newNode);
    });
}

test(arr);
console.log('Hash Table: ',table.hashTable);