
let iPosition
let jPosition

let labyrinth
let array = [
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 3, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 2, 0, 0, 2, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 2, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
]
let points = 0


function start() {
    // någon metod där den slumpar ut loot och monster istället för en path 
    iPosition = 9
    jPosition = 5
    points = 0
    document.getElementById("statusText").innerHTML = ""
    document.getElementById("direction").innerHTML = "North"
    document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
    drawLabyrinth(iPosition, jPosition)
}

function drawLabyrinth(iPos, jPos) {
    document.getElementById("points").innerHTML = "Points: " + points

    labyrinth = ""
    let i = 0
    let j = 0
    var innerArray = array[i].length;


    for (i = 0; i < array.length; i++) {

        for (j = 0; j < innerArray; j++) {
            var current = array[i][j]
            if (iPos == i && jPos == j) {
                labyrinth += "<div id='player'> X </div>"
            }
            else if (current == 1) {
                labyrinth += "<div id='wall'>i." + i + "| j." + j + "</div>"
            }
            else if (current == 2) {
                labyrinth += "<div id='loot'> Loot </div>"
            }
            else if (current == 3) {
                labyrinth += "<div id='monster'> M </div>"
            }
            else if (current == 0) {
                labyrinth += "<div id='path'> i." + i + "| j." + j + "</div>"
            }
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
    let value = document.getElementById("direction").innerHTML

    addPictures(iPosition, jPosition, value)
}

function move(value) {
    if (value == 'North') {
        if (array[iPosition - 1][jPosition] != 1) {
            iPosition--;
            document.getElementById("direction").innerHTML = "North"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'West') {
        if (array[iPosition][jPosition - 1] != 1) {
            jPosition--;
            document.getElementById("direction").innerHTML = "West"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'East') {
        if (array[iPosition][jPosition + 1] != 1) {
            jPosition++;
            document.getElementById("direction").innerHTML = "East"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'South') {
        if (array[iPosition + 1][jPosition] != 1) {
            iPosition++;
            document.getElementById("direction").innerHTML = "South"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    if (iPosition == 0 && jPosition == 4) {
        gameWon()
    }
}

function changeCompass(direction) {
    switch (direction) {
        case 'North':
            document.getElementById("dir1").innerHTML = "N";
            document.getElementById("dir2").innerHTML = "W";
            document.getElementById("dir3").innerHTML = "E";
            document.getElementById("dir4").innerHTML = "S";
            break;
        case 'West':
            document.getElementById("dir1").innerHTML = "W";
            document.getElementById("dir2").innerHTML = "S";
            document.getElementById("dir3").innerHTML = "N";
            document.getElementById("dir4").innerHTML = "E";
            break;
        case 'East':
            document.getElementById("dir1").innerHTML = "E";
            document.getElementById("dir2").innerHTML = "N";
            document.getElementById("dir3").innerHTML = "S";
            document.getElementById("dir4").innerHTML = "W";
            break;
        case 'South':
            document.getElementById("dir1").innerHTML = "S";
            document.getElementById("dir2").innerHTML = "E";
            document.getElementById("dir3").innerHTML = "W";
            document.getElementById("dir4").innerHTML = "N";
            break;
    }
}

function addPictures(iPosition, jPosition, value) {
    let iMinus = array[iPosition - 1][jPosition]
    let iPlus = array[iPosition + 1][jPosition]
    let jMinus = array[iPosition][jPosition - 1]
    let jPlus = array[iPosition][jPosition + 1]

    if (value == "North") {
        calculateBackground(jMinus, jPlus, iMinus)
    }
    else if (value == "East") {

        calculateBackground(iMinus, iPlus, jPlus)
    }
    else if (value == "West") {

        calculateBackground(iPlus, iMinus, jMinus)
    }
    else if (value == "South") {
        calculateBackground(jPlus, jMinus, iPlus)
    }

    if (array[iPosition][jPosition] == 2) {
        points += 500
        array[iPosition][jPosition] = 0
        document.getElementById("statusText").innerHTML = "You found a treasure containing 500 points!"
    }
    if (array[iPosition][jPosition] == 3) {
        //knapp dyker upp 
        document.getElementById("statusText").innerHTML = "You encounter a monster, fight for your life!"
        // bakgrunden "ändras"
        // man ska inte kunna gå förrän monstret är borta
    }

    changeCompass(value)
}

function fightMonster() { // knapp fight onclick
    // gör om rutan till en path
    // ge spelaren 200 poäng 
}

function calculateBackground(leftValue, rightValue, frontValue) {
    if (leftValue == 1 && rightValue == 1 && frontValue == 1) {
        document.getElementById('background').style.backgroundImage = "url(resources/dead-end.png)";
    }
    if ((leftValue == 0 && rightValue == 0 && frontValue == 0) || (leftValue == 2 && rightValue == 2 && frontValue == 2) || (leftValue == 3 && rightValue == 3 && frontValue == 3) || (leftValue == 0 && rightValue == 0 && frontValue == 2) || (leftValue == 0 && rightValue == 0 && frontValue == 3) || (leftValue == 0 && rightValue == 2 && frontValue == 3) || (leftValue == 0 && rightValue == 3 && frontValue == 2) || (leftValue == 2 && rightValue == 0 && frontValue == 3) || (leftValue == 2 && rightValue == 3 && frontValue == 0) || (leftValue == 3 && rightValue == 0 && frontValue == 3) || (leftValue == 3 && rightValue == 2 && frontValue == 3) || (leftValue == 3 && rightValue == 3 && frontValue == 0) || (leftValue == 3 && rightValue == 0 && frontValue == 2)) {
        document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)";
    }

    if ((leftValue == 1 && rightValue == 1 && frontValue == 0) || (leftValue == 1 && rightValue == 1 && frontValue == 2) || (leftValue == 1 && rightValue == 1 && frontValue == 3)) {
        document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
    }
    if ((leftValue == 1 && rightValue == 0 && frontValue == 1) || (leftValue == 1 && rightValue == 2 && frontValue == 1) || (leftValue == 1 && rightValue == 3 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/east-open.png)";
    }
    if ((leftValue == 0 && rightValue == 1 && frontValue == 1) || (leftValue == 2 && rightValue == 1 && frontValue == 1) || (leftValue == 3 && rightValue == 1 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-open.png)";
    }

    if ((leftValue == 1 && rightValue == 0 && frontValue == 0) || (leftValue == 1 && rightValue == 2 && frontValue == 2) || (leftValue == 1 && rightValue == 3 && frontValue == 3) || (leftValue == 1 && rightValue == 0 && frontValue == 2) || (leftValue == 1 && rightValue == 0 && frontValue == 3) || (leftValue == 1 && rightValue == 2 && frontValue == 0) || (leftValue == 1 && rightValue == 3 && frontValue == 0)) {
        document.getElementById('background').style.backgroundImage = "url(resources/east-center-open.png)";
    }
    if ((leftValue == 0 && rightValue == 1 && frontValue == 0) || (leftValue == 2 && rightValue == 1 && frontValue == 2) || (leftValue == 3 && rightValue == 1 && frontValue == 3) || (leftValue == 0 && rightValue == 1 && frontValue == 2) || (leftValue == 0 && rightValue == 1 && frontValue == 3) || (leftValue == 2 && rightValue == 1 && frontValue == 0) || (leftValue == 3 && rightValue == 1 && frontValue == 0)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-center-open.png)";
    }
    if ((leftValue == 0 && rightValue == 0 && frontValue == 1) || (leftValue == 2 && rightValue == 2 && frontValue == 1) || (leftValue == 3 && rightValue == 3 && frontValue == 1) || (leftValue == 0 && rightValue == 2 && frontValue == 1) || (leftValue == 0 && rightValue == 3 && frontValue == 1) || (leftValue == 2 && rightValue == 0 && frontValue == 1) || (leftValue == 3 && rightValue == 0 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-east-open.png)";
    }

}

function gameWon() {
    labyrinth = "<h1>Congrats, you won!</h1>"
    document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)"; // göra en unik för slutet(utomhus/en dörr?)
    document.getElementById("frame").innerHTML = labyrinth
}