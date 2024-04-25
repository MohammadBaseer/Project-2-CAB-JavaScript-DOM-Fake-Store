const getdata = async () => {
  spinner("block");
  const url = "https://8c1080f56e4f4a9a.mokky.dev/testing";

  try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const apiData = data;
      controller(apiData);
      spinner("none");
  } catch (err) {
      console.log(err);
      spinner("none");
  }
};

// Controll
const controller = (apiData)=>{
  diplayResult(apiData);
  createDropdown(apiData);
  createCheckBoxes(apiData);
  addFilter(apiData);
}
// Spinner Design
function displayNotFoundItem(display) {
  const div = document.getElementById("notfounddiv");
  div.style.display = display;
}
// spinner function
function spinner(display) {
   const spinner = document.querySelector('.spinner-border');
spinner.style.display = display;; // Show the spinner
}

// Card Design 
const diplayResult = (apiData)=>{


// Not fount Check
if (apiData.length === 0) {
  displayNotFoundItem("block");
}else{
  displayNotFoundItem("none");
}

  const resultDiv = document.getElementById("pBox");
pBox.innerHTML = "";

      apiData.forEach(data => {
          
              resultDiv.innerHTML += ` <div
              class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-inline-block border border-1 m-2">
              <img class="itemImg" src="${data.image}">
              <div class="box-iteam">
                  <p class="p-item-title pra">${data.title}</p>
                  <p class="p-item-Cat pra">${data.category}</p>
                  <p class="p-item-price pra">${data.price}</p>
                  <p class="p-item-sizes pra" id="${data.id}">${data.sizes}</p>
              </div>
              <button class="btn btn-secondary sub-btn mbutton" id="${data.id}">Details</button>
          </div>`;
      
 


 // Add event listener to the button
 const button = resultDiv.querySelector(".mbutton");
 button.addEventListener('click', () => {
   console.log(data); // Log the item data
 });


 });

}

// const passDataToOtherPage = ()=>{

//       // Add event listener to the button
//   const btn = document.querySelector('.mbutton');
  
//   btn.addEventListener('click', (e) => {
//     // Save item data to localStorage
//     console.log("data from Button");
//     // localStorage.setItem('itemData', JSON.stringify(data));

//     // Redirect to view.html
//     // window.location.href = 'view.html';
//   });
// }  

// passDataToOtherPage();



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
  console.log(option); 
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
console.log(checkBoxes);
};

const addFilter = (apiData) => {
  let searchInputValue = '';
  let dropDownValues = 'all';
  let sizeValue = [];

  const filterData = () => {
      let filteredData = apiData;

              // console.log(sizeValue);

      if (searchInputValue) {
          filteredData = filteredData.filter(data => data.title.toLowerCase().includes(searchInputValue));
      }
      if (dropDownValues !== 'all') {
          filteredData = filteredData.filter(data => data.category === dropDownValues); 
      }
      if (sizeValue.length > 0) {
          filteredData = filteredData.filter(data => sizeValue.includes(data.sizes));  
      }
      diplayResult(filteredData);
  };

  // Input Search EventListener
  const inputSearch = document.querySelector("#search");
  inputSearch.addEventListener('input', (e) => {
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

const sizesCollapse = ()=>{
  const sizesCollapse = document
  .getElementById("collBtn")
  .addEventListener("click", (e) => {
    document.getElementById("collHide").classList.toggle("show");
  });
}
sizesCollapse();

getdata();