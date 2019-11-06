import titleize from 'titleize';

export const rentalType = (isShared) => {
    return isShared ? 'shared' : 'entire'
}

export const toUpperCase = (value) => {
    return value ? titleize(value) : ''
}