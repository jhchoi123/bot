import * as fs from "fs";

export function requireJson(path: string): any {
    return JSON.parse(fs.readFileSync(path).toString());
}