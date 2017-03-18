const codeMap = {
    80001:'wrong name or password'
}

module.exports = code =>{
    let msg = codeMap[code]
    return msg || 'undefined code message'
}
