"use strict";
let imgs = Array.from(document.getElementsByTagName("img")); // константа для отримання всіх зображень на сторінці
const dateTag = document.getElementById("date"); // отримання елемента для додання дати
const gallery = document.getElementsByClassName("gallery")[0]; // оримання елемента для галереї
const closeBtn = gallery.children[0]; // отримання кнопки для закриття галереї
const amountTag = document.getElementById("amountOfImages"); // отримання елемента, який підраховуї картинки на сторінці
const restore = document.getElementsByClassName("restore")[0]; // отримання кнопка, яка відновлює пиховані сторінки
const removedImages = []; // змінна типу масив для зберігання видалених картинок
// функція для підрахунку кількості зображень
const countingImagesHandler = () => {
    amountTag.innerText = (imgs.length - removedImages.length).toString();
};
// функція, яка заносить картинку до масиву removedImages та приховує елемент, в якому вона знаходиться
const hideImageAndPushIntoArrayContainer = (index, element) => {
    removedImages.push(index); // занесення картинок зображень до масиву removedImages
    element.style.display = "none"; // приховання контейнеру, де знаходиться картинка
};
// функція, яка відповідає за звернення до сховища, де зберігається видалені картинки та їх видалення після перезавантеження сторінки
imgs.forEach((img, index) => {
    //   отримання сховища
    const storageImages = JSON.parse(localStorage.getItem("removedImages") || "[]");
    //   занесення видалених картинок до масиву для збереження видалених картинок в минулий раз заходу сторінку та приховання їх, якщо в 
    storageImages.includes(index) && hideImageAndPushIntoArrayContainer(index, img.parentElement);
    countingImagesHandler();
});
imgs.forEach((img, index) => {
    // обробка кліку на картинку, що викликає виведення картинки як модульного вікна з затемнення та кнопкою закриття для кожного елементу
    img.onclick = () => {
        gallery.classList.add("gallery-show");
        document.body.classList.add("overlay");
        const imgTagName = document.createElement("img");
        imgTagName.src = img.getAttribute("src") || "";
        gallery.append(imgTagName);
    };
    //   отримання кнопки для видалення як сиблінга поточної картинки
    const deleteBtn = img.nextElementSibling;
    //   перевірка наявності кнопки та обробка видаленняк
    deleteBtn &&
        (deleteBtn.onclick = () => {
            hideImageAndPushIntoArrayContainer(index, deleteBtn.parentElement);
            localStorage.setItem("removedImages", JSON.stringify(removedImages)); // оновлення локального сховища відповідно до оноаленого масиву removedImages
            countingImagesHandler();
        });
});
// обробка кліку на кнопку закриття галереї
closeBtn.onclick = () => {
    gallery.classList.remove("gallery-show");
    document.body.classList.remove("overlay");
    gallery.children[1].remove();
};
// обробка кнопки відновлення прихованих користувачем картинок
restore.onclick = () => {
    localStorage.removeItem("removedImages"); // видалення зі сховища
    removedImages.length = 0; // очищення масиву від індексів зображень для видалення
    //   повернення видимості картинок через видалення властивості display
    imgs.forEach((img) => {
        const container = img.parentElement;
        container === null || container === void 0 ? void 0 : container.style.removeProperty("display");
    });
    countingImagesHandler();
};
// відображення дати в елементі dateTag
const actualDate = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
dateTag.innerText = actualDate;
