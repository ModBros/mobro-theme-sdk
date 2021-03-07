import {registerPublicEndpoint} from "mobro/utils/public";
import {useEffect} from "react";
import {getUrl} from "mobro/utils/socket";
import {BOLD, ITALIC} from "mobro/enum/font-style";

const _loadedFonts = {};

export function useFont(config) {
    useEffect(() => {
        loadFont(config?.family, config?.style);
    }, [config?.family, config?.style]);
}

registerPublicEndpoint("utils.font.useFont", useFont);

export function loadFont(family, style) {
    if (!family) {
        return;
    }

    const key = `${family}_${style}`;

    if (_loadedFonts[key]) {
        return;
    }

    _loadedFonts[key] = true;

    try {
        const font = document.createElement('style');
        const fontStyle = getFontStyle(style);

        font.appendChild(document.createTextNode(`
            @font-face {
                font-family: '${family}';
                src: url('${getUrl()}/theme/font?family=${family}') format('truetype');
                weight: ${fontStyle.weight};
                style: ${fontStyle.style};
            }
        `));

        document.head.appendChild(font);
    } catch (exception) {
        console.error(exception);
    }
}

registerPublicEndpoint("utils.font.loadFont", loadFont);

export function getFontCssStyle(config) {
    const style = getFontStyle(config?.style);

    return {
        fontFamily: config?.family,
        fontStyle: style.style,
        fontWeight: style.weight
    };
}

registerPublicEndpoint("utils.font.getFontCssStyle", getFontCssStyle);

export function getFontStyle(style) {
    const result = {
        style: "normal",
        weight: "normal"
    };

    if (!style) {
        return result;
    }

    if (style.indexOf(ITALIC) !== -1) {
        result.style = "italic";
    }

    if (style.indexOf(BOLD) !== -1) {
        result.weight = "bold";
    }

    return result;
}