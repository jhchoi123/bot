"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class DestinyManifestDAO {
    constructor() {
    }
    static async getDestinyManifest() {
        const rawManifest = await fs_1.default.promises.readFile(__dirname + "/../../resources/destiny/manifest.json");
        return JSON.parse(rawManifest.toString());
    }
}
exports.default = DestinyManifestDAO;
