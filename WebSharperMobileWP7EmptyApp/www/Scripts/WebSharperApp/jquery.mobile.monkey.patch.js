// jQuery Mobile Moneky Patch
// for jQuery Mobile 1.0b2
// solves problem with WebControl which adds before page name "x-wmapp1"
// this causes problem with jQuery Mobile's makeUrlAbsolute function
// which constructs address like: x-wmapp1:///index.html, 
// while rest of the code has this path like: x-wmapp1:index.html

function patchJQueryMobile() {
    var oldMakeUrlAbsolute = $.mobile.path.makeUrlAbsolute;

    $.mobile.path.makeUrlAbsolute = function (relUrl, absUrl) {
        if (absUrl.search(/^x\-wmapp1:/) !== -1 && relUrl != absUrl && relUrl.length > 1 && relUrl.search(/^#/) !== -1)
            return absUrl + relUrl;
        else
            return oldMakeUrlAbsolute(relUrl, absUrl);
    };
};