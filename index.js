
let start_button = document.getElementById("start");
//<div id="head" class="SNAKE circle-head"></div>
let head = document.createElement("div");
let food = document.createElement("div");
let speed = 200
let container = document.getElementById("game-board")
function setSpeed() {
    if (document.getElementById('x').checked)
        speed = 200
    else if (document.getElementById('2x').checked)
        speed = 150
    else if (document.getElementById('3x').checked)
        speed = 100
    else
        speed = 50
}

let level = 1
function setLevel() {
    if (document.getElementById('xx').checked)
        level = 1
    else if (document.getElementById('2xx').checked)
        level = 2
    else if (document.getElementById('3xx').checked)
        level = 3
    else
        level = 4
}
head.style.gridColumn = 16
head.style.gridRow = 16
let prev_row_steps = 0
let prev_col_steps = 0
let barriers = []
let prev = ""
let direction = ""
let loop = null

let game_started = false
let score = 0





head.classList.add(['SNAKE'])
head.setAttribute('id', 'head')
console.log(container.children.length)
function generateFood() {
    let row = Math.floor((Math.random() * 27) + 2);
    let col = Math.floor((Math.random() * 27) + 2);
    let conflict = false;
    for (barrier of barriers) {

        if (Number(barrier.style.gridRow) == row && Number(barrier.style.gridColumn) == col) {
            conflict = true;
            break;
        }
    }
    if (conflict) {
        generateFood()
        return;
    }

    food.style.gridRow = row;
    food.style.gridColumn = col;

}

