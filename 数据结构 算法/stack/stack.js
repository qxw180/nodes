// function Stack() {
//     var _items = [] // 私有变量
//     this.push = (element) => {
//         _items.push(element)
//     }
//     this.pop = () => {
//         return _items.pop()
//     }
//     this.peek = () => {
//         return _items[_items.length -1]
//     }
//     this.size = () => {
//         return _items.length
//     }
//     this.isEmpty = () => {
//         return _items.length === 0
//     }
//     this.clean = () => {
//         _items = []
//     }
//     this.getItems = () => _items
// }

// var s = new Stack()
// s.push(1)
// s.push(2)
// s.push(3)
// console.log(s.getItems())

var reverse = function(x) {
    var isf = false
    if(x < 0 ) {
        isf = true
        x = -x
    }
    if(x > parseInt(111111111111111,2)) return 0
    if(x < 10) return isf ? -x : x
    var step = 10
    var arr = []
    while(x >= step) {
        var t = x%step
        x -= t
        arr.push(t/(step/10))
        step *= 10
    }
    arr.push(x%step/(step/10))
    return isf ? -(arr.join('') - 0) : arr.join('') - 0
};

console.log(reverse(10))
console.log(reverse(1534236469))

console.log(reverse(-123))