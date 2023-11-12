const sfx_list = ["btn_back", "btn_click", "btn_end_hover", "btn_hover"];
const sfx = {};

sfx_list.forEach(element => {
    sfx[element] = new Audio(`sfx/${element}.wav`);
});

const a_list = document.getElementsByTagName("a");
for (let i = 0; i < a_list.length; i++) {
    const element = a_list[i];
    element.addEventListener("mouseenter", _ => { play_sfx("btn_hover"); })
    element.addEventListener("mouseleave", _ => { play_sfx("btn_end_hover"); })
    element.addEventListener("click", _ => { play_sfx("btn_click"); })
}

function play_sfx(name) {
    sfx[name].play();
}
