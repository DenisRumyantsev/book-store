export const spaceNorm = (str) => {
    const norm = [];
    str.split(' ').forEach(word => word && norm.push(word.trim()));
    return norm.join(' ');
};
