import { isUuid } from 'uuidv4';

export function isIsbn (isbn) {
    return /^[0-9]{10}$/i.test(isbn) || /^[0-9]{13}$/i.test(isbn);
}

export function isbnValidIfPresent (isbn) {
    if (isbn?.length) {
        return isIsbn(isbn) ? 'valid' : 'invalid';
    }
}

export function uuidValidIfPresent (uuid) {
    if (uuid?.length) {
        return isUuid(uuid) ? 'valid' : 'invalid';
    }
}
