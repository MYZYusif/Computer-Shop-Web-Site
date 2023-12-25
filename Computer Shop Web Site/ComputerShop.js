let globalPhone;

function showComputerDetails(computer) {
    let popup = document.getElementById('popup-form');
    let popupContent = document.getElementById('popup-content');
    let computerDetailsDiv = document.getElementById('computerDetails');
    computerDetailsDiv.innerHTML = '';
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    let user = registrationData.find(entry => entry.UserName === computer.owner);
    globalPhone = user ? user.phoneNumber : '';
    let computerDetails = document.createElement('div');
    computerDetails.innerHTML = `
        <h3>${computer.name}</h3>
        <img src="${computer.image}" alt="${computer.name}">
        <p>Owner: ${computer.owner}</p>
        <p>Number: ${globalPhone}</p>
        <p>Price: ${computer.price}</p>
        <p>Storage: ${computer.storage}</p>
        <p>HDD/SSD: ${computer.hddorssd}</p>
        <p>RAM: ${computer.ram}</p>
        <p>Os: ${computer.os}</p>
        <p>Proceccor: ${computer.cpu}</p>
        <p>Video Card: ${computer.gpu}</p>
        <p>Old/New: ${computer.condition}</p>
    `;
    computerDetailsDiv.appendChild(computerDetails);
    popup.style.display = 'flex';
}

function closePopup() {
    let popup = document.getElementById('popup-form');
    popup.style.display = 'none';
}

function filterComputersByCategory(category, globalPhone) {
    let computerListDiv = document.getElementById('computerList');
    computerListDiv.innerHTML = '';
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    let addedComputers = new Set();
    for (let i = 0; i < registrationData.length; i++) {
        let user = registrationData[i].UserName;
        let userComputerDataKey = `computerData_${user}`;
        let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

        for (let j = 0; j < userComputerData.length; j++) {
            let computer = userComputerData[j];
            if ((category === undefined || computer.category === category) && !addedComputers.has(computer.name)) {
                let computerDiv = document.createElement('div');
                computerDiv.classList.add('computer-card');
                computerDiv.innerHTML = `
                    <h3>${computer.name}</h3>
                    <img src="${computer.image}" alt="${computer.name}">
                    <p>Owner: ${computer.owner}</p>
                    <p>Price: ${computer.price}</p>
                    <p>Storage: ${computer.storage}</p>
                    <p>HDD/SSD: ${computer.hddorssd}</p>
                    <button class="about">Detailed</button>
                `;
                computerDiv.querySelector(".about").addEventListener('click', function () {
                    showComputerDetails(computer);
                });
                computerListDiv.appendChild(computerDiv);
                addedComputers.add(computer.name);
            }
        }
    }
}

function loadAllComputersToPage() {
    let registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    let categories = new Set();
    for (let i = 0; i < registrationData.length; i++) {
        let user = registrationData[i].username;
        let userComputerDataKey = `computerData_${user}`;
        let userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];
        for (let j = 0; j < userComputerData.length; j++) {
            let computer = userComputerData[j];
            categories.add(computer.category);
        }
    }

    filterComputersByCategory();
}

window.onload = function () {
    loadAllComputersToPage();
    showComputerDetails();
};

$(document).ready(function () {
    loadAllComputersToPage();
    $('li').on('click', function () {
        $(this).addClass('blue');
        $('ul li').not(this).removeClass('blue');

        let value = $(this).text().toLowerCase();
        $(".computer-card h3").filter(function () {
            $(this).closest(".computer-card").toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#search").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".computer-card h3").filter(function () {
            $(this).closest(".computer-card").toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function goBack() {
    window.history.back();
}
