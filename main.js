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
  createCheckBoxes(dataFromApi);
  // Test

  // checkBoxFunction(dataFromApi);
  seachByTwoSectionEventListner(dataFromApi);
}

// ---------------------------Card Design------------------------------
//  Design Function
function resultDisplay(dataFromApi) {
  // console.log(dataFromApi);

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

// ---------------------------Dropdown Design ------------------------------
function createDropDown(dataFromApi) {
  const catSelect = document.querySelector("#byCat");
  catSelect.innerText = "";

  //  --------- One option out side ofLoop Created ---
  const manualOpt = document.createElement("option");
  manualOpt.setAttribute("value", "all");
  manualOpt.innerText = "Serach By All Category";
  catSelect.appendChild(manualOpt);

  if (dataFromApi) {
    const uniqueByCategory = dataFromApi.map((data) => {
      return data.category;
    });

    const uniqueCategoryArray = [...new Set(uniqueByCategory)];

    uniqueCategoryArray.forEach((e) => {
      const opt = document.createElement("option");
      opt.setAttribute("value", e);
      opt.innerText = e;
      catSelect.appendChild(opt);
    });
  }
}
// ---------------------------Sizes Check boxes Design ------------------------------
function createCheckBoxes(dataFromApi) {
  const sizeDivSelect = document.querySelector("#sizes");
  sizeDivSelect.innerText = "";

  const head6 = document.createElement("h6");
  head6.innerText = "Sizes: ";
  sizeDivSelect.appendChild(head6);
  const allcheck = [];
  dataFromApi.forEach((checkData) => {
    if (!allcheck.includes(checkData.sizes)) {
      if (checkData.sizes !== undefined) {
        const sizeInputCheckBox = document.createElement("input");
        sizeInputCheckBox.setAttribute("class", "form-check-input sizes");
        // sizeInputCheckBox.setAttribute("onclick", "checkBoxFunction()");
        sizeInputCheckBox.addEventListener("click", () =>
          checkBoxFunction(dataFromApi)
        );
        sizeInputCheckBox.setAttribute("type", "checkbox");
        sizeInputCheckBox.setAttribute("name", "flexRadioDefault");
        sizeInputCheckBox.setAttribute("value", checkData.sizes);
        sizeDivSelect.appendChild(sizeInputCheckBox);

        const sizeLabel = document.createElement("label");
        sizeLabel.setAttribute("class", "form-check-label");
        sizeLabel.setAttribute("for", checkData.sizes);
        sizeLabel.innerText = checkData.sizes;
        sizeDivSelect.appendChild(sizeLabel);
      }
      allcheck.push(checkData.sizes);
    }
  });
}
// ---------------checkbox filter

const checkBoxFunction = (dataFromApi) => {
  const sizeCheckboxes = document.querySelectorAll(".sizes");
  const checkdata = [];
  sizeCheckboxes.forEach((e) => {
    if (e.checked) {
      checkdata.push(e.value);
    }
  });
  // console.log(checkdata);

  // console.log("Chck Bx   ", dataFromApi);

  const filterArr = dataFromApi.filter((data) => {
    let result = false;
    checkdata.forEach((element) => {
      if (element === data.sizes) {
        result = true;
      }
    });
    return result;
  });

  if (filterArr.length <= 0) {
    console.log("no Data");
    resultDisplay(dataFromApi);
  } else {
    resultDisplay(filterArr);
  }
  // console.log(filterArr);
};

// ---------Description Check Box Function---------------------
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

// ---------------------------EventListeners Section------------------------------
function seachByTwoSectionEventListner(dataFromApi) {
  const inputValue = document.getElementById("search");
  const selectValue = document.querySelector("#byCat");
  // const sizeValue = document.querySelector(".sizes");

  // =============================Input EventListener
  inputValue.addEventListener("input", () => {
    const filterValue = inputValue.value.trim().toLowerCase();
    const dropDownAllValues = selectValue.value;
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
  //  =================== Sizes Check Boxes EventListener ====================

  // const sizeCheckboxes = document.querySelectorAll(".sizes");

  // // Add event listener to each checkbox
  // sizeCheckboxes.forEach(checkbox => {
  //     checkbox.addEventListener("change", () => {
  //         const selectedSizes = Array.from(sizeCheckboxes)
  //             .filter(checkbox => checkbox.checked)
  //             .map(checkbox => checkbox.value);

  //         // console.log(selectedSizes);
  //         // dropdown(dataFromApi, selectedCategory, dropDownAllValues, selectedSizes);
  //         filterSize(dataFromApi, selectedSizes);
  //     });
  // });

  //
  checkBox();
}
//
// --------------------------------test

// function filterSize(dataFromApi, selectedSizes) {

//   const sizes = dataFromApi.filter((data) => {
//     console.log(data)
//     return data.sizes === selectedSizes;
//   });

//   console.log(sizes);
// }

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

const collBtn = document
  .getElementById("collBtn")
  .addEventListener("click", (e) => {
    document.getElementById("collHide").classList.toggle("show");
  });
