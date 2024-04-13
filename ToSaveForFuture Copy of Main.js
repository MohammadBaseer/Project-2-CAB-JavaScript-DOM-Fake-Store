// console.log("hello World", apikey);






// function myFunction() {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           li[i].style.display = "";
//       } else {
//           li[i].style.display = "none";
//       }
//   }
// }

// var testApi = apikey; 

// console.log(testApi);


// function myFunction() {
//   var input = document.getElementById("search").value;
//   filter = input.value.toUpperCase();
//   // ul = document.getElementById("myUL");
//   // li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }


  // var inputTarget = document.getElementById("search");

  // inputTarget.addEventListener("input", function () {
    //   var search = document.getElementById("search").value;

    //   if (getAPIFomJson[i].title === search) {
    //     console.log("True");
    //     return;
    //   } else {
    //     console.log("false");
    //     return;
    //   }
    // });





    // function getApi(getAPIFomJson) {
    //   var pBox = document.getElementById("pBox");
    //   pBox.innerHTML = ""; // Clear previous content
    
    //   for (let i = 0; i < getAPIFomJson.length; i++) {
    //     var pTitle = getAPIFomJson[i].title.toLowerCase(); // Convert title to lowercase for case-insensitive search
    
    //     // Check if search input matches item title
    //     if (pTitle.includes(searchInput.value.toLowerCase())) {
    //       var pContainer = document.createElement("div");
    //       // Add classes and styles to pContainer
    
    //       // Create elements and append them to pContainer
    
    //       pBox.appendChild(pContainer);
    //     }
    //   }
    // }
    
    // function filterItems() {
    //   getApi(apikey);
    // }
    





















function getApi(getAPIFomJson) {
  var pBox = document.getElementById("pBox"); //

  
//   var searchinputvalue = document.getElementById("search");
//   searchinputvalue.addEventListener("input", (e)=>{
// var cureentValofSearch = e.currentTarget.value ;

// console.log(e.currentTarget.value);

//   })



















 











  // const searchFilter = apikey.filter((api, index, orignalApi)=>{













  //   return api.category.includes("men's clothing");
  // });
  
  // console.log(searchFilter);
  
















 for (let i = 0; i < getAPIFomJson.length; i++) {



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

    //  Card Image
    var pImg = document.createElement("img");
    pImg.classList.add("itemImg");
    pImg.src = getAPIFomJson[i].image;
    pContainer.appendChild(pImg);

    //  Card Title P Tag
    var pTitle = document.createElement("p");
    pTitle.classList.add("p-item-title", "pra");
    pTitle.innerText = getAPIFomJson[i].title;
    pContainer.appendChild(pTitle);

    //  Card Category P Tag
    var pCat = document.createElement("p");
    pCat.classList.add("p-item-Cat", "pra");
    pCat.innerText = getAPIFomJson[i].category;
    pContainer.appendChild(pCat);

    //  Card Price Tag
    var price = document.createElement("p");
    price.classList.add("p-item-price", "pra");
    price.innerText = "£" + getAPIFomJson[i].price;
    pContainer.appendChild(price);

    // desc
    var desc = document.createElement("p");
    desc.classList.add("p-item-desc", "pra");
    desc.innerText = "£" + getAPIFomJson[i].description;
    pContainer.appendChild(desc);



    //  Card Button Tag
    var btn = document.createElement("input");
    btn.style.padding = "10px";
    btn.setAttribute("type", "submit");
    btn.setAttribute("value", "Details");
    btn.classList.add("btn1");
    btn.innerText = getAPIFomJson[i].category;
    pContainer.appendChild(btn);



  }



}

getApi(apikey);


const checkbox = document.getElementById('myCheckbox')
checkbox.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    alert('checked');
    var descP = document.getElementsByClassName("p-item-desc");
console.log(descP);

    descP.classList.add("p-item-desc-hide");

  } else {
    alert('not checked');

  }
})
