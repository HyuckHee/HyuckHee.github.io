import Vanilla1 from "./Vanilla1.js";
import MiniShopping from "./Mini-shopping.js";

export default class {
    constructor(target) {
        this.target = target;
         // new Vanilla1(target);
        this.addEvent();
    }

    addEvent=()=>{
        document.querySelector('.buttons').addEventListener('click',(e)=>{
            const {value} = e.target.dataset;
            if(value == 'hamburger'){
                if(document.querySelector('.main_frame')){
                    this.target.removeChild(document.querySelector('.main_frame'));
                }

                new Vanilla1(this.target);
            }else if(value == 'closet'){
                if(document.querySelector('.main_frame')){
                    this.target.removeChild(document.querySelector('.main_frame'));
                }

                new MiniShopping(this.target);

            }

        })
    }
}


