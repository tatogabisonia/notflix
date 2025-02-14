// გვერდების გადართვა
document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// რეგისტრაციის დამუშავება
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // პაროლის დადასტურება
    if (password !== confirmPassword) {
        alert('პაროლები არ ემთხვევა!');
        return;
    }

    // ყველა მომხმარებლის მონაცემების მიღება localStorage-დან
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // ვამოწმებთ, არსებობს თუ არა უკვე ეს მომხმარებელი
    if (users.some(user => user.username === username)) {
        alert('ეს მომხმარებლის სახელი უკვე გამოყენებულია!');
        return;
    }

    // ვამატებთ ახალ მომხმარებელს
    users.push({ username, password });

    // განახლებული მონაცემების შენახვა
    localStorage.setItem('users', JSON.stringify(users));

    alert('რეგისტრაცია წარმატებულია!');
    
    // რეგისტრაციის შემდეგ გადასვლა შესვლის გვერდზე
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// შესვლის დამუშავება
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    // localStorage-დან ყველა მომხმარებლის მიღება
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // ვამოწმებთ, სწორია თუ არა მონაცემები
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('შესვლა წარმატებულია!');
        localStorage.setItem('loggedInUser', username); // ვინ არის შესული
        window.location.href = 'index.html'; // გადამისამართება მთავარ გვერდზე
    } else {
        alert('მომხმარებლის სახელი ან პაროლი არასწორია!');
    }
});
// გვერდების გადართვა
document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}); 
function togglePassword(fieldId, icon) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.innerText = "🙈";
    } else {
        passwordField.type = "password";
        icon.innerText = "👁️";
    }
}