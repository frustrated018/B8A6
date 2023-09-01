let idName = "1000";

const handleCatagory = async () => {
  const tabContainer = document.getElementById("tab-container");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  data.data.forEach((tabName) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick = "handleLoadVideo('${tabName?.category_id}')" class="tab">${tabName?.category}</a>
        `;
    tabContainer.appendChild(div);
  });

};
// fetching different catagory contents
const handleLoadVideo = async (id) => { 
  idName = id;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = ""; //Clearing the innerHTML before loading new data.

  if (data.data.length === 0) {
    const newDiv = document.createElement("div");
    newDiv.classList = `flex flex-col items-center justify-center lg:col-span-4`;
    newDiv.innerHTML = `
    <img class=" mt-44 mb-8" src="./assets/Icon.png">
    <div class="text-center text-neutral-900 text-[32px] font-bold leading-[44px]">Oops!! Sorry, There is no content here.</div>
    `;
    cardsContainer.appendChild(newDiv);
  } else {
    data.data.forEach((video) => {
      const postedDate = video.others.posted_date;
      const postedText = postedDate
        ? `${formatPostedDate(postedDate)}`
        : '';

      // Creating new cards
      const newDiv = document.createElement("div");
      newDiv.classList = `card bg-base-100 shadow-xl flex flex-col h-[400px]`; // the class of the created list
      newDiv.innerHTML = `
      <figure class="flex-1 relative">
      <img src="${video?.thumbnail}" class="relative">
      <!-- Posted date in hours and minutes or empty string -->
      <div class="absolute bottom-2 right-2 bg-neutral-900 rounded px-[5px] py-1 text-white text-[10px] font-normal">
        ${postedText}
      </div>
    </figure>
  
      </div>
      <!-- text content -->
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
// Sorting function
const handleSortByView = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${idName}`
  );
  const data = await response.json();

  data.data.sort((a, b) => {
    const viewsA = parseFloat(a.others.views);
    const viewsB = parseFloat(b.others.views);
    return viewsB - viewsA;
  });

  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = ""; //Clearing the innerHTML before loading new data.

  if (data.data.length === 0) {
    const newDiv = document.createElement("div");
    newDiv.classList = `flex flex-col items-center justify-center lg:col-span-4`;
    newDiv.innerHTML = `
    <img class=" mt-44 mb-8" src="./assets/Icon.png">
    <div class="text-center text-neutral-900 text-[32px] font-bold leading-[44px]">Oops!! Sorry, There is no content here.</div>
    `;
    cardsContainer.appendChild(newDiv);
  } else {
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
// Date formatting function
function formatPostedDate(postedDate) {
  if (!postedDate) return ""; 
  const date = new Date(postedDate * 1000); 
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours}h ${minutes}m ago`;
}


handleCatagory();
handleLoadVideo("1000");
