function Map() {
    var items = {}

    this.has = function(key) {
        return items.hasOwnProperty(key)
    }

    this.get = function(key) {
        return items[key]
    }

    this.set = function(key, value) {
        items[key] = value
    }
    
    this.delete = function(key) {
        if(this.has(key)) {
            delete items[key]
            return true
        }
        return false
    }
}