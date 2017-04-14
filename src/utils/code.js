const codeMap = {
    80001:'wrong name or password'
}

const CODE = {
    OK:80000,
    ERROR_LOGIN:80001,
    ERROR:81000
}

const map = code =>{
    let msg = codeMap[code]
    return msg || 'undefined code message'
}


module.exports.CODE = CODE

module.exports.translateError = data=> {
    if(data.code == CODE.OK){
        return ''
    }
    if(data.err){
        return data.err
    }
    else{
        return map(data.code)
    }
}
