async function setImg(event, imgUrl) {
  let color = document.querySelector(".color");
  let svg = document.querySelector("#loader-svg");
  let buttons = document.querySelectorAll(".colors button");
  let root = document.querySelector(":root");
  let uploadButton = document.querySelector(".upload");
  let body = document.querySelector("body");

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] === event.target) {
      buttons[i].classList.add("active");
      svg.style.fill = getComputedStyle(buttons[i]).getPropertyValue(
        `--${buttons[i].classList[1].split("-").join("")}-secondary`
      );

      uploadButton.style.backgroundColor = getComputedStyle(
        buttons[i]
      ).getPropertyValue(
        `--${buttons[i].classList[1].split("-").join("")}-secondary`
      );

      body.style.backgroundColor = getComputedStyle(
        buttons[i]
      ).getPropertyValue(`--${buttons[i].classList[1].split("-").join("")}-bg`);
    } else {
      buttons[i].classList.remove("active");
    }
  }

  let imageWrapper = document.querySelector(".image-wrapper");
  let img = document.querySelector(".wrapper img");
  let loader = document.querySelector(".loader");
  loader.classList.remove("hidden");
  imageWrapper.classList.add("hidden");
  await delay(2000);
  imageWrapper.classList.remove("hidden");
  loader.classList.add("hidden");
  img.src = imgUrl;
}

let logoSrc = "";
function selectImage(event) {
  let file = event.target.files[0];
  let logo = document.querySelector(".logo");
  let buttonText = document.querySelector(".text");

  if (file.size > 5 * 1024 * 1024) {
    alert("File size should not exceed 5MB");
    return;
  }

  buttonText.textContent = file.name;
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      logoSrc = reader.result;
      logo.classList.remove("hide");
      logo.src = logoSrc;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
