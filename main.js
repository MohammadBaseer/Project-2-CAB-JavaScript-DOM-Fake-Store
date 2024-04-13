function getApi(apiData) {
  var pBox = document.getElementById("pBox");
  pBox.innerHTML = "";

  const searchInput = document.getElementById("search").value.toLowerCase();

  const searchFilter = apiData.filter((api) => {
    const apiTitle = api.title.toLowerCase();
    return apiTitle.includes(searchInput);
  });

  searchFilter.forEach((api) => {
    // Card Div
    var pContainer = document.createElement("div");
    pContainer.classList.add(
      "col-10",
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "d-inline-block",
      "border",
      "border-1",
      "m-2"
    );
    pContainer.style.padding = "5px 20px";
    pBox.appendChild(pContainer);

    // Card Image
    var pImg = document.createElement("img");
    pImg.classList.add("itemImg");
    pImg.src = api.image;
    pContainer.appendChild(pImg);

    //  Card Title P Tag
    var pTitle = document.createElement("p");
    pTitle.classList.add("p-item-title", "pra");
    pTitle.innerText = api.title;
    pContainer.appendChild(pTitle);

    //  Card Category P Tag
    var pCat = document.createElement("p");
    pCat.classList.add("p-item-Cat", "pra");
    pCat.innerText = api.category;
    pContainer.appendChild(pCat);

    //  Card Price Tag
    var price = document.createElement("p");
    price.classList.add("p-item-price", "pra");
    price.innerText = "£" + api.price;
    pContainer.appendChild(price);

    // desc
    var desc = document.createElement("p");
    desc.classList.add("p-item-desc", "pra", "hide");
    desc.setAttribute("id", "description");
    desc.innerText = api.description;
    pContainer.appendChild(desc);

    //  Card Button Tag
    var btn = document.createElement("input");
    btn.style.padding = "10px";
    btn.setAttribute("type", "submit");
    btn.setAttribute("value", "Details");
    btn.classList.add("btn1");
    btn.innerText = api.category;
    pContainer.appendChild(btn);
  });

  console.log(searchFilter);
}

document.getElementById("search").addEventListener("input", function () {
  getApi(apikey);
});

getApi(apikey);

//

const description = document.querySelectorAll(".p-item-desc");
const checkbox = document.getElementById("myCheckbox");
checkbox.addEventListener("change", (event) => {
  const checkBoxInput = event.currentTarget.checked;

  description.forEach((desc) => {
    if (checkBoxInput === true) {
      desc.classList.remove("hide");
      // console.log("true");
    } else {
      desc.classList.add("hide");
      // console.log("false");
    }
  });
});
