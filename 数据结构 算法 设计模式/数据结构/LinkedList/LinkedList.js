function LinkedList(element) {

    var head = null
    var length = 0

    var Node = function(element) {
        this.element = element
        this.next = null
    }

    this.append = function(element) {
        var node = new Node(element)
        if(head === null) {
            head = node
        } else {
            var current = head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        length++
    }

    this.insert = function(positon, element) {
        if(positon > -1 && positon < length) {
            var node = new Node(element)
            if(positon === 0) {
                var t = head
                head = node
                node.next = t
            } else {
                var i = 0, current = head, prev = null
                while(i < positon) {
                    i++
                    prev = current
                    current = current.next
                }
                prev.next = node
                node.next = current
            }
            length++
        }
    }

    this.removeAt = function(positon) {
        var current = head, index = 0, prev = null
        if(positon > 0 && positon < length) {
            if(positon === 0) {
                head = head.next
            }
            while(positon > index ) {
                prev = current
                current = current.next
                index++
            }
            prev.next = current.next
            length--
        }
    }

    this.indexOf = function(element) {
        if(element) {
            var index = 0, current = head
            while (current) {
                if(current.element === element) {
                    return index
                }
                current = current.next
                index++
            }
        }
        return -1
    }

    this.remove = function(element) {
        this.remove(this.indexOf(element))
    }

    this.size = function() {
        return this.length
    }

    this.isEmpty = function() {
        return length === 0
    }

    this.getHead = function() {
        return head
    }
}