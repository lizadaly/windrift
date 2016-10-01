/* Game reset */
var reset = function(e) {
    e.preventDefault();
    var conf = confirm("Restart the game from the beginning?");
    if (conf) {
        localStorage.clear();
        location.replace(window.location.href);
    }
}

/* Toggle night mode */
var reverse = function(e) {
    e.preventDefault();
    var mode = localStorage.getItem("nightMode");
    if (mode == null || mode === 'false') { // truthy
        mode = 'true';
    } else {
        mode = 'false';
    }
    localStorage.setItem("nightMode", mode);
    document.getElementById('body').classList.toggle('nightmode', mode === 'true');
}

/* Toggle About modal */
var about = function(e) {
    e.preventDefault();
    document.getElementById('about-modal').classList.toggle('open');
    document.getElementById('about-toggle').classList.toggle('open');
}
