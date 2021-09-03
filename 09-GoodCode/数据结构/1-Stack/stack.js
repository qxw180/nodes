function Stack() {
    var _items = [] // 私有变量
    this.push = (element) => {
        _items.push(element)
    }
    this.pop = () => {
        return _items.pop()
    }
    this.peek = () => {
        return _items[_items.length -1]
    }
    this.size = () => {
        return _items.length
    }
    this.isEmpty = () => {
        return _items.length === 0
    }
    this.clean = () => {
        _items = []
    }
    this.getItems = () => _items
}

var s = new Stack()
s.push(1)
s.push(2)
s.push(3)
console.log(s.getItems())

// 十进制转二级制
function toBinary(number) {
    var s = new Stack()
    while(number > 0) {
        s.push(number % 2)
        number = Math.floor(number/2)
    }
    var result = ''
    while (!s.isEmpty()) {
        result += s.pop()
    }
    return result
}

console.log(toBinary(10))