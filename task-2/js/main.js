"use strict";
let imgs = Array.from(document.getElementsByTagName("img"));
const date = document.getElementById("date");
const removedImages = [];
imgs.forEach((img, index) => {
    const storageImages = JSON.parse(localStorage.getItem("removedImages") || "[]");
    if (storageImages.includes(index)) {
        removedImages.push(index);
        img.parentElement.style.display = "none";
    }
});
const gallery = document.getElementsByClassName("gallery")[0];
const closeBtn = gallery.children[0];
const amountTag = document.getElementById("amountOfImages");
amountTag.innerText = imgs.length.toString();
const actualDate = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
date.innerText = actualDate;
imgs.forEach((img, index) => {
    img.onclick = () => {
        gallery.classList.add("gallery-show");
        document.body.classList.add("overlay");
        const imgTagName = document.createElement("img");
        imgTagName.src = img.getAttribute("src") || "";
        gallery.append(imgTagName);
    };
    const deleteBtn = img.nextElementSibling;
    deleteBtn &&
        (deleteBtn.onclick = () => {
            img.parentElement.style.display = "none";
            removedImages.push(index);
            localStorage.setItem("removedImages", JSON.stringify(removedImages));
            imgs = Array.from(document.getElementsByTagName("img"));
            amountTag.innerText = imgs.length.toString();
        });
});
closeBtn.onclick = () => {
    gallery.classList.remove("gallery-show");
    document.body.classList.remove("overlay");
    gallery.children[1].remove();
};
const restore = document.getElementsByClassName("restore")[0];
restore.onclick = () => {
    localStorage.removeItem("removedImages");
    imgs.forEach((img, index) => {
        const container = img.parentElement;
        removedImages.length = 0;
        container === null || container === void 0 ? void 0 : container.style.removeProperty("display");
    });
};
