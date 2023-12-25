
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usernameHeader = document.getElementById('useradd');
    const logoutButton = document.querySelector('.bt3');
    if (usernameHeader && loggedInUser) {
        usernameHeader.textContent = `User: ${loggedInUser}`;
    
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            location.reload();
            
        });
    }
});