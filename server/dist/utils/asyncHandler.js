"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asynchandler = void 0;
const asynchandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); //if the function is reolve then its good do nothing and if it not then run catch 
};
exports.asynchandler = asynchandler;
//# sourceMappingURL=asyncHandler.js.map