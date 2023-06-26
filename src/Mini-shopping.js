
export default class {
    constructor(target) {

        this.target = target;
        this.target.innerHTML = getHtml();

        getData()
            .then((data)=>{
                //데이터를 불러오고난후 화면에 뿌려줄 html을 그려줄 함수에 data를 넘겨줌
                itemLoad(data)
                //그려진 html에 event들을 넣어주는 함수에 data를 넘겨줌
                addEvent(data,this.target)
            })
            .catch(e=>console.error(e));

    }

}
const getData=()=>{
    return fetch(`../data/shopping_data.json`)
        .then(data=>data.json())
        .then(data => data.item)
}

const filterEvent=(e,item)=>{
    document.querySelector('.items').innerHTML = '';
    let dataset = e.target.dataset;
    let filter = item.filter((value)=>value[dataset.key] == dataset.value );

    itemLoad(filter);
}

const exitEvent=(target)=>{

    target.removeChild(document.querySelector('.main_frame'))
}

const itemLoad=(items)=>{
    document.querySelector('.items').innerHTML = items.map(item=>createHTMLString(item)).join('');
}

const createHTMLString=(item)=>{
    return`
        <li>
            <img class="item__thumbnail" src=${item.img} />
            <span>${item.name}</span>
         </li>`;
}

const addEvent=(item,target)=>{
    // 변경 전 내 코드
    // document.querySelector('.logo').addEventListener('click',event => itemLoad(item));
    // document.querySelector('.buttons').addEventListener('click',event => filterEvent(event,item));

    //    가독성 좋게 변경후
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.container_buttons');
    const exit = document.querySelector('.exitBtn')

    logo.addEventListener('click',event => itemLoad(item));
    buttons.addEventListener('click',event => filterEvent(event,item));
    exit.addEventListener('click',()=>exitEvent(target));
}
const getHtml=()=>{

    return`
    <div class="main_frame">
    
        <div class="margin">
            <img class="logo" src="img/shopping/closet_logo.png">
        </div>
        
        <div class="margin">
                <section class="container_buttons">
                <button class="sectionBtn">
                    <img
                    src="img/shopping/blue_p.png"
                    data-key="type"
                    data-value="pants"
                    class="imgBtn"
                    >
                </button>
                <button class="sectionBtn">
                    <img
                            src="img/shopping/blue_s.png"
                            data-key="type"
                            data-value="skirt"
                            class="imgBtn"
                    >
                </button>
                <button class="sectionBtn">
                    <img
                            src="img/shopping/blue_t.png"
                            data-key="type"
                            data-value="t-shirt"
                            class="imgBtn"
                    >
                </button>
                <button class="sectionBtn blue" data-key="color" data-value="blue">blue</button>
                <button class="sectionBtn pink" data-key="color" data-value="pink">pink</button>
                <button class="sectionBtn yellow" data-key="color" data-value="yellow">yellow</button>
            </section>
        </div>
    
        <div class="shopping_items margin">   
                <ul class="items"></ul>
        </div>
        <div class="exit">
            <button class="exitBtn">exit</button>
        </div>
    </div>
    `
}

