"use strict";
/*createing a function to create a unique id for users */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
function generate() {
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    const length = 5;
    let id = "";
    for (let i = 0; i < length; i++) {
        id += subset[Math.floor(Math.random() * subset.length)];
    }
    return id;
}
