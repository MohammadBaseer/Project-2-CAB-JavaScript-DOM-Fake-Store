//

function printCategoryToArray(api) {
  const catSelect = document.querySelector("#byCat");

  const uniqueByCategory = api.filter((value, index, array) => {
    return (
      array.findIndex((item) => item.category === value.category) === index
    );
  });

  uniqueByCategory.forEach((e) => {
    const opt = document.createElement("option");
    opt.setAttribute("value", e.category);
    opt.innerText = e.category;
    catSelect.appendChild(opt);
  });
}

printCategoryToArray(apikey);

//




function test(api) {
const selvalue = document.querySelector("#byCat");

// selvalue.addEventListener("change", (e)=>{

// const targetValue =e.target.value;
  // console.log(targetValue);

api.filter((arr,index,org)=>{
 const arr1 = arr.category;

//  return arr1 === targetValue;
 console.log(arr1 === index);
});



// });
// console.log(selvalue);

// api.forEach(el => {
  
// });





// return selvalue;
  
}
test(apikey);










// 

function getApi(apiData) {
  const pBox = document.getElementById("pBox");
  pBox.innerHTML = "";

  const searchInput = document.getElementById("search").value.toLowerCase();

  const searchFilter = apiData.filter((api) => {
    const apiTitle = api.title.toLowerCase();
    return apiTitle.includes(searchInput);
  });

// console.log(searchFilter);



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
    // pContainer.style.padding = "5px 20px";
    pBox.appendChild(pContainer);

    // Card Image
    var pImg = document.createElement("img");
    pImg.classList.add("itemImg");
    pImg.src = api.image;
    pContainer.appendChild(pImg);

    // Card div
    const boxItem = document.createElement("div");
    boxItem.setAttribute("class", "box-iteam");
    pContainer.appendChild(boxItem);

    //  Card Title P Tag
    var pTitle = document.createElement("p");
    pTitle.classList.add("p-item-title", "pra");
    pTitle.innerText = api.title;
    boxItem.appendChild(pTitle);

    //  Card Category P Tag
    var pCat = document.createElement("p");
    pCat.classList.add("p-item-Cat", "pra");
    pCat.innerText = api.category;
    boxItem.appendChild(pCat);

    //  Card Price Tag
    var price = document.createElement("p");
    price.classList.add("p-item-price", "pra");
    price.innerText = "£" + api.price;
    boxItem.appendChild(price);

    // desc
    var desc = document.createElement("p");
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
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-secondary sub-btn");
    btn.innerText = "Details";
    pContainer.appendChild(btn);
  });

  // console.log(searchFilter);
}

document.getElementById("search").addEventListener("input", function () {
  getApi(apikey);
});

getApi(apikey);

//Check Box

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
