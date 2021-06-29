window.onload = (event) => {
    console.log("ready");
};

document.addEventListener("DOMContentLoaded", function () {
    fetch("/session",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        }).then( res => {
        res.json().then(function(data) {
            if(data.Response === "session established"){
                let loginbutton = document.getElementById("navlogin");
                loginbutton.innerHTML = "Logout";
                loginbutton.setAttribute("onClick", "logout()");
            }

        });
    }).catch ( e => {
        console.log(e);
        // handle errors here

    });
});

function openlogin(){
    createLogin();

}

function submitDestination() {

    let destinationName = document.getElementById("dest").value;


    let outgoing = document.getElementById("outgoing").value;
    let incoming = document.getElementById("incoming").value;
    if(destinationName != '' && outgoing != '' && incoming != '') {

        let myVar = JSON.stringify({destination: destinationName, outgoing: outgoing, incoming: incoming});


        let xhr = new XMLHttpRequest();
        xhr.open("PUT", '/search', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let response = JSON.parse(this.responseText);
                createDesk(response);


            }
        }
        xhr.send(myVar);




    }
    else{
        alert("Please enter information");
    }
}


function createDesk(data){
    console.log(data);
    console.log("Test");
    document.getElementById("onchange").remove();
    let main = document.getElementById("mainHome");
    let hr = document.createElement("hr");

    //First DIV
    let divgeneral = document.createElement("div");
    divgeneral.setAttribute("class", "container");

    //entered information from user, usable for api
    let destinationInfo = data[0].destination;
    //let airline = data.airline;
    //let departure = data.departure;
    //let arrival = data.arrival;
    //let price = data.price;
   // console.log(destinationInfo);

    //let container = document.createElement("div");

    //First Row
    let divrowquery = document.createElement("div");
    divrowquery.setAttribute("class", "row");

    let divcurrentquery = document.createElement("div");
    divcurrentquery.setAttribute("class", "col-sm-6");
    divcurrentquery.innerHTML = "Your current query: Flight to " + destinationInfo;

    let divnewcases = document.createElement("div");
    divnewcases.setAttribute("class","col-sm-6");
    divnewcases.id = "confirmed";


    divrowquery.appendChild(divcurrentquery);
    divrowquery.appendChild(divnewcases);

    //Second Row
    let divrowdestination = document.createElement("div");
    divrowdestination.setAttribute("class", "row");


    let divdestination = document.createElement("div");
    divdestination.setAttribute("class", "col-sm-6");
    divdestination.innerHTML= "Destination Airport: " + destinationInfo;

    let divactivecases = document.createElement("div");
    divactivecases.setAttribute("class", "col-sm-6");
    divactivecases.id = "recovered";


    divrowdestination.appendChild(divdestination);
    divrowdestination.appendChild(divactivecases);

    //Third Row
    let divrowearliestdate = document.createElement("div");
    divrowearliestdate.setAttribute("class", "row");


    let divdate = document.createElement("div");
    divdate.setAttribute("class", "col-sm-6");
    divdate.id= "death";

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
    acovidinfo.setAttribute("title", "Covid Information on" + destinationInfo);
    acovidinfo.setAttribute("data-content", "Test");
    acovidinfo.innerHTML= destinationInfo;


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
    /*
    let tablerowitem = document.createElement("tr");
    tablerowitem.setAttribute("class", "item");

    let td1 = document.createElement("td");
    td1.innerHTML = airline;
    let td2 = document.createElement("td");
    td2.innerHTML = departure;
    let td3 = document.createElement("td");
    td3.innerHTML = arrival;
    let td4 = document.createElement("td");
    td4.innerHTML = "20:05h";
    let td5 = document.createElement("td");
    td5.innerHTML = price;
*/
    Object.keys(data).forEach(key => {
        console.log(key , data[key]);
        let airline = data[key].airline;
        let departure = data[key].departure;
        let arrival = data[key].arrival;
        let price = data[key].price;
        let duration = data[key].duration;

        let tablerowitem = document.createElement("tr");
        tablerowitem.setAttribute("class", "item");

        let td1 = document.createElement("td");
        td1.innerHTML = airline;
        let td2 = document.createElement("td");
        td2.innerHTML = departure;
        let td3 = document.createElement("td");
        td3.innerHTML = arrival;
        let td4 = document.createElement("td");
        td4.innerHTML = duration;
        let td5 = document.createElement("td");
        td5.innerHTML = price;

        tablerowitem.appendChild(td1);
        tablerowitem.appendChild(td2);
        tablerowitem.appendChild(td3);
        tablerowitem.appendChild(td4);
        tablerowitem.appendChild(td5);

        tablebody.appendChild(tablerowitem);
        tableflights.appendChild(tablerow);
    })


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

    fetch("/getcovidinfo",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"destination": destinationInfo})
        }).then( res => {
        res.json().then(function(data) {
            console.log(data);
            document.getElementById("recovered").innerHTML = "Recovered: " + data.recovered;
            document.getElementById("confirmed").innerHTML = "Confirmed: " + data.confirmed;
            document.getElementById("death").innerHTML = "Deaths: " + data.deaths;
        });
    }).catch ( e => {
        console.log(e);
        // handle errors here

    });

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

    let createaccountbutton = document.createElement("button");
    createaccountbutton.setAttribute("type", "submit");
    createaccountbutton.setAttribute("onclick", "createaccount()");
    createaccountbutton.innerHTML="Create Account";

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
    divlogin.appendChild(createaccountbutton);
    divlogin.appendChild(br);
    divlogin.appendChild(submitbutton);
    //divlogin.appendChild(form);
    let divonchange = document.createElement("div");
    divonchange.id = "onchange";
    divonchange.appendChild(divlogin);
    main.appendChild(divonchange);
    //bmeiaApi(destinationInfo);


}


function bmeiaApi(country){

    let dest = country;
    let url = "https://www.bmeia.gv.at/reise-aufenthalt/reiseinformation/land/"+dest+"/type/json/";
    console.log(url);

}
/*
function createHomepage(){
    document.getElementById("onchange").remove();
    let main = document.getElementById("mainHome");

    let hr = document.createElement("hr");
    let br = document.createElement("br");

    let divslides = document.createElement("div");
    divslides.id = "slides";
    divslides.setAttribute("class","carousel slide carousel-fade");
    divslides.setAttribute("data-ride", "carousel");

    let ulc = document.createElement("ul");
    ulc.setAttribute("class","carousel-indicators");

    let li1 = document.createElement("li");
    li1.setAttribute("data-target", "#slides");
    li1.setAttribute("data-slide-to", "0");
    li1.setAttribute("class", "active");

    let li2 = document.createElement("li");
    li2.setAttribute("data-target", "#slides");
    li2.setAttribute("data-slide-to", "1");

    let li3 = document.createElement("li");
    li3.setAttribute("data-target", "#slides");
    li3.setAttribute("data-slide-to", "2");

    ulc.appendChild(li1);
    ulc.appendChild(li2);
    ulc.appendChild(li3);


    let divcarousel = document.createElement("div");
    divcarousel.setAttribute("class", "carousel-inner");

    let divcitem1 = document.createElement("div");
    divcitem1.setAttribute("class", "carousel-item active");

    let divcimg1 = document.createElement("img");
    divcimg1.setAttribute("src", "images/norway.jpg");
    divcimg1.setAttribute("class", "img-fluid");

    let divccaption1 = document.createElement("div");
    divccaption1.setAttribute("class", "carousel-caption");

    let divc1h2 = document.createElement("h2");
    divc1h2.innerHTML = "Find your next destionation";

    let divcitem2 = document.createElement("div");
    divcitem2.setAttribute("class", "carousel-item");

    let divcimg2 = document.createElement("img");
    divcimg2.setAttribute("src", "images/manhatten.jpg");
    divcimg2.setAttribute("class", "img-fluid");

    let divccaption2 = document.createElement("div");
    divccaption2.setAttribute("class", "carousel-caption");

    let divc2h2 = document.createElement("h2");
    divc2h2.innerHTML = "Find your next destionation";

    let divcitem3 = document.createElement("div");
    divcitem3.setAttribute("class", "carousel-item");

    let divcimg3 = document.createElement("img");
    divcimg3.setAttribute("src", "images/beach.jpg");
    divcimg3.setAttribute("class", "img-fluid");

    let divccaption3 = document.createElement("div");
    divccaption3.setAttribute("class", "carousel-caption");

    let divc3h2 = document.createElement("h2");
    divc3h2.innerHTML = "Find your next destination";


    divcitem3.appendChild(divcimg3);
    divccaption3.appendChild(divc3h2);
    divcitem3.appendChild(divccaption3);

    divcitem2.appendChild(divcimg2);
    divccaption2.appendChild(divc2h2);
    divcitem2.appendChild(divccaption2);

    divcitem1.appendChild(divcimg1);
    divccaption1.appendChild(divc1h2);
    divcitem1.appendChild(divccaption1);

    divcarousel.appendChild(divcitem1);
    divcarousel.appendChild(divcitem2);
    divcarousel.appendChild(divcitem3);

    divslides.appendChild(ulc);
    divslides.appendChild(divcarousel);

    let divsearch = document.createElement("div");
    divsearch.setAttribute("class", "container-fluid padding searchInfo");

    let divdestination = document.createElement("div");
    divdestination.setAttribute("class", "row text-center infobox d-flex align-items-center justify-content-center");
    divdestination.setAttribute("id", "destination");

    let divinnerdest = document.createElement("div");
    divinnerdest.setAttribute("class", "col-xs-12 col-md-3 information");


    let inputdest = document.createElement("input");
    inputdest.setAttribute("type", "text");
    inputdest.setAttribute("id", "dest");
    inputdest.setAttribute("placeholder", "Destination");

    let divoutgoing = document.createElement("div");
    divoutgoing.setAttribute("class", "row text-center infobox d-flex align-items-center justify-content-center ");

    let divinnerout = document.createElement("div");
    divinnerout.setAttribute("class", "col-xs-12 col-md-3 information");

    let inputoutgoing = document.createElement("input");
    inputoutgoing.setAttribute("type", "date");
    inputoutgoing.setAttribute("id", "outgoing");
    inputoutgoing.setAttribute("name", "outgoing");

    let divincoming = document.createElement("div");
    divincoming.setAttribute("class", "row text-center infobox d-flex align-items-center justify-content-center ");

    let divinnerinc = document.createElement("div");
    divinnerinc.setAttribute("class", " col-xs-12 col-md-3 information");

    let inputincoming = document.createElement("input");
    inputincoming.setAttribute("type", "date");
    inputincoming.setAttribute("id", "incoming");
    inputincoming.setAttribute("name", "incoming");

    let divsubmit = document.createElement("div");
    divsubmit.setAttribute("class", "row text-center infobox d-flex align-items-center justify-content-center");
    divsubmit.setAttribute("id", "searchlink");

    let divinnersub = document.createElement("div");
    divinnersub.setAttribute("class", " col-xs-12 col-md-3 information");

    let inputsubmit = document.createElement("button");
    inputsubmit.setAttribute("type", "submit");
    inputsubmit.setAttribute("onclick", "submitDestination()");
    inputsubmit.innerHTML = "Search";

    divinnersub.appendChild(inputsubmit);
    divsubmit.appendChild(divinnersub);

    divinnerinc.appendChild(inputincoming);
    divincoming.appendChild(divinnerinc);

    divinnerout.appendChild(inputoutgoing);
    divoutgoing.appendChild(divinnerout);

    divinnerdest.appendChild(inputdest);
    divdestination.appendChild(divinnerdest);


    divsearch.appendChild(divdestination);
    divsearch.appendChild(divincoming);
    divsearch.appendChild(divoutgoing);
    divsearch.appendChild(divsubmit);

    let divtextfields = document.createElement("div");
    divtextfields.setAttribute("class", "container-fluid padding textfields row text-center padding");

    let divteam = document.createElement("div");
    divteam.setAttribute("class", "col-xs-12 col-sm-6 col-md-4");

    let teamh2 = document.createElement("h2");
    teamh2.setAttribute("class", "text-center con-h");
    teamh2.innerHTML = "Our Team";

    let pteamtext = document.createElement("p");
    pteamtext.innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n" +
        "                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n" +
        "                    At vero eos et accusam et justo duo dolores et ea rebum.";

    let divphilosophy = document.createElement("div");
    divphilosophy.setAttribute("class", "col-xs-12 col-sm-6 col-md-4");

    let philosophyh2 = document.createElement("h2");
    philosophyh2.setAttribute("class", "text-center con-h");
    philosophyh2.innerHTML = "Our Philosophy";

    let pphilosophytext = document.createElement("p");
    pphilosophytext.innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n" +
        "                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n" +
        "                    At vero eos et accusam et justo duo dolores et ea rebum.";

    let divgoal = document.createElement("div");
    divgoal.setAttribute("class", "col-xs-12 col-sm-6 col-md-4");

    let pgoalh2 = document.createElement("h2");
    pgoalh2.setAttribute("class", "text-center con-h");
    pgoalh2.innerHTML = "Our Philosophy";

    let pgoaltext = document.createElement("p");
    pgoaltext.innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n" +
        "                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n" +
        "                    At vero eos et accusam et justo duo dolores et ea rebum.";

    divteam.appendChild(document.createElement("br"));
    divteam.appendChild(teamh2);
    divteam.appendChild(document.createElement("hr"));
    divteam.appendChild(pteamtext);

    divphilosophy.appendChild(document.createElement("br"));
    divphilosophy.appendChild(philosophyh2);
    divphilosophy.appendChild(hr);
    divphilosophy.appendChild(pphilosophytext);

    divgoal.appendChild(document.createElement("br"));
    divgoal.appendChild(pgoalh2);
    divgoal.appendChild(document.createElement("hr"));
    divgoal.appendChild(pgoaltext);

    divtextfields.appendChild(divteam);
    divtextfields.appendChild(divphilosophy);
    divtextfields.appendChild(divgoal);

    let divonchange = document.createElement("div");
    divonchange.id = "onchange";
    divonchange.appendChild(divslides);
    divonchange.appendChild(divsearch);
    divonchange.appendChild(divtextfields);
    main.appendChild(divonchange);
}
*/

/*

function createDesk2(data) {

    document.getElementById("onchange").remove();

    let result = JSON.parse(data);

    //entered information from user, usable for api
    let destinationInfo = result.destination;
    let outgoingInfo = result.destination;
    let incomingInfo = result.destination;

    console.log(destinationInfo);

    let container = document.createElement("div");

    container.setAttribute("id", "onchange");
    container.setAttribute("class", "container");

    let containerRow = document.createElement("div");
    container.setAttribute("class", "row");

    let container3 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    let p = document.createElement("p");
    let pTxt = document.createTextNode("Your current query: Flight to " + destinationInfo);

    p.appendChild(pTxt);
    //container4
    let p2 = document.createElement("p");
    let pTxt2 = document.createTextNode("Destination Airport: Sevilla (San Pablo Airport, SVQ)");

    p2.appendChild(pTxt2);

    //container5
    let p3 = document.createElement("p");
    let pTxt3 = document.createTextNode("Earliest Date: Monday, June 1st");

    container3.appendChild(p);
    containerRow.appendChild(container3);

    container.appendChild(containerRow);

    let container4 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container4.appendChild(p2);
    containerRow.appendChild(container4);

    let container5 = document.createElement("div");
    container.setAttribute("class", "col-sm-12");

    container5.appendChild(pTxt3);
    containerRow.appendChild(container5);

    let br = document.createElement("br");
    containerRow.appendChild(br);

    //container6
    let p4 = document.createElement("p");
    let pTxt4 = document.createTextNode("New Cases: 8186");

    let container6 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container6.appendChild(pTxt4);
    containerRow.appendChild(container6);

    //container7
    let p5 = document.createElement("p");
    let pTxt5 = document.createTextNode("Active Case: 240606");

    let container7 = document.createElement("div");
    container.setAttribute("class", "col-sm-6");

    container7.appendChild(pTxt5);
    containerRow.appendChild(container7);

    container.appendChild(containerRow);
    document.getElementById("mainHome").appendChild(containerRow);

    ///////////////////////////////////////////////////////////////////////////////////////////////

    //TABLE
    document.getElementById("mainHome").appendChild(document.createElement("br"));

    let container8 = document.createElement("div");
    container8.setAttribute("id", "container8");
    container8.setAttribute("class", "table-responsive container");
    let tables = document.createElement("TABLE");
    tables.setAttribute("id", "myTable");
    let tr = document.createElement("TR");
    tr.setAttribute("id", "myTr");

    let airline = document.createElement("TH");
    airline.setAttribute("id", "airline");
    let departure = document.createElement("TH");
    departure.setAttribute("id", "departure");
    let arrival = document.createElement("TH")
    arrival.setAttribute("id", "arrival");
    let duration = document.createElement("TH")
    duration.setAttribute("id", "duration");
    let fare = document.createElement("TH")
    fare.setAttribute("id", "fare");

    airline.appendChild(document.createTextNode("Airline"));
    departure.appendChild(document.createTextNode("Departure"));
    arrival.appendChild(document.createTextNode("Arrival"));
    duration.appendChild(document.createTextNode("Duration"));
    fare.appendChild(document.createTextNode("Fare"));

    tr.appendChild(airline);
    tr.appendChild(departure);
    tr.appendChild(arrival);
    tr.appendChild(duration);
    tr.appendChild(fare);

    tables.appendChild(tr);


    let trow = document.createElement("TR");

    trow.setAttribute("id", "trow");

    let airlineInfo = document.createElement("TH");
    airlineInfo.setAttribute("id", "airlineInfo");

    let departureInfo = document.createElement("TH");
    departureInfo.setAttribute("id", "departureInfo");

    let arrivalInfo = document.createElement("TH")
    arrivalInfo.setAttribute("id", "arrivalInfo");

    let durationInfo = document.createElement("TH")
    durationInfo.setAttribute("id", "durationInfo");

    let fareInfo = document.createElement("TH")
    fareInfo.setAttribute("id", "fareInfo");

    airlineInfo.appendChild(document.createTextNode("Austrian Airlines"));
    departureInfo.appendChild(document.createTextNode("15:00"));
    arrivalInfo.appendChild(document.createTextNode("18:00"));
    durationInfo.appendChild(document.createTextNode("3:00"));
    fareInfo.appendChild(document.createTextNode("350"));

    trow.appendChild(airlineInfo);
    trow.appendChild(departureInfo);
    trow.appendChild(arrivalInfo);
    trow.appendChild(durationInfo);
    trow.appendChild(fareInfo);

    tables.appendChild(trow);

    container8.appendChild(tables);

    document.getElementById("mainHome").appendChild(container8);


}*/

