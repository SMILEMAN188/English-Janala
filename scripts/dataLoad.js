function loadAllLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
}

function displayLevels(data) {
    
    
    const levelContainer = document.getElementById("level-container");
    
    

    for (const level of data) {
        const Div = document.createElement("div");
        Div.innerHTML = `
        <button class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</button>
        `
        levelContainer.append(Div);
    }
}

function loadWords() {
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then((res) => res.json())
    .then((data) => displayWords(data.data))
}

function displayWords(data) {
    
    const wordContainer = document.getElementById("word-container");
    
    data.forEach(word => {
        const container = document.createElement("div");
        container.innerHTML = `
        
        <div class="flex flex-col items-center justify-center bg-white rounded-lg p-10 ">
            <p class="text-3xl font-bold pb-6">${word.word}</p>
            <p class="font-medium text-xl pb-6">Meaning /Pronounciation</p>
            <p class="text-[#18181B] text-3xl font-semibold whitespace-pre-line text-center">"${word.meaning} /${word.pronunciation}"</p>
                                                                            
            <section class=" flex flex-row items-center justify-between mt-15 w-full px-10">
            
                <button class="btn bg-[#1a91ff1a] shadow-md hover:bg-white p-4 " onclick="openModal(${JSON.stringify(word)})">
                    <i class="fa-solid fa-circle-info"></i>
                </button>

                <button class="btn bg-[#1a91ff1a] shadow-md hover:bg-white p-4 ">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </section>
        </div>
        `
        wordContainer.append(container);
    });
}

function openModal(word) {
    const modal = document.getElementById("my_modal_1");

        modal.innerHTML = `
        <div class="modal-box ">
            <section class="p-6 gap-6 rounded-lg border border-[#EDF7FF] inset-shadow-sm">
                <p class="font-semibold text-4xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</p>
                <p class="font-semibold text-2xl">Meaning</p>
                <p class="hind-siliguri-light font-medium text-2xl"></p>
                <p class="font-semibold text-2xl">Example</p>
                <p class="font-normal text-2xl"></p>
                <p class="hind-siliguri-light font-medium text-2xl">সমার্থক শব্দ গুলো</p>
            </section>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn p-4 hind-siliguri-light rounded-lg font-medium text-xl bg-[#422AD5] text-[#FFFFFF]">Complete Learning</button>
                </form>
            </div>
        </div>
        
        `;
        modal.showModal();
    }

loadAllLevels();
loadWords();