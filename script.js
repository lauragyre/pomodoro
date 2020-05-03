let workTime = document.querySelector('#worktext');
let breakTime = document.querySelector('#breaktext');
let workColor = document.querySelector('#worktime');
let breakColor = document.querySelector('#breaktime');

let paused = false;

let pausedMinutes;
let pausedSeconds;

let workSeconds = 15;
let workMinutes = 1;
let breakSeconds = 59;
let breakMinutes = 4;

function workTimer() {
        let minute = (workMinutes < 10) ? "0" + workMinutes: workMinutes;
        let second = (workSeconds < 10) ? "0" + workSeconds: workSeconds; 
        var timer = setInterval(() => {
            pausedMinutes = workMinutes;
            pausedSeconds = workSeconds;
            if (paused == true) {
                clearInterval(timer);
            }
            if (workMinutes == 0 && workSeconds == 0) {
                workTime.innerHTML = "00 : 00";
            } else {
                workSeconds--
                workTime.innerHTML = `${workMinutes} : ${workSeconds}`;
                workColor.style.height = (workMinutes * 4) + (workSeconds / 15) + "%";
            }
            if (workSeconds == 0) {
                workSeconds = 60;
            }
            if (workSeconds == 60 && workMinutes >= 1) {
                workMinutes--;
            }
            if (workMinutes == 0 && workSeconds == 0) {
                clearInterval(timer);
                breakTimer();
            }
        }, 1000);
    }

function breakTimer() {
        let minute = (breakMinutes < 10) ? "0" + breakMinutes: breakMinutes;
        let second = (breakSeconds < 10) ? "0" + breakSeconds: breakSeconds; 
        var timer = setInterval(() => {
            pausedMinutes = breakMinutes;
            pausedSeconds = breakSeconds;
            if (paused == true) {
                clearInterval(timer);
            }
            if (breakMinutes == 0 && breakSeconds == 0) {
                breakTime.innerHTML = "00 : 00";
            } else {
                breakSeconds--
                breakTime.innerHTML = `${breakMinutes} : ${breakSeconds}`;
                breakColor.style.height = (breakMinutes * 20) + (breakSeconds / 3) + "%";
            }
            if (breakSeconds == -1) {
                breakSeconds = 59;
            }
            if (breakSeconds == 59 && breakMinutes >= 1) {
                breakMinutes--;
            }
            if (breakMinutes == 0 && breakSeconds == 0) {
                clearInterval(timer);
                workTimer();
            }
        }, 1000);
    }

function stop() {
    paused = true;
}

function getButtons(e) {
    displayButton = e.target.innerText;
    if (displayButton == 'START') {
        paused = false;
        workTimer();
    }
    if (displayButton == 'STOP') {
        stop();
    }
}

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => operator.addEventListener("click", getButtons));

