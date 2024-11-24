let imgs = Array.from(document.getElementsByTagName("img")) as HTMLImageElement[]; // константа для отримання всіх зображень на сторінці
const dateTag = document.getElementById("date") as HTMLDivElement; // отримання елемента для додання дати
const gallery = document.getElementsByClassName("gallery")[0] as HTMLDivElement; // оримання елемента для галереї
const closeBtn = gallery.children[0] as HTMLButtonElement; // отримання кнопки для закриття галереї
const amountTag = document.getElementById("amountOfImages") as HTMLSpanElement; // отримання елемента, який підраховуї картинки на сторінці
const restore = document.getElementsByClassName("restore")[0] as HTMLButtonElement; // отримання кнопка, яка відновлює пиховані сторінки

const removedImages: number[] = []; // змінна типу масив для зберігання видалених картинок

// функція для підрахунку кількості зображень
const countingImagesHandler = (): void => {
  amountTag.innerText = (imgs.length - removedImages.length).toString();
};

// функція, яка заносить картинку до масиву removedImages та приховує елемент, в якому вона знаходиться
const hideImageAndPushIntoArrayContainer = (index: number, element: HTMLDivElement): void => {
  removedImages.push(index); // занесення картинок зображень до масиву removedImages
  element.style.display = "none"; // приховання контейнеру, де знаходиться картинка
};

// функція, яка відповідає за звернення до сховища, де зберігається видалені картинки та їх видалення після перезавантеження сторінки
imgs.forEach((img: HTMLImageElement, index: number) => {
  //   отримання сховища
  const storageImages: number[] = JSON.parse(
    localStorage.getItem("removedImages") || "[]"
  );

  //   занесення видалених картинок до масиву для збереження видалених картинок в минулий раз заходу сторінку та приховання їх, якщо в 
  storageImages.includes(index) && hideImageAndPushIntoArrayContainer(index, img.parentElement as HTMLDivElement);

  countingImagesHandler();
});

imgs.forEach((img, index) => {
  // обробка кліку на картинку, що викликає виведення картинки як модульного вікна з затемнення та кнопкою закриття для кожного елементу
  img.onclick = () => {
    gallery.classList.add("gallery-show");
    document.body.classList.add("overlay");
    const imgTagName = document.createElement("img") as HTMLImageElement;
    imgTagName.src = img.getAttribute("src") || "";
    gallery.append(imgTagName);
  };

  //   отримання кнопки для видалення як сиблінга поточної картинки
  const deleteBtn = img.nextElementSibling as HTMLButtonElement;

  //   перевірка наявності кнопки та обробка видаленняк
  deleteBtn &&
    (deleteBtn.onclick = () => {
      hideImageAndPushIntoArrayContainer(index, deleteBtn.parentElement as HTMLDivElement);
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
    const container = img.parentElement as HTMLDivElement;
    container?.style.removeProperty("display");
  });

  countingImagesHandler();
};

// відображення дати в елементі dateTag
const actualDate = `${new Date().getDate()}.${
  new Date().getMonth() + 1
}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;

dateTag.innerText = actualDate;
