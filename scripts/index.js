const handleCatagory = async () => {
  const tabContainer = document.getElementById("tab-container");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const apiData = data.data;
  apiData.forEach((tabName) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick = "handleLoadVideo('${tabName?.category_id}')" class="tab">${tabName?.category}</a>
        `;
    tabContainer.appendChild(div);
  });

  // console.log(data.data);
};
// fetching different catagory contents
const handleLoadVideo = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = ""; //Clearing the innerHTML before loading new data.
  
  if (data.data.length === 0) {
    const newDiv = document.createElement("div");
    newDiv.classList = `flex flex-col items-center justify-center lg:col-span-4`
    newDiv.innerHTML = `
    <img class=" mt-44 mb-8" src="./assets/Icon.png">
    <div class="text-center text-neutral-900 text-[32px] font-bold leading-[44px]">Oops!! Sorry, There is no content here.</div>
    `;
    cardsContainer.appendChild(newDiv);
  } 
  else {
    // console.log("Array length not 0");
    data.data.forEach((video) => {
      const newDiv = document.createElement("div");
      newDiv.classList = `card bg-base-100 shadow-xl flex flex-col h-[400px]`; // the class of the created list
      newDiv.innerHTML = `
    <figure class="flex-1"><img src="${video?.thumbnail}"></figure>
    <div class="card-body flex-1">
        <!-- Profile photo and title -->
        <div class="flex flex-row gap-2 items-center">
            <div class="avatar">
                <div class="w-10 rounded-full">
                    <img src="${video?.authors[0]?.profile_picture}">
                </div>
            </div>
            <h3 class="text-base text-neutral-900 font-bold leading-relaxed">${
              video?.title
            }</h3>
        </div>
        <!-- Creator name and blue check -->
        <div class="flex flex-row gap-2">
            <div class="text-neutral-900 text-opacity-70 text-sm font-normal">${
              video?.authors[0]?.profile_name
            }</div>
                <span>${
                  video?.authors[0]?.verified
                    ? '<img src="./assets/fi_10629607.svg">'
                    : ""
                }</span>
            </div>
        <!-- View count -->
        <div class="text-neutral-900 text-opacity-70 text-sm font-normal">${
          video?.others?.views
        } views</div>
    </div>
`;
      cardsContainer.appendChild(newDiv);
    });
  }
};

handleCatagory();
handleLoadVideo("1000");
