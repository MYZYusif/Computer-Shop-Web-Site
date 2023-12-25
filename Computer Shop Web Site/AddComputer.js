let editingRow = null;

function toggleComputerForm() {
    let formOverlay = document.getElementById('computerFormOverlay');
    formOverlay.style.display = (formOverlay.style.display === 'none' || formOverlay.style.display === '') ? 'flex' : 'none';
}

function saveComputer() {
    let category = document.getElementById('category').value;
    let computerName = document.getElementById('computerName').value;
    let computerPrice = document.getElementById('computerPrice').value;
    let condition = document.getElementById('condition').value;
    let computerImage = document.getElementById('computerImage').value;
    let ram = document.getElementById('ram').value;
    let cpu = document.getElementById('cpu').value;
    let storage = document.getElementById('storage').value;
    let hddorssd = document.getElementById('hddorssd').value;
    let os = document.getElementById('os').value;
    let gpu = document.getElementById('gpu').value;
    let info = document.getElementById('info').value;

    if (
        !category ||
        !computerName ||
        !computerPrice ||
        !condition ||
        !computerImage ||
        !ram ||
        !cpu ||
        !storage ||
        !hddorssd ||
        !os ||
        !gpu ||
        !info 
    ) {
        alert('Don\'t leave empty!');
        return;
    }

    let loggedInUser = localStorage.getItem('loggedInUser');
    let userComputerDataKey = `computerData_${loggedInUser}`;
    let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

    if (editingRow) {
        let computerIndex = userComputerData.findIndex(computer => computer.id === editingRow.cells[0].textContent);
        if (computerIndex !== -1) {
            userComputerData[computerIndex] = {
                id: editingRow.cells[0].textContent,
                name: computerName,
                image: computerImage,
                price: computerPrice,
                owner: loggedInUser,
                ram: ram,
                storage: storage,
                hddorssd: hddorssd,
                category: category,
                os: os,
                cpu: cpu,
                gpu: gpu,
                condition: condition,
                info: info
            };
        }
        editingRow = null;
    } else {
        let tableBody = document.getElementById('computerTableBody');
        let newRow = tableBody.insertRow();
        let idCell = newRow.insertCell(0);
        let nameCell = newRow.insertCell(1);
      
        let imageCell = newRow.insertCell(2);
        let priceCell = newRow.insertCell(3);
        let operationsCell = newRow.insertCell(4);

        let nextId = generateNextId(userComputerData);

        idCell.textContent = nextId;
       
        nameCell.textContent = computerName;

        let imageElement = document.createElement('img');
        imageElement.src = computerImage;
        imageElement.alt = computerName;
        imageCell.appendChild(imageElement);

        priceCell.textContent = `${computerPrice} AZN`;
        newRow.setAttribute('data-owner', loggedInUser);
        let editButton = createButton('Edit', function () {
            editComputer(newRow);
        }, 'blue-button');
        let deleteButton = createButton('Delete', function () {
            deleteComputer(newRow, computerName);
        }, 'red-button');

        operationsCell.appendChild(editButton);
        operationsCell.appendChild(deleteButton);

        userComputerData.push({
            id: idCell.textContent,
            name: computerName,
            image: computerImage,
            price: computerPrice,
            owner: loggedInUser,
            ram: ram,
            storage: storage,
            hddorssd: hddorssd,
            category: category,
            os: os,
            cpu: cpu,
            gpu: gpu,
            condition: condition,
            info: info
        });
    }

    resetComputerForm();
    toggleComputerForm();
    localStorage.setItem(userComputerDataKey, JSON.stringify(userComputerData));
    updateRowAndVisibleCount();
}

function resetComputerForm() {
    let form = document.getElementById('addComputerForm');
    form.reset();
    editingRow = null;
}

function deleteComputer(row, computerName) {
    let isConfirmed = confirm(`"${computerName}" Delete named computer?`);
    if (isConfirmed) {
        let loggedInUser = localStorage.getItem('loggedInUser');
        let userComputerDataKey = `computerData_${loggedInUser}`;
        let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];
        let computerIndex = userComputerData.findIndex(computer => computer.id === row.cells[0].textContent);
        if (computerIndex !== -1) {
            userComputerData.splice(computerIndex, 1);
            localStorage.setItem(userComputerDataKey, JSON.stringify(userComputerData));
        }
        row.remove();
        // updateIds();
        updateRowAndVisibleCount();
    }
}

function generateNextId(data) {
    let maxId = 0;
    for (let i = 0; i < data.length; i++) {
        let currentId = parseInt(data[i].id);
        maxId = Math.max(maxId, currentId);
    }
    return maxId + 1;
}

function updateComputer(row, category, newName, newImage, newPrice, condition, ram, cpu, storage, storageType, os, gpu) {
    let cells = row.cells;
    cells[0].textContent = generateNextId(userComputerData);
    cells[1].textContent = newName;

    let imageElement = document.createElement('img');
    imageElement.src = newImage;
    imageElement.alt = newName;
    cells[2].innerHTML = '';
    cells[2].appendChild(imageElement);

    cells[3].textContent = `${newPrice} AZN`;
    saveToLocalStorage();
}

function editComputer(row) {
    editingRow = row;
    let loggedInUser = localStorage.getItem('loggedInUser');
    let userComputerDataKey = `computerData_${loggedInUser}`;
    let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];
    let computerId = row.cells[0].textContent;
    let computer = userComputerData.find(computer => computer.id === computerId);
    document.getElementById('category').value = computer.category;
    document.getElementById('computerName').value = computer.name;
    document.getElementById('computerPrice').value = computer.price;
    document.getElementById('condition').value = computer.condition;
    document.getElementById('computerImage').value = computer.image;
    document.getElementById('ram').value = computer.ram;
    document.getElementById('cpu').value = computer.cpu;
    document.getElementById('storage').value = computer.storage;
    document.getElementById('hddorssd').value = computer.hddorssd;
    document.getElementById('os').value = computer.os;
    document.getElementById('gpu').value = computer.gpu;
    document.getElementById('info').value = computer.info;

    toggleComputerForm();
}

