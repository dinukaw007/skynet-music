
export default function MusicQueue() {
	this.elements = [];
 }

 MusicQueue.prototype.enqueue = function (e) {
	this.elements.push(e);
 };

// remove an element from the front of the queue
MusicQueue.prototype.dequeue = function () {
    return this.elements.shift();
};

// check if the queue is empty
MusicQueue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

// get the element at the front of the queue
MusicQueue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

MusicQueue.prototype.length = function() {
    return this.elements.length;
}