background_count = 37

let clicked = null;

const background_images = []
const generated_img_element = document.getElementById("generated");
const file_input = document.getElementById("image_upload");
const backgrounds = document.getElementById("backgrounds");
const canvas = document.getElementById("generator-canvas");
const scale_range = document.getElementById("scale_range");
const scale_text = document.getElementById("scale_text");
const ctx = canvas.getContext("2d");

file_input.onchange = _ => {
    generate();
}
scale_range.oninput = value => {
    scale_text.innerText = `${scale_range.value}%`;
}
scale_range.onchange = _ => {
    generate();
}

for (let i = 0; i < background_count; i++) {
    const bgname = `bgs/bg (${i + 1}).png`;

    const img = document.createElement("img");
    img.className = "background";
    img.setAttribute("data-lazysrc", bgname);

    img.addEventListener("click", _ => {
        if (clicked != null) {
            clicked.className = "background";
        }
        clicked = img;
        img.className = "background-clicked";

        generate();
    });

    background_images.push(img);
    backgrounds.appendChild(img);
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        for (let i = 0; i < background_images.length; i++) {
            const element = background_images[i];
            element.src = element.getAttribute("data-lazysrc");
        }
    }
});

function generate() {
    if (clicked == null || !file_input.files || !file_input.files[0]) return;

    var imageObj1 = new Image();
    var imageObj2 = new Image();

    var reader = new FileReader();
    reader.onload = (e) => {
        imageObj1.src = clicked.src;
        imageObj1.onload = function () {
            ctx.drawImage(imageObj1, 0, 0, 1280, 1280);
            imageObj2.src = e.target.result;
            imageObj2.onload = function () {
                const imagePercentage = scale_range.value / 100;
                const size = 1280 * imagePercentage;
                const pos = (1280 - size) / 2;
                ctx.drawImage(imageObj2, pos, pos, size, size);
                canvas.toBlob(blob => {
                    generated_img_element.src = URL.createObjectURL(blob);
                });
            }
        };
    };
    reader.readAsDataURL(file_input.files[0]);

}