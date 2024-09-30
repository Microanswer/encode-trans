const base64 = require("base64-js");
const {str2UTF8, utf82str, unicodeDecode, unicodeEncode, str2radio, radio2str} = require("./script/util");

const encodetrans = {
    do_urldecode: function (val) {
        return decodeURIComponent(val);
    },
    do_urlencode: function (val) {
        return encodeURIComponent(val);
    },
    do_base64decode: function(val) {
        return utf82str(base64.toByteArray(val));
    },
    do_base64encode: function (val) {
        return base64.fromByteArray(str2UTF8(val));
    },
    do_unicodedecode: function (val) {
        return unicodeDecode(val);
    },
    do_unicodeencode: function (val) {
        return unicodeEncode(val);
    },
    do_hexencode: function (val) {
        return str2radio(val, 16);
    },
    do_hexdecode: function (val) {
        return radio2str(val, 16);
    },
    do_binaryencode: function (val) {
        return str2radio(val, 2);
    },
    do_binarydecode: function (val) {
        return radio2str(val, 2);
    }
};

function onBtnClick() {
    const mfrom = this.getAttribute("data-my-from");
    const mto = this.getAttribute("data-my-to");
    const mfromDom = document.querySelector(mfrom);
    const value = mfromDom.value.trim();
    if (!value) {
        return;
    }

    const mtoDom = document.querySelector(mto);

    const mtype = this.getAttribute("data-my-type");

    const fn = encodetrans[mtype];

    if (fn) {
        try {
            mtoDom.value = fn(value);
        }catch (e) {
            mtoDom.value = e.message;
        }
    }
}

window.onload = function () {

    const btns = document.querySelectorAll(".fbtn");

    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        btn.addEventListener("click", onBtnClick);
    }

}
