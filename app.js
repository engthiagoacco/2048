document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    
    const width = 4    
    let squares = []
    let score = 0
    //criando playing board
    function createBoard(){
        for (let i=0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML=0
            gridDisplay.appendChild(square)
            squares.push(square)
        } 
        generate()
        generate()
    }
    createBoard()


    //gerando numero aleatorio
    function generate() {
       let randomNumber = Math.floor(Math.random() * squares.length)
       if (squares[randomNumber].innerHTML == 0) {
           squares[randomNumber].innerHTML = 2
           checkGameOver()
       } else generate()

    }

//movendo para direita

function moveRight() {
    for (let i=0; i < 16; i++){
       if (i % 4 === 0){
           let totalOne = squares[i].innerHTML
           let totalTwo = squares[i+1].innerHTML
           let totalThree = squares[i+2].innerHTML
           let totalFour = squares[i+3].innerHTML
           let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        
        let filteredRow = row.filter(num => num)
      
        let missing = 4 - filteredRow.length

        let zeros = Array(missing).fill(0)
        
        let newRow = zeros.concat(filteredRow)
    
        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
        } 
    }
}


//movendo para esquerda
function moveLeft() {
    for (let i=0; i < 16; i++){
       if (i % 4 === 0){
           let totalOne = squares[i].innerHTML
           let totalTwo = squares[i+1].innerHTML
           let totalThree = squares[i+2].innerHTML
           let totalFour = squares[i+3].innerHTML
           let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
     
        let filteredRow = row.filter(num => num)
        
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
       
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
        } 
    }
}

//movendo para baixo 
function moveDown(){
    for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let colum = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredColum = colum.filter(num => num)
        let missing = 4 - filteredColum.length
        let zeros = Array(missing).fill(0)
        let newColum = zeros.concat(filteredColum)

        squares[i].innerHTML = newColum[0]
        squares[i+width].innerHTML = newColum[1]
        squares[i+(width*2)].innerHTML = newColum[2]
        squares[i+(width*3)].innerHTML = newColum[3]
    }
}

//mvendo para cima

function moveUp(){
    for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let colum = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredColum = colum.filter(num => num)
        let missing = 4 - filteredColum.length
        let zeros = Array(missing).fill(0)
        let newColum = filteredColum.concat(zeros)

        squares[i].innerHTML = newColum[0]
        squares[i+width].innerHTML = newColum[1]
        squares[i+(width*2)].innerHTML = newColum[2]
        squares[i+(width*3)].innerHTML = newColum[3]
    }
}
//função para juntar linhas
function combineRow() {
    for (let i=0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i+1].innerHTML) {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
        }
    }
    checkForWin()
}
//funçao para juntar colunas
function combineColum() {
    for (let i=0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i+width].innerHTML) {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
        }
    }
    checkForWin()
}
//atribuindo keycodes

function control(e) {
    if(e.keyCode === 39) {
        keyRight()
    } else if (e.keyCode === 37) {
        keyLeft()
    } else if (e.keyCode === 38) {
        keyUp()
    } else if (e.keyCode ===40){
        keyDown()
    }
}

document.addEventListener('keyup', control)

function keyRight() {

    moveRight()
    combineRow()
    moveRight()
    generate()


}
function keyLeft() {

    moveLeft()
    combineRow()
    moveLeft()
    generate()


}

function keyDown() {
    moveDown()
    combineColum()
    moveDown()
    generate()
}


function keyUp() {
    moveUp()
    combineColum()
    moveUp()
    generate()
}
//verificando se existe o n° 2048 para notificar a vitoria

function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048){
            resultDisplay.innerHTML = 'You Win!'
            document.removeEventListener('keyup', control)
        }
    }
}
//verificando se nao existe espaço vazio nem movientos para fazer que dara o game over
function checkGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++){
        if (squares[i].innerHTML == 0) {
            zeros++
        }
    }
    if (zeros === 0) {
        resultDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keyup', control)
    }
}

})