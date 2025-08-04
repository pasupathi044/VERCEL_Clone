"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const aws_1 = require("./aws");
const util_1 = require("./util");
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const publisher = (0, redis_1.createClient)();
publisher.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            const responce = yield subscriber.brPop((0, redis_1.commandOptions)({ isolated: true }), 'build-queue', 0);
            if (responce && responce.element) {
                yield (0, aws_1.downloadS3Folder)(`output/${responce.element}`);
            }
            if (responce && responce.element) {
                yield (0, util_1.buildProject)(responce.element);
            }
            if (responce && responce.element) {
                yield (0, aws_1.copyBuildOutput)(responce.element);
            }
            const id = responce ? responce.element : null;
            if (id) {
                publisher.hSet("status", id, "deployed");
            }
        }
    });
}
main();
