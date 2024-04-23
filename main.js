// ---------------------------Fetch Data------------------------------
const getData = () => {
  const spinner = document.querySelector('.spinner-border');
  spinner.style.display = 'block'; // Show the spinner
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
      spinner.style.display = 'none'; // Hide the spinner once data is received
    })
    .catch((error) => {
      // console.error('There was a problem with the fetch operation:', error);
      console.log(error);
      spinner.style.display = 'none'; // Hide the spinner once data is received
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
//  reset input Function
function resetInput() {
  document.getElementById("search").value = "";
}
// 
function displayNotFoundItem(display) {
  const div = document.getElementById("notfounddiv");
  div.style.display = display;
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

    // sizes
    const sizes = document.createElement("p");
    sizes.classList.add("p-item-sizes", "pra");
    sizes.setAttribute("id", "description");
    sizes.innerText = api.sizes;
    boxItem.appendChild(sizes);

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
  manualOpt.innerText = "All Categories";
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

  //
  const inputValue = document.getElementById("search");
  const selectValue = document.querySelector("#byCat");
  //
  const head6 = document.createElement("h6");
  head6.innerText = "Sizes";
  sizeDivSelect.appendChild(head6);
  const allcheck = [];
  dataFromApi.forEach((checkData) => {
    if (!allcheck.includes(checkData.sizes)) {
      if (checkData.sizes !== undefined) {
        const sizeInputCheckBox = document.createElement("input");
        sizeInputCheckBox.setAttribute("class", "form-check-input sizes");

        sizeInputCheckBox.addEventListener("click", () =>
          //
          {
            //  Reset the Search Value
            resetInput();
            // //
            const filterValue = inputValue.value.trim().toLowerCase();
            const dropDownAllValues = selectValue.value;
            // //
            const checkBoxValues = sizeInputCheckBox.value;

            checkBoxFunction( dataFromApi, checkBoxValues, filterValue, dropDownAllValues );
          }
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

const checkBoxFunction = (
  dataFromApi,
  checkBoxValues,
  filterValue,
  dropDownAllValues
) => {
  const sizeCheckboxes = document.querySelectorAll(".sizes");
  const checkdata = [];
  sizeCheckboxes.forEach((e) => {
    if (e.checked) {
      checkdata.push(e.value);
    }
  });

  const filterArr = dataFromApi.filter((data) => {
    let result = false;

    if (data.category === dropDownAllValues || dropDownAllValues === "all") {
      checkdata.forEach((element) => {
        if (element === data.sizes) {
          result = true;
        }
      });
    }
    return result;
  });



console.log(" filter ==== > ", filterArr.length)
// to display msg

//  let iteam = false;
// if (!filterArr.length === 0 ) {
//  console.log("display msg ======> No Iteam ")
//  iteam = true;
// }

// return iteam;


   //
  if (filterArr.length === 0) {
    console.log("Data ==== >>> if -- 1");

    const dropValue = dataFromApi.filter((dData) => {
      let result = false;

      if (dData.category === dropDownAllValues) {
        result = true;
        console.log("Data ==== >>> if -- 2");
      }
      return result;
    });

    if (dropDownAllValues === "all") {
      resultDisplay(dataFromApi);
      console.log("Data ==== >>> if -- 3");

    } else {
      resultDisplay(dropValue);
      console.log("Data ==== >>> else -- 1", dropValue.length);
    }
  } else {
    resultDisplay(filterArr);
    console.log("Data ==== >>> else -- 2");
  }








 
};

// ---------Description Check Box Function---------------------
function checkBox() {
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
    //
    const filterValue = inputValue.value.trim().toLowerCase();
    //
    const selectedCategory = selectValue.value;
    // It about dropdown all vlaue
    const dropDownAllValues = selectValue.value;
    //
    dropdown(dataFromApi, selectedCategory, dropDownAllValues, filterValue);
    // END
  });

  checkBox();
}
//

//  ===========================Input Filter Function=========================
function filterItems(
  dataFromApi,
  filterValue,
  dropDownAllValues,
  checkBoxValues
) {
  const searchFilter = dataFromApi.filter((data, index) => {
    const title = data.title.toLowerCase();

    if (dropDownAllValues === data.category) {
      
      return title.includes(filterValue);
    } else if (dropDownAllValues === "all") {
      
      return title.includes(filterValue);
    }
  });

  if (searchFilter.length === 0) {
    displayNotFoundItem("block");
  }
  else{
    displayNotFoundItem("none");
  }

  resultDisplay(searchFilter);

  checkBox();
}

// ===========================END================

function dropdown(dataFromApi, selectedCategory, dropDownAllValues, filterValue ) {
  // console.log(filterValue);

  // Filter the data based on the selected category
  const searchFilter = dataFromApi.filter((data) => {
    return data.category === selectedCategory;
  });

  // Filter based on input value and dropdown selection
  const filteredData = searchFilter.filter((data) => {
    // Filter by input value
    const matchesFilterValue = data.title
      .toLowerCase()
      .includes(filterValue.toLowerCase());
    // Filter by dropdown selection
    const matchesDropdownValue =
      dropDownAllValues === "all" || data.category === dropDownAllValues;

    // Filter by checkboxes
    const checkboxes = document.querySelectorAll(".sizes");
    const matchesCheckboxes = Array.from(checkboxes).every((checkbox) => {
      return !checkbox.checked || data.sizes.includes(checkbox.value);
    });
    // console.log("chk value ============>", matchesCheckboxes);

    // Return true if both conditions match
    return matchesFilterValue && matchesDropdownValue && matchesCheckboxes;
  });

  // Log all data if dropdown value is "all"
  if (dropDownAllValues === "all") {
    console.log("All Data of Dropdown");
    resetInput();
    getData(); // Assuming getData() function retrieves all data
  } else {
    // console.log("Filtered Data:", filteredData); // Log filtered data
  }

  resultDisplay(filteredData); // Display filtered data
  // checkBox(); // Perform checkbox operations
}

// fetch function called back
getData();
// show and hide

const collBtn = document
  .getElementById("collBtn")
  .addEventListener("click", (e) => {
    document.getElementById("collHide").classList.toggle("show");
  });
