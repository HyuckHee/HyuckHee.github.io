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
        this.scoreDiv = this.target.querySelector('.scoreDiv')
        this.gameStart = false;
        this.stage = 1;
        this.speed = 1000;

        this.save = false;

        this.enemyMax = 20;
        this.enemyMin = 15;
        this.enemyAmount = this.enemyAmountFn();

        this.stageEle = document.querySelector('.stage');

        this.param = {
            'name' : '',
            'score' : 0,
            'ip' : '',
            'country' : ''
        }
        /*
        * 1. 캔버스 그리기
        * 2. 기본 이미지 그리기
        * 3. 애니메이션 효과생성
        * 4. 게임 실행
        * 5. 게임오버 등등...
        * */
        this.addEvent();

        //ip
        this.getIp();

        this.getScore();
    }

    getIp=async ()=>{
         await fetch("https://jsonip.com").then(res=>{
            return res.json()
        }).then(data =>{
             this.param.ip = data.ip;
             this.param.country = data.country;
         })

    }
    addEvent=()=>{
        this.startBtn.addEventListener('click',()=>{

            //이전 게임 정보 초기화
            this.gameInit();
            this.startBtn.hidden=true;
            this.gameStart = true;
            //enemy 이미지 모두 제거
            this.tagClear(this.enemyDiv);

            this.render();
        })
        this.scoreDiv.addEventListener('keydown',(e)=>{

            if(!document.querySelector('#insertScore')){
                return;
            }
            if(e.keyCode === 13){
                this.param.name = this.target.querySelector('#insertScore').value;
                this.param.score = this.score.dataset.value

                this.insertScore(this.param);
            }else{
                console.log(e);
            }
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
                //랭킹보이기
                this.getScore().then(()=>{
                    this.scoreDiv.style.display = 'flex';
                })
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
        this.save = false;

        //랭킹 하이드
        this.scoreDiv.style.display = 'none';
    }
    stageUp=()=>{
        this.enemyList = [];
        this.target.querySelector('.enemyDiv').innerHTML = ''
        this.stage++;

        this.param.score = 0;
        this.param.name = '';


        this.stageEle.innerHTML = `lv.${this.stage}`

        this.speed = this.speed - (parseInt((`${this.speed / 100}`)) * (5 * this.stage));

        this.enemyAmount = this.enemyAmountFn();

    }

    enemyAmountFn=()=>{
        return parseInt(`${Math.random()*(this.enemyMax - this.enemyMin+1)+this.enemyMin}`);
    }

    getScore=async ()=>{
        await fetch('https://61.73.140.54:3000/score').then(response => {
            return response.json()
        }).then(data =>{
            console.log(data.result);
            this.scoreList(data.result);
        })
    }

    insertScore=async (param)=>{
            await fetch('https://61.73.140.54:3000/score',{
            method: 'PUT', // *GET, POST, PUT, DELETE 등
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
        }).then(response => {
            return response.json();
        }).then(() =>{
            this.save = true;
            this.getScore();
        })
    }
    scoreList=(list)=>{

        this.tagClear(this.scoreDiv);

        const scoreUl = document.createElement('ul')
        scoreUl.classList.add('scoreUl');
        scoreUl.innerHTML =`<li class="scoreLi">
                                    <p class="shooting_rank bold">RANK</p>
                                    <p class="shooting_name bold">NAME</p>
                                    <p class="shooting_score bold">SCORE</p>
                                  </li>`
        for(let i=0; i < list.length; i++){
            scoreUl.innerHTML += `<li class="scoreLi">
                                    <p class="shooting_rank">${list[i].RANK}</p>
                                    <p class="shooting_name">${list[i].name}</p>
                                    <p class="shooting_score">${list[i].score}</p>
                                  </li>`
        }

        if(this.score.dataset.value > list[4].score && !this.save){
            scoreUl.innerHTML += `<li class="scoreLi insert">
                                    <p class="shooting_rank bold">NEW</p>
                                    <input id="insertScore" class="shooting_name bold">
                                    <p class="shooting_score">${this.score.dataset.value}</p>
                                  </li>`
        }
        this.scoreDiv.appendChild(scoreUl);
    }

    //태그 요소 전부삭제
    tagClear(ele){
        while ( ele.hasChildNodes() )
        {
            ele.removeChild( ele.firstChild );
        }
    }


}

    const getHtml=(target)=>{
        target.innerHTML = `<div class="main_frame">
                    <div class="shootingTop"><p class="score" data-value="0">score : 0</p><p class="stage">lv.1</p></div>
                    <section class="container shootingImage">
                        <div class="scoreDiv"></div>
                        <button class="startBtn"><img alt="start__button" src="../img/shooting/start.svg" class="startImg"></button>
                        <div class="enemyDiv"></div>
                    </section>
                </div>
                    `
    }



