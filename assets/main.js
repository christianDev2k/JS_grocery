const groceryInput = document.querySelector('.grocery__input');
const submitBtn = document.querySelector('.submit__btn');
const editBtn = document.querySelector('.edit__btn');
const groceryClear = document.querySelector('.grocery__clear');
const groceryTable = document.querySelector('.grocery__table');
const groceryForm = document.querySelector('.grocery__form');

const itemList = [];
let index = 0;

function groceryList(item) {
    this.item = item;
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

function displayItem() {
    let content = '';
    groceryTable.innerHTML = '';

    content += itemList.map(function (item, index) {
        return `<li class="flex justify-between items-center text-slate-800 hover:text-slate-400 hover:bg-slate-100 rounded-lg px-4 py-1 transition duration-500 my-1" >
                    <p class="tracking-widest">${item.item}</p>
                    <div class="flex text-xs">
                        <button onclick="editItem(${index})" class="grocery__edit-btn text-green-400">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="removeItem(${index})" class="grocery__del-btn ml-4 text-red-500">
                            <i class="fa-solid fa-trash"></i>
                        </button>   
                    </div>
                </li>`
    }).join('');
    groceryTable.innerHTML = content;
}

function removeItem(id) {
    itemList.splice(id, 1);
    displayItem();
    showAlert('Item removed', 'danger');
}

function editItem(id) {
    submitBtn.style.display = 'none';
    editBtn.style.display = 'block';

    groceryInput.value = itemList[id].item;
    editBtn.addEventListener('click', function () {
        itemList[id].item = groceryInput.value;
        displayItem();
        submitBtn.style.display = 'block';
        editBtn.style.display = 'none';
        groceryForm.reset();
    })
}

function addItem() {
    let item = groceryInput.value;
    itemList[index] = new groceryList(item);
    index++;

    groceryTable.classList.add('active');
    groceryClear.classList.add('active');
    groceryForm.reset();
    showAlert('Item added', 'success');
}

function clearItem() {
    itemList.splice(0, itemList.length);

    groceryTable.innerHTML = '';
    groceryTable.classList.remove('active');
    groceryClear.classList.remove('active');
    showAlert('Empty List', 'danger');
}

submitBtn.addEventListener('click', function () {
    if (checkValidation()) {
        addItem();
        displayItem();
    }
    else {
        showAlert('Please Enter Value', 'danger');
    }
})

groceryClear.addEventListener('click', function () {
    clearItem();
})