function updateIds() {
    let tableBody = document.getElementById('computerTableBody');
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}

function createButton(text, clickHandler, colorClass) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    button.classList.add(colorClass);
    return button;
}

function saveToLocalStorage() {
    let tableBody = document.getElementById('computerTableBody');
    let rows = tableBody.getElementsByTagName('tr');
    let computerData = [];
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        let computer = {
            id: cells[0].textContent,
            name: cells[1].textContent,
            image: cells[2].getElementsByTagName('img')[0].src,
            price: cells[3].textContent.slice(0, -4),
            owner: rows[i].getAttribute('data-owner')
        };
        computerData.push(computer);
    }
    localStorage.setItem('computerData', JSON.stringify(computerData));

}

function loadFromLocalStorage() {
    let tableBody = document.getElementById('computerTableBody');
    tableBody.innerHTML = '';
    let loggedInUser = localStorage.getItem('loggedInUser');
    let userComputerDataKey = `computerData_${loggedInUser}`;
    let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

    let startIndex = (currentPage - 1) * computersPerPage;
    let endIndex = startIndex + computersPerPage;

    for (let i = startIndex; i < endIndex && i < userComputerData.length; i++) {
        let computer = userComputerData[i];
        let newRow = tableBody.insertRow();
        let idCell = newRow.insertCell(0);
        let nameCell = newRow.insertCell(1);
        let imageCell = newRow.insertCell(2);
        let priceCell = newRow.insertCell(3);
        let operationsCell = newRow.insertCell(4);

        idCell.textContent = computer.id;
        nameCell.classList.add("name-cell");
        nameCell.textContent = computer.name;

        let imageElement = document.createElement('img');
        imageElement.src = computer.image;
        imageElement.alt = computer.name;
        imageElement.classList.add('table-img');
        imageElement.addEventListener('click', function () {
            showEnlargedImage(computer.image);
        });
        imageCell.appendChild(imageElement);

        priceCell.textContent = `${computer.price} AZN`;
        newRow.setAttribute('data-owner', computer.owner);

        let editButton = createButton('Edit', function () {
            editComputer(newRow);
        }, 'blue-button');
        let deleteButton = createButton('Delete', function () {
            deleteComputer(newRow, computer.name);
        }, 'red-button');
        operationsCell.appendChild(editButton);
        operationsCell.appendChild(deleteButton);
    }


    updateRowAndVisibleCount();
}

window.onload = function () {
    loadFromLocalStorage();
    updateRowAndVisibleCount();
};

let inputs = document.querySelectorAll("input")
inputs.forEach(input=>{
    input.addEventListener("keyup",()=>{
        let trueMessage = input.nextElementSibling;
        let falseMessage = input.nextElementSibling.nextElementSibling;
        if (input.checkValidity()) {
            trueMessage.style.display = "block";
            falseMessage.style.display = "none"
        }else{
            trueMessage.style.display = "none";
            falseMessage.style.display = "block"
        }
    });
    
  })

function closeComputerForm() {
    document.getElementById('computerFormOverlay').style.display = 'none';
}
function previewImage(input) {
    let imagePreview = document.getElementById('imagePreview');
    let imageUrl = input.value;
    imagePreview.src = imageUrl;
}




document.addEventListener('DOMContentLoaded', function () {
    let headers = document.querySelectorAll('th');
headers.forEach(header => {
    header.addEventListener('click', () => {
        sortTable(header);
    });
});
function sortTable(header) {
    let table = header.closest('table');
    let tbody = table.querySelector('tbody');
    let column = header.cellIndex;
    let rows = Array.from(tbody.querySelectorAll('tr'));

    let isAscending = header.classList.contains('asc');

   
    headers.forEach(h => h.classList.remove('asc', 'desc'));


    let sortedRows = rows.sort((a, b) => {
        let aValue = a.cells[column].textContent.trim();
        let bValue = b.cells[column].textContent.trim();
        return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

  
    header.classList.toggle('asc', !isAscending);
    header.classList.toggle('desc', isAscending);

  
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

   
});

function updateRowCount() {
    let rowCount = document.getElementById('rowCount');
    let rowCountVisible = document.getElementById('rowCountVisible');
    let tableBody = document.getElementById('computerTableBody');
    let visibleRows = tableBody.querySelectorAll('tr').length;
    let loggedInUser = localStorage.getItem('loggedInUser');
    let userComputerDataKey = `computerData_${loggedInUser}`;
    let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

    rowCount.textContent = visibleRows; 
    rowCountVisible.textContent = userComputerData.length;  
}
function updateRowAndVisibleCount() {
    updateRowCount();
}


let currentPage = 1;
let computersPerPage = 5;

function showNextPage() {
    currentPage++;
    loadFromLocalStorage();
}

function showPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadFromLocalStorage();
    }
}

document.querySelector('button#nextButton').addEventListener('click', showNextPage);
document.querySelector('button#backButton').addEventListener('click', showPreviousPage);

 function showEnlargedImage(imageUrl) {
    let enlargedImage = document.getElementById('enlargedImage');
    enlargedImage.src = imageUrl;

    let imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

$(document).ready(function(){
    $("#search-1").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#computerTableBody .name-cell").filter(function() {
        $(this).closest("tr").toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });