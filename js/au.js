"use strict";

let auButon = document.body.querySelector('#slick-login>input[name="entr"]'),
    password = document.body.querySelector('#slick-login>input[name="password"]'),
    login = document.body.querySelector('#slick-login>input[name="username"]'),
    users = [
    {
        login: "mike",
        password: 32167
    },
    {
        login: "John",
        password: "eagle"
    }
];

function usersCheck(user) {
    return (user.login == login.value) && (user.password == password.value);
}

function submitLogin() {
    if (users.some(usersCheck)) {
        setCookie("auLogin",login.value,{expires:7200});
        setCookie("auPassword",password.value,{expires:7200});
        setCookie("auPass",1,{expires:7200});
        window.location = "table.html";
        return
    }
    ;
    setCookie("auPass",0,{expires:7200});
    alert("Неверный логин или пароль!");
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}


document.body.onload = function () {
    password.value = getCookie("auPassword") || password.value;
    login.value = getCookie("auLogin") || login.value;
};

auButon.addEventListener("click", submitLogin);
