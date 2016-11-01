var isOpen = false ;

function openCloseNav(){
  if(isOpen){
    closeNav();
    isOpen = false;
  }else{
    openNav();    
    isOpen = true;
  }
}


function openNav() {
    document.getElementById("pnlSideNav").className = "";
    document.getElementById("pnlSideNav").className = "sidenav";
    document.getElementById("pnlSideNav").style.width = "250px";
    document.getElementById("pnlMain").style.marginLeft = "250px";

    document.getElementById("divUserSession").style.marginLeft = "10px";
}

function closeNav() {

    document.getElementById("pnlSideNav").className = "";
    document.getElementById("pnlSideNav").className = "sidenavmin";  
    document.getElementById("pnlSideNav").style.width = "50px";
    document.getElementById("pnlMain").style.marginLeft = "50px";

    $("#aUsuarioSession").prop("aria-expanded",false);
    $("#aUsuarioSession").addClass("collapsed");

    $("#profile-nav").prop("aria-expanded",false);
    $("#profile-nav").css("height","0px");
    $("#profile-nav").removeClass("in");
    

    document.getElementById("divUserSession").style.marginLeft = "50px";
    
}