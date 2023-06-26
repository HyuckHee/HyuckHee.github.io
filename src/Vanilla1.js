
export default class {
    constructor(target) {
        this.target = target;
        this.btn_img_src = 'img/vanilla/btn_release.png'

        this.target.innerHTML = this.getHtml();
        this.score = 0;
        this.scoreText = this.target.querySelector('#score');
        this.coinBtn = this.target.querySelector('#btn_hamburger');

        this.level = 1;
        this.levelText = this.target.querySelector('#lv-txt')
        this.levelBtn = this.target.querySelector('#lv-btn')

        this.exit = this.target.querySelector('.exitBtn')

        //Image Sequence
        this.imgNum = 0;
        /*js에서 이미지 인스턴스 생성*/
        this.img = new Image();
        this.canvas = this.target.querySelector('#sequence')
        this.ctx = this.canvas.getContext('2d');


        this.playSequence();
        this.addEvent();
        setInterval(this.addScore,500);

    }

    getHtml=()=>{

    return `<div class="main_frame">
<!--            <h1> JS Tutorial Main Title</h1>-->
            <h2>JS Idle Game Tutorial</h2>
            <h3 id="score">Score: 0</h3>
            <div Id="lv">
                <h3 id="lv-txt">LV: 1</h3>
                <button type="button" id="lv-btn">level up</button>
            </div>
            <div id="coin">
                <canvas width="160" height="160" id="sequence"></canvas>
            </div>
            <div id="hamburger">
                <button id="btn_hamburger">
                    <img class="img_hamburger" src=${this.btn_img_src} alt="hamburgur">
                </button>
            </div>
            <div class="exit">
                <button class="exitBtn">exit</button>
            </div>
        </div>
`
}

//함수 표현식
    playSequence=()=>{
    const timer = setInterval(()=>{
        if(this.imgNum > 13) {
            this.imgNum = 0;
        }

        this.player(this.imgNum);

        this.imgNum++;
    },50)
}

     player=(num)=> {
    this.img.src = "./img/vanilla/sequence/Coin_Sequence"+num+".png";
    }

    addEvent=()=>{
        this.img.addEventListener('load', ()=>{
            this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.drawImage(this.img, 0, 0);
        });

        this.coinBtn.addEventListener('click',this.addScore)

        this.levelBtn.addEventListener('click',this.levelUp);

        this.exit.addEventListener('click',this.exitEvent);
    }


    addScore=()=> {
        this.score = this.score + 100 * this.level;
        this.scoreText.innerText = "Score: "+ this.score;
    }



    levelUp=()=> {
        if(this.score >= (1000 * this.level)){
            this.score -= 1000 * this.level;
            this.scoreText.innerText = "Score: " + this.score;
            this.level++;
            this.levelText.innerText = "LV: "+ this.level;
        }
    }
    exitEvent=()=>{

        this.target.removeChild(document.querySelector('.main_frame'))
    }


}



