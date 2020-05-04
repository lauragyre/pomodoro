let workTime = document.querySelector('#worktext');
let breakTime = document.querySelector('#breaktext');
let workColor = document.querySelector('#worktime');
let breakColor = document.querySelector('#breaktime');


let paused = false;

let pausedMinutes;
let pausedSeconds;

let workSeconds = 59;
let workMinutes = 24;
let breakSeconds = 59;
let breakMinutes = 4;


function workTimer() {
        
        breakColor.style.height = 0;
        var timer = setInterval(() => {
            let minute = (workMinutes < 10) ? "0" + workMinutes: workMinutes;
            let second = (workSeconds < 10) ? "0" + workSeconds: workSeconds; 
            pausedMinutes = workMinutes;
            pausedSeconds = workSeconds;
            if (paused == true) {
                clearInterval(timer);
            }
            if (workMinutes == 0 && workSeconds == 0) {
                workTime.innerHTML = "00 : 00";
            } else {
                workSeconds--
                workTime.innerHTML = `${minute} : ${second}`;
                workColor.style.height = (workMinutes * 4) + (workSeconds / 15) + "%";
            }
            
            if (workMinutes == 0 && workSeconds == 0) {
                clearInterval(timer);
                breakTimer();

            } else if (workSeconds == 0) {
                workSeconds = 60;
            }
            if (workSeconds == 60 && workMinutes >= 1) {
                workMinutes--;

            }
        }, 1000);
    }

function breakTimer() {
    
        var timer = setInterval(() => {
            
            let minute = (breakMinutes < 10) ? "0" + breakMinutes: breakMinutes;
            let second = (breakSeconds < 10) ? "0" + breakSeconds: breakSeconds; 
            pausedMinutes = breakMinutes;
            pausedSeconds = breakSeconds;
            if (paused == true) {
                clearInterval(timer);
            }
            if (breakMinutes == 0 && breakSeconds == 0) {
                breakTime.innerHTML = "00 : 00";
            } else {
                breakSeconds--
                breakTime.innerHTML = `${minute} : ${second}`;
                breakColor.style.height = (breakMinutes * 20) + (breakSeconds / 3) + "%";
            }
        
            
            if (breakMinutes == 0 && breakSeconds == 0) {
                clearInterval(timer);
                workTimer();

            } else if (breakSeconds == 0) {
                breakSeconds = 60;
                breakMinutes--;
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
    if (displayButton == 'WORK') {
        paused = false;
        
        breakSeconds = 0;
        breakMinutes = 0;
        workMinutes = 24;
        workSeconds = 59;
        breakColor.style.height = '100%';
       
        
    }
    if (displayButton == 'BREAK') {
        paused = false;
        breakMinutes = 4;
        breakSeconds = 59;
        workSeconds = 0;
        workMinutes = 0;   
        workColor.style.height = 0;
        breakColor.style.height = '100%';
        
       
    }
    

}

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => operator.addEventListener("click", getButtons));

