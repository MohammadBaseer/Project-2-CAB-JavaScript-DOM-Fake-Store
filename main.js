const getData = async () => {
  // spinner("block");
  const url = "https://8c1080f56e4f4a9a.mokky.dev/testing";

  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const apiData = data;
    console.log("apiData", apiData);
    controller(apiData);
    spinner("none");
  } catch (err) {
    // console.log(err);
    msg(err);
    spinner("none");
  }
};

// Controll
const controller = (apiData) => {
  displayResult(apiData);
  createDropdown(apiData);
  createCheckBoxes(apiData);
  addFilter(apiData);
};
// Spinner Design
const displayNotFoundItem = (display) => {
  const div = document.getElementById("notfounddiv");
  div.style.display = display;
};
// spinner function
const spinner = (display) => {
  const spinner = document.querySelector(".spinner-border");
  spinner.style.display = display; // Show the spinner
};
// Error Function when No Internet found
const msg = (err) => {
  // console.log("=====>>",err.message);
  document.querySelector(".msg").innerHTML = `<div id="notfounddiv" class="notfounddiv" style="display: block;">
  <img class="notfound" src="./img/1.gif">
  <h1>Err 404</h1>
  <h2>${err.message}</h2>
</div>`;
};

// Card Design
const displayResult = (apiData) => {
  // Paging
  // Not fount Check
  if (apiData.length === 0) {
    displayNotFoundItem("block");
  } else {
    displayNotFoundItem("none");
  }

  const resultDiv = document.getElementById("pBox");
  pBox.innerHTML = "";

  apiData.forEach((data) => {
    resultDiv.innerHTML += ` <div
              class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-inline-block border border-1 m-2">
              <img class="itemImg" src="${data.image}">
              <div class="box-iteam">
                  <p class="p-item-title pra">${data.title}</p>
                  <p class="p-item-Cat pra">${data.category}</p>
                  <p class="p-item-price pra">Price: ${data.price}</p>
                  <p class="p-item-sizes pra" id="${data.id}">Size: ${data.sizes}</p>
              </div>
              <button class="btn btn-secondary sub-btn mbutton" id="${data.id}">Details</button>
          </div>`;
  });
  // Add event listener to all the buttons
  const buttons = resultDiv.querySelectorAll(".mbutton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.id;
      const itemData = apiData.find((item) => {
        return item.id == itemId;
      });
      localStorage.setItem("data", JSON.stringify(itemData));
      window.location.href = "product-details.html";
    });
  });
};

// Create Dropdown
const createDropdown = (apiData) => {
  const selectDiv = document.querySelector("#byCat");
  selectDiv.innerText = "";
  const manualOpt = document.createElement("option");
  manualOpt.setAttribute("value", "all");
  manualOpt.innerText = "All Categories";
  selectDiv.appendChild(manualOpt);
  const option = [];
  apiData.forEach((data) => {
    if (!option.includes(data.category)) {
      const opt = document.createElement("option");
      opt.setAttribute("value", data.category);
      opt.innerText = data.category;
      selectDiv.appendChild(opt);

      option.push(data.category);
    }
  });
  // console.log(option);
};
//

// Creat Checkboxes
const createCheckBoxes = (apiData) => {
  const sizeDivSelect = document.querySelector("#sizes");
  sizeDivSelect.innerText = "";

  const head6 = document.createElement("h6");
  head6.innerText = "Sizes";
  sizeDivSelect.appendChild(head6);

  const checkBoxes = [];
  apiData.forEach((data) => {
    if (!checkBoxes.includes(data.sizes)) {
      if (data.sizes !== undefined) {
        const sizeInputCheckBox = document.createElement("input");
        sizeInputCheckBox.setAttribute("class", "form-check-input sizes");
        sizeInputCheckBox.setAttribute("type", "checkbox");
        sizeInputCheckBox.setAttribute("name", "flexRadioDefault");
        sizeInputCheckBox.setAttribute("id", data.sizes);
        sizeInputCheckBox.setAttribute("value", data.sizes);
        sizeDivSelect.appendChild(sizeInputCheckBox);

        const sizeLabel = document.createElement("label");
        sizeLabel.setAttribute("class", "form-check-label");
        sizeLabel.setAttribute("for", data.sizes);
        sizeLabel.innerText = data.sizes;
        sizeDivSelect.appendChild(sizeLabel);
      }

      checkBoxes.push(data.sizes);
    }
  });
  // console.log(checkBoxes);
};
// ================================ Filter My Search
const addFilter = (apiData) => {
  let searchInputValue = "";
  let dropDownValues = "all";
  let sizeValue = [];

  // Filter Section
  const filterData = () => {
    let filteredData = apiData;

    // console.log(sizeValue);
    if (searchInputValue) {
      filteredData = filteredData.filter((data) => data.title.toLowerCase().includes(searchInputValue));
    }
    if (dropDownValues !== "all") {
      filteredData = filteredData.filter((data) => data.category === dropDownValues);
    }
    if (sizeValue.length > 0) {
      filteredData = filteredData.filter((data) => sizeValue.includes(data.sizes));
    }
    displayResult(filteredData);
  };
  // End Filter Section here

  // Input Search EventListener
  const inputSearch = document.querySelector("#search");
  inputSearch.addEventListener("input", (e) => {
    // used trim() to remove whith spacing
    searchInputValue = inputSearch.value.trim().toLowerCase();
    filterData();
  });

  // Dropdown EventListener
  const selectDiv = document.querySelector("#byCat");
  selectDiv.addEventListener("change", (e) => {
    dropDownValues = e.target.value;
    filterData();
  });

  // Sizes EventListener
  const sizeSelection = document.querySelector("#sizes");
  sizeSelection.addEventListener("change", (event) => {
    const checkboxes = sizeSelection.querySelectorAll("input[type='checkbox']");
    sizeValue = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        sizeValue.push(checkbox.value);
      }
    });
    filterData();
  });
};

const sizesCollapse = () => {
  const sizesCollapse = document.getElementById("collBtn").addEventListener("click", (e) => {
    document.getElementById("collHide").classList.toggle("show");
  });
};
sizesCollapse();

getData();
