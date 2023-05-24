/*
TASK'S QUE AINDA FALTAM:
-Colocar API no CNPJ que puxe o nome da empresa... = check
-melhorar esse codigozim = falta
-verificar os campos = Check

//consertar o bug do nome fantasia
*/


const nameClient = document.querySelector('.clientName')
const profissaoClient = document.querySelector('.clientProf')

const cnpj = document.querySelector('.cnpj')
const nomeEmpresa = document.querySelector('.nomeEmpresa')

const cbo = document.querySelector('.cboEmpresa')
const dataEmit = document.querySelector('.data')
const codigo = document.querySelector('.codigoCliente')
const mesPay = document.querySelector('.mesPay')
const campoComent = document.querySelector('#comentario')

const holInput = document.querySelector('.holcap')
const enviarBtn = document.querySelector('.enviar')
const info = document.querySelector('.info')
const info2 = document.querySelectorAll('.info2 p span')
const comissao = document.querySelector('.comissao')

const baseSalary = document.querySelector('.baseSalary')
const impostSalary = document.querySelector('.impostoPorc')
const descontSalary = document.querySelector('.descontSalary')
const valorDescont = document.querySelector('.valorDescont')
const valorComissao = document.querySelector('.valorComissao')

let totalDesconto;
let valorAntigo;
let porcentagem;
let vlrDesconto;
let vlrComissao;
let comissaoAndSalary


/* DADOS DO CLIENTE E EMPRESA */

// NOME CLIENTE
function nameCli() {
    const nameClientValue = (nameClient.value).toUpperCase()
    return nameClientValue
}
//PROFISSAO CLIENTE
function profCli() {
    const profissaoClientValue = profissaoClient.value
    return profissaoClientValue
}

let empresaAPIValue;
let cnpjAPIvalue;
let stringCNPJ;

//CNPJ EMPRESA

function showCNPJ(result){
    const nomeFantasia = result['NOME FANTASIA']
    const CNPJVL = result['CNPJ']

    empresaAPIValue = nomeFantasia
    cnpjAPIvalue = CNPJVL

    let regexNumeros = /^[0-9]+$/;
    
    if(regexNumeros.test(cnpjAPIvalue)) {
            let arrayCNPJ = Array.from(cnpjAPIvalue)
                arrayCNPJ.splice(2, 0, '.')
                arrayCNPJ.splice(6, 0, '.')
                arrayCNPJ.splice(10, 0, '/')
                arrayCNPJ.splice(15, 0, '-')
                stringCNPJ = arrayCNPJ.join('') 
                console.log(stringCNPJ)
            return {stringCNPJ, empresaAPIValue}
            } else {
            return {cnpjAPIvalue, empresaAPIValue}
            }
    
}

