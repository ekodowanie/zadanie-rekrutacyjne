import { readFile, parseUsersTxtToObjects } from "../utils";

export const fetchUsers = async () => {
    const file = await readFile('/data/testdaten.txt');
    return parseUsersTxtToObjects(await file.text());
};