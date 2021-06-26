function buttonDrop() {
  document.getElementById("DropDown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.btn btn-primary dropdown-toggle')) {
    var dropdowns = document.getElementsByClassName("dropbtn-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}