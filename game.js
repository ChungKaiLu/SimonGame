

const buttonColours = [`red`, `blue`, `green`, `yellow`];
const gamePattern = [];
const userClickedPattern = [];
let gameIsNew = true;
let title = $(`#level-title`);
let level = 0;

const playSound = function (currentColour) {
    const greenBtnSound = new Audio(`./sounds/green.mp3`);
    const redBtnSound = new Audio(`./sounds/red.mp3`);
    const yellowBtnSound = new Audio(`./sounds/yellow.mp3`);
    const blueBtnSound = new Audio(`./sounds/blue.mp3`);
    const wrongBtnSound = new Audio(`./sounds/wrong.mp3`);

    switch (currentColour) {
        case `red`: redBtnSound.play(); break;
        case `green`: greenBtnSound.play(); break;
        case `yellow`: yellowBtnSound.play(); break;
        case `blue`: blueBtnSound.play(); break;
        default: wrongBtnSound.play();
    }
}

const animatePress = function (currentColour) {
    $(`#${currentColour}`).addClass(`pressed`);
    setTimeout(() => { $(`#${currentColour}`).removeClass(`pressed`) }, 150)
}

const playSoundAndPress = function (currentColour) {
    playSound(currentColour);
    animatePress(currentColour);
}


const nextSequence = function () {
    level += 1;
    title.text(`Stage ${level}`)
    let randomNumber = Math.trunc(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSoundAndPress(randomChosenColour);
    console.log(`gamePattern:`, gamePattern);
    $(`#count`).text(gamePattern.length);

    $(`#countBox`)[0].innerHTML = `<span id="count">0</span> buttons left to be answered`;
    $(`#count`).text(gamePattern.length);
}


$(`.btn`).click(function () {
    if (!gameIsNew) {
        let userChosenColour = $(this)[0].id;
        userClickedPattern.push(userChosenColour);
        checkUserAnswer(userClickedPattern.length - 1)
    }
})


$(`body`).keypress(() => {
    if (gameIsNew) {
        title.text(`Stage ${level}`)
        gameIsNew = false;
        $(`#startBtn`).addClass(`clicked`);
        $(`#startBtn`).text(`RESTART`)
        setTimeout(() => {
            nextSequence();
        })
        console.log(`Game Start`)
    }
})



const checkUserAnswer = function (index) {
    let userAnswer = userClickedPattern[index];
    let gameAnswer = gamePattern[index];

    if (gameAnswer === userAnswer && gamePattern.length === (index + 1)) {
        playSoundAndPress(userAnswer);
        console.log(`userClickedPattern:`, userClickedPattern);
        userClickedPattern.length = 0;
        setTimeout(() => {
            nextSequence();
        }, 1000)
        $(`#countBox`)[0].innerHTML = `Great！Keep Going`;
    } else if (gameAnswer === userAnswer) {
        console.log(`userClickedPattern:`, userClickedPattern);
        playSoundAndPress(userAnswer);
        $(`#count`).text(gamePattern.length - userClickedPattern.length);

    } else {
        console.log(`userClickedPattern:`, userClickedPattern);
        playSound(`wrong`);
        $(`body`).addClass(`game-over`);
        setInterval(() => { $(`body`).removeClass(`game-over`) }, 200)
        resetGame();
    }
}

const resetGame = function () {
    gamePattern.length = 0
    userClickedPattern.length = 0;
    gameIsNew = true;
    level = 0;
    title.text(`Press A Key to Start`);
    $(`#startBtn`).text(`START`);
    $(`#startBtn`).removeClass(`clicked`)
    $(`#countBox`)[0].innerHTML = `Try Again`;
}



$(`#startBtn`).click(
    function () {
        if (gameIsNew) {
            $(this).addClass(`clicked`);
            $(this).text(`RESTART`)
            title.text(`Stage ${level}`)
            gameIsNew = false;
            setTimeout(() => {
                nextSequence();
            })
        } else {
            resetGame();
        }
    }
)