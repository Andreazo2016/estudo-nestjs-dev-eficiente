function getOnlyNumber(value = '') {
    if(!value) {
        throw new Error(`the ${value} can not be null or empty to get only number`)
    }
    return value.replace(/\D/g,'')
}

export {
    getOnlyNumber
}