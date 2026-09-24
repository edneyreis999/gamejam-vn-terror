export function groupDigits(value, locale = "en-US") {
    let text = String(value);
    let marker = "\u0000";
    while (text.includes(marker)) marker += "\u0000";
    const preserve = text => text.replace(/\d/g, digit => marker + String.fromCharCode(65 + Number(digit)) + marker);
    text = text.replace(/\[(.*?)\]/g, (_, inner) => `[${preserve(inner)}]`)
        .replace(/<(.*?)>/g, (_, inner) => `<${preserve(inner)}>`)
        .replace(/\{\{(.*?)\}\}/g, (_, inner) => preserve(inner));
    text = text.replace(/\d+\.?\d*/g, number => {
        if (number.startsWith("0")) return number;
        const formatted = Number(number).toLocaleString(locale || "en-US", { maximumFractionDigits: 6 });
        return formatted + (number.endsWith(".") ? "." : "");
    });
    return text.replace(new RegExp(`${marker}([A-J])${marker}`, "g"), (_, letter) => String(letter.charCodeAt(0) - 65));
}
