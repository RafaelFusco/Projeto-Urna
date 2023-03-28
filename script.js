// Controle de interface
let SeuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let numeros = document.querySelector('.d-1-3')
let descricao = document.querySelector('.d-1-4')
let lateral = document.querySelector('.d-1-right')
let aviso = document.querySelector('.d-2')
let titulo1 = document.querySelector('.titulo')

// Controle de ambiente
let etapaAtual = 0
let numero = ''
let votoBranco = false
let votoNulo = false
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    votoBranco = false
    votoNulo = false
    titulo1.style.visibility = 'hidden'

    for(let i=0;i<etapa.numeros;i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    SeuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        SeuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        titulo1.style.visibility = 'visible'
        if (etapa.titulo === 'PREFEITO') {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`
        } else {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        }

        let fotosHtml = ''
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml
    } else {
        SeuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div>NÚMERO ERRADO</div> <br/> <div class="aviso--grande pisca">VOTO NULO</div>'
        votoNulo = true

        if (votoNulo === true) {
            titulo1.style.visibility = 'visible'
        }
    }

}
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {   
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}
function branco() {
    comecarEtapa()
    votoBranco = true
    SeuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
}
function corrige() {
    comecarEtapa()
}
function confirma() {
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false

    if (votoBranco === true) {
        votoConfirmado = true
        alert(`Voto em branco confirmado`)
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })

    } else if (votoNulo === true) {
        votoConfirmado = true
        alert(`Voto nulo confirmado`)
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })

    } else {
        etapa.candidatos.filter((item) => {
            if (numero.length === etapa.numeros) {
                if (numero === item.numero) {
                    votoConfirmado = true
                    alert(`Voto em ${item.nome} confirmado`)            
                }
            }
        })
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos);
        }
    }
}

comecarEtapa()