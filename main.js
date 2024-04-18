// ---------------------------Fetch Data------------------------------
const getData = () => {
  // https://api.escuelajs.co/api/v1/products
  // https://8c1080f56e4f4a9a.mokky.dev/products
  // https://fakestoreapi.com/products
  const url = "https://8c1080f56e4f4a9a.mokky.dev/testing";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const dataFromApi = data;
      // console.log(dataFromApi);
      controller(dataFromApi);
    })
    .catch((error) => {
      // console.error('There was a problem with the fetch operation:', error);
      console.log(error);
    });
};

// ---------------------------Functions Controller------------------------------

function controller(dataFromApi) {
  resultDisplay(dataFromApi);
  // model(dataFromApi);
  createDropDown(dataFromApi);
  seachByTwoSectionEventListner(dataFromApi);
}

// ---------------------------Card Design------------------------------
//  Design Function
function resultDisplay(dataFromApi) {
  const pBox = document.getElementById("pBox");
  pBox.innerHTML = "";

  // if (dataFromApi) {

  dataFromApi.forEach((api, _i) => {
    // Card Div
    const pContainer = document.createElement("div");
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
    pBox.appendChild(pContainer);

    // Card Image
    const pImg = document.createElement("img");
    pImg.classList.add("itemImg");
    pImg.src = api.image;
    pContainer.appendChild(pImg);

    // Card div
    const boxItem = document.createElement("div");
    boxItem.setAttribute("class", "box-iteam");
    pContainer.appendChild(boxItem);

    //  Card Title P Tag
    const pTitle = document.createElement("p");
    pTitle.classList.add("p-item-title", "pra");
    pTitle.innerText = api.title;
    boxItem.appendChild(pTitle);

    //  Card Category P Tag
    const pCat = document.createElement("p");
    pCat.classList.add("p-item-Cat", "pra");
    pCat.innerText = api.category;
    boxItem.appendChild(pCat);

    //  Card Price Tag
    const price = document.createElement("p");
    price.classList.add("p-item-price", "pra");
    price.innerText = "£" + api.price;
    boxItem.appendChild(price);

    // desc
    const desc = document.createElement("p");
    desc.classList.add("p-item-desc", "pra", "hide");
    desc.setAttribute("id", "description");
    desc.innerText = api.description;
    boxItem.appendChild(desc);

    //  Span Tag
    const spn = document.createElement("span");
    spn.innerText = "Details: ";
    const firstChild = desc.firstChild;
    desc.insertBefore(spn, firstChild);

    //  Card Button Tag
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-secondary sub-btn mbutton");
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("id", api.id);
    btn.setAttribute("data-bs-target", "#myModal");
    btn.innerText = "Details";
    pContainer.appendChild(btn);
  });
}

// }

// ---------------------------Model Design------------------------------
//  Model

//     function model(dataFromApi) {

//       const modelBody = document.getElementById("modelBody");

// const org = document.getElementById()

//       dataFromApi.filter((arr, index, org)=>{

//         console.log(arr.videos[0].id === org);

// })

//       dataFromApi.forEach((api,)=>{

//  // Card Div
//  var modelContaint = document.createElement("div");
//  modelContaint.classList.add(
//    "col-10",
//    "col-sm-6",
//    "col-md-4",
//    "col-lg-3",
//    "col-xl-2",
//    "d-inline-block",
//    "border",
//    "border-1",
//    "m-2"
//  );
//  // modelContaint.style.padding = "5px 20px";
//  modelBody.appendChild(modelContaint);

//  // Card Image
//  const mpImg = document.createElement("img");
//  mpImg.classList.add("itemImg");
//  mpImg.src = api.category.image;
//  modelContaint.appendChild(mpImg);

//  // Card div
//  const mboxItem = document.createElement("div");
//  mboxItem.setAttribute("class", "box-iteam");
//  modelContaint.appendChild(mboxItem);

//  //  Card Title P Tag
//  const mpTitle = document.createElement("p");
//  mpTitle.classList.add("p-item-title", "pra");
//  mpTitle.innerText = api.title;
//  mboxItem.appendChild(mpTitle);

//  //  Card Category P Tag
//  const mpCat = document.createElement("p");
//  mpCat.classList.add("p-item-Cat", "pra");
//  mpCat.innerText = api.category;
//  mboxItem.appendChild(mpCat);

//  //  Card Price Tag
//  const mprice = document.createElement("p");
//  mprice.classList.add("p-item-price", "pra");
//  mprice.innerText = "£" + api.price;
//  mboxItem.appendChild(mprice);

//  // desc
//  const mdesc = document.createElement("p");
//  mdesc.classList.add("p-item-desc", "pra", "hide");
//  mdesc.setAttribute("id", "description");
//  mdesc.innerText = api.description;
//  mboxItem.appendChild(mdesc);

//  //  Span Tag
//  const mspn = document.createElement("span");
//  mspn.innerText = "Details: ";
//  const mfirstChild = mdesc.firstChild;
//  mdesc.insertBefore(mspn, mfirstChild);
//  //  Card Button Tag
//  const mbtn = document.createElement("button");
//  mbtn.setAttribute("class", "btn btn-secondary sub-btn");
//  mbtn.setAttribute("id", api.videos[0].id);
//  mbtn.innerText = "Details";
//  modelContaint.appendChild(mbtn);

//   });

//     }

//

// ---------------------------Dropdown Design ------------------------------
function createDropDown(dataFromApi) {
  const catSelect = document.querySelector("#byCat");

  if (dataFromApi) {
    const uniqueByCategory = dataFromApi.map((data) => {
      return data.category;
    });

    const uniqueCompetitionsArray = [...new Set(uniqueByCategory)];

    uniqueCompetitionsArray.forEach((e) => {
      const opt = document.createElement("option");
      opt.setAttribute("value", e);
      opt.innerText = e;
      catSelect.appendChild(opt);
    });
  }
}
// ---------------------------Check Box Function------------------------------
function checkBox() {
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

  //  Turen of checkboxes during filter
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
}
//

// ---------------------------Filter Section------------------------------
function seachByTwoSectionEventListner(dataFromApi) {
  const inputValue = document.getElementById("search");
  const selectValue = document.querySelector("#byCat");
  // checkbox value filder
  // const checkBoxValue = document.getElementById("myCheckbox").checked;

  // console.log(checkBoxValue);

  // =============================Input EventListener
  inputValue.addEventListener("input", () => {
    const filterValue = inputValue.value.trim().toLowerCase();
    const dropDownAllValues = selectValue.value;

    // console.log("Input Section >> " + dropDownAllValues);

    filterItems(dataFromApi, filterValue, dropDownAllValues);
  });
  // =====================================Drop Down EventListener=============
  selectValue.addEventListener("change", (e) => {
    const selectedCategory = selectValue.value;
    // It about dropdown all vlaue
    const dropDownAllValues = selectValue.value;
    //
    dropdown(dataFromApi, selectedCategory, dropDownAllValues);
    // END
  });

  checkBox();
}

//  ===========================Input Filter Function=========================
function filterItems(dataFromApi, filterValue, dropDownAllValues) {
  const searchFilter = dataFromApi.filter((data, index) => {
    const title = data.title.toLowerCase();

    if (dropDownAllValues === data.category) {
      // console.log(index);
      return title.includes(filterValue);
    } else if (dropDownAllValues === "all") {
      return title.includes(filterValue);
    }
  });
  resultDisplay(searchFilter);

  // console.log(checkBoxValue);

  checkBox();
}

// ===========================END================

function dropdown(dataFromApi, selectedCategory, dropDownAllValues) {
  const searchFilter = dataFromApi.filter((data) => {
    return data.category === selectedCategory;
  });

  const data = dropDownAllValues;
  if (data === "all") {
    console.log("All Data of Dropdown");
    getData();
  } else {
    ("false");
  }

  resultDisplay(searchFilter);
  checkBox();
}

// fetch function called back
getData();


// show and hide 

const collBtn = document.getElementById("collBtn").addEventListener("click", (e) =>{
  document.getElementById("collHide").classList.toggle("show");

} )
