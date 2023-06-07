
let score = 0;
let scoreText = document.getElementById('score');
let coinBtn = document.querySelector('#btn');

let level = 1;
let levelText = document.getElementById('lv-txt')
let levelBtn = document.getElementById('lv-btn')
function addScore() {
    score = score + 100 * level;
    scoreText.innerText = "Score: "+ score;
}
coinBtn.addEventListener('click',addScore)

levelBtn.addEventListener('click',levelUp);

function levelUp() {
    if(score >= (1000 * level)){
        score -= 1000 * level;
        scoreText.innerText = "Score: " + score;
        level++;
        levelText.innerText = "LV: "+ level;
    }
}
