export const getPrototypeChain = (element, names = []) => {
    const prototype = Object.getPrototypeOf(element);
    if (prototype) {
        names.push(prototype.constructor.name);
        getPrototypeChain(prototype, names)
    }
    return names;
}