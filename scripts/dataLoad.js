function loadAllLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevels(data.data));
}

function displayLevels(data) {
    const levelContainer = document.getElementById("level-container");
    for (let level of data) {
        
        const Div = document.createElement("div");
        Div.innerHTML = `
        <button onclick="loadCatagoryWords(${level.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}</button>
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
    wordContainer.innerHTML = "";
    if (data.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center text-center gap-5 my-10">
                <div>
                    <img src="assets/alert-error.png" alt="">
                </div>
                <div>
                    <p class="hind-siliguri-light font-normal text-xs pb-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="hind-siliguri-light font-medium text-4xl">নেক্সট Lesson এ যান</p>
                </div>
            </div>
        `;
        return;
    }
    data.forEach(word => {
        
        const container = document.createElement("div");
        container.innerHTML = `
        <div class="flex flex-col items-center justify-center bg-white rounded-lg p-10 ">
            <p class="text-3xl font-bold pb-6">${word.word}</p>
            <p class="font-medium text-xl pb-6">Meaning /Pronounciation</p>
            <p class="text-[#18181B] text-3xl font-semibold whitespace-pre-line text-center">"${word.meaning} /${word.pronunciation}"</p>
                                                                            
            <section class=" flex flex-row items-center justify-between mt-15 w-full px-10">
            
                <button class="btn bg-[#1a91ff1a] shadow-md hover:bg-white p-4 " onclick="my_modal_1.showModal()">
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

const loadCatagoryWords = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayWords(data.data));
    
}




loadAllLevels();
// loadWords();