/**
 * List Insertion Sort
 * 
 * Applied to Linked Lists.
 * This variation is efficient because it avoids the overhead of shifting elements as is done in array-based Insertion Sort.
 */


class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


function sortedInsert(head, newNode) {
  if (head === null || head.data >= newNode.data) {
    newNode.next = head;
    head = newNode;
  } else {
    let current = head;
    while (current.next !== null && current.next.data < newNode.data) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }
  return head;
}


function insertionSortList(head) {
  let sorted = null;
  let current = head;

  while (current !== null) {
    let next = current.next;
    sorted = sortedInsert(sorted, current);
    current = next;
  }
  return sorted;
}