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

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}


class HashTable {
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
            node = new Node(key, value)
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
            throw new Error("Element you are trying delete does not exist!");
        }

        if (current.key === key) {
            if (current.nextNode) {
                this.hashTable[index] = current.nextNode;
            } else {
                this.hashTable[index] = null;
            }
            this.elementCount--;
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
                    this.elementCount--;
                    this.#addElToFreeNodeList(toDelete);
                    return;
                } else {
                    current = current.nextNode;
                    return;
                }
            }
            throw new Error("Element you are trying delete does not exist!");
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

const hashTable = new HashTable(3);

hashTable.insert(3, 'Ava');
hashTable.insert(12, 'Lydia');
hashTable.insert(22, 'Marshall');
hashTable.insert(18, 'Rose');

console.log('Hash Table: ', hashTable.hashTable);
hashTable.delete(18);
console.log('Hash Table after Delete: ', hashTable.hashTable);
console.log('freeNodeList after Delete: ', hashTable.freeNodeList);