"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = (data) => {
    return Object.prototype.toString.call(data).toLowerCase().slice(8, -1);
};
