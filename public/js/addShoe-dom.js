let addBrand = document.querySelector('.add-brands');
let addColour = document.querySelector('.add-colours');
let addSize = document.querySelector('.add-sizes');
let addPrice = document.querySelector('.add-price');
let addQuantity = document.querySelector('.add-quantity');
let shoeMessage = document.querySelector('.shoeMessage');
let addBtn = document.querySelector('.add-btn');

let shoesStorage = localStorage.getItem('storeShoes') ? JSON.parse(localStorage.getItem('storeShoes')) : [];
let cartStorage = localStorage.getItem('storeCart') ? JSON.parse(localStorage.getItem('storeCart')) : [];
let getShoesData = ShoeFinder(shoesStorage, cartStorage);

function addShoe () {
    let newColor = addColour.value;
    let newBrand = addBrand.value;
    let newSize = parseInt(addSize.value);
    let newPrice = parseInt(addPrice.value);
    let newStock = parseInt(addQuantity.value);

    if (newColor !== '' && newBrand !== '' && newSize !== '' && newPrice !== '' && newStock !== '') {
        getShoesData.addStock(newColor, newBrand, newSize, newPrice, newStock);
        localStorage.setItem('storeShoes', JSON.stringify(getShoesData.returnAllShoes()));
        shoeMessage.innerHTML = 'Shoe Has Been Added';   
    } else {
        shoeMessage.innerHTML = 'Please Fill All The Sections Required';
    }
}

addBtn.addEventListener('click', function () {
    addShoe();
});
