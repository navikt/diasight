export const idToNumber = (id: string) => {
    return parseInt(id.split("/")[1]);
}