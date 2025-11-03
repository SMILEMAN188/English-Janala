function loadAllLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
}

function displayLevels(data) {
    
    console.log(data);
    const levelContainer = document.getElementById("level-container");
    
    

    for (const level of data) {
        const Div = document.createElement("div");
        Div.innerHTML = `
        <button class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</button>
        `
        levelContainer.append(Div);
    }
}



loadAllLevels();

