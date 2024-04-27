const productDetailData =()=>{
      window.onload = () => {
  const data = JSON.parse(localStorage.getItem('data')); // Retrieve the item data
  // console.log(data); 
  displayProductDetail(data)
};
}

const displayProductDetail = (data)=>{

  console.log("other function ====>>>", data); 

const displayDetailDiv = document.querySelector(".detailDisplayData");
displayDetailDiv.innerHTML =`<div class="row containt col-8" style="border: solid; margin: auto; margin-top: 55px;">
<span class="back"><a href="#" onclick="history.back()">Back</a></span>

<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 pimgsdiv" >
    <img class="pimgs rounded" src="${data.image}" alt="" >
</div>
<div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 containtdiv ">
    <div class="col-12 p-2">
        <h3 class="m-2">${data.title}</h3>
        <p class="p-item-Cat pra">${data.category}</p>
    </div>
    <div class="col-12 p-2">
        <h6 class="headcolor">Descraptions</h6>
        <p>${data.description}</p>
    </div>
    <div class="row p-2">
        <div class="col-lg-6">
            <h6 class="headcolor">Price</h6>
            <h5>${data.price}</h5>
        </div>
        <div class="col-lg-6" >
            <h6 class="headcolor">Size</h6>
            <h5>${data.sizes}</h5>
        </div>
    </div>
</div>
</div>`;

}

productDetailData();


document.querySelector(".mrBtn").addEventListener("click", ()=>{
    document.querySelector('.collapse').classList.toggle('show');
})