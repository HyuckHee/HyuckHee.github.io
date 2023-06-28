export default class{
    constructor(target) {
        this.target = target;

        this.container = document.querySelector('.container');

        this.score = 0;

        getHtml(this.target);

        // this.canvas = this.target.querySelector('.shootingImage');
        // this.ctx = this.canvas.getContext('2d');

        this.enemyCreateTime = 0;
        this.startBtn = this.target.querySelector('.startBtn');

        this.gameStart = false;
        this.grow = true;
        // this.render(this.ctx);

        this.startY = 0;
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

            this.startBtn.hidden=true;

            this.gameStart = true;

            this.render();

        })

        this.container.addEventListener('click',(e)=>{

            if(this.gameStart && e.target.dataset?.type == 'enemy'){

                this.score += Number(e.target.dataset.value);
                this.target.querySelector('.score').innerHTML = `score : ${this.score}`

                e.target.remove();
            }

        })
    }

    render=(timestamp)=>{

        if(this.start === undefined){
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;

        //원하는 시간에 실행
        if(elapsed > 2000){
            this.start = timestamp;
            // console.log(timestamp);

            this.enemy = new Enemy(this.container);
        }
            window.requestAnimationFrame(this.render);

    }


}

    const getHtml=(target)=>{
        target.innerHTML = `<div class="main_frame">
                    <div class="shootingTop"><p class="score">score : 0</p></div>
                    <div class="container shootingImage">
                        <button class="startBtn"><img src="img/shooting/start.svg" class="startImg"></button>
                    </div>
                </div>
                    `
    }


    class Enemy {
        constructor(target){
            this.target = target
            this.containerX = this.target.getBoundingClientRect().x;
            this.containerY = this.target.getBoundingClientRect().y;
            this.x = (Math.random()*(700-80+1)); // 게임창 크기 600 x 600
            this.y = (Math.random()*(550-80+1)); // 범위밖으로나가서 크기를 줄였음

            console.log(this.containerX);
            //950 ~ 1500
            this.img = document.createElement('img');
            this.img.classList.add('enemyImg')
            this.img.dataset.type = 'enemy';
            this.img.dataset.value = '100';
            this.img.src = 'img/shooting/enemy.png';
            this.img.style.position = "absolute"
            this.img.width = 80;
            this.img.height = 80;
            this.img.style.left = this.x + this.containerX; // 적 위치 + 게임창 x좌표 + 게임창 옆 여백
            this.img.style.top =  this.y + this.containerY+80; // 적 위치 + 게임창 x좌표


            this.draw();
        }

        draw(){

            this.target.appendChild(this.img);

        }
    }

