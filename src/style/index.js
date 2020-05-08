export const formatCurrency = (value, leanguages) => {
    const number = Number(value);
    let leanguage=true
    if(leanguages==="en"){
        leanguage=true;
    }
    else {
        leanguage = false;
    }

    return new Intl.NumberFormat('pl', {style: 'currency', currency: leanguage?"EUR":"PLN"}).format(number);
}

export const formatDate = string => {
    const date = new Date(string);
    return new Intl.DateTimeFormat('pl').format(date);
    
}