
let score = 0;
let scoreText = document.getElementById('score');
let coinBtn = document.querySelector('#btn');

let level = 1;
let levelText = document.getElementById('lv-txt')
let levelBtn = document.getElementById('lv-btn')

//Image Sequence
let imgNum = 0;
/*js에서 이미지 인스턴스 생성*/
let img = new Image();
let canvas = document.querySelector('#sequence')
let ctx = canvas.getContext('2d');

function addScore() {
    score = score + 100 * level;
    scoreText.innerText = "Score: "+ score;
}

setInterval(addScore,500);

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

//함수 표현식
function playSequence() {
    const timer = setInterval(()=>{
        if(imgNum > 14) {
            imgNum = 0;
        }

        player(imgNum);

        imgNum++;
    },50)
}
playSequence();
function player(num) {
    img.src = "./img/sequence/Coin_Sequence"+num+".png";
}

img.addEventListener('load', ()=>{
   ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
   ctx.drawImage(img, 0, 0);
});