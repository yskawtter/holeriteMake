/*
TASK'S QUE AINDA FALTAM:
-Colocar API no CNPJ que puxe o nome da empresa... = check
-melhorar esse codigozim = Check (nem tanto)
-verificar os campos = Check
-consertar o bug do nome fantasia = check
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
const limparBtn = document.querySelector('.limpar')
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


//modal
const modal = document.querySelector('.modal')
const btnClose = document.querySelector('.close-modal')
function removeModal() {
    modal.classList.add('hidden')
}
btnClose.addEventListener('click', removeModal)

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
    const nomeRazao = result['RAZAO SOCIAL']
    const CNPJVL = result['CNPJ']

    nomeFantasia.length > 0 ? empresaAPIValue = nomeFantasia : empresaAPIValue = nomeRazao

    cnpjAPIvalue = CNPJVL
    let regexNumeros = /^[0-9]+$/;
    
    if(regexNumeros.test(cnpjAPIvalue)) {
            let arrayCNPJ = Array.from(cnpjAPIvalue)
                arrayCNPJ.splice(2, 0, '.')
                arrayCNPJ.splice(6, 0, '.')
                arrayCNPJ.splice(10, 0, '/')
                arrayCNPJ.splice(15, 0, '-')
                stringCNPJ = arrayCNPJ.join('') 
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
    setTimeout(() => elementoName.remove(), 4985)
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

    //TRANSFORMAR NUMERO
    function valorTransformacao (vlr) {
        valorDescontado = (numbAndImp() * impostoCalc(vlr, 100)).toFixed(2)
        comissaoAndSalary = (numbAndImp() + myComission()).toFixed(2)
        total = (comissaoAndSalary - valorDescontado).toFixed(2)

        valorAntigo = baseSalary.innerText = `R$ ${numbAndImp()}`
        porcentagem = impostSalary.innerText = `${(impostoCalc(vlr, 100) * 100).toFixed(2)}%`
        totalDesconto = descontSalary.innerText = `R$ ${total}`
        vlrDesconto = valorDescont.innerText = `R$ ${valorDescontado}`
        vlrComissao = valorComissao.innerText = `R$ ${myComission()}`
    }
    //INSERIR INFORMACOES

    if(numbAndImp() <= 1212) {
        valorTransformacao(7.5)
    } 
    else if(numbAndImp() <= 2427) {
        valorTransformacao(9.5)
    }
    else if(numbAndImp() <= 3641) {
        valorTransformacao(12)
    }
    else if(numbAndImp() >= 3642) {
        valorTransformacao(14)
    } 
}

function cleanBtn() {
    location.reload()
    removeModal()
}

enviarBtn.addEventListener('click', holerite)
limparBtn.addEventListener('click', cleanBtn)

function myPhoto() {

let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    let imagemOrigem = "./img/xxa.png"
    // Carrega a imagem
    let img = new Image();
    img.src = imagemOrigem;

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

        function inserirDados() {
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
            } else if(numeroSalarioImport.length === 7) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(1, 0, '.')
                newSLR = vlrSALARIO.join('')
            } else if(numeroSalarioImport.length === 8) {
                let vlrSALARIO = Array.from(numeroSalarioImport)
                vlrSALARIO.splice(2, 0, '.')
                newSLR = vlrSALARIO.join('')
            } else if(numeroSalarioImport.length === 8) {
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
        // FUNÇÃO QUE DEFINE O ELEMENTO / LARGURA / ALTURA
        function positionFN(ele, width, heigh) {
                context.fillText(ele, canvas.width / width, canvas.height / heigh)
        }

        function holeritePosition() {
            //valor desconto
            positionFN(newVLR, 1.25, 1.09) //valorLiquido
            positionFN(newVLR, 1.45, 1.02) //valorEmbaixo
            positionFN('30.00', 1.75, 3.5) //salarioRef
 
            //valorNormal
            positionFN(newComission, 1.48, 1.17) //vencimento

            //valorNormalSalarioVerify
            if(newSLR.length <= 5) {
                positionFN((newSLR + '.00'), 1.42, 3.52)
                positionFN((newSLR + '.00'), 17, 1.02)
                //valorEmbaixo
            } else if(newSLR.length >= 6) {
                positionFN(newSLR, 1.42, 3.52)
                positionFN(newSLR, 17, 1.02)//valorEmbaixo
            }

            //valorDesconto
            positionFN(vlrDsc, 1.18, 3) //Valor INSS - DESC.
            positionFN(pct, 1.75, 3) //Faixa IRPF - DESC
            positionFN(vlrDsc, 1.87, 1.02) //Faixa IRPF
            positionFN(vlrDsc, 1.23, 1.17) //Total Desconto
            positionFN(pct, 1.2, 1.02) //Faixa IRPF

            //valorComissao
            vlrCOMISSAO.length <= 4 ? positionFN((vlrCOMISSAO + '.00'), 1.4, 3.25) : positionFN(vlrCOMISSAO, 1.4, 3.25)

            positionFN(newComission, 4.7, 1.02) //satContrINSS
            positionFN(newComission, 2.7, 1.02) //satContrFGTS
            positionFN('7.00', 1.72, 3.25) //salarioMes REF - DESC
        }

        function holeriteNomePosition() {
            positionFN((nameCli()), 11, 6)
        }
        function holeriteProfPosition() {
            positionFN(profCli(), 11, 5.2)
        }
        function holeriteNomeEmpresaPosition() { // NOME - CALLBACK API
            setTimeout(() => { positionFN(('EMPRESA: ' + nomeEmp()), 28, 18)}, 2000)  
        }
        function holeritCNPJEmpresaPosition() { //CNPJ - CALLBACK API
            setTimeout(() => { positionFN(('CNPJ: ' + stringCNPJ || cnpj.value ), 28, 12)}, 2000)
        }
        function holeritCBOPosition() {
            positionFN((cboValue()), 1.5, 6)
        }
        function holeritDATAPosition() {
            positionFN((dataDeEmissao()), 1.22, 5)
            positionFN((codigoCliente()), 24.5, 6)
        }
        function folhaMensalData() {
            positionFN((`Folha Mensal`), 1.24, 12.3)
            positionFN((`${mesPayday()}`), 1.3, 9.5)
        }
        function mycampoComentario() {
            positionFN(campoComentario(), 16, 1.17)
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
    inserirDados()
    
    };
    function tt2() {
        let imgURL = canvas.toDataURL()
        var imagemHol = new Image()
        imagemHol.src = imgURL
        const imgPrint = document.querySelector('.imgPrint')
        imgPrint.appendChild(imagemHol)
        const btnGerar = document.querySelector('.btnGerar')
        btnGerar.addEventListener('click', function(e) {
            e.preventDefault()
            print()
    })
    }
    setTimeout(() => tt2(), 4000)
}


//amo a jiyeon ^-^