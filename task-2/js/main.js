"use strict";
const imgs = document.getElementsByTagName("img");
const amountTag = document.getElementById("amountOfImages");
amountTag.innerText = imgs.length.toString();
const date = document.getElementById("date");
const actualDate = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
date.innerText = actualDate;
const gallery = document.getElementsByClassName("gallery")[0];
const closeBtn = gallery.children[0];
for (const img of imgs) {
    img.onclick = () => {
        const path = img.getAttribute("src");
        gallery.classList.add("gallery-show");
        document.body.classList.add("overlay");
        const imgTagName = document.createElement("img");
        imgTagName.src = path ? path : "";
        gallery.append(imgTagName);
    };
}
closeBtn.onclick = () => {
    gallery.classList.remove("gallery-show");
    document.body.classList.remove("overlay");
    gallery.children[1].remove();
};