function start_game() {

    let row_steps = prev_row_steps
    let col_steps = prev_col_steps

    switch (direction) {
        case "R":
            if (prev != "L") {
                col_steps = 1
                row_steps = 0
                prev = direction
            }

            break
        case "U":
            if (prev != "D") {
                row_steps = -1
                col_steps = 0
                prev = direction
            }
            break
        case "D":
            if (prev != "U") {
                row_steps = 1
                col_steps = 0
                prev = direction
            }
            break
        case "L":
            if (prev != "R") {
                row_steps = 0
                col_steps = -1

                prev = direction
            }
    }

    prev_row_steps = row_steps
    prev_col_steps = col_steps

    if (Number(head.style.gridColumn) + col_steps < 1 || Number(head.style.gridColumn) + col_steps > 30 || Number(head.style.gridRow) + row_steps > 30 || Number(head.style.gridRow) + row_steps < 1) {
        clearInterval(loop)
        alert("Game Over")
        location.reload()
        return
    }
    for (let i = barriers.length + 1; i < container.children.length; i++) {
        for (let j = barriers.length + 1; j < container.children.length; j++) {
            if (i === j)
                continue
            if (container.children[i].style.gridColumn == container.children[j].style.gridColumn && container.children[i].style.gridRow == container.children[j].style.gridRow) {
                clearInterval(loop)
                alert("Game Over")
                location.reload()
                return
            }
        }

    }
    for (let i = 0; i < barriers.length; i++) {

        if (Number(container.children[i].style.gridColumn) == Number(head.style.gridColumn) + col_steps && Number(container.children[i].style.gridRow) == Number(head.style.gridRow) + row_steps) {
            clearInterval(loop)
            console.log("over", Number(head.style.gridColumn) + col_steps, Number(container.children[i].style.gridRow))
            alert("Game Over")
            location.reload()
            return
        }
    }

    if (Number(head.style.gridColumn) + col_steps == Number(food.style.gridColumn) && Number(head.style.gridRow) + row_steps == Number(food.style.gridRow)) {
        score += 1
        let score_ele = document.getElementById("score")
        score_ele.innerText = `SCORE : ${score}`
        let newhead = document.createElement("div")
        newhead.classList.add("SNAKE")
        newhead.style.gridRow = food.style.gridRow
        newhead.style.gridColumn = food.style.gridColumn

        generateFood(head.style.gridCoulmn)
        container.insertBefore(newhead, head)

        head = newhead



    }


    for (let i = container.children.length - 1; i >= 2 + barriers.length; i--) {
        container.children[i].style.gridRow = container.children[i - 1].style.gridRow
        container.children[i].style.gridColumn = container.children[i - 1].style.gridColumn
    }
    head.style.gridColumn = Number(head.style.gridColumn) + col_steps
    head.style.gridRow = Number(head.style.gridRow) + row_steps
}
window.addEventListener("keydown", function catchkey(event) {
    switch (event.key) {
        case "ArrowLeft":
            direction = "L"
            break
        case "ArrowRight":
            direction = "R"
            break
        case "ArrowUp":
            direction = "U"
            break
        case "ArrowDown":
            direction = "D"
    }

});
function startGameFun() {


    if (!game_started) {
        setLevel()
        setSpeed()
        if (level === 4) {
            for (let i = 1; i <= 11; i++) {
                let barrier = document.createElement("div")
                barrier.style.gridColumn = 10
                barrier.style.gridRow = i
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = i
                barrier.style.gridRow = 20
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 20
                barrier.style.gridRow = 30 - i + 1
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 30 - i + 1
                barrier.style.gridRow = 10
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 10 + 1
                barrier.style.gridRow = i
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = i
                barrier.style.gridRow = 20 + 1
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 20 + 1
                barrier.style.gridRow = 30 - i + 1
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 30 - i + 1
                barrier.style.gridRow = 10 + 1
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)




            }

        }
        if (level == 2) {
            for (let i = 1; i <= 11; i++) {
                let barrier = document.createElement("div")
                barrier.style.gridColumn = 11
                barrier.style.gridRow = i
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = i
                barrier.style.gridRow = 16
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)
            }
            for (let i = 20; i <= 25; i++) {
                for (let j = 20; j <= 25; j++) {
                    let barrier = document.createElement("div")
                    barrier.style.gridColumn = i
                    barrier.style.gridRow = j
                    barrier.classList.add("barrier")
                    container.appendChild(barrier)
                    barriers.push(barrier)
                }
            }
        }

        if (level === 3) {
            let barrier = document.createElement("div")
            barrier.style.gridColumn = 5
            barrier.style.gridRow = 5
            barrier.classList.add("barrier")
            container.appendChild(barrier)
            barriers.push(barrier)

            barrier = document.createElement("div")
            barrier.style.gridColumn = 25
            barrier.style.gridRow = 25
            barrier.classList.add("barrier")
            container.appendChild(barrier)
            barriers.push(barrier)

            barrier = document.createElement("div")
            barrier.style.gridColumn = 5
            barrier.style.gridRow = 25
            barrier.classList.add("barrier")
            container.appendChild(barrier)
            barriers.push(barrier)

            barrier = document.createElement("div")
            barrier.style.gridColumn = 25
            barrier.style.gridRow = 5
            barrier.classList.add("barrier")
            container.appendChild(barrier)
            barriers.push(barrier)

            for (let i = 12; i < 20; i++) {
                barrier = document.createElement("div")
                barrier.style.gridColumn = 10
                barrier.style.gridRow = i
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

                barrier = document.createElement("div")
                barrier.style.gridColumn = 20
                barrier.style.gridRow = i
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)

            }

            for (let i = 13; i < 18; i++) {
                barrier = document.createElement("div")
                barrier.style.gridColumn = i
                barrier.style.gridRow = 8
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)
            }

            for (let i = 13; i < 18; i++) {
                barrier = document.createElement("div")
                barrier.style.gridColumn = i
                barrier.style.gridRow = 22
                barrier.classList.add("barrier")
                container.appendChild(barrier)
                barriers.push(barrier)
            }
        }
        container.appendChild(head)
        container.insertBefore(food, head)
        food.setAttribute("id", "food")
        generateFood()
        loop = setInterval(start_game, speed);
        game_started = true;

    }

}
function arrowMovement(event) {

    switch (event.target.id) {
        case "LEFT":
            direction = "L"
            console.log("LEFT")
            break
        case "RIGHT":
            direction = "R"
            break
        case "UP":
            direction = "U"
            break
        case "DOWN":
            direction = "D"
    }
}

arrow_buttons = document.getElementById("click_event")
arrow_buttons.addEventListener("click", arrowMovement)

start_button.addEventListener("click", startGameFun);
function restart() {
    location.reload()
} 
