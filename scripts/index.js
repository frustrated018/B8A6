let idName = "1000";

const handleCatagory = async () => {
  const tabContainer = document.getElementById("tab-container");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  data.data.forEach((tabName) => {
    const div = document.createElement("div");
    div.classList = `mt-[32px]`;
    div.innerHTML = `
        <button onclick = "handleLoadVideo('${tabName?.category_id}'); handleColorChange(event)" class="tab unclicked bg-opacity-20 rounded  text-opacity-70 text-base font-medium">${tabName?.category}</button>
        `;
    tabContainer.appendChild(div);
  });
  const tabButtons = document.querySelectorAll(".tab");
  tabButtons[0].classList.remove("unclicked");
  tabButtons[0].classList.add("clicked");
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
      const postedText = postedDate ? `${formatPostedDate(postedDate)}` : "";

      // Creating new cards
      const newDiv = document.createElement("div");
      newDiv.classList = `card rounded-2xl  bg-base-100 shadow-xl h-[300px]`; // the class of the created list
      const postedItem = postedText
        ? `<div class="absolute bottom-2 right-2 bg-neutral-900 rounded px-[5px] py-1 text-white text-[10px] font-normal">${postedText}</div>`
        : "";
      newDiv.innerHTML = `
      <figure class=" h-[200px] relative bg-cover">
      <img src="${
        video?.thumbnail
      }" class="relative w-full h-full object-cover">
      <!-- Posted date in hours and minutes or empty string -->
      ${postedItem}
    </figure>
      <!-- text content -->
      <div class="flex flex-col flex-1 p-6 gap-[10px]">
          <!-- Profile photo and title -->
          <div class="flex flex-row gap-2 items-center">
              <div class="avatar">
                  <div class="w-12 rounded-full">
                      <img src="${video?.authors[0]?.profile_picture}">
                  </div>
              </div>
              <h3 class="text-base text-neutral-900 font-bold">${
                video?.title
              }</h3>
          </div>
          <!-- Creator name and blue check & view count -->
          <div class="flex flex-row gap-[9px]">
              <div class="text-neutral-900 text-opacity-70 text-sm font-normal pl-12">${
                video?.authors[0]?.profile_name
              }</div>
                  <span>${
                    video?.authors[0]?.verified
                      ? '<img src="./assets/fi_10629607.svg">'
                      : ""
                  }</span>
              </div>
          <!-- View count -->
          <div class="text-neutral-900 text-opacity-70 text-sm font-normal pl-12">${
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
      const postedDate = video.others.posted_date;
      const postedText = postedDate ? `${formatPostedDate(postedDate)}` : "";

      // Creating new cards
      const newDiv = document.createElement("div");
      newDiv.classList = `card rounded-2xl  bg-base-100 shadow-xl h-[300px]`; // the class of the created list
      const postedItem = postedText
        ? `<div class="absolute bottom-2 right-2 bg-neutral-900 rounded px-[5px] py-1 text-white text-[10px] font-normal">${postedText}</div>`
        : "";
      newDiv.innerHTML = `
      <figure class=" h-[200px] relative bg-cover">
      <img src="${
        video?.thumbnail
      }" class="relative w-full h-full object-cover">
      <!-- Posted date in hours and minutes or empty string -->
      ${postedItem}
    </figure>
      <!-- text content -->
      <div class="flex flex-col flex-1 p-6 gap-[10px]">
          <!-- Profile photo and title -->
          <div class="flex flex-row gap-2 items-center">
              <div class="avatar">
                  <div class="w-12 rounded-full">
                      <img src="${video?.authors[0]?.profile_picture}">
                  </div>
              </div>
              <h3 class="text-base text-neutral-900 font-bold">${
                video?.title
              }</h3>
          </div>
          <!-- Creator name and blue check & view count -->
          <div class="flex flex-row gap-[9px]">
              <div class="text-neutral-900 text-opacity-70 text-sm font-normal pl-12">${
                video?.authors[0]?.profile_name
              }</div>
                  <span>${
                    video?.authors[0]?.verified
                      ? '<img src="./assets/fi_10629607.svg">'
                      : ""
                  }</span>
              </div>
          <!-- View count -->
          <div class="text-neutral-900 text-opacity-70 text-sm font-normal pl-12">${
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
  return `${hours} hrs ${minutes} min ago`;
}

const handleColorChange = (event) => {
  const tabButtons = document.querySelectorAll(".tab");
  tabButtons.forEach((button) => {
    button.classList.remove("clicked");
    button.classList.add("unclicked");
  });

  event.target.classList.remove("unclicked");
  event.target.classList.add("clicked");
};

const blogBtn = document.getElementById("btn-blog");
blogBtn.addEventListener("click", function () {
  window.open("blog.html", "_blank");
});

handleCatagory();
handleLoadVideo("1000");


// Made assignment 6 public