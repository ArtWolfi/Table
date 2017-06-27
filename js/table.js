"use strict";

auCheck ();

let empTable = document.body.querySelector("#emptab"),
    prevValue = "",
    employees = {
        "1": {
            "firstName": 1.1,
            "lastName": 1.2,
            "age": 1.3,
            "gender": 1.4,
            "id": 1.5
        },
        "2": {
            "firstName": 2.1,
            "lastName": 2.2,
            "age": 2.3,
            "gender": 2.4,
            "id": 2.5
        },
        "3": {
            "firstName": 3.1,
            "lastName": 3.2,
            "age": 3.3,
            "gender": 3.4,
            "id": 3.5
        },
        "4": {
            "firstName": 4.1,
            "lastName": 4.2,
            "age": 4.3,
            "gender": 4.4,
            "id": 4.5
        },
        "5": {
            "firstName": "Максим",
            "lastName": 5.2,
            "age": 5.3,
            "gender": 5.4,
            "id": 5.5
        },
    };

function objToList(list, obj) {
    let head = [].slice.call(list.rows[0].children);
    head = head.map(function (el) {
        return el.id
    });
    for (let employ in obj) {
        if (!obj.hasOwnProperty(employ)) continue;
        let row = list.tBodies[0].appendChild(document.createElement("tr"));
        for (let columnName in employ) {
            if (!employ.hasOwnProperty(columnName)) continue;
            for (let i = 0; i < head.length; i++) {
                let cell = row.appendChild(document.createElement("td"))
            }
        }
        for (let columnName in employ) {
            if (!employ.hasOwnProperty(columnName)) continue;
            for (let i = 0; i < head.length; i++) {
                if (columnName = head[i]) {
                    row.cells[i].innerHTML = obj[employ][columnName];
                }
            }
        }
    }
    let row = list.tBodies[0].appendChild(document.createElement("tr"));
    for (let i = 0; i < head.length; i++) {
        let cell = row.appendChild(document.createElement("td"))
        cell.innerHTML = "Неизвестно";
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function addEmp() {
    let rowOne = empTable.tBodies[0].appendChild(document.createElement("tr"));
    for (let i = 0; i < 5; i++) {
        let cell = rowOne.appendChild(document.createElement("td"))
        cell.innerHTML = "Неизвестно";
    }

}

function replacer(e) {
    let elem = e.target;
    if (elem.tagName != "TD") return;
    prevValue = elem.textContent;
    elem.firstChild.replaceWith(document.createElement("input"));
    elem.firstChild.setAttribute("type", "text");
    elem.firstChild.addEventListener("blur", endrep);
    elem.firstChild.focus()
}

function endrep(e) {
    let result = e.target.value;
    if(result) {
        prevValue = "";
        e.target.replaceWith(document.createTextNode(result));
        return;
    }
    e.target.replaceWith(document.createTextNode(prevValue));
    prevValue = "";
}

function auCheck () {
    if(parseInt(getCookie("auPass"))) return;
    document.body.innerHTML = "";
};

objToList(empTable, employees);

empTable.tBodies[0].addEventListener("click", replacer);

$("#button1").click(addEmp);

$("#button2").click(function (e) {
        let elem = e.target;
        if(elem.innerHTML == "Показать таблицу"){
            $(".table-responsive").slideDown(2000);
            elem.innerHTML = "Скрыть таблицу";
            return;
        };
        if(elem.innerHTML == "Скрыть таблицу"){
            $(".table-responsive").slideUp('slow');
            elem.innerHTML = "Показать таблицу";
            return;
        }

    })



