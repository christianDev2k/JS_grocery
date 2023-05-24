const groceryInput = document.querySelector('.grocery__input');
const groceryBtn = document.querySelector('.grocery__btn');
const groceryTable = document.querySelector('.grocery__table');
const groceryClear = document.querySelector('.grocery__clear');
const groceryForm = document.querySelector('.grocery__form');

const itemList = [];
let index = 0;

function groceryList(item) {
    this.item = item;

    this.edit = function () {

    }
    this.delete = function () {

    }
}

function checkValidation() {
    return groceryInput.value === '' ? false : true;
}

function showAlert(alertText, alertType) {
    const alert = document.querySelector('.grocery__alert');
    alert.innerHTML = alertText;
    alert.classList.add('active', alertType);
    setTimeout(function () {
        alert.classList.remove('active', alertType);
    }, 1000);
}

function addItem() {
    let item = groceryInput.value;
    itemList[index] = new groceryList(item);

    let element = document.createElement('li');
    element.classList = 'flex justify-between items-center text-slate-800 hover:text-slate-400 hover:bg-slate-100 rounded-lg px-4 py-1 transition duration-500 my-1';
    element.innerHTML = `
        <p class="tracking-widest">${itemList[index].item}</p>
        <div class="flex text-xs">
            <a href="" class="grocery__edit-btn text-green-400">
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <a href="" class="grocery__del-btn ml-4 text-red-500">
                <i class="fa-solid fa-trash"></i>
            </a>
        </div>
    `;
    index++;
    showAlert('Item added', 'success');

    groceryTable.appendChild(element);
    groceryTable.classList.add('active');
    groceryClear.classList.add('active');
    groceryForm.reset();
}

function clearItem() {
    itemList.splice(0, itemList.length);

    groceryTable.innerHTML = '';
    groceryTable.classList.remove('active');
    groceryClear.classList.remove('active');
    showAlert('Empty List', 'danger');
}

function removeItem() {
    const delBtnList = document.querySelectorAll('.grocery__del-btn');
    delBtnList.forEach(function(item, index) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            itemList.splice(index, 1);
        })
    })
}

groceryBtn.addEventListener('click', function () {
    if (checkValidation()) {
        addItem();
        removeItem();
    }
    else {
        showAlert('Please Enter Value', 'danger');
    }
})

groceryClear.addEventListener('click', function () {
    clearItem();
})
