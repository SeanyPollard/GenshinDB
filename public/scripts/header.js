const navCheck = () => {
    var pathQuery = window.location.pathname.split("/",2);
    const newActive = document.querySelectorAll("a[href=\"/"+pathQuery[1]+"\"]");
    const oldActive = document.getElementById("nav-bar").getElementsByClassName("active")
    var oldLink
    for (oldLink = 0; oldLink < oldActive.length; oldLink++) {
        oldActive[oldLink].className = "nav-link";
    }
    for (link = 0; link < newActive.length; link++) {
        newActive[link].className = "nav-link active";
    }
}