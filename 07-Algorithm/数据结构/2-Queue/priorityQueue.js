/**
 * 优先队列
 */
var PriorityQueue = function() {
    var items = []

    var Item = function(element, priority) {
        this.element = element
        this.priority = priority
    }

    this.enqueue = function(element, priority) {
        var item = new Item(element, priority)

        var added = false

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if(item.priority > element.priority) {
                items.splice(index, 0, item)
                added = true
                break
            }
        }
        if(!add) {
            items.push(item)
        }
    }
    this.dequeue = function() {

    }
}