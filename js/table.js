"use strict";

auCheck ();

let empTable = document.body.querySelector("#emptab1"),
    prevValue = "",
    employees = {
        "Ut": {
            "firstName": 1.1,
            "lastName": 1.2,
            "age": 1.3,
            "gender": 1.4,
            "id": 1.5
        },
        "32432": {
            "firstName": 2.1,
            "lastName": 2.2,
            "age": 2.3,
            "id": 2.5
        },
        "234324": {
            "firstName": 3.1,
            "lastName": 3.2,
            "age": 3.3,
            "gender": 3.4,
            "id": 3.5
        },
        "324342": {
            "firstName": 4.1,
            "lastName": 4.2,
            "age": 4.3,
            "gender": 4.4,
            "id": 4.5
        },
        "324432": {
            "firstName": "Максим",
            "lastName": 5.2,
            "age": 5.3,
            "gender": 5.4,
            "id": 5.5
        },
    },
    newTable = $(empTable).clone();


function EmpCreateJSON(id, firstName,lastName, age, gender) {
    this["id"] = id;
    this["firstName"] = firstName || "";
    this["lastName"] = lastName || "";
    this["age"] = age || "";
    this["gender"] = gender || "";
};

function createList(...rest) {
    let list = {};
    rest.forEach(obj=> list[obj.id] = obj)
    return list;
}


function objToList(list, obj) {
    let head = [].slice.call(list.rows[0].children);
    head = head.map(function (el) {
        return el.id
    });
    for (let employ in obj) {
        if (!obj.hasOwnProperty(employ)) continue;
        let row = list.tBodies[0].appendChild(document.createElement("tr"));
        for (let i = 0; i < head.length; i++) {
            row.appendChild(document.createElement("td"))
        };
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

function addEmp(table) {
    let rowOne = table.tBodies[0].appendChild(document.createElement("tr"));
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

//----------------------------------------------------------------------------------------------------------------


$("body").append("<div id='table2' class='table-responsive'></div>");

$("#table2").html(newTable);

$("#table2>table").attr("id", "emptab2");

let list_2 = createList(new EmpCreateJSON("5.9","Иван","Крюкин","17","male"),
    new EmpCreateJSON("5.11","Дарья","Ивушкина","19","female"),
    new EmpCreateJSON("5.22","Виктория","Вилкина","22","female"));

newTable = document.body.querySelector("#emptab2"),

objToList(newTable, list_2);

newTable.tBodies[0].addEventListener("click", replacer);
$("#table2").prepend('<h2 class="sub-header">Вторая таблица</h2>')
$("#table2").append('<button id="button3" class="btn btn-primary">Добавить сотрудника</button>');

$("#button1").click( ()=>addEmp(empTable));
$("#button3").click( ()=>addEmp(newTable));

$("#button2").click(function (e) {
        const elem = e.target;
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



