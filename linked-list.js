class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}


class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
          
    if(this.tail){    
        //we define the newNode to be the "next()"" of the tail object.
        this.tail.next = newNode;
        //we update the "prev()" of the tail Node.
        newNode.prev = this.tail;
        //then we update the tail object to be the newNode.
        this.tail = newNode;
    }

    if(!this.head){
        this.head = newNode;
        this.tail = newNode;  
    }

    //update the length of the linked list
    this.length ++;
    
    return undefined;
  }


  unshift(val) {
    const newNode = new Node(val);
      
    if(this.head){
        //get head
        let previousHead = this.head;

        //Update previous head with prev
        previousHead.prev = newNode;
        
        //Define the new head
        this.head = newNode;
        this.head.next = previousHead;
        }

    //the first element of the list
    if(!this.head){
        this.head = newNode;
        this.tail = newNode;
        }
    
    this.length ++;
    return undefined;  

  }

  pop() {
    
    if(!this.tail){
        throw new Error("Cannot pop item the as list is empty");
    }
    else if(this.head == this.tail){
      let val = this.head.val;
      this.tail = null;
      this.head = null;
      this.length --;
      return val;
    }
    let oldTail = this.tail;
    let prevItem = oldTail.prev; 
    prevItem.next = null;
    this.tail = prevItem;
    
    this.length --;

    return oldTail.val;
  }

    shift(){
        
        if(!this.head){
            throw new Error("Cannot use shift as the list is empty");
        }
        else if(this.head == this.tail){
          let val = this.head.val;
          this.tail = null;
          this.head = null;
          this.length --;
          return val;
        }
        let oldHead = this.head;
        let newHead = oldHead.next;
        newHead.prev = null;
        this.head = newHead;
        this.length --;
        
        return oldHead.val;
    }
    
    getAt(idx){
        if(idx == 1){
            return this.head.val;
        }
        else if(idx > this.length){
            throw new Error("Index out of range");
        }

        let previous = this.head;
        let newValue;
        
        for (let i = 0; i < idx-1; i++){
            newValue = previous.next;
            previous = newValue;
            }
        return newValue.val;
    }

    setAt(idx, val){
      let currentNode;
        if(!val){
            throw new Error("You must provide a second argument");
        }
        else if(idx == 1){
            currentNode = this.head;
        }
        else if(idx > this.length){
            throw new Error("Index out of range");
        }
        
        let previous = this.head;
        for (let i = 0; i < idx-1; i++){
            currentNode = previous.next;
            previous = currentNode;
            }
        currentNode.val = val;
        
        return currentNode;
        
    }

    insertAt(idx, val){
        if(!val){
            throw new Error("You must provide a second argument");
        }
        else if(idx == 1){
            this.unshift(val);
            return undefined;
        }            
        else if(idx == this.length){
            this.push(val);
            return undefined;
        }
        else if(idx > this.length){
            throw new Error("Index out of range");
        }
        
        console.log('this is val', val);
        let previous = this.head;
        let currentNode;
        
        for (let i = 0; i < idx-1; i++){
            currentNode = previous.next;
            previous = currentNode;
        }

        let newNode = new Node(val);

        // configure the previous node two ways
        let previousNode = currentNode.prev;        
        previousNode.next = newNode;
        newNode.prev = previousNode;

        //reasing the .prev and .next
        currentNode.prev = newNode;
        newNode.next = currentNode;
        
        this.length ++;
        return undefined;
    }

    removeAt(idx){
        if(idx > this.length){
            throw new Error("Index out of range");
        }
        else if(idx == 1){
            return this.shift(idx);
        } 
        else if(idx == this.length){
            return this.pop(idx);
        }
        
        let previous = this.head;
        let currentNode;
        
        for (let i = 0; i < idx-1; i++){
            currentNode = previous.next;
            previous = currentNode;
        }

        let previousNode = currentNode.prev;
        let nextNode = currentNode.next;
        previousNode.next = nextNode;
        nextNode.prev = previousNode;
        this.length --;
        return currentNode.val;
    }

    average(){
        let previous = this.head;
        let currentNode;
        let count = 0;
        let length = this.length;
        if (this.length == 0){
          return 0;
        }

        for (let i = 0; i < length; i++){
            count += previous.val;
            currentNode = previous.next;
            previous = currentNode;
        }
        return (count/length);
        
    }
    
}

module.exports = LinkedList;
