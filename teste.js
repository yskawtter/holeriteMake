let valor = '1125.20'

let arrayvalor = Array.from(valor)
arrayvalor.splice(1, 0, '.')
let newValor = arrayvalor.join('')

console.log(newValor)