function $g(selector) {
    let nodelist = document.querySelectorAll(selector);

    if (nodelist.length == 0) {
        return null;
    }

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

function $ce(element, text) {
    let el = document.createElement(element);
    if (typeof (text) != 'undefined' && typeof (text) !== '' && typeof (text) != null) {
        el.innerText = text;
    }
    return el;
}

// createElement + innerText
function $ct(element, text) {
    let el = document.createElement(element)
    if (text != null && text.length > 0 && typeof (text) != 'undefined') {
        el.innerText = text
    }
    return el
}

export { $g , $ct }

