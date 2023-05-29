export default function myPhoto() {

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