const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
}

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
        <button id="btn-${level.level_no}" onclick="loadCatagoryWords(${level.level_no})" class="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg"> <i class="fa-solid fa-book-open"></i> <span>Lesson -</span>${level.level_no}</button>
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
    const modal = document.getElementById("my_modal_1");
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
            
                <button onclick="loadWordDetails('${word.id}')" class="btn bg-[#1a91ff1a] shadow-md hover:bg-white p-4 ">
                    <i class="fa-solid fa-circle-info"></i>
                </button>

                <button class="btn bg-[#1a91ff1a] shadow-md hover:bg-white p-4 ">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </section>
        </div>
        `
        wordContainer.append(container);
        
    hideLoader();
    });
}

const loadCatagoryWords = (id) => {
    showLoader();
    removeActiveClass();
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        displayWords(data.data)
    });

}

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => { displayWordDetails(data.data);

    });
};


const displayWordDetails = (data) => {
  document.getElementById("word_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `

    <div class="p-6 pr-20 rounded-lg border border-[#5387c2] inset-shadow-sm">
        <p class="font-semibold text-4xl pb-8 whitespace-nowrap">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})</p>
        <p class="font-semibold text-2xl pb-2.5">Meaning</p>
        <p class="hind-siliguri-light font-medium text-2xl pb-8">${data.meaning}</p>
        <p class="font-semibold text-2xl pb-2">Example</p>
        <p class="font-normal text-2xl pb-8 ">${data.sentence}</p>
        <p class="hind-siliguri-light font-medium text-2xl pb-4">সমার্থক শব্দ গুলো</p>
        <div id="synonym" class="flex flex-row gap-2"></div>
    </div>

  `;

  const synonymBox = document.getElementById("synonym");

  data.synonyms.forEach( synonyms => {
        
        const container = document.createElement("div");

        container.innerHTML = `
        <p class="px-5 py-1.5 bg-[#D7E4EF] text-xl rounded-lg whitespace-pre-line">${synonyms}</p>
        `
        synonymBox.appendChild(container);    
    });
    
};

loadAllLevels();

