let imgs = Array.from(
  document.getElementsByTagName("img")
) as HTMLImageElement[];
const date = document.getElementById("date") as HTMLDivElement;

const removedImages: number[] = [];

imgs.forEach((img: HTMLImageElement, index: number) => {
  const storageImages: number[] = JSON.parse(
    localStorage.getItem("removedImages") || "[]"
  );
  if (storageImages.includes(index)) {
    removedImages.push(index);
    (img.parentElement as HTMLDivElement).style.display = "none";
  }
});

const gallery = document.getElementsByClassName("gallery")[0] as HTMLDivElement;
const closeBtn = gallery.children[0] as HTMLButtonElement;

const amountTag = document.getElementById("amountOfImages") as HTMLSpanElement;
amountTag.innerText = imgs.length.toString();

const actualDate = `${new Date().getDate()}.${
  new Date().getMonth() + 1
}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;

date.innerText = actualDate;

imgs.forEach((img, index) => {
  img.onclick = () => {
    gallery.classList.add("gallery-show");
    document.body.classList.add("overlay");
    const imgTagName = document.createElement("img") as HTMLImageElement;
    imgTagName.src = img.getAttribute("src") || "";
    gallery.append(imgTagName);
  };

  const deleteBtn = img.nextElementSibling as HTMLButtonElement;

  deleteBtn &&
    (deleteBtn.onclick = () => {
      (img.parentElement as HTMLDivElement).style.display = "none";
      removedImages.push(index);
      localStorage.setItem("removedImages", JSON.stringify(removedImages));
      imgs = Array.from(
        document.getElementsByTagName("img")
      ) as HTMLImageElement[];
      amountTag.innerText = imgs.length.toString();
    });
});

closeBtn.onclick = () => {
  gallery.classList.remove("gallery-show");
  document.body.classList.remove("overlay");
  gallery.children[1].remove();
};

const restore = document.getElementsByClassName(
  "restore"
)[0] as HTMLButtonElement;

restore.onclick = () => {
  localStorage.removeItem("removedImages");

  imgs.forEach((img, index) => {
    const container = img.parentElement as HTMLDivElement;
    removedImages.length = 0;
    container?.style.removeProperty("display");
  });
};
