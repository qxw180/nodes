var HashTable = function() {
    var items = []

    /**
     * loselose 散列值计算
     * @param {String} key key
     * 极易发生散列冲突
     */
    var loseloseHashCode = function (key) {
        var hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt()
        }
        return hash % 37
    }

    /**
     * 更好的散列算法
     * @param {String} key key
     */
    var djb2HashCode = function(key) {
        var hash = 5381
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key[i].charCodeAt()
        }
        return hash % 1013
    }

    this.put = function(key, value) {
        var position = loseloseHashCode(key)
        items[position] = value
    }

    this.remove = function(key) {
        items[loseloseHashCode(key)] = undefined
    }

    this.get = function(key) {
        return items[loseloseHashCode(key)]
    }

}

var HashTable_LinkedList = function() {
    var items = []

    /**
     * loselose 散列值计算
     * @param {String} key key
     */
    var loseloseHashCode = function (key) {
        var hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt()
        }
        return hash % 37
    }

    var Node = function(key, value) {
        this.key= key
        this.value = value
    }

    this.put = function(key, value) {
        var position = loseloseHashCode(key)
        if(!items[key]) {
            var ll = new LinkedList()
            items[position] = ll
        }
        ll.append(new Node(key, value))
    }

    this.remove = function(key) {
        var position = loseloseHashCode(key)
        if(items[position]) {
            var current = items[position].getHead()
            while (current.next) {
                if(current.element.key == key) {
                    items[position].remove(current.element)
                    // 链表元素复位，降低内存消耗
                    if(items[position].isEmpty) {
                        items[position] = undefined
                    }
                    return true
                }
                current = current.next
            }
        }
    }

    this.get = function(key) {
        var position = loseloseHashCode(key)
        if(items[position]) {
            var current = items[position].getHead()
            while(current.next) {
                if(current.element.key == key) {
                    return current.element.value
                }
                current = current.next
            }
        }
        return undefined 
    }
}

var HashTable_Line = function() {
    var items = []

    /**
     * loselose 散列值计算
     * @param {String} key key
     */
    var loseloseHashCode = function (key) {
        var hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt()
        }
        return hash % 37
    }

    var Node = function(key, value) {
        this.key= key
        this.value = value
    }

    this.put = function(key, value) {
        var position = loseloseHashCode(key)
        while(true) {
            if(items[position] === undefined) {
                items[position] = new Node(key, value)
                break
            }
            position++
        }
    }

    this.remove = function(key) {
        var position = loseloseHashCode(key)
        while(true) {
            var item = items[position]
            if(item === undefined) {
                return false
            } else if (items[position].key === key) {
                items[position] = undefined
                return true
            } else {
                position++
            }
        }
    }

    this.get = function(key) {
        var position = loseloseHashCode(key)
        while(true) {
            var item = items[position]
            if(item === undefined) {
                return undefined
            } else if (items[position].key === key) {
                return items[position].value
            } else {
                position++
            }
        }
    }
}