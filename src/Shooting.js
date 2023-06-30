import Enemy from "./shooting/Enemy.js";

export default class{
    constructor(target) {
        this.target = target;

        getHtml(this.target);

        this.shootingScreen = document.querySelector('.shootingImage');
        this.enemyDiv = document.querySelector('.enemyDiv');

        this.score = target.querySelector('.score');

        this.enemyList = [];

        this.startBtn = this.target.querySelector('.startBtn');

        this.gameStart = false;

        /*
        * 1. 캔버스 그리기
        * 2. 기본 이미지 그리기
        * 3. 애니메이션 효과생성
        * 4. 게임 실행
        * 5. 게임오버 등등...
        * */

        this.addEvent();

    }




    addEvent=()=>{
        this.startBtn.addEventListener('click',()=>{

            //이전 게임 정보 초기화
            this.gameInit();

            this.startBtn.hidden=true;
            this.gameStart = true;

            //enemy 이미지 모두 제거
            while ( this.enemyDiv.hasChildNodes() )
            {
                this.enemyDiv.removeChild( this.enemyDiv.firstChild );
            }
            this.render();

        })
    }

    render=(timestamp)=>{

        if(!this.gameStart){
            return;
        }

        if(this.start === undefined){
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;

        //원하는 시간에 실행
        if(elapsed > 500){
            this.start = timestamp;
            this.enemy = new Enemy(this.shootingScreen,timestamp);
            this.enemyList.push(this.enemy);
        }

        for(let i=0; i < this.enemyList.length; i++){
            //살아있는 상태라면 5초 체크
            if(this.enemyList[i].getState()){
                if(timestamp - this.enemyList[i].timestamp >5000){
                    this.gameStart = false;
                    this.startBtn.hidden = false;
                }
            }
        }
        for(let i=0; i < this.enemyList.length; i++){
            if(this.enemyList[i].getState() && !this.gameStart){
                this.enemyList[i].gameOver = true;
            }
        }

            window.requestAnimationFrame(this.render);

    }

    gameInit=()=>{

        this.enemyList = [];
        this.score.innerHTML = `score : 0`;
        this.score.dataset.value = `0`;

    }

}

    const getHtml=(target)=>{
        target.innerHTML = `<div class="main_frame">
                    <div class="shootingTop"><p class="score" data-value="0">score : 0</p></div>
                    <section class="container shootingImage">
                        <button class="startBtn"><img src="img/shooting/start.svg" class="startImg"></button>
                        <div class="enemyDiv"></div>
                    </section>
                </div>
                    `
    }



