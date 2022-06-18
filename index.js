const headerColorChanger = () => {
    const a = document.getElementById('info-nav_a');
    const b = window.scrollY;
    const c = document.getElementById('first-header');

    if (b >= 537){
        a.style.backgroundColor = 'white'; c.style.color = 'orange'
    }
    else{
        a.style.background = 'orange'; c.style.color = 'grey'
    };
};

window.addEventListener('scroll', headerColorChanger);

    
let cartbuttons = document.querySelectorAll('.add-to-cart-btn');
let cartTable = document.getElementsByTagName("tbody")[0];
let quantityField = document.getElementsByClassName("num");
let removeButtons = document.getElementsByClassName("remove-item");

for (let i = 0; i < cartbuttons.length; i++) {
    cartbuttons[i].addEventListener('click', addToCart);
};

function addToCart(event) {
    let buttons = event.target;
    let buttonsParent = buttons.parentElement;
    let buttonsGrandParent = buttons.parentElement.parentElement;
    let itemName = buttonsParent.children[0].innerText;
    let itemPrice = buttonsParent.children[1].innerText;
    let itemImage = buttonsGrandParent.children[0].src;
    
    let itemContainer = document.createElement("tr");
    itemContainer.innerHTML = `<td>
        <img class="img-in-cart" src="${itemImage}" "alt="">
    </td>

    <td class="deets">
        <h3 class="name-item">${itemName}</h3>
    </td>

    <td class="price-item">
        <h3>${itemPrice}</h3>
    </td>

    <td>
        <input type="number" class="num" value="1" min="0" style="width: 30px; border-radius: 2px;">
    </td>

    <td class="sub-total">
        <h3>${itemPrice}</h3>
    </td>

    <td>
    <button class="remove-item" type="button">Remove</button>
    </td> `

    cartTable.append(itemContainer);

    for (let i = 0; i < quantityField.length; i++) {
        quantityField[i].addEventListener('click', updateTotal)

    }

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', removeItem)

    }

    grandTotal();

}

function updateTotal(event) {
    numberOfItems = event.target;

    numberOfItemsParent = numberOfItems.parentElement.parentElement;
    unitPrice = numberOfItemsParent.getElementsByClassName("price-item")[0];
    subTotalPrice = numberOfItemsParent.getElementsByClassName("sub-total")[0];

    UnitPriceContent = unitPrice.children[0].innerText.replace("$", "");

    subTotalPrice.children[0].innerText = "$" + numberOfItems.value * UnitPriceContent;
    subTotalPrice.children[0].color = 'red';
    if (numberOfItems.value == 0) { 
        subTotalPrice.style.color = 'red'
    }
    else{
        subTotalPrice.style.color = 'black' 
    };

    grandTotal();
};

function grandTotal() {
    let count = 0;
    let grandTotalPrice = document.getElementsByClassName("grandTotal-price")[0];
    let subTotal = document.getElementsByClassName("sub-total");
    for (let i = 0; i < subTotal.length; i++) {
        subTotalContent = Number(subTotal[i].innerText.replace("$", ""))
        count += subTotalContent;
    };
    grandTotalPrice.children[0].innerText = "$" + count;
        grandTotalPrice.style.color = 'green';    
};

function removeItem(ev) {
    remover = ev.target;
    removerGrandParent = remover.parentElement.parentElement
    removerGrandParent.remove()
    grandTotal()
};

    