 const getParentIndex = (index) => Math.floor((index - 1) / 2)

// PriorityCompare takes in x and y, returns -1, 0, or 1.
// -1 -> x <  y
//  0 -> x == y
//  1 -> x >  y

class PQueue {
  constructor(priorityCompare) {
    this._priorityCompare = priorityCompare;
  }

  _heap = [];
  _size = 0;

  insert(item) {
    if (!item) {
      throw new Error('item cannot be null');
    }

    this._heap.push(item);
    this._size += 1;

    let parentIndex = getParentIndex(this._size - 1);
    let currentIndex = this._size - 1;
    while(parentIndex >= 0) {
      if (this._priorityCompare(this._heap[currentIndex], this._heap[parentIndex]) < 1) {
        break;
      }
      let tmp = this._heap[currentIndex];
      this._heap[currentIndex] = this._heap[parentIndex];
      this._heap[parentIndex] = tmp;
      currentIndex = parentIndex;
      parentIndex = getParentIndex(parentIndex);
    }
  }

  peek() {
    if (!this._heap.length) {
      return null;
    }

    return this._heap[0];
  }

  dequeue() {
    if (!this._heap.length) {
      return null;
    }

    const item = this._heap.shift();
    this._size -= 1;
    return item;
  }

  heapify(i) {
    if (i < 0 || i > this._size - 1) {
      return;
    }

    const left = i * 2 + 1;
    const right = i * 2 + 2;

    let largest = i;
    if (left < this._size && this._priorityCompare(this._heap[left], this._heap[largest]) > 0) {
      largest = left;
    }

    if (right < this._size && this._priorityCompare(this._heap[right], this._heap[largest]) > 0) {
      largest = right;
    }

    if (largest !== i) {
      const tmp = this._heap[i];
      this._heap[i] = this._heap[largest];
      this._heap[largest] = tmp;
    }
  }

  print() {
    this._heap.forEach((item, i) => {
      console.log(i, item);
    });
  }
}

module.exports = PQueue;