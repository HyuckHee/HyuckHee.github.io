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
        this.stage = 1;
        this.speed = 1000;

        this.enemyMax = 20;
        this.enemyMin = 15;
        this.enemyAmount = this.enemyAmountFn();

        this.stageEle = document.querySelector('.stage');
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
            {this.enemyDiv.removeChild( this.enemyDiv.firstChild );}

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

        //스피드는 보스가 죽었을때 업데이트 this.stageUp;
        if(elapsed > this.speed){
            this.start = timestamp;
            this.enemy = new Enemy(this.shootingScreen,timestamp,'normal');
            this.enemyList.push(this.enemy);

            //적군 15마리 생성되었을때 보스생성

            if(this.enemyList.length === this.enemyAmount ){
                setTimeout(()=>{
                    this.enemy = new Enemy(this.shootingScreen,timestamp,'boss');
                    this.enemyList.push(this.enemy);
                }, 500);
            }
        }

        //적군 리스트 돌면서 시간체크
        for(let i=0; i < this.enemyList.length; i++){
            //살아있는 상태라면 5초 체크
            if(this.enemyList[i].getState()){
                if(timestamp  > this.enemyList[i].timestamp){
                    this.gameStart = false;
                    this.startBtn.hidden = false;
                }
            }
        }


        //게임오버 체크
        for(let i=0; i < this.enemyList.length; i++){
            if(this.enemyList[i].getState() && !this.gameStart){
                this.enemyList[i].gameOver = true;
            }
            if(this.enemyList[i].type==='boss' && !this.enemyList[i].getState()){
                //게임정보 초기화 다음스테이지
                this.stageUp();
            }
        }

            window.requestAnimationFrame(this.render);

    }

    gameInit=()=>{
        this.enemyList = [];
        this.score.innerHTML = `score : 0`;
        this.score.dataset.value = `0`;

        this.stage=1;
        this.stageEle.innerHTML = `lv.${this.stage}`

        this.speed = 1000;
    }
    stageUp=()=>{
        this.enemyList = [];
        this.target.querySelector('.enemyDiv').innerHTML = ''
        this.stage++;


        this.stageEle.innerHTML = `lv.${this.stage}`

        this.speed = this.speed - (parseInt((`${this.speed / 100}`)) * (5 * this.stage));

        this.enemyAmount = this.enemyAmountFn();
    }

    enemyAmountFn=()=>{
        return parseInt(`${Math.random()*(this.enemyMax - this.enemyMin+1)+this.enemyMin}`);
    }
}

    const getHtml=(target)=>{
        target.innerHTML = `<div class="main_frame">
                    <div class="shootingTop"><p class="score" data-value="0">score : 0</p><p class="stage">lv.1</p></div>
                    <section class="container shootingImage">
                        <button class="startBtn"><img alt="start__button" src="../img/shooting/start.svg" class="startImg"></button>
                        <div class="enemyDiv"></div>
                    </section>
                </div>
                    `
    }



