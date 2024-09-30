let te = new TextEncoder();
let td = new TextDecoder();

export function str2radio(val, r) {
    let bytes = str2UTF8(val);
    let rl = {
        "16": 2,
        "2": 8
    }
    let res = "";
    for (let i = 0; i < bytes.length; i++) {
        res += bytes[i].toString(r).padStart(rl[r], "0");
    }
    return res.toUpperCase();
}

export function radio2str(val, r) {
    let bytearr = [];
    let rl = {
        "16": 2,
        "2": 8
    }
    for (let i = 0; i < val.length; i += rl[r]) {
        let one = val.substring(i, i + rl[r]);
        bytearr.push(parseInt(one, r));
    }
    return utf82str(Uint8Array.from(bytearr));
}

export function str2UTF8(str) {
    return te.encode(str);
}

export function utf82str(bytearr) {
    return td.decode(bytearr)
}

export function charToUtf16(str) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        arr[i] = repair(str.charCodeAt(i).toString(16));
    }
    return arr;
}

function repair(str) {
    return str.length > 3 ? str : `${"0".repeat(4 - str.length)}${str}`;
}
export function unicodeEncode(str) {
    let code = [];
    for (let s of str) {
        let hexStr = s.codePointAt(0)?.toString(16) || "";
        if (hexStr.length < 3) {
            code.push(s);
            continue;
        }
        let hexRepairStr = repair(hexStr);
        if (hexStr.length > 4) {
            code.push(...charToUtf16(s).map(item => `\\u${item}`));
        } else {
            code.push(`\\u${hexRepairStr}`);
        }
    }
    return code.join("");
}
export function unicodeDecode(str) {
    return str.replace(/\\[Uu][0-9a-fA-F]{4}/g, item => {
        return String.fromCodePoint(parseInt(`0x${item.toLowerCase().replace("\\u", "")}`));
    });
}
