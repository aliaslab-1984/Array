Array.extensions = {};

Array.extensions.remove = function (item, comparator) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item)) {
            this.splice(i, 1);
            break;
        }
};

Array.extensions.addUnique = function (item, comparator) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item))
            return false;

    this.push(item);
    return true;
}

Array.extensions.contains = function (item, comparator) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item))
            return true;
    return false;
}

Array.extensions.selectOne = function (item, comparator) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item))
            return this[i];
    return null;
}

Array.extensions.where = function (selector) {
    selector = selector || function () { return true; };
    var sel = null;
    if (selector && (typeof (selector)).toLowerCase() == "function") {
        sel = function (a) {
            return selector(a);
        };
    }
    else {
        sel = function (a) {
            return true;
        }
    }

    var list = [];
    for (var i = 0; i < this.length; i++)
        if (sel(this[i]))
            list.push(this[i]);
    return list;
}

Array.extensions.count = function (selector) {
    selector = selector || function () { return true; };
    return this.where(selector).length;
}

Array.extensions.first = function (selector) {
    selector = selector || function () { return true; };
    var tmp=this.where(selector);
    return tmp.length>0?tmp[0]:null;
}

Array.extensions.last = function (selector) {
    selector = selector || function () { return true; };
    var tmp = this.where(selector);
    return tmp.length > 0 ? tmp[tmp.length-1] : null;
}

Array.extensions.select = function (transformer) {
    var list = [];
    transformer = transformer || function (a) { return a; };
    for (var i = 0; i < this.length; i++)
        list.push(transformer(this[i]));
    return list;
}

Array.extensions.next = function (item, comparator, rotate) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item))
            break;

    if (i == this.length)
        return null;
    else if (i == this.length - 1)
        if (rotate)
            return this[0];
        else
            return null;
    else
        return this[i + 1];
}

Array.extensions.prev = function (item, comparator, rotate) {
    var cmp = null;
    if (comparator && (typeof (comparator)).toLowerCase() == "function") {
        cmp = function (a, b) {
            return comparator(a, b);
        };
    }
    else {
        cmp = function (a, b) {
            return a == b;
        }
    }

    for (var i = 0; i < this.length; i++)
        if (cmp(this[i], item))
            break;

    if (i == this.length)
        return null;
    else if (i == 0)
        if (rotate)
            return this[this.length-1];
        else
            return null;
    else
        return this[i - 1];
}

Array.extensions.Union = function (list, comparator) {
    var tmp = this.slice(0);
    for (var i = 0; i < list.length; i++)
        tmp.addUnique(list[i], comparator);
    return tmp;
}

Array.extensions.Except = function (list, comparator) {
    var tmp = this.slice(0);
    for (var i = 0; i < list.length; i++)
        tmp.remove(list[i], comparator);
    return tmp;
}

Array.extensions.Intersect = function (list, comparator) {
    return this.Except(this.Except(list, comparator), comparator);
}

Array.extensions.groupBy = function (comparator,namer) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        var tmp = null;
        for (var j = 0; j < res.length; j++) {
            if (res[j].items.contains(this[i], comparator)) {
                tmp = res[j];
                break;
            }
        }
        if (tmp == null) {
            var el = this[i];
            res.push({items:[el]});
        }
        else {
            tmp.items.push(this[i]);
        }
    }
    if (namer && (typeof (namer)).toLowerCase() == "function") {
        for (var i = 0; i < res.length; i++)
            res[i].name = namer(res[i]);
    }
    return res;
}

Array.extensions.orderBy = function (comparator) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        var j = 0;
        while (j < res.length && comparator(this[i], res[j]) >= 0) j++;
        res.splice(j,0,this[i]);
    }
    return res;
}

Array.extensions.distinct = function (comparator) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        if (!res.contains(this[i], comparator))
            res.push(this[i]);
    }
    return res;
}

Array.extensions.any = function (selector) {
    selector = selector || function () { return true; };
    var tmp = this.where(selector);
    return tmp.length > 0;
}

Array.extensions.selectMany = function (transformer) {
    var list = [];
    transformer = transformer || function (a) { return a; };
    for (var i = 0; i < this.length; i++) {
        var tmp = transformer(this[i]);
        for (var j = 0; j < tmp.length;j++)
            list.push(tmp[j]);
    }
    return list;
}

Array.extensions.insertOrdered = function (item, cmp) {
    var list = [];
    cmp = cmp || function (a, b) { return 1; };
    var i = 0;
    for (; i < this.length; i++) {
        if (cmp(item, this[i]) <= 0) {
            break;
        }
    }

    this.splice(i,0,item);

    return this;
}

for (var name in Array.extensions)
    Array.prototype[name] = Array.extensions[name];