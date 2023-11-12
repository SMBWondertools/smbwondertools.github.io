var client = new XMLHttpRequest();
client.open('GET', '/data/featured_mods.yaml');
client.onload =  function() {
    var doc = jsyaml.load(client.responseText);
    create_featured_mods(doc.mods);
}
client.send();

function create_featured_mods(mods) {
    const featured_mods = document.getElementById("featured-mods");
    mods.forEach(mod => {
        const element = document.createElement("div");
        element.className = "featured-mod";

        const a = document.createElement("a");
        a.href = mod.Website;
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        const img = document.createElement("img");
        img.src = mod.Banner;
        img.addEventListener("mouseenter", _ => {
            img.style = `box-shadow: 0px 0px 10px 10px ${mod.Color}`;
            play_sfx("btn_hover");
        })
        img.addEventListener("mouseleave", _ => {
            img.style = `box-shadow: none`;
            play_sfx("btn_end_hover");
        })
        img.addEventListener("click", _ => {
            play_sfx("btn_click")
        });

        a.appendChild(img)
        element.appendChild(a);

        const description = document.createElement("h3");
        description.innerText = mod.Description;
        description.innerHTML += `<br><span style="color: lightgray; font-size: 18px;">${mod.Author}</span>`;
        element.appendChild(description);

        element.appendChild(document.createElement("br"))
        featured_mods.appendChild(element);
    });
}