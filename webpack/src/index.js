// import _ from "lodash"
import img1 from "./icon.png"
import xmlData from './data.xml'
import csvData from './data.csv'
import print from './print'
import './style.css'
function component() {

    const element = document.createElement("div");
    const btn = document.createElement("button");
    // element.innerHTML = _.join(['hello', 'webpack'], ' ');
    return import('lodash').then((at) => {
        element.innerHTML = at.default.join(['helo', "as"], " ");
    }).then(() => {
        element.classList.add("hello");
        const icon = new Image();
        icon.width = 100;
        icon.height = 100;
        icon.src = img1;
        element.appendChild(icon);
        console.log(xmlData);
        console.log(csvData);
        btn.innerHTML = "print";
        btn.onclick = print;
        element.appendChild(btn);
        return element
    })
}
component().then((ele) => {
    document.body.appendChild(ele);
})