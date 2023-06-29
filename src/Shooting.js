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

            this.enemyList = [];

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
            if(!this.enemyList[i].getHidden()){
                if(timestamp - this.enemyList[i].timestamp >5000){
                    this.gameStart = false;
                    this.startBtn.hidden = false;
                }
            }
        }
        for(let i=0; i < this.enemyList.length; i++){
            if(!this.enemyList[i].getHidden() && !this.gameStart){
                this.enemyList[i].gameOver = true;
            }
        }

            window.requestAnimationFrame(this.render);

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


    class Enemy {
        constructor(target,timestamp){
            this.target = target

            this.img = document.createElement('img');
            this.img.classList.add('enemyImg')
            this.img.dataset.type = 'enemy';
            this.img.dataset.value = '100';
            this.img.src = 'img/shooting/enemy.png';
            this.img.style.position = "absolute"
            this.img.width = 80;
            this.img.height = 80;

            //컨테이너 크기
            this.containerX = this.target.getBoundingClientRect().width;
            this.containerY = this.target.getBoundingClientRect().height;
            //적 생성위치
            this.x = this.randomPosition(0,this.containerX,this.img.width);
            this.y = this.randomPosition(0,this.containerY,this.img.height);

            this.timestamp = timestamp;

            this.img.style.left = `${this.x}px`; // 적 위치 + 게임창 x좌표 + 게임창 옆 여백
            this.img.style.top =  `${this.y}px`; // 적 위치 + 게임창 x좌표

            this.shootingSound = document.createElement('audio');
            this.shootingSound.src = './sounds/shooting/shootSound.mp3'

            this.score = document.querySelector('.score');

            this.live = true;
            this.gameOver = false;
            this.draw();


            this.img.addEventListener('click',(e)=>{
                if(!this.gameOver){
                    this.score.dataset.value = `${Number(this.score.dataset.value) + Number(this.img.dataset.value)}`
                    this.score.innerHTML = `score : ${this.score.dataset.value}`

                    e.target.remove();
                }
            })

        }

        draw(){
            this.target.querySelector('.enemyDiv').appendChild(this.img);
        }
        getHidden(){
            return this.img.hidden
        }
        /*
        * min,max 입력해서 좌표지정
        */
        randomPosition(min,max,unitSize){
            return Math.random()*(max-unitSize-min+1)+min;
        }
        getScore(){
            return Number(this.score.dataset.value)
        }
    }

