// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2010.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

// Defines a new field on a context object.
function def(context, name, value) {
    if (typeof context[name] === "undefined") {
        context[name] = value;
    } else {
        throw new Error("Cannot redefine: " + name);
    } 
}

// Extends an object by assigning a new set of fields to it.
function extend(target, extensions) {
    for (var name in extensions) {
        target[name] = extensions[name];
    }
}

// Defines a new class.
function defClass(context, name, staticMembers, instanceMembers, base) {
    var x = new Function();
    if (base) {
        x.prototype = new base()
    }
    extend(x, staticMembers);
    extend(x.prototype, instanceMembers);
    def(context, name, x);
    return x;
}

// Defines a new module.
function defModule(context, name, members, initializer) {
    function f() {
        return members;
    }
    if (initializer) {
        var init = false;
        f = function () {
            if (!init) {
                initializer();
                init = true;
            }
            return members;
        };
    }
    def(context, name, f);
    return f;
}

// Defines a new namespace.
function defNamespace(name) {
    var parts = name.split('.');
    var result = this;
    while (parts.length > 0) {
        var x = parts.shift();
        if (typeof this[x] == 'undefined') {
            result[x] = {};
        }
        result = result[x];
    }
    return result;
}
