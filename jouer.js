function jouerLeDe(){
    var a = 1
    var b = 6
    var i = 0

    let d = []
    var somme = 0

    while(i <= b - 2){
        d.push(Math.floor(Math.random()*(b-a+1))+a);
        somme += d[i]
        i++
    }

    return [d,somme]
}

module.exports = {
    jouerLeDe: jouerLeDe,
}