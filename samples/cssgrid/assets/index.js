const switchClass = () => {
    const container = document.getElementById("container");
    if (container.className === "container") {
        container.className = "container-areas";
    } else {
        container.className = "container";
    }
}

const setupPage = () => {
    document.getElementById("switchClass").addEventListener("click", switchClass);
}

if (document.readyState != 'loading') {
    setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}