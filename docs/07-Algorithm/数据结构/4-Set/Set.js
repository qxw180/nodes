var ISet = function () {

    var items = {}

    this.has = function(value) {
        return items.hasOwnProperty(value)
    }

    this.add = function(value) {
        if(!this.has(value)) {
            items[value] = value
            return value
        }
        return false
    }

    this.remove = function(value) {
        if(this.has(value)) {
            delete items[value]
            return true
        }
        return false
    }

    this.values = function() {
        return Object.values(items)
    }

    this.clear = function() {
        items = {}
    }

    this.size = function() {
        // let length = 0
        // for( var i in set) {
        //     if(item.hasOwnProperty(i)) {
        //         i++
        //     }
        // }
        // return length
        return Object.keys(items).length
    }

    this.union = function(ohterSet) {
        var result = new ISet()

        var arr = this.values
        for(var i = 0; i < arr; i++ ){
            result.add(arr[i])
        }

        arr = ohterSet.values
        for(var i = 0; i < arr; i++ ){
            result.add(arr[i])
        }

        return result
    }

    this.intersection = function (otherSet) {
        var result = new ISet()
        var arr = this.values
        for(var i = 0; i < arr; i++ ){
            if(ohterSet.has(arr[i])) {
                result.add(arr[i])
            }
        }
        return result
    }

    this.difference = function (otherSet) {
        var result = new ISet()
        var arr = this.values
        for(var i = 0; i < arr; i++ ){
            if(!ohterSet.has(arr[i])) {
                result.add(arr[i])
            }
        }
        return result
    }
}
