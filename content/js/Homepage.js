window.onload = (event) => {
    console.log("ready");
};

document.addEventListener("DOMContentLoaded", function () {




});

function openlogin(){
    createLogin();

}

function submitDestination() {

    let destinationName = document.getElementById("dest").value;

    console.log(destinationName);

    let outgoing = document.getElementById("outgoing").value;
    let incoming = document.getElementById("incoming").value;
    if(destinationName != '' && outgoing != '' && incoming != '') {

        let myVar = JSON.stringify({destination: destinationName, outgoing: outgoing, incoming: incoming});


        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/search', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                createDesk(myVar);


            }
        }
        console.log(myVar);
        xhr.send(myVar);



    }
    else{
        alert("Please enter information");
    }
}



function createDesk(data){

    document.getElementById("onchange").remove();
    let main = document.getElementById("mainHome");
    let hr = document.createElement("hr");

    //First DIV
    let divgeneral = document.createElement("div");
    divgeneral.setAttribute("class", "container");
    let result = JSON.parse(data);

    //entered information from user, usable for api
    let destinationInfo = result.destination;
    let outgoingInfo = result.destination;
    let incomingInfo = result.destination;

    console.log(destinationInfo);

    let container = document.createElement("div");

    //First Row
    let divrowquery = document.createElement("div");
    divrowquery.setAttribute("class", "row");

    let divcurrentquery = document.createElement("div");
    divcurrentquery.setAttribute("class", "col-sm-6");
    divcurrentquery.innerHTML = "Your current query: Flight to "+destinationInfo;

    let divnewcases = document.createElement("div");
    divnewcases.setAttribute("class","col-sm-6");
    divnewcases.innerHTML = "new cases: 8186";


    divrowquery.appendChild(divcurrentquery);
    divrowquery.appendChild(divnewcases);

    //Second Row
    let divrowdestination = document.createElement("div");
    divrowdestination.setAttribute("class", "row");


    let divdestination = document.createElement("div");
    divdestination.setAttribute("class", "col-sm-6");
    divdestination.innerHTML= "Destination Airport: Sevilla (San Pablo Airport, SVQ)";

    let divactivecases = document.createElement("div");
    divactivecases.setAttribute("class", "col-sm-6");
    divactivecases.innerHTML= "Active Case: 240606";


    divrowdestination.appendChild(divdestination);
    divrowdestination.appendChild(divactivecases);

    //Third Row
    let divrowearliestdate = document.createElement("div");
    divrowearliestdate.setAttribute("class", "row");


    let divdate = document.createElement("div");
    divdate.setAttribute("class", "col-sm-6");
    divdate.innerHTML= "Earliest Date: Monday, June 1st";

    divrowearliestdate.appendChild(divdate);

    divgeneral.appendChild(divrowquery);
    divgeneral.appendChild(divrowdestination);
    divgeneral.appendChild(divrowearliestdate);

    let divcovidinfo = document.createElement("div");
    divcovidinfo.setAttribute("class", "container col-sm-12 text-center");
    divcovidinfo.innerHTML = "View travel information on your destination:";

    let acovidinfo = document.createElement("a");
    acovidinfo.setAttribute("id", "covidinformation");
    acovidinfo.setAttribute('href', "#");
    acovidinfo.setAttribute("data-container", "body");
    acovidinfo.setAttribute("data-placement", "right");
    acovidinfo.setAttribute("data-toggle", "popover");
    acovidinfo.setAttribute("title", "Covid Information on Spain");
    acovidinfo.setAttribute("data-content", "Test");
    acovidinfo.innerHTML="Spain";


    divcovidinfo.appendChild(acovidinfo);



    //DIV Flights

    let divflights = document.createElement("div");
    divflights.setAttribute("class", "container table-responsive");
    let tableflights = document.createElement("table");
    tableflights.setAttribute("class", "table");
    let tablerow = document.createElement("tr");
    tablerow.setAttribute("id", "flighttablerow");

    let tableh1 = document.createElement("th");
    tableh1.setAttribute("onclick", "w3.sortHTML('#flights','.item', 'td:nth-child(1)')");
    tableh1.innerHTML ="Airline";


    let tableh2 = document.createElement("th");
    tableh2.setAttribute("onclick", "w3.sortHTML('#flights','.item', 'td:nth-child(2)')");
    tableh2.innerHTML ="Departure";

    let tableh3 = document.createElement("th");
    tableh3.setAttribute("onclick", "w3.sortHTML('#flights','.item', 'td:nth-child(3)')");
    tableh3.innerHTML ="Arrival";

    let tableh4 = document.createElement("th");
    tableh4.setAttribute("onclick", "w3.sortHTML('#flights','.item', 'td:nth-child(4)')");
    tableh4.innerHTML ="Duration";

    let tableh5 = document.createElement("th");
    tableh5.setAttribute("onclick", "w3.sortHTML('#flights','.item', 'td:nth-child(5)')");
    tableh5.innerHTML ="Fare";


    tablerow.appendChild(tableh1);
    tablerow.appendChild(tableh2);
    tablerow.appendChild(tableh3);
    tablerow.appendChild(tableh4);
    tablerow.appendChild(tableh5);

    let tablebody = document.createElement("tbody");
    let tablerowitem = document.createElement("tr");
    tablerowitem.setAttribute("class", "item");

    let td1 = document.createElement("td");
    td1.innerHTML = "Austrian Airlines";
    let td2 = document.createElement("td");
    td2.innerHTML = "13:45";
    let td3 = document.createElement("td");
    td3.innerHTML = "15:30";
    let td4 = document.createElement("td");
    td4.innerHTML = "20:05h";
    let td5 = document.createElement("td");
    td5.innerHTML = "375";

    tablerowitem.appendChild(td1);
    tablerowitem.appendChild(td2);
    tablerowitem.appendChild(td3);
    tablerowitem.appendChild(td4);
    tablerowitem.appendChild(td5);

    tablebody.appendChild(tablerowitem);
    tableflights.appendChild(tablerow);
    tableflights.appendChild(tablebody);
    divflights.appendChild(tableflights);


    main.appendChild(divgeneral);
    main.appendChild(hr);
    main.appendChild(divcovidinfo);
    main.appendChild(divflights);
    let divonchange = document.createElement("div");
    divonchange.id = "onchange";
    divonchange.appendChild(divgeneral);
    divonchange.appendChild(hr);
    divonchange.appendChild(divcovidinfo);
    divonchange.appendChild(divflights);
    main.appendChild(divonchange);

    $(function () {
        $('[data-toggle="popover"]').popover()
    })

}

function createLogin(){
    document.getElementById("onchange").remove();
    let main = document.getElementById("mainHome");
    let br = document.createElement("br");
    let divlogin = document.createElement("div");
    divlogin.setAttribute("class", "container well text-center");

    let form = document.createElement("form");

    let img = document.createElement("img");
    img.setAttribute("src", "images/Arrow1.svg");
    img.setAttribute("class", "rounded");
    img.setAttribute("alt", "Logo");
    img.height = 200;
    img.width = 200;

    let h1 = document.createElement("h1");
    h1.innerHTML = "Please Login";

    let inputmail = document.createElement("input");
    inputmail.setAttribute("type", "email");
    inputmail.setAttribute("id", "emailbox");
    inputmail.setAttribute("name", "mail");
    inputmail.setAttribute("placeholder", "E-Mail");
    inputmail.setAttribute("required", "");

    let inputpwd = document.createElement("input");
    inputpwd.setAttribute("type", "password");
    inputpwd.setAttribute("id", "passwordbox");
    inputpwd.setAttribute("name", "password");
    inputpwd.setAttribute("placeholder", "Password");
    inputpwd.setAttribute("required", "");

    let perror = document.createElement("p");
    perror.setAttribute("id", "Errorbox");

    let submitbutton = document.createElement("button");
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("class", "btn btn-danger");
    submitbutton.setAttribute("role", "button");
    submitbutton.setAttribute("onclick", "login()");
    submitbutton.innerHTML="Login";

    divlogin.appendChild(h1);
    divlogin.appendChild(inputmail);
    divlogin.appendChild(br);
    divlogin.appendChild(inputpwd);
    divlogin.appendChild(br);
    divlogin.appendChild(perror);
    divlogin.appendChild(br);
    divlogin.appendChild(submitbutton);
    //divlogin.appendChild(form);
    let divonchange = document.createElement("div");
    divonchange.id = "onchange";
    divonchange.appendChild(divlogin);
    main.appendChild(divonchange);
    bmeiaApi(destinationInfo);


}


function bmeiaApi(country){

    let dest = country;
    let url = "https://www.bmeia.gv.at/reise-aufenthalt/reiseinformation/land/"+dest+"/type/json/";
    console.log(url);

}

