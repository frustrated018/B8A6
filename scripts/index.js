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
        <a onclick = "handleLoadNews('${tabName.category_id}')" class="tab">${tabName.category}</a>
        `;
    tabContainer.appendChild(div);
  });

  // console.log(data.data);
};
// fetching different catagory contents
const handleLoadNews = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    console.log(data);
};

handleCatagory();