function cnpjValue(){
    
    let cnpjValueAPI = cnpj.value
    let cnpjToString = cnpjValueAPI.replace(/\D/g, '')
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjToString}`, options)
        .then(x => {
            x.json().then(data => showCNPJ(data))
        }).catch(e => console.log('ERROR: ' + e))
}

//NOME DA EMPRESA
function nomeEmp() {
        const valueNomeEmpresa = empresaAPIValue
        nomeEmpresa.value = valueNomeEmpresa
        return valueNomeEmpresa
}

//CBO
function cboValue() {
    const valueDoCbo = +cbo.value
    return valueDoCbo
}
//Data Emissao
function dataDeEmissao() {
    const dataEmicao = dataEmit.value
    let dia = [dataEmicao[8], dataEmicao[9]].join('')
    let mes = [dataEmicao[5], dataEmicao[6]].join('')
    let ano = [dataEmicao[0], dataEmicao[1], dataEmicao[2], dataEmicao[3]].join('')
    let myData = [dia, mes, ano].join(' ').replace(/ /g, '/')
    return myData
}
function codigoCliente() {
    const codigoDoCliente = +codigo.value
    return codigoDoCliente
}
//mesPagamento
function mesPayday() {
    const mesPgt = mesPay.value
    let mesPgtFrase = `
    ${mesPgt} de 2023`
    return mesPgtFrase
}
//campoComent
function campoComentario() {
    const cComent = campoComent.value
    return cComent
}

let valorComentarioDoCampo = campoComentario()

/* DADOS DO SALARIO  */
//value do salario
function numbAndImp() {
    const holValue = +holInput.value 
    return holValue
}
//value da comissão
function myComission() {
    const comissaoValue = +comissao.value
    return comissaoValue
}
//calculo do imposto
function impostoCalc(n, prc) {
    return +n / +prc
}




async function elementoFilho(nameElement, textoElemento) {
    const pElement = document.createElement('p')
    pElement.classList.add('error')
    pElement.style.margin = '2px'
    pElement.style.padding = '0'

    pElement.textContent = textoElemento
    const elementoName = nameElement.parentNode.insertBefore(pElement, nameElement.nextSibling)
    enviarBtn.disabled = true,
    setTimeout(() => elementoName.remove(), 5000)
    setTimeout(() => enviarBtn.disabled = false, 5000)
}

function selectElement(x) {
    return x.value.length
}


function holerite(e){

    //VERIFICA QUAIS CAMPOS ESTÃO VAZIO
    if(nameClient.value === '') {
        elementoFilho(nameClient, '*Insira o campo nome')
    } 
    if (profissaoClient.value === '') {
        elementoFilho(profissaoClient, '*Insira uma profissão')
    }
    if (cnpj.value === '') {
        elementoFilho(cnpj, '*Insira o CNPJ')
    }
    if (dataEmit.value === '') {
        elementoFilho(dataEmit, '*Insira a data que você iniciou o trabalho...')
    }
    if (cbo.value === '') {
        elementoFilho(cbo, '*Insira o CBO')
    }
    if (codigo.value === '') {
        elementoFilho(codigo, '*Insira o codigo')
    }
    if (holInput.value === '') {
        elementoFilho(holInput, '*Insira um valor no salario')
    } else if (holInput.value < 500) {
        elementoFilho(holInput, 'insira um salario maior que 500')
    }
    if (mesPay.value === '') {
        elementoFilho(mesPay, '*Insira o mês de pagamento')
    }
    
    //VERIFICA SE OS CAMPOS OBRIGATORIOS SÃO TRUE
    if(!!selectElement(nameClient) && !!selectElement(profissaoClient) && !!selectElement(cnpj) && !!selectElement(dataEmit) && !! selectElement(cbo) && !!selectElement(codigo) && !!selectElement(holInput) && !!selectElement(mesPay)){
         myPhoto()
    }

    e.preventDefault()
    let valorDescontado;
    let total;

    info2.forEach(x => {
        x.classList.add('infoCont')
    })

    if(numbAndImp() <= 1212) {
        valorDescontado = (numbAndImp() * impostoCalc(7.5, 100)).toFixed(2)
        comissaoAndSalary = (numbAndImp() + myComission()).toFixed(2)
        total = (comissaoAndSalary - valorDescontado).toFixed(2)

        valorAntigo = baseSalary.innerText = `R$ ${numbAndImp()}`
        porcentagem = impostSalary.innerText = `${impostoCalc(7.5, 100) * 100}%`
        totalDesconto = descontSalary.innerText = `R$ ${total}`
        vlrDesconto = valorDescont.innerText = `R$ ${valorDescontado}`
        vlrComissao = valorComissao.innerText = `R$ ${myComission()}`

    } 
    else if(numbAndImp() <= 2427) {
        valorDescontado = (numbAndImp() * impostoCalc(9.5, 100)).toFixed(2)
        comissaoAndSalary = (numbAndImp() + myComission()).toFixed(2)
        total = comissaoAndSalary - valorDescontado

        valorAntigo = baseSalary.innerText = `R$ ${numbAndImp()}`
        porcentagem = impostSalary.innerText = `${(impostoCalc(9.5, 100) * 100).toFixed(2)}%`
        totalDesconto = descontSalary.innerText = `R$ ${total.toFixed(2)}`
        vlrDesconto = valorDescont.innerText = `R$ ${valorDescontado}`
        vlrComissao = valorComissao.innerText = `R$ ${myComission()}`
    }
    else if(numbAndImp() <= 3641) {
        valorDescontado = (numbAndImp() * impostoCalc(12, 100)).toFixed(2)
        comissaoAndSalary = (numbAndImp() + myComission()).toFixed(2)
        total = comissaoAndSalary - valorDescontado

        valorAntigo = baseSalary.innerText = `R$ ${numbAndImp()}`
        porcentagem = impostSalary.innerText = `${(impostoCalc(12, 100) * 100).toFixed(2)}%`
        totalDesconto = descontSalary.innerText = `R$ ${total.toFixed(2)}`
        vlrDesconto = valorDescont.innerText = `R$ ${valorDescontado}`
        vlrComissao = valorComissao.innerText = `R$ ${myComission()}`
    }
    else if(numbAndImp() >= 3642) {
        valorDescontado = (numbAndImp() * impostoCalc(14, 100)).toFixed(2)
        comissaoAndSalary = (numbAndImp() + myComission()).toFixed(2)
        total = comissaoAndSalary - valorDescontado

        valorAntigo = baseSalary.innerText = `R$ ${numbAndImp()}`
        porcentagem = impostSalary.innerText = `${(impostoCalc(14, 100) * 100).toFixed(2)}%`
        totalDesconto = descontSalary.innerText = `R$ ${total.toFixed(2)}`
        vlrDesconto = valorDescont.innerText = `R$ ${valorDescontado}`
        vlrComissao = valorComissao.innerText = `R$ ${myComission()}`
    } 
}

enviarBtn.addEventListener('click', holerite)

function myPhoto() {

let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    // Carrega a imagem
    let img = new Image();
    img.src = "./img/xxa.png";

    // Aguarda o carregamento da imagem
    img.onload = function() {
      // Desenha a imagem no canvas
      context.drawImage(img, 0, 0);

      // Define as propriedades do texto
      context.font = "14px Courier bold";
      context.letterSpacing = '1px'
      context.fillStyle = "black";
      context.textAlign = "start";

      // Digita o texto no canvas

        function testando() {
            if(totalDesconto === undefined) {
                alert('Preencha o campo')
                return
            }
           
            const ttDsc = totalDesconto.replace('R$', '')
            const vlrDsc = vlrDesconto.replace('R$', '')
            const pct = porcentagem.replace('%', '')
            const numeroSalarioImport = numbAndImp() + ''
            const comissaoPlusSalarioIMP = comissaoAndSalary + ''
            const vlrCOMISSAO = myComission() + ''

            //DESCONTO VERIFICAÇÃO
            let newVLR
            if(ttDsc.length === 8) {
                let arrVLR = Array.from(ttDsc)
                arrVLR.splice(2, 0, '.')
                newVLR = arrVLR.join('')
            } else if(ttDsc.length === 9) {
                let arrVLR = Array.from(ttDsc)
                arrVLR.splice(3, 0, '.')
                newVLR = arrVLR.join('')
            }
            else if(ttDsc.length === 10) {
                let arrVLR = Array.from(ttDsc)
                arrVLR.splice(4, 0, '.')
                newVLR = arrVLR.join('')
            }

            //SALARIO VERIFICAÇÃO
            let newSLR
            if(numeroSalarioImport.length <= 6) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(1, 0, '.')
                newSLR = vlrSALARIO.join('')
            }
            else if(numeroSalarioImport.length === 7) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(1, 0, '.')
                newSLR = vlrSALARIO.join('')
            } else if(numeroSalarioImport.length === 8) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(2, 0, '.')
                newSLR = vlrSALARIO.join('')
            }
            else if(numeroSalarioImport.length === 8) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(3, 0, '.')
                newSLR = vlrSALARIO.join('')
            }

            //COMISSAO VERIFICAÇÃO
            let newComission;
            if(comissaoPlusSalarioIMP.length === 7) {
                let vlrCOMISSAO = Array.from(comissaoPlusSalarioIMP)
                vlrCOMISSAO.splice(1, 0, '.')
                newComission = vlrCOMISSAO.join('')
            } else if(comissaoPlusSalarioIMP.length === 8) {
                let vlrCOMISSAO = Array.from(comissaoPlusSalarioIMP)
                vlrCOMISSAO.splice(2, 0, '.')
                newComission = vlrCOMISSAO.join('')
            }
            else if(comissaoPlusSalarioIMP.length === 8) {
                let vlrCOMISSAO = Array.from(comissaoPlusSalarioIMP)
                vlrCOMISSAO.splice(3, 0, '.')
                newComission = vlrCOMISSAO.join('')
            }

            cnpjValue()
        /* POSICOES DOS VALORES HOLERITE */
        function holeritePosition() {
            //valor desconto
            context.fillText(newVLR, canvas.width / 1.25, canvas.height / 1.09); //valorLiquido
            context.fillText(newVLR, canvas.width / 1.45, canvas.height / 1.02); //valor embaixo
            context.fillText('30.00', canvas.width / 1.75, canvas.height / 3.5); //SalarioMesREF


            //valorNormal
            context.fillText(newComission, canvas.width / 1.48, canvas.height / 1.17); //vencimento

            //valorNormalSalarioVerify
            if(newSLR.length <= 5) {
                context.fillText((newSLR + '.00'), canvas.width / 1.422, canvas.height / 3.52);
                context.fillText((newSLR + '.00'), canvas.width / 17, canvas.height / 1.02); //valorEmbaixo
            } else if(newSLR.length >= 6) {
                context.fillText((newSLR), canvas.width / 1.422, canvas.height / 3.52);
                context.fillText((newSLR), canvas.width / 17, canvas.height / 1.02); //valorEmbaixo
            }

            //valorDesconto
            context.fillText(vlrDsc, canvas.width / 1.18, canvas.height / 3); //valorINSS - DESC
            context.fillText(pct, canvas.width / 1.75, canvas.height / 3); //FaixaIRRF - DESC
            context.fillText(vlrDsc, canvas.width / 1.87, canvas.height / 1.02); //FaixaIRRF
            context.fillText(vlrDsc, canvas.width / 1.23, canvas.height / 1.17); //Total desconto
            context.fillText(pct, canvas.width / 1.2, canvas.height / 1.02); //FaixaIRRF

            //valorComissao
            if(vlrCOMISSAO.length <= 4) {
                context.fillText((vlrCOMISSAO + '.00'), canvas.width / 1.4, canvas.height / 3.25) //Comissao extra - REF
            } else if (vlrCOMISSAO.length >= 5) {
                context.fillText((vlrCOMISSAO), canvas.width / 1.4, canvas.height / 3.25)
            }   

            context.fillText(newComission, canvas.width / 4.7, canvas.height / 1.02); //satContrINSS
            context.fillText(newComission, canvas.width / 2.7, canvas.height / 1.02); //satContrFGTS
            context.fillText('7.00', canvas.width / 1.72, canvas.height / 3.25); //SalarioMesREF - DESC
        }
        //NOME DO BICO
        function holeriteNomePosition() {
                context.fillText(nameCli(), canvas.width / 11, canvas.height / 6)
        }
        function holeriteProfPosition() {
            context.fillText(profCli(), canvas.width / 11, canvas.height / 5.2)
        }
        function holeriteNomeEmpresaPosition() {
            console.log(nomeEmp())
                setTimeout(() => {
                    context.fillText(('EMPRESA: ' + nomeEmp()), canvas.width / 28, canvas.height / 18)
                }, 2000)  
        }
        function holeritCNPJEmpresaPosition() {
            setTimeout(() => {
                context.fillText(('CNPJ: ' + stringCNPJ || cnpj.value ), canvas.width / 28, canvas.height / 12)
            }, 2000)
        }
        function holeritCBOPosition() {
            context.fillText(cboValue(), canvas.width / 1.5, canvas.height / 6)
        }
        function holeritDATAPosition() {
            context.fillText(dataDeEmissao(), canvas.width / 1.22, canvas.height / 5)
            context.fillText(codigoCliente(), canvas.width / 24.5, canvas.height / 6)
        }
        function folhaMensalData() {
            context.fillText((`Folha Mensal`), canvas.width / 1.24, canvas.height / 12.3)
            context.fillText((`${mesPayday()}`), canvas.width / 1.3, canvas.height / 9.5)
        }
        function mycampoComentario() {
            context.fillText(campoComentario(), canvas.width / 16, canvas.height / 1.17); //Campo comentario
        }
        mycampoComentario()
        folhaMensalData()
        holeritDATAPosition()
        holeritCBOPosition()
        holeritCNPJEmpresaPosition()
        holeriteNomeEmpresaPosition()
        holeriteProfPosition()
        holeriteNomePosition()
        holeritePosition()
    }
    testando()
    };
}

//amo a jiyeon ^-^