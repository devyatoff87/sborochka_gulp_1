import { imgArray } from './pic-srcs.js';

let imgs = document.querySelectorAll('.random-pic');

const loadSrcFunc = () => {

    const getRand = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    imgs.forEach((img) => {
        let numb = getRand(0, imgArray.length);
        img.src = imgArray[numb];
        img.dataset.numb = numb;
    })


    imgs.forEach((img, index1) => {
        let curDat = img.dataset.numb;
        for (let k = 0; k < imgs.length - 1; k++) {
            let index2 = k;
            let copyDat = imgs[k].dataset.numb;
            if (curDat == copyDat && index1 !== index2) {
                loadSrcFunc();
                break;
            }
        }
    })

}//mainFunc

loadSrcFunc()



