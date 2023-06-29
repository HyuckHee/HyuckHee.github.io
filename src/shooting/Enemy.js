
export default class{
    constructor(target,timestamp){
        //target == .shootingScreen
        this.target = target

        //죽은상태인지 산상태인지 확인하는 변수
        this.state = true;

        //적 이미지 생성
        this.img = document.createElement('img');
        //적 클래스
        this.img.classList.add('enemyImg')
        //type, 적을 죽였을때 점수
        this.img.dataset.type = 'enemy';
        this.img.dataset.value = '100';
        this.img.src = 'img/shooting/enemy.png';
        //이미지 positon 설정 스크린 원하는 위치에 찍어내기위해 absolute
        this.img.style.position = "absolute"

        //적 크기설정
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
        this.shootingSound.src = 'sounds/shooting/shootSound.mp3'

        this.score = document.querySelector('.score');

        this.gameOver = false;
        this.draw();

        this.img.addEventListener('click',(e)=>{
            if(!this.gameOver){

                this.shootingSound.play().then(()=>{
                    this.state=false;
                    this.score.dataset.value = `${Number(this.score.dataset.value) + Number(this.img.dataset.value)}`
                    this.score.innerHTML = `score : ${this.score.dataset.value}`

                    e.target.remove();
                })
            }
        })
    }
    draw(){
        this.target.querySelector('.enemyDiv').appendChild(this.img);
    }
    getState(){
        return this.state;
    }
    /*
    * min,max 입력해서 좌표지정
    */
    randomPosition(min,max,unitSize){
        return Math.random()*(max-unitSize-min+1)+min;
    }
}