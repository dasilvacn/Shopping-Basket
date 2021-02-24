// Tabs Menu
const tabHeader = document.getElementsByClassName("tab-header")[0];
const tabMenu = tabHeader.getElementsByTagName("div");
const tabIndicator = document.getElementsByClassName("tab-indicator")[0];

const tabBody = document.getElementsByClassName("tab-body")[0];
const tabBodyChilds = tabBody.children;
let numberAddedMeals = 0;

for(let i = 0; i < tabMenu.length; i++){
    tabMenu[i].addEventListener("click", function(){
        removeHeaderActiveClass();
        removeBodyActiveClass();
        let arr = Array.from(tabBodyChilds);
        arr[i].classList.add("active");
        tabMenu[i].classList.add('active');
        tabIndicator.style.left = `calc(calc(100% / 7) * ${i})`;
    })
}

function removeHeaderActiveClass(){
    let arr = Array.from(tabMenu);
    arr.forEach((item) => {
        item.classList.remove('active');
    })
}

function removeBodyActiveClass(){
    let arr = Array.from(tabBodyChilds);
    arr.forEach((item) => {
        item.classList.remove("active");
    })
}


// Select food
tabBody.addEventListener("click", function(e){
    let foodChild = e.target;
    let foodParent = foodChild.parentElement;
    if(foodParent.className === "eat-body"){
        let childrenArr = foodParent.children;
        let image = childrenArr[0].src;   
        let foodName = childrenArr[1].textContent;
        let foodPrice = childrenArr[2].lastChild.previousElementSibling.innerHTML
        addFood(image, foodName, foodPrice);
    }
})






const myOrder = document.getElementById("food");

// Added food
function addFood(image, foodName, foodPrice){

    let div = document.createElement("div");
    div.className = "food-control";
    div.setAttribute("onMouseOver", `delOn(${foodName.split(" ")[0]})`);
    div.setAttribute("onMouseOut", `delOff(${foodName.split(" ")[0]})`);
    div.setAttribute("id", foodName.split(" ")[0])
    let img = document.createElement("img");
    img.setAttribute("src", image);

    let h4 = document.createElement("h4");
    let spanOne = document.createElement("span");
    spanOne.textContent = "1";
    let spanTwo = document.createElement("span");
    spanTwo.textContent = "x";
    let spanThree = document.createElement("span");
    spanThree.textContent = foodName;

    h4.appendChild(spanOne);
    h4.appendChild(spanTwo);
    h4.appendChild(spanThree);

    let spanPrice = document.createElement("span");
    spanPrice.textContent = foodPrice;

    let spanDelete = document.createElement("span");
    spanDelete.className = "delete";
    let icon = document.createElement("i");
    icon.className = "fas fa-minus-circle";
    spanDelete.appendChild(icon);
    
    div.appendChild(img);
    div.appendChild(h4);
    div.appendChild(spanPrice);
    div.appendChild(spanDelete);

    myOrder.appendChild(div);

    numberAddedMeals = document.getElementsByClassName("food")[0].childElementCount;
    document.getElementsByClassName("right-side-r")[0].innerHTML = numberAddedMeals;

    let order = document.querySelector(".order");
    order.style.display = "block";
    
    let check = document.querySelector(".check");
    check.style.display = "block";

    let total = document.querySelector(".total")
    total.style.display = "flex";

    foodTotalPrice(foodPrice);
}

// My order display none
window.addEventListener('load', function() {
        let order = document.querySelector(".order");
        order.style.display = "none";
    
        let check = document.querySelector(".check");
        check.style.display = "none";

        let total = document.querySelector(".total")
        total.style.display = "none";
})


// Total Price
function foodTotalPrice(foodprice){
    let total = Number(foodprice.substring(1,));
    let before = document.querySelector("#total").innerHTML;
    document.querySelector("#total").innerHTML = (Number(before) + Number(total)).toFixed(2);
}


// Delete Food
myOrder.addEventListener("click", function(e){
    let del = e.target;

    if (del.className === "fas fa-minus-circle"){
        let piece = document.getElementsByClassName("right-side-r")[0].innerHTML -= 1;
        if(piece == 0){
            let order = document.querySelector(".order");
            order.style.display = "none";
        
            let check = document.querySelector(".check");
            check.style.display = "none";

            let total = document.querySelector(".total")
            total.style.display = "none";
        }
        let parent = del.parentElement.parentElement;
        let price = parent.children[2].textContent;
        Number(price.substring(1,))
        // Total Price
        let before = document.querySelector("#total").innerHTML;
        document.querySelector("#total").innerHTML = (Number(before) - Number(price.substring(1,))).toFixed(2);
        parent.remove();
    }
})
