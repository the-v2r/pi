document.querySelectorAll(".toolbar_left .item").forEach((a) => {
    let itemBtn = document.createElement("button");
    itemBtn.textContent = a.getAttribute("val");
    let cont = document.createElement("div");
    cont.classList.add("wrapper");
    while (a.firstChild) {
        cont.appendChild(a.firstChild);
    }
    a.appendChild(itemBtn);
    a.appendChild(cont);
    itemBtn.classList.add("listBtn");
});

document.querySelectorAll(".toolbar_left .item").forEach((a) => {
    const itemBtn = a.querySelector(".listBtn");
    const wrapper = a.querySelector(".wrapper");
    itemBtn.addEventListener("mouseover", () => {
        wrapper.style.display = "flex";
        itemBtn.classList.add("hover");
    });
    itemBtn.addEventListener("mouseleave", () => {
        itemBtn.classList.remove("hover");
        wrapper.style.display = "none";
    });
    wrapper.addEventListener("mouseover", () => {
        wrapper.style.display = "flex";
        itemBtn.classList.add("hover");
    });
    wrapper.addEventListener("mouseleave", () => {
        wrapper.style.display = "none";
        itemBtn.classList.remove("hover");
    });
});
