//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const header = document.getElementById("h");

let selectedImages = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadImages() {
  imageContainer.innerHTML = "";
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  header.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[duplicateIndex];
  const allImages = [...images, duplicate];
  shuffle(allImages);

  allImages.forEach((imgClass, idx) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.dataset.class = imgClass;
    img.addEventListener("click", () => handleSelect(img));
    imageContainer.appendChild(img);
  });
}

function handleSelect(img) {
  if (selectedImages.includes(img)) return;
  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else {
    verifyBtn.style.display = "none";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.textContent = "";
  header.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (selectedImages.length === 2) {
    if (selectedImages[0].dataset.class === selectedImages[1].dataset.class) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
});

loadImages();

