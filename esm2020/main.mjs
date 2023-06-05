import { BehaviorSubject } from 'rxjs';
import { MapleColorHelper } from './helpers/color.helper';
import { MAPLE_PROP_EXTENSION_MAP } from './property-extension-map';
import { getMapleUtilityClassMap, getMapleUtilityVariableMap, } from './utility-class-map';
import { MAPLE_VAR_ALERT } from './variables/alert';
import { MAPLE_VAR_BREAKPOINT } from './variables/breakpoint';
import { MAPLE_VAR_BUTTON } from './variables/button';
import { MAPLE_VAR_COLOR } from './variables/color';
import { MAPLE_VAR_FONT_FAMILY } from './variables/font-family';
import { MAPLE_VAR_FONT_SIZE } from './variables/font-size';
import { MAPLE_VAR_FONT_WEIGHT } from './variables/font-weight';
import { MAPLE_VAR_MAX_WIDTH } from './variables/max-width';
import { MAPLE_VAR_SPACER } from './variables/spacer';
import { MAPLE_VAR_TRANSITION } from './variables/transition';
// Define a global Maple.CACHE to collect selectors and maps on breakpoint keys
const BREAKPOINT = {
    media: {},
};
const STYLE_ELEMENTS = {};
const STR_EMPTY = '';
const STR_SPACE = ' ';
const STR_DOT = '.';
const STR_UP = 'up';
const STR_DOWN = 'down';
const SEP_MEDIA = '-';
const SEP_SELECTOR = ':';
const SEP_UTIL_KEY = ':';
const SEP_UTIL_VAL = '=';
const SEP_NO_SPACE = '<';
const SEP_OUTER_SPACE = '<<';
const IMPORTANT = '!';
const WILDCARD = '*';
const PREFIX_MAPLE_PROP = '_';
const SUFFIX_MEDIA_UP = SEP_MEDIA + STR_UP;
const SUFFIX_MEDIA_DOWN = SEP_MEDIA + STR_DOWN;
const R_SELECTOR_RESERVED = /(\.|\+|\~|\<|\>|\[|\]|\(|\)|\!|\:|\,|\=|\||\%|\#|\*|\"|\/)/g;
const R_ESCAPE_RESERVED = '\\$1';
const R_SEP_NO_SPACE = /\</g;
const R_SEP_SEL_SPACE = /\>\>/g;
const R_SEP_SEL_SPACE_ALL = /(\<|\>\>)/g;
const R_SEP_VAL_SPACE = /\|/g;
const R_SEP_GRID_ROW_SPACE = /\-/g;
const R_SEP_UTIL_VAL = /=(?:.(?!=))+$/;
const R_SEP_UTIL_KEY = /\:(?:.(?!\:))+$/;
const R_CUSTOM = /\((.*?)\)/;
const R_WILDCARD = /\*/g;
const R_EXTRACT_CLASS = /class\=\"([\s\S]+?)\"/g;
const R_UNIFIY = /\=(?=[^.]*$)/;
let preInitClassList = [];
let preInitClassListGenerated = false;
let isMapleEnabled = true;
let doc;
const esc = (selector) => selector.replace(R_SELECTOR_RESERVED, R_ESCAPE_RESERVED);
export class Maple {
    constructor() { }
    // Find min and max breakpoints
    static setMinAndMaxBreakpoints() {
        const breakpointKeys = Object.keys(Maple.breakpointMap);
        const breakpoints = breakpointKeys
            .map((key) => ({
            key,
            size: parseFloat(Maple.breakpointMap[key]),
        }))
            .sort((a, b) => a.size - b.size);
        BREAKPOINT.minKey = breakpoints[0].key;
        BREAKPOINT.maxKey = breakpoints[breakpoints.length - 1].key;
        BREAKPOINT.minMedia = BREAKPOINT.minKey + SUFFIX_MEDIA_UP;
        breakpoints.forEach((bp, i) => {
            const next = breakpoints[i + 1];
            BREAKPOINT.media[bp.key + SUFFIX_MEDIA_UP] = bp.size;
            if (next) {
                // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
                // See https://bugs.webkit.org/show_bug.cgi?id=178261
                BREAKPOINT.media[bp.key + SUFFIX_MEDIA_DOWN] = next.size - 0.02;
            }
        });
    }
    static createDomElements(styleElements, prefix = 'maple', document) {
        // Prepare style element on head
        const docHead = document?.host
            ? document
            : (document || doc).getElementsByTagName('head')[0];
        const breakpoints = Object.keys(BREAKPOINT.media).sort((a, b) => BREAKPOINT.media[a] - BREAKPOINT.media[b]);
        const breakpointsUp = breakpoints.filter((key) => key.includes(SUFFIX_MEDIA_UP));
        const breakpointsDown = breakpoints.filter((key) => key.includes(SUFFIX_MEDIA_DOWN));
        breakpointsUp.concat(breakpointsDown.reverse()).forEach((key) => {
            const styleId = `${prefix}-${key}`;
            const el = document?.host ? null : doc.getElementById(styleId);
            if (!!el) {
                docHead.removeChild(el);
            }
            styleElements[key] = doc.createElement('style');
            styleElements[key].setAttribute('id', styleId);
            docHead.appendChild(styleElements[key]);
        });
    }
    static extendProperties() {
        Maple.utilPrefixList.forEach((def) => {
            Maple.utilClassMap[def.prefix] = Maple.utilClassMap[def.prefix] || {};
            Maple.utilClassMap[def.prefix][WILDCARD] = {};
            Object.keys(def.map).forEach((key) => {
                Maple.utilClassMap[def.prefix][key] = {};
                def.props.forEach((prop) => {
                    Maple.utilClassMap[def.prefix][WILDCARD] = {
                        ...Maple.utilClassMap[def.prefix][WILDCARD],
                        [prop]: WILDCARD,
                    };
                    Maple.utilClassMap[def.prefix][key][prop] = def.map[key];
                });
            });
        });
    }
    static getSelectors(media = STR_EMPTY, selKey = STR_EMPTY, utilKey = STR_EMPTY, utilVal = STR_EMPTY, 
    // tslint:disable-next-line: variable-name
    _selector = STR_EMPTY, important = false, shadowRoot) {
        const maple = Maple.utilClassMap[selKey] || {};
        const parentSelector = selKey.includes(SEP_OUTER_SPACE)
            ? selKey.split(SEP_OUTER_SPACE).pop().split(R_SEP_SEL_SPACE_ALL).shift()
            : STR_EMPTY;
        const baseSel = [
            media || STR_EMPTY,
            maple._selector ? SEP_SELECTOR : STR_EMPTY,
            selKey,
            utilKey ? SEP_UTIL_KEY : STR_EMPTY,
            utilKey,
            utilVal ? SEP_UTIL_VAL : STR_EMPTY,
        ].join(STR_EMPTY);
        return ((maple._selector || selKey || '') + _selector)
            .split(/,\s*/)
            .map((selector) => [
            ...(!shadowRoot
                ? [
                    parentSelector ? parentSelector + STR_SPACE : STR_EMPTY,
                    utilVal ? STR_DOT : STR_EMPTY,
                    utilVal ? esc(baseSel + utilVal) : `[class*="${baseSel}"]`,
                    utilVal && important ? esc(IMPORTANT) : STR_EMPTY,
                    maple._selector || !selKey || selKey.charAt(0) === SEP_NO_SPACE
                        ? STR_EMPTY
                        : STR_SPACE,
                    selector.trim().charAt(0) === SEP_NO_SPACE
                        ? STR_EMPTY
                        : STR_SPACE,
                ]
                : []),
            selector
                .trim()
                .replace(SEP_OUTER_SPACE + parentSelector, STR_EMPTY)
                .replace(R_SEP_SEL_SPACE, STR_SPACE)
                .replace(R_SEP_NO_SPACE, STR_EMPTY)
                .replace(shadowRoot ? /^\>/ : STR_EMPTY, STR_EMPTY),
        ].join(STR_EMPTY))
            .join(',');
    }
    static cache(media, selector, mapToBeCached, shadowRoot = false) {
        if (!mapToBeCached) {
            throw new Error(`Property map not found for selector: ${selector}`);
        }
        const cacheKey = `${media}${selector}${JSON.stringify(mapToBeCached)}`;
        if (!Maple.CACHE[cacheKey] || shadowRoot) {
            Maple.tempCache[media] = Maple.tempCache[media] || {};
            Maple.tempCache[media] = {
                ...Maple.tempCache[media],
                [selector]: {
                    ...(Maple.tempCache[media][selector] || {}),
                    ...mapToBeCached,
                },
            };
            Maple.CACHE[cacheKey] = 1;
        }
    }
    static styles(media) {
        const cacheItem = Maple.tempCache[media];
        if (!cacheItem) {
            return STR_EMPTY;
        }
        const selectors = Object.keys(cacheItem);
        if (selectors.length === 0) {
            return STR_EMPTY;
        }
        const breakpointParts = media.split(SEP_MEDIA);
        const breakpointDir = breakpointParts[1];
        const mediaQuery = breakpointDir === STR_UP ? 'min-width' : 'max-width';
        const result = [];
        // open media query
        if (media !== BREAKPOINT.minMedia) {
            result.push(`@media (${mediaQuery}: ${BREAKPOINT.media[media]}px) {`);
        }
        for (const selector of selectors) {
            const propMap = cacheItem[selector];
            if (!propMap) {
                continue;
            }
            const propMapKeys = Object.keys(propMap).filter((p) => p !== IMPORTANT);
            if (propMapKeys.length === 0) {
                continue;
            }
            // open selector
            result.push(`${selector}{`);
            // fill selector with properties
            for (const prop of propMapKeys) {
                const val = propMap[prop].toString();
                const important = val.indexOf(IMPORTANT) < 0 && propMap[IMPORTANT]
                    ? ' !important'
                    : STR_EMPTY;
                result.push(Maple.propExtensionMap[prop]
                    ? Maple.propExtensionMap[prop](val, important)
                    : `${prop}:${val}${important};`);
            }
            // close selector
            result.push(`}`);
        }
        // close media query
        if (media !== BREAKPOINT.minMedia) {
            result.push(`}`);
        }
        return result.length > 2 ? result.join(STR_EMPTY) : STR_EMPTY;
    }
    static generateWhitelist(whitelist = []) {
        const classList = [];
        for (const utilKey of whitelist) {
            if (!Maple.utilClassMap[utilKey]) {
                classList.push(utilKey);
                continue;
            }
            const props = Object.keys(Maple.utilClassMap[utilKey]);
            for (const utilVal of props) {
                if (utilVal.charAt(0) === PREFIX_MAPLE_PROP) {
                    continue;
                }
                const breakpoints = Object.keys(Maple.breakpointMap);
                for (const bp of breakpoints) {
                    const mediaUp = bp + SUFFIX_MEDIA_UP;
                    const mediaDown = bp + SUFFIX_MEDIA_DOWN;
                    const utilClass = SEP_UTIL_KEY + utilKey + SEP_UTIL_VAL + utilVal;
                    if (mediaUp in BREAKPOINT.media) {
                        classList.push(mediaUp + utilClass);
                    }
                    if (mediaDown in BREAKPOINT.media) {
                        classList.push(mediaDown + utilClass);
                    }
                }
            }
        }
        Maple.fly(preInitClassList.concat(classList));
        preInitClassListGenerated = true;
    }
    static splitLastOccurrence(str, key) {
        const pos = str.lastIndexOf(key);
        const result = [];
        const firstPart = str.substring(0, pos);
        const lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    }
    static splitFirstOccurrence(str, key) {
        const pos = str.indexOf(key);
        const result = [];
        const firstPart = str.substring(0, pos);
        const lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    }
    static init(document, enabled, utilClassMap = {}, whitelist, variables = Maple.variables, isRtl = false, utilPrefixList = [], propExtensionMap = {}) {
        isMapleEnabled = enabled;
        if (isMapleEnabled === false) {
            return;
        }
        doc = document;
        Maple.CACHE = {};
        Maple.variables = {
            ...Maple.variables,
            ...variables,
        };
        MapleColorHelper.generateAlphaColors(Maple.variables.color);
        Maple.utilClassMap = {
            ...getMapleUtilityClassMap(Maple.variables),
            ...utilClassMap,
        };
        Maple.utilPrefixList = [
            ...getMapleUtilityVariableMap(Maple.variables),
            ...utilPrefixList,
        ];
        Maple.propExtensionMap = {
            ...MAPLE_PROP_EXTENSION_MAP,
            ...propExtensionMap,
        };
        Maple.breakpointMap = {
            ...Maple.variables.breakpoint,
        };
        Maple.setMinAndMaxBreakpoints();
        Maple.createDomElements(STYLE_ELEMENTS);
        Maple.extendProperties();
        Maple.utilClassMap = Maple.convertUtilClassMapToRtl(Maple.utilClassMap, isRtl);
        Maple.generateWhitelist(whitelist);
        this.onInit$.next(true);
    }
    static findAndFly(str) {
        if (isMapleEnabled === false) {
            return;
        }
        if (str) {
            Maple.fly((str.match(R_EXTRACT_CLASS) || [])
                .join(' ')
                .replace(/class\=\"/g, '')
                .replace(/"/g, ''));
        }
    }
    static convertUtilClassMapToRtl(utilityClass, isRtl) {
        if (!isRtl) {
            return utilityClass;
        }
        const data = {};
        Object.keys(utilityClass).forEach((key) => {
            const value = utilityClass[key];
            if (value && typeof value === 'object' && value.rtl) {
                Object.keys(value.rtl).reduce((rtlValue, rtlKey) => {
                    rtlValue[rtlKey] = value.rtl[rtlKey];
                }, value);
            }
            if (typeof value === 'string' || typeof value === 'number') {
                if (key.includes('left')) {
                    const replacedKey = key.replace('left', 'right');
                    data[replacedKey] = value;
                }
                else if (key.includes('right')) {
                    const replacedKey = key.replace('right', 'left');
                    data[replacedKey] = value;
                }
                else {
                    data[key] = value;
                }
                if (typeof value === 'string' && value.includes('left')) {
                    data[key] = value.replace('left', 'right');
                }
                else if (typeof value === 'string' && value.includes('right')) {
                    data[key] = value.replace('right', 'left');
                }
                else if (typeof value === 'string' &&
                    key === 'transform' &&
                    value.includes('translate') &&
                    !['Y(', 'Z('].some((t) => value.includes(t))) {
                    data[key] = value
                        .split(' ')
                        .map((item) => {
                        const splittedValue = item.split('(');
                        splittedValue[1] =
                            splittedValue[1] && splittedValue[1].startsWith('-')
                                ? splittedValue[1].replace('-', '(')
                                : splittedValue[1]
                                    ? '(-' + splittedValue[1]
                                    : '';
                        return splittedValue[0] + splittedValue[1];
                    })
                        .join(' ');
                }
            }
            else {
                const fixedUtility = Maple.convertUtilClassMapToRtl({ ...value }, isRtl);
                data[key] = { ...fixedUtility };
            }
        });
        return data;
    }
    static fly(classList, shadowRoot) {
        if (isMapleEnabled === false) {
            return;
        }
        if (!preInitClassListGenerated) {
            preInitClassList = preInitClassList.concat(classList);
            return;
        }
        if (!classList || classList.length === 0) {
            return;
        }
        const rawCacheKey = Array.isArray(classList)
            ? classList.join(' ')
            : classList;
        if (Maple.rawCache[rawCacheKey] && !shadowRoot) {
            return;
        }
        Maple.rawCache[rawCacheKey] = 1;
        if (Array.isArray(classList) === false) {
            classList = classList.split(/\s+/g);
        }
        classList = Maple.unifyUtilityClass(classList);
        Maple.tempCache = {};
        for (const classItem of classList) {
            // Check whether the styles will have !important flag or not
            const important = classItem.charAt(classItem.length - 1) === IMPORTANT;
            const classItemWithoutImportant = classItem.replace(IMPORTANT, STR_EMPTY);
            let parts = Maple.splitLastOccurrence(classItemWithoutImportant, SEP_UTIL_VAL);
            // Extract utility value
            const utilVal = parts.length === 1 ? null : parts.pop();
            // Extract media query
            const media = Object.keys(BREAKPOINT.media).find((key) => classItem.indexOf(key) === 0) || BREAKPOINT.minMedia;
            parts = Maple.splitFirstOccurrence(parts.join(STR_EMPTY), media)
                .join(STR_EMPTY)
                .split(SEP_UTIL_KEY)
                .filter((p) => !!p);
            // Exact utility class
            const utilKey = parts.length >= 1 ? parts.pop() : null;
            // Extract selector
            let selKey = parts.join(SEP_UTIL_KEY);
            if (!selKey && shadowRoot) {
                selKey = ':host';
            }
            // Get style map
            const maple = Maple.utilClassMap[utilKey];
            // Without a style map we can't create styles
            if (!maple) {
                continue;
            }
            // Cache default styles with selector
            if (maple._default) {
                Object.keys(maple._default).forEach((mediaItem) => {
                    Maple.cache(mediaItem, Maple.getSelectors(null, selKey, utilKey, null, maple._selector, important, !!shadowRoot), {
                        ...maple._common,
                        ...maple[maple._default[mediaItem]],
                    }, !!shadowRoot);
                });
            }
            // Cache utility styles with selector
            if (utilVal) {
                const c = classItem.replace(IMPORTANT, STR_EMPTY);
                const ucm = Maple.utilClassMap;
                //#region Wildcard selectors
                // *:util-key
                // *:util-key=util-val
                // *.selector:util-key=util-val
                // *:selector-key:util-key=util-val
                const wcMedia = c.replace(media, WILDCARD);
                // media:*
                // media.selector:*
                // media:selector-key:*
                const wcutilKey = c.replace(R_SEP_UTIL_KEY, `:${WILDCARD}`);
                // media:util-key=*
                // media.selector:util-key=*
                // media:selector-key:util-key=*
                const wcutilVal = c.replace(R_SEP_UTIL_VAL, `=${WILDCARD}`);
                // *:*
                // *.selector:*
                // *:selector-key:*
                const wcMediaKey = wcMedia.replace(R_SEP_UTIL_KEY, `:${WILDCARD}`);
                // *:util-key=*
                // *.selector:util-key=*
                // *:selector-key:util-key=*
                const wcMediaVal = wcutilVal.replace(media, WILDCARD);
                //#endregion
                const selector = Maple.getSelectors(media, selKey, utilKey, utilVal, maple._selector, important, !!shadowRoot);
                Maple.cache(media, selector, {
                    ...maple._common,
                    ...maple[utilVal],
                    ...JSON.parse(JSON.stringify(maple[utilVal.replace(R_CUSTOM, WILDCARD)] || {}).replace(R_WILDCARD, utilKey === 'content'
                        ? utilVal.replace(R_CUSTOM, '$1')
                        : utilKey === 'grid-areas'
                            ? `\\"${utilVal
                                .replace(R_CUSTOM, '$1')
                                .replace(R_SEP_VAL_SPACE, ' ')
                                .replace(R_SEP_GRID_ROW_SPACE, '\\" \\"')}\\"`
                            : utilVal
                                .replace(R_CUSTOM, '$1')
                                .replace(R_SEP_VAL_SPACE, ' '))),
                    ...(ucm[wcMediaKey] || {}),
                    ...(ucm[wcutilKey] || {}),
                    ...(ucm[wcMediaVal] || {}),
                    ...(ucm[wcutilVal] || {}),
                    ...(ucm[wcMedia] || {}),
                    ...(ucm[c] || {}),
                    [IMPORTANT]: important,
                }, !!shadowRoot);
            }
        }
        //#region Generate styles
        // Generate min media query styles
        const styleElements = shadowRoot ? {} : STYLE_ELEMENTS;
        const minMediaStyles = Maple.styles(BREAKPOINT.minMedia);
        if (minMediaStyles) {
            Maple.appendStyle(styleElements, BREAKPOINT.minMedia, minMediaStyles, false, shadowRoot);
        }
        // Generate media query styles
        const mediaQueryStyles = {};
        Object.keys(Maple.tempCache).forEach((key) => {
            if (key !== BREAKPOINT.minMedia) {
                mediaQueryStyles[key] = mediaQueryStyles[key] || '';
                mediaQueryStyles[key] += Maple.styles(key);
            }
        });
        Object.keys(mediaQueryStyles).forEach((key) => Maple.appendStyle(styleElements, key, mediaQueryStyles[key], false, shadowRoot));
        //#endregion
    }
    static unifyUtilityClass(classList) {
        return classList.reduce((acc, classItem) => {
            const existingStyleIndex = acc.findIndex((p) => ((p || '').split(R_UNIFIY) || [])[0] ===
                ((classItem || '').split(R_UNIFIY) || [])[0]);
            if (existingStyleIndex < 0) {
                acc.push(classItem);
            }
            else {
                acc[existingStyleIndex] = classItem;
            }
            return acc;
        }, []);
    }
    static appendStyle(styleElements, bp, style, silent = true, shadowRoot) {
        if (!Object.keys(styleElements).length && shadowRoot) {
            Maple.createDomElements(styleElements, 'maple', shadowRoot);
        }
        styleElements[bp].appendChild(doc.createTextNode(style));
        if (!silent) {
            Maple.onStyleAppend$.next({ bp, style });
        }
    }
    static isMediaValid(media) {
        return media in BREAKPOINT.media;
    }
    static isBreakpointValid(breakpoint) {
        return breakpoint in Maple.breakpointMap;
    }
    static isMediaMatchesWithBreakpoint(media, breakpoint) {
        if (!Maple.isBreakpointValid(breakpoint) || !Maple.isMediaValid(media)) {
            return false;
        }
        const mediaSize = BREAKPOINT.media[media];
        const breakpointSize = parseFloat(Maple.breakpointMap[breakpoint]);
        if (media.includes(SUFFIX_MEDIA_DOWN)) {
            return breakpointSize <= mediaSize;
        }
        if (media.includes(SUFFIX_MEDIA_UP)) {
            return breakpointSize >= mediaSize;
        }
        return false;
    }
    static getValidMediaMap() {
        return { ...BREAKPOINT.media };
    }
    static getMinMedia() {
        return BREAKPOINT.minMedia;
    }
    static getMinBreakpoint() {
        return BREAKPOINT.minKey;
    }
    static getMappedMediaOrMin(media) {
        return Maple.isMediaValid(media) ? media : Maple.getMinMedia();
    }
    static getMappedMediaOrNull(media) {
        return Maple.isMediaValid(media) ? media : null;
    }
    static getMappedBreakpointOrMin(breakpoint) {
        return Maple.isBreakpointValid(breakpoint)
            ? breakpoint
            : Maple.getMinBreakpoint();
    }
    static getMappedBreakpointOrNull(breakpoint) {
        return Maple.isBreakpointValid(breakpoint) ? breakpoint : null;
    }
    static getVariables() {
        return { ...Maple.variables };
    }
    static fillInTheGaps(breakpointMap) {
        const fullBreakpointMap = Maple.getVariables().breakpoint;
        const keys = Object.keys(fullBreakpointMap);
        const minKey = keys.find((key) => key in breakpointMap);
        return keys
            .sort((a, b) => fullBreakpointMap[a] - fullBreakpointMap[b])
            .reduce((acc, key, i) => {
            const nextKey = keys[i + 1];
            if (key in acc === false) {
                acc = {
                    ...acc,
                    [key]: key in breakpointMap ? breakpointMap[key] : breakpointMap[minKey],
                };
            }
            if (nextKey && !breakpointMap[nextKey]) {
                acc = {
                    ...acc,
                    [nextKey]: acc[key],
                };
            }
            return acc;
        }, {});
    }
    static isBreakpointMap(breakpointMap) {
        if (typeof breakpointMap === 'object' && breakpointMap !== null) {
            return Object.keys(Maple.getVariables().breakpoint).some((key) => breakpointMap && key in breakpointMap);
        }
        return false;
    }
}
Maple.CACHE = {};
Maple.variables = {
    breakpoint: MAPLE_VAR_BREAKPOINT,
    color: MAPLE_VAR_COLOR,
    fontFamily: MAPLE_VAR_FONT_FAMILY,
    fontSize: MAPLE_VAR_FONT_SIZE,
    fontWeight: MAPLE_VAR_FONT_WEIGHT,
    maxWidth: MAPLE_VAR_MAX_WIDTH,
    spacer: MAPLE_VAR_SPACER,
    transition: MAPLE_VAR_TRANSITION,
    button: MAPLE_VAR_BUTTON,
    alert: MAPLE_VAR_ALERT,
};
Maple.breakpointMap = {};
Maple.utilClassMap = {};
Maple.utilPrefixList = [];
Maple.propExtensionMap = {};
Maple.rawCache = {};
Maple.tempCache = {};
Maple.onStyleAppend$ = new BehaviorSubject(null);
Maple.onInit$ = new BehaviorSubject(false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvcmUvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLDBCQUEwQixHQUMzQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFOUQsK0VBQStFO0FBQy9FLE1BQU0sVUFBVSxHQUFRO0lBQ3RCLEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQztBQUNGLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUUxQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDckIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFD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M0IsY0FBUSxHQUFRLEVBQUUsQ0FBQztBQUNuQixlQUFTLEdBQVEsRUFBRSxDQUFDO0FBQ3JCLG9CQUFjLEdBQXlCLElBQUksZUFBZSxDQUN0RSxJQUFJLENBQ0wsQ0FBQztBQUNZLGFBQU8sR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hcGxlQ29sb3JIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvY29sb3IuaGVscGVyJztcbmltcG9ydCB7IE1BUExFX1BST1BfRVhURU5TSU9OX01BUCB9IGZyb20gJy4vcHJvcGVydHktZXh0ZW5zaW9uLW1hcCc7XG5pbXBvcnQgeyBNYXBsZVZhcmlhYmxlTW9kZWwgfSBmcm9tICcuL3R5cGVzL3ZhcmlhYmxlcy5tb2RlbCc7XG5pbXBvcnQge1xuICBnZXRNYXBsZVV0aWxpdHlDbGFzc01hcCxcbiAgZ2V0TWFwbGVVdGlsaXR5VmFyaWFibGVNYXAsXG59IGZyb20gJy4vdXRpbGl0eS1jbGFzcy1tYXAnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0FMRVJUIH0gZnJvbSAnLi92YXJpYWJsZXMvYWxlcnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JSRUFLUE9JTlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9icmVha3BvaW50JztcbmltcG9ydCB7IE1BUExFX1ZBUl9CVVRUT04gfSBmcm9tICcuL3ZhcmlhYmxlcy9idXR0b24nO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0NPTE9SIH0gZnJvbSAnLi92YXJpYWJsZXMvY29sb3InO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfRkFNSUxZIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1mYW1pbHknO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfU0laRSB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtc2l6ZSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9XRUlHSFQgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LXdlaWdodCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfTUFYX1dJRFRIIH0gZnJvbSAnLi92YXJpYWJsZXMvbWF4LXdpZHRoJztcbmltcG9ydCB7IE1BUExFX1ZBUl9TUEFDRVIgfSBmcm9tICcuL3ZhcmlhYmxlcy9zcGFjZXInO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1RSQU5TSVRJT04gfSBmcm9tICcuL3ZhcmlhYmxlcy90cmFuc2l0aW9uJztcblxuLy8gRGVmaW5lIGEgZ2xvYmFsIE1hcGxlLkNBQ0hFIHRvIGNvbGxlY3Qgc2VsZWN0b3JzIGFuZCBtYXBzIG9uIGJyZWFrcG9pbnQga2V5c1xuY29uc3QgQlJFQUtQT0lOVDogYW55ID0ge1xuICBtZWRpYToge30sXG59O1xuY29uc3QgU1RZTEVfRUxFTUVOVFMgPSB7fTtcblxuY29uc3QgU1RSX0VNUFRZID0gJyc7XG5jb25zdCBTVFJfU1BBQ0UgPSAnICc7XG5jb25zdCBTVFJfRE9UID0gJy4nO1xuY29uc3QgU1RSX1VQID0gJ3VwJztcbmNvbnN0IFNUUl9ET1dOID0gJ2Rvd24nO1xuY29uc3QgU0VQX01FRElBID0gJy0nO1xuY29uc3QgU0VQX1NFTEVDVE9SID0gJzonO1xuY29uc3QgU0VQX1VUSUxfS0VZID0gJzonO1xuY29uc3QgU0VQX1VUSUxfVkFMID0gJz0nO1xuY29uc3QgU0VQX05PX1NQQUNFID0gJzwnO1xuY29uc3QgU0VQX09VVEVSX1NQQUNFID0gJzw8JztcbmNvbnN0IElNUE9SVEFOVCA9ICchJztcbmNvbnN0IFdJTERDQVJEID0gJyonO1xuXG5jb25zdCBQUkVGSVhfTUFQTEVfUFJPUCA9ICdfJztcbmNvbnN0IFNVRkZJWF9NRURJQV9VUCA9IFNFUF9NRURJQSArIFNUUl9VUDtcbmNvbnN0IFNVRkZJWF9NRURJQV9ET1dOID0gU0VQX01FRElBICsgU1RSX0RPV047XG5cbmNvbnN0IFJfU0VMRUNUT1JfUkVTRVJWRUQgPVxuICAvKFxcLnxcXCt8XFx+fFxcPHxcXD58XFxbfFxcXXxcXCh8XFwpfFxcIXxcXDp8XFwsfFxcPXxcXHx8XFwlfFxcI3xcXCp8XFxcInxcXC8pL2c7XG5jb25zdCBSX0VTQ0FQRV9SRVNFUlZFRCA9ICdcXFxcJDEnO1xuY29uc3QgUl9TRVBfTk9fU1BBQ0UgPSAvXFw8L2c7XG5jb25zdCBSX1NFUF9TRUxfU1BBQ0UgPSAvXFw+XFw+L2c7XG5jb25zdCBSX1NFUF9TRUxfU1BBQ0VfQUxMID0gLyhcXDx8XFw+XFw+KS9nO1xuY29uc3QgUl9TRVBfVkFMX1NQQUNFID0gL1xcfC9nO1xuY29uc3QgUl9TRVBfR1JJRF9ST1dfU1BBQ0UgPSAvXFwtL2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgcHJlSW5pdENsYXNzTGlzdEdlbmVyYXRlZCA9IGZhbHNlO1xubGV0IGlzTWFwbGVFbmFibGVkID0gdHJ1ZTtcbmxldCBkb2M7XG5cbmNvbnN0IGVzYyA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PlxuICBzZWxlY3Rvci5yZXBsYWNlKFJfU0VMRUNUT1JfUkVTRVJWRUQsIFJfRVNDQVBFX1JFU0VSVkVEKTtcblxuZXhwb3J0IGNsYXNzIE1hcGxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgQ0FDSEUgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdmFyaWFibGVzOiBNYXBsZVZhcmlhYmxlTW9kZWwgPSB7XG4gICAgYnJlYWtwb2ludDogTUFQTEVfVkFSX0JSRUFLUE9JTlQsXG4gICAgY29sb3I6IE1BUExFX1ZBUl9DT0xPUixcbiAgICBmb250RmFtaWx5OiBNQVBMRV9WQVJfRk9OVF9GQU1JTFksXG4gICAgZm9udFNpemU6IE1BUExFX1ZBUl9GT05UX1NJWkUsXG4gICAgZm9udFdlaWdodDogTUFQTEVfVkFSX0ZPTlRfV0VJR0hULFxuICAgIG1heFdpZHRoOiBNQVBMRV9WQVJfTUFYX1dJRFRILFxuICAgIHNwYWNlcjogTUFQTEVfVkFSX1NQQUNFUixcbiAgICB0cmFuc2l0aW9uOiBNQVBMRV9WQVJfVFJBTlNJVElPTixcbiAgICBidXR0b246IE1BUExFX1ZBUl9CVVRUT04sXG4gICAgYWxlcnQ6IE1BUExFX1ZBUl9BTEVSVCxcbiAgfTtcbiAgcHJpdmF0ZSBzdGF0aWMgYnJlYWtwb2ludE1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxDbGFzc01hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgc3RhdGljIHByb3BFeHRlbnNpb25NYXA6IGFueSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByYXdDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHRlbXBDYWNoZTogYW55ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgb25TdHlsZUFwcGVuZCQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcbiAgICBudWxsLFxuICApO1xuICBwdWJsaWMgc3RhdGljIG9uSW5pdCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gRmluZCBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuICBwcml2YXRlIHN0YXRpYyBzZXRNaW5BbmRNYXhCcmVha3BvaW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBicmVha3BvaW50S2V5czogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludEtleXNcbiAgICAgIC5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICBzaXplOiBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBba2V5XSksXG4gICAgICB9KSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpO1xuXG4gICAgQlJFQUtQT0lOVC5taW5LZXkgPSBicmVha3BvaW50c1swXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5tYXhLZXkgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5taW5NZWRpYSA9IEJSRUFLUE9JTlQubWluS2V5ICsgU1VGRklYX01FRElBX1VQO1xuXG4gICAgYnJlYWtwb2ludHMuZm9yRWFjaCgoYnA6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYnJlYWtwb2ludHNbaSArIDFdO1xuICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfVVBdID0gYnAuc2l6ZTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzgyNjFcbiAgICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfRE9XTl0gPSBuZXh0LnNpemUgLSAwLjAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVEb21FbGVtZW50cyhcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgcHJlZml4OiBzdHJpbmcgPSAnbWFwbGUnLFxuICAgIGRvY3VtZW50PzogYW55LFxuICApOiB2b2lkIHtcbiAgICAvLyBQcmVwYXJlIHN0eWxlIGVsZW1lbnQgb24gaGVhZFxuICAgIGNvbnN0IGRvY0hlYWQgPSBkb2N1bWVudD8uaG9zdFxuICAgICAgPyBkb2N1bWVudFxuICAgICAgOiAoZG9jdW1lbnQgfHwgZG9jKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuc29ydChcbiAgICAgIChhLCBiKSA9PiBCUkVBS1BPSU5ULm1lZGlhW2FdIC0gQlJFQUtQT0lOVC5tZWRpYVtiXSxcbiAgICApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzVXAgPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNEb3duID0gYnJlYWtwb2ludHMuZmlsdGVyKChrZXkpID0+XG4gICAgICBrZXkuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pLFxuICAgICk7XG5cbiAgICBicmVha3BvaW50c1VwLmNvbmNhdChicmVha3BvaW50c0Rvd24ucmV2ZXJzZSgpKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlSWQgPSBgJHtwcmVmaXh9LSR7a2V5fWA7XG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50Py5ob3N0ID8gbnVsbCA6IGRvYy5nZXRFbGVtZW50QnlJZChzdHlsZUlkKTtcbiAgICAgIGlmICghIWVsKSB7XG4gICAgICAgIGRvY0hlYWQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfVxuICAgICAgc3R5bGVFbGVtZW50c1trZXldID0gKGRvYyBhcyBEb2N1bWVudCkuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIChzdHlsZUVsZW1lbnRzW2tleV0gYXMgSFRNTEVsZW1lbnQpLnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZUlkKTtcblxuICAgICAgZG9jSGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXh0ZW5kUHJvcGVydGllcygpOiB2b2lkIHtcbiAgICBNYXBsZS51dGlsUHJlZml4TGlzdC5mb3JFYWNoKChkZWY6IGFueSkgPT4ge1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdID0gTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdIHx8IHt9O1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoZGVmLm1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldID0ge307XG4gICAgICAgIGRlZi5wcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHtcbiAgICAgICAgICAgIC4uLk1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0sXG4gICAgICAgICAgICBbcHJvcF06IFdJTERDQVJELFxuICAgICAgICAgIH07XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV1bcHJvcF0gPSBkZWYubWFwW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWxlY3RvcnMoXG4gICAgbWVkaWE6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBzZWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbFZhbDogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIF9zZWxlY3Rvcjogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIGltcG9ydGFudDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNoYWRvd1Jvb3Q6IGJvb2xlYW4sXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgbWFwbGUgPSBNYXBsZS51dGlsQ2xhc3NNYXBbc2VsS2V5XSB8fCB7fTtcbiAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IHNlbEtleS5pbmNsdWRlcyhTRVBfT1VURVJfU1BBQ0UpXG4gICAgICA/IHNlbEtleS5zcGxpdChTRVBfT1VURVJfU1BBQ0UpLnBvcCgpLnNwbGl0KFJfU0VQX1NFTF9TUEFDRV9BTEwpLnNoaWZ0KClcbiAgICAgIDogU1RSX0VNUFRZO1xuXG4gICAgY29uc3QgYmFzZVNlbCA9IFtcbiAgICAgIG1lZGlhIHx8IFNUUl9FTVBUWSxcbiAgICAgIG1hcGxlLl9zZWxlY3RvciA/IFNFUF9TRUxFQ1RPUiA6IFNUUl9FTVBUWSxcbiAgICAgIHNlbEtleSxcbiAgICAgIHV0aWxLZXkgPyBTRVBfVVRJTF9LRVkgOiBTVFJfRU1QVFksXG4gICAgICB1dGlsS2V5LFxuICAgICAgdXRpbFZhbCA/IFNFUF9VVElMX1ZBTCA6IFNUUl9FTVBUWSxcbiAgICBdLmpvaW4oU1RSX0VNUFRZKTtcblxuICAgIHJldHVybiAoKG1hcGxlLl9zZWxlY3RvciB8fCBzZWxLZXkgfHwgJycpICsgX3NlbGVjdG9yKVxuICAgICAgLnNwbGl0KC8sXFxzKi8pXG4gICAgICAubWFwKChzZWxlY3RvcikgPT5cbiAgICAgICAgW1xuICAgICAgICAgIC4uLighc2hhZG93Um9vdFxuICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFNUUl9TUEFDRSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICAgICAgICB1dGlsVmFsID8gU1RSX0RPVCA6IFNUUl9FTVBUWSxcbiAgICAgICAgICAgICAgICB1dGlsVmFsID8gZXNjKGJhc2VTZWwgKyB1dGlsVmFsKSA6IGBbY2xhc3MqPVwiJHtiYXNlU2VsfVwiXWAsXG4gICAgICAgICAgICAgICAgdXRpbFZhbCAmJiBpbXBvcnRhbnQgPyBlc2MoSU1QT1JUQU5UKSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IgfHwgIXNlbEtleSB8fCBzZWxLZXkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvci50cmltKCkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKFNFUF9PVVRFUl9TUEFDRSArIHBhcmVudFNlbGVjdG9yLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX05PX1NQQUNFLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAucmVwbGFjZShzaGFkb3dSb290ID8gL15cXD4vIDogU1RSX0VNUFRZLCBTVFJfRU1QVFkpLFxuICAgICAgICBdLmpvaW4oU1RSX0VNUFRZKSxcbiAgICAgIClcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYWNoZShcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICAgbWFwVG9CZUNhY2hlZDogYW55LFxuICAgIHNoYWRvd1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFtYXBUb0JlQ2FjaGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5IG1hcCBub3QgZm91bmQgZm9yIHNlbGVjdG9yOiAke3NlbGVjdG9yfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlS2V5ID0gYCR7bWVkaWF9JHtzZWxlY3Rvcn0ke0pTT04uc3RyaW5naWZ5KG1hcFRvQmVDYWNoZWQpfWA7XG4gICAgaWYgKCFNYXBsZS5DQUNIRVtjYWNoZUtleV0gfHwgc2hhZG93Um9vdCkge1xuICAgICAgTWFwbGUudGVtcENhY2hlW21lZGlhXSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gfHwge307XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0ge1xuICAgICAgICAuLi5NYXBsZS50ZW1wQ2FjaGVbbWVkaWFdLFxuICAgICAgICBbc2VsZWN0b3JdOiB7XG4gICAgICAgICAgLi4uKE1hcGxlLnRlbXBDYWNoZVttZWRpYV1bc2VsZWN0b3JdIHx8IHt9KSxcbiAgICAgICAgICAuLi5tYXBUb0JlQ2FjaGVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIE1hcGxlLkNBQ0hFW2NhY2hlS2V5XSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3R5bGVzKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNhY2hlSXRlbSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV07XG4gICAgaWYgKCFjYWNoZUl0ZW0pIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoY2FjaGVJdGVtKTtcblxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJ0cyA9IG1lZGlhLnNwbGl0KFNFUF9NRURJQSk7XG4gICAgY29uc3QgYnJlYWtwb2ludERpciA9IGJyZWFrcG9pbnRQYXJ0c1sxXTtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gYnJlYWtwb2ludERpciA9PT0gU1RSX1VQID8gJ21pbi13aWR0aCcgOiAnbWF4LXdpZHRoJztcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8vIG9wZW4gbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGBAbWVkaWEgKCR7bWVkaWFRdWVyeX06ICR7QlJFQUtQT0lOVC5tZWRpYVttZWRpYV19cHgpIHtgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgY29uc3QgcHJvcE1hcCA9IGNhY2hlSXRlbVtzZWxlY3Rvcl07XG4gICAgICBpZiAoIXByb3BNYXApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BNYXBLZXlzID0gT2JqZWN0LmtleXMocHJvcE1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBJTVBPUlRBTlQpO1xuICAgICAgaWYgKHByb3BNYXBLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYCR7c2VsZWN0b3J9e2ApO1xuXG4gICAgICAvLyBmaWxsIHNlbGVjdG9yIHdpdGggcHJvcGVydGllc1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BNYXBLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BNYXBbcHJvcF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0YW50ID1cbiAgICAgICAgICB2YWwuaW5kZXhPZihJTVBPUlRBTlQpIDwgMCAmJiBwcm9wTWFwW0lNUE9SVEFOVF1cbiAgICAgICAgICAgID8gJyAhaW1wb3J0YW50J1xuICAgICAgICAgICAgOiBTVFJfRU1QVFk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF1cbiAgICAgICAgICAgID8gTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXSh2YWwsIGltcG9ydGFudClcbiAgICAgICAgICAgIDogYCR7cHJvcH06JHt2YWx9JHtpbXBvcnRhbnR9O2AsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsb3NlIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDIgPyByZXN1bHQuam9pbihTVFJfRU1QVFkpIDogU1RSX0VNUFRZO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV0aWxLZXkgb2Ygd2hpdGVsaXN0KSB7XG4gICAgICBpZiAoIU1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSkge1xuICAgICAgICBjbGFzc0xpc3QucHVzaCh1dGlsS2V5KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKTtcbiAgICAgIGZvciAoY29uc3QgdXRpbFZhbCBvZiBwcm9wcykge1xuICAgICAgICBpZiAodXRpbFZhbC5jaGFyQXQoMCkgPT09IFBSRUZJWF9NQVBMRV9QUk9QKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGJwIG9mIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgY29uc3QgbWVkaWFVcCA9IGJwICsgU1VGRklYX01FRElBX1VQO1xuICAgICAgICAgIGNvbnN0IG1lZGlhRG93biA9IGJwICsgU1VGRklYX01FRElBX0RPV047XG4gICAgICAgICAgY29uc3QgdXRpbENsYXNzID0gU0VQX1VUSUxfS0VZICsgdXRpbEtleSArIFNFUF9VVElMX1ZBTCArIHV0aWxWYWw7XG4gICAgICAgICAgaWYgKG1lZGlhVXAgaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFVcCArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZWRpYURvd24gaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFEb3duICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgTWFwbGUuZmx5KHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCkpO1xuICAgIHByZUluaXRDbGFzc0xpc3RHZW5lcmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRMYXN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIubGFzdEluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRGaXJzdE9jY3VycmVuY2Uoc3RyOiBzdHJpbmcsIGtleTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgcG9zID0gc3RyLmluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0KFxuICAgIGRvY3VtZW50OiBhbnksXG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICB1dGlsQ2xhc3NNYXA6IGFueSA9IHt9LFxuICAgIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IE1hcGxlLnZhcmlhYmxlcyxcbiAgICBpc1J0bDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge30sXG4gICk6IHZvaWQge1xuICAgIGlzTWFwbGVFbmFibGVkID0gZW5hYmxlZDtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvYyA9IGRvY3VtZW50O1xuICAgIE1hcGxlLkNBQ0hFID0ge307XG4gICAgTWFwbGUudmFyaWFibGVzID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLFxuICAgICAgLi4udmFyaWFibGVzLFxuICAgIH07XG4gICAgTWFwbGVDb2xvckhlbHBlci5nZW5lcmF0ZUFscGhhQ29sb3JzKE1hcGxlLnZhcmlhYmxlcy5jb2xvcik7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0ge1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxDbGFzc01hcCxcbiAgICB9O1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0ID0gW1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5VmFyaWFibGVNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxQcmVmaXhMaXN0LFxuICAgIF07XG4gICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcCA9IHtcbiAgICAgIC4uLk1BUExFX1BST1BfRVhURU5TSU9OX01BUCxcbiAgICAgIC4uLnByb3BFeHRlbnNpb25NYXAsXG4gICAgfTtcbiAgICBNYXBsZS5icmVha3BvaW50TWFwID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLmJyZWFrcG9pbnQsXG4gICAgfTtcbiAgICBNYXBsZS5zZXRNaW5BbmRNYXhCcmVha3BvaW50cygpO1xuICAgIE1hcGxlLmNyZWF0ZURvbUVsZW1lbnRzKFNUWUxFX0VMRU1FTlRTKTtcbiAgICBNYXBsZS5leHRlbmRQcm9wZXJ0aWVzKCk7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0gTWFwbGUuY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgICAgTWFwbGUudXRpbENsYXNzTWFwLFxuICAgICAgaXNSdGwsXG4gICAgKTtcbiAgICBNYXBsZS5nZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3QpO1xuICAgIHRoaXMub25Jbml0JC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaW5kQW5kRmx5KHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICBNYXBsZS5mbHkoXG4gICAgICAgIChzdHIubWF0Y2goUl9FWFRSQUNUX0NMQVNTKSB8fCBbXSlcbiAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgLnJlcGxhY2UoL2NsYXNzXFw9XFxcIi9nLCAnJylcbiAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJycpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICB1dGlsaXR5Q2xhc3M6IGFueSxcbiAgICBpc1J0bDogYm9vbGVhbixcbiAgKTogYW55IHtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICByZXR1cm4gdXRpbGl0eUNsYXNzO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModXRpbGl0eUNsYXNzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdXRpbGl0eUNsYXNzW2tleV07XG4gICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ydGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUucnRsKS5yZWR1Y2UoKHJ0bFZhbHVlLCBydGxLZXkpID0+IHtcbiAgICAgICAgICBydGxWYWx1ZVtydGxLZXldID0gdmFsdWUucnRsW3J0bEtleV07XG4gICAgICAgIH0sIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5LmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ2xlZnQnKSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLnJlcGxhY2UoJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICBrZXkgPT09ICd0cmFuc2Zvcm0nICYmXG4gICAgICAgICAgdmFsdWUuaW5jbHVkZXMoJ3RyYW5zbGF0ZScpICYmXG4gICAgICAgICAgIVsnWSgnLCAnWignXS5zb21lKCh0KSA9PiB2YWx1ZS5pbmNsdWRlcyh0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkVmFsdWUgPSBpdGVtLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gPVxuICAgICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gJiYgc3BsaXR0ZWRWYWx1ZVsxXS5zdGFydHNXaXRoKCctJylcbiAgICAgICAgICAgICAgICAgID8gc3BsaXR0ZWRWYWx1ZVsxXS5yZXBsYWNlKCctJywgJygnKVxuICAgICAgICAgICAgICAgICAgOiBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA/ICcoLScgKyBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgICAgICAgIHJldHVybiBzcGxpdHRlZFZhbHVlWzBdICsgc3BsaXR0ZWRWYWx1ZVsxXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaXhlZFV0aWxpdHkgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICAgICAgeyAuLi52YWx1ZSB9LFxuICAgICAgICAgIGlzUnRsLFxuICAgICAgICApO1xuICAgICAgICBkYXRhW2tleV0gPSB7IC4uLmZpeGVkVXRpbGl0eSB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmbHkoY2xhc3NMaXN0OiBhbnksIHNoYWRvd1Jvb3Q/OiBEb2N1bWVudEZyYWdtZW50KTogdm9pZCB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXByZUluaXRDbGFzc0xpc3RHZW5lcmF0ZWQpIHtcbiAgICAgIHByZUluaXRDbGFzc0xpc3QgPSBwcmVJbml0Q2xhc3NMaXN0LmNvbmNhdChjbGFzc0xpc3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2xhc3NMaXN0IHx8IGNsYXNzTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByYXdDYWNoZUtleSA9IEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KVxuICAgICAgPyBjbGFzc0xpc3Quam9pbignICcpXG4gICAgICA6IGNsYXNzTGlzdDtcblxuICAgIGlmIChNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gJiYgIXNoYWRvd1Jvb3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgTWFwbGUucmF3Q2FjaGVbcmF3Q2FjaGVLZXldID0gMTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpID09PSBmYWxzZSkge1xuICAgICAgY2xhc3NMaXN0ID0gY2xhc3NMaXN0LnNwbGl0KC9cXHMrL2cpO1xuICAgIH1cblxuICAgIGNsYXNzTGlzdCA9IE1hcGxlLnVuaWZ5VXRpbGl0eUNsYXNzKGNsYXNzTGlzdCk7XG5cbiAgICBNYXBsZS50ZW1wQ2FjaGUgPSB7fTtcblxuICAgIGZvciAoY29uc3QgY2xhc3NJdGVtIG9mIGNsYXNzTGlzdCkge1xuICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgc3R5bGVzIHdpbGwgaGF2ZSAhaW1wb3J0YW50IGZsYWcgb3Igbm90XG4gICAgICBjb25zdCBpbXBvcnRhbnQgPSBjbGFzc0l0ZW0uY2hhckF0KGNsYXNzSXRlbS5sZW5ndGggLSAxKSA9PT0gSU1QT1JUQU5UO1xuICAgICAgY29uc3QgY2xhc3NJdGVtV2l0aG91dEltcG9ydGFudCA9IGNsYXNzSXRlbS5yZXBsYWNlKElNUE9SVEFOVCwgU1RSX0VNUFRZKTtcblxuICAgICAgbGV0IHBhcnRzID0gTWFwbGUuc3BsaXRMYXN0T2NjdXJyZW5jZShcbiAgICAgICAgY2xhc3NJdGVtV2l0aG91dEltcG9ydGFudCxcbiAgICAgICAgU0VQX1VUSUxfVkFMLFxuICAgICAgKTtcblxuICAgICAgLy8gRXh0cmFjdCB1dGlsaXR5IHZhbHVlXG4gICAgICBjb25zdCB1dGlsVmFsID0gcGFydHMubGVuZ3RoID09PSAxID8gbnVsbCA6IHBhcnRzLnBvcCgpO1xuXG4gICAgICAvLyBFeHRyYWN0IG1lZGlhIHF1ZXJ5XG4gICAgICBjb25zdCBtZWRpYSA9XG4gICAgICAgIE9iamVjdC5rZXlzKEJSRUFLUE9JTlQubWVkaWEpLmZpbmQoXG4gICAgICAgICAgKGtleTogc3RyaW5nKSA9PiBjbGFzc0l0ZW0uaW5kZXhPZihrZXkpID09PSAwLFxuICAgICAgICApIHx8IEJSRUFLUE9JTlQubWluTWVkaWE7XG5cbiAgICAgIHBhcnRzID0gTWFwbGUuc3BsaXRGaXJzdE9jY3VycmVuY2UocGFydHMuam9pbihTVFJfRU1QVFkpLCBtZWRpYSlcbiAgICAgICAgLmpvaW4oU1RSX0VNUFRZKVxuICAgICAgICAuc3BsaXQoU0VQX1VUSUxfS0VZKVxuICAgICAgICAuZmlsdGVyKChwOiBzdHJpbmcpID0+ICEhcCk7XG5cbiAgICAgIC8vIEV4YWN0IHV0aWxpdHkgY2xhc3NcbiAgICAgIGNvbnN0IHV0aWxLZXkgPSBwYXJ0cy5sZW5ndGggPj0gMSA/IHBhcnRzLnBvcCgpIDogbnVsbDtcblxuICAgICAgLy8gRXh0cmFjdCBzZWxlY3RvclxuICAgICAgbGV0IHNlbEtleSA9IHBhcnRzLmpvaW4oU0VQX1VUSUxfS0VZKTtcbiAgICAgIGlmICghc2VsS2V5ICYmIHNoYWRvd1Jvb3QpIHtcbiAgICAgICAgc2VsS2V5ID0gJzpob3N0JztcbiAgICAgIH1cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICAgICEhc2hhZG93Um9vdCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLm1hcGxlLl9jb21tb24sXG4gICAgICAgICAgICAgIC4uLm1hcGxlW21hcGxlLl9kZWZhdWx0W21lZGlhSXRlbV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICEhc2hhZG93Um9vdCxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgdXRpbGl0eSBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKHV0aWxWYWwpIHtcbiAgICAgICAgY29uc3QgYyA9IGNsYXNzSXRlbS5yZXBsYWNlKElNUE9SVEFOVCwgU1RSX0VNUFRZKTtcbiAgICAgICAgY29uc3QgdWNtID0gTWFwbGUudXRpbENsYXNzTWFwO1xuXG4gICAgICAgIC8vI3JlZ2lvbiBXaWxkY2FyZCBzZWxlY3RvcnNcbiAgICAgICAgLy8gKjp1dGlsLWtleVxuICAgICAgICAvLyAqOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgY29uc3Qgd2NNZWRpYSA9IGMucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuXG4gICAgICAgIC8vIG1lZGlhOipcbiAgICAgICAgLy8gbWVkaWEuc2VsZWN0b3I6KlxuICAgICAgICAvLyBtZWRpYTpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y3V0aWxLZXkgPSBjLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyBtZWRpYTp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOnV0aWwta2V5PSpcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2N1dGlsVmFsID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfVkFMLCBgPSR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjoqXG4gICAgICAgIC8vICouc2VsZWN0b3I6KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleToqXG4gICAgICAgIGNvbnN0IHdjTWVkaWFLZXkgPSB3Y01lZGlhLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyAqOnV0aWwta2V5PSpcbiAgICAgICAgLy8gKi5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2NNZWRpYVZhbCA9IHdjdXRpbFZhbC5yZXBsYWNlKG1lZGlhLCBXSUxEQ0FSRCk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gTWFwbGUuZ2V0U2VsZWN0b3JzKFxuICAgICAgICAgIG1lZGlhLFxuICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgIHV0aWxWYWwsXG4gICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgICAhIXNoYWRvd1Jvb3QsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgbWVkaWEsXG4gICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAgIC4uLm1hcGxlW3V0aWxWYWxdLFxuICAgICAgICAgICAgLi4uSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgbWFwbGVbdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCBXSUxEQ0FSRCldIHx8IHt9LFxuICAgICAgICAgICAgICApLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgICB1dGlsS2V5ID09PSAnY29udGVudCdcbiAgICAgICAgICAgICAgICAgID8gdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCAnJDEnKVxuICAgICAgICAgICAgICAgICAgOiB1dGlsS2V5ID09PSAnZ3JpZC1hcmVhcydcbiAgICAgICAgICAgICAgICAgID8gYFxcXFxcIiR7dXRpbFZhbFxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJfQ1VTVE9NLCAnJDEnKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1ZBTF9TUEFDRSwgJyAnKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX0dSSURfUk9XX1NQQUNFLCAnXFxcXFwiIFxcXFxcIicpfVxcXFxcImBcbiAgICAgICAgICAgICAgICAgIDogdXRpbFZhbFxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJfQ1VTVE9NLCAnJDEnKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1ZBTF9TUEFDRSwgJyAnKSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAuLi4odWNtW3djTWVkaWFLZXldIHx8IHt9KSxcbiAgICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgICAuLi4odWNtW3djTWVkaWFWYWxdIHx8IHt9KSxcbiAgICAgICAgICAgIC4uLih1Y21bd2N1dGlsVmFsXSB8fCB7fSksXG4gICAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAgIC4uLih1Y21bY10gfHwge30pLFxuICAgICAgICAgICAgW0lNUE9SVEFOVF06IGltcG9ydGFudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgICEhc2hhZG93Um9vdCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IHN0eWxlRWxlbWVudHMgPSBzaGFkb3dSb290ID8ge30gOiBTVFlMRV9FTEVNRU5UUztcbiAgICBjb25zdCBtaW5NZWRpYVN0eWxlcyA9IE1hcGxlLnN0eWxlcyhCUkVBS1BPSU5ULm1pbk1lZGlhKTtcbiAgICBpZiAobWluTWVkaWFTdHlsZXMpIHtcbiAgICAgIE1hcGxlLmFwcGVuZFN0eWxlKFxuICAgICAgICBzdHlsZUVsZW1lbnRzLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIHNoYWRvd1Jvb3QsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShcbiAgICAgICAgc3R5bGVFbGVtZW50cyxcbiAgICAgICAga2V5LFxuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBzaGFkb3dSb290LFxuICAgICAgKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBjbGFzc0l0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3R5bGVJbmRleCA9IGFjYy5maW5kSW5kZXgoXG4gICAgICAgIChwKSA9PlxuICAgICAgICAgICgocCB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSA9PT1cbiAgICAgICAgICAoKGNsYXNzSXRlbSB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSxcbiAgICAgICk7XG4gICAgICBpZiAoZXhpc3RpbmdTdHlsZUluZGV4IDwgMCkge1xuICAgICAgICBhY2MucHVzaChjbGFzc0l0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBjbGFzc0l0ZW07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kU3R5bGUoXG4gICAgc3R5bGVFbGVtZW50czogYW55LFxuICAgIGJwOiBzdHJpbmcsXG4gICAgc3R5bGU6IHN0cmluZyxcbiAgICBzaWxlbnQ6IGJvb2xlYW4gPSB0cnVlLFxuICAgIHNoYWRvd1Jvb3Q/OiBEb2N1bWVudEZyYWdtZW50LFxuICApOiB2b2lkIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHN0eWxlRWxlbWVudHMpLmxlbmd0aCAmJiBzaGFkb3dSb290KSB7XG4gICAgICBNYXBsZS5jcmVhdGVEb21FbGVtZW50cyhzdHlsZUVsZW1lbnRzLCAnbWFwbGUnLCBzaGFkb3dSb290KTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50c1ticF0uYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgTWFwbGUub25TdHlsZUFwcGVuZCQubmV4dCh7IGJwLCBzdHlsZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFWYWxpZChtZWRpYTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1lZGlhIGluIEJSRUFLUE9JTlQubWVkaWE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBicmVha3BvaW50IGluIE1hcGxlLmJyZWFrcG9pbnRNYXA7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFNYXRjaGVzV2l0aEJyZWFrcG9pbnQoXG4gICAgbWVkaWE6IHN0cmluZyxcbiAgICBicmVha3BvaW50OiBzdHJpbmcsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludCkgfHwgIU1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVNpemUgPSBCUkVBS1BPSU5ULm1lZGlhW21lZGlhXTtcbiAgICBjb25zdCBicmVha3BvaW50U2l6ZSA9IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFticmVha3BvaW50XSk7XG5cbiAgICBpZiAobWVkaWEuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPD0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPj0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRNZWRpYU1hcCgpOiBhbnkge1xuICAgIHJldHVybiB7IC4uLkJSRUFLUE9JTlQubWVkaWEgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluTWVkaWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQlJFQUtQT0lOVC5taW5NZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluQnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbktleTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck1pbihtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogTWFwbGUuZ2V0TWluTWVkaWEoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck51bGwobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkgPyBtZWRpYSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZEJyZWFrcG9pbnRPck1pbihicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KVxuICAgICAgPyBicmVha3BvaW50XG4gICAgICA6IE1hcGxlLmdldE1pbkJyZWFrcG9pbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTnVsbChicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSA/IGJyZWFrcG9pbnQgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZXMoKTogTWFwbGVWYXJpYWJsZU1vZGVsIHtcbiAgICByZXR1cm4geyAuLi5NYXBsZS52YXJpYWJsZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmlsbEluVGhlR2FwcyhicmVha3BvaW50TWFwOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGZ1bGxCcmVha3BvaW50TWFwID0gTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludDtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVsbEJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IG1pbktleSA9IGtleXMuZmluZCgoa2V5KSA9PiBrZXkgaW4gYnJlYWtwb2ludE1hcCk7XG4gICAgcmV0dXJuIGtleXNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBmdWxsQnJlYWtwb2ludE1hcFthXSAtIGZ1bGxCcmVha3BvaW50TWFwW2JdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNbaSArIDFdO1xuICAgICAgICBpZiAoa2V5IGluIGFjYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBba2V5XTpcbiAgICAgICAgICAgICAga2V5IGluIGJyZWFrcG9pbnRNYXAgPyBicmVha3BvaW50TWFwW2tleV0gOiBicmVha3BvaW50TWFwW21pbktleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dEtleSAmJiAhYnJlYWtwb2ludE1hcFtuZXh0S2V5XSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtuZXh0S2V5XTogYWNjW2tleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JyZWFrcG9pbnRNYXAoYnJlYWtwb2ludE1hcDogYW55KTogYW55IHtcbiAgICBpZiAodHlwZW9mIGJyZWFrcG9pbnRNYXAgPT09ICdvYmplY3QnICYmIGJyZWFrcG9pbnRNYXAgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhNYXBsZS5nZXRWYXJpYWJsZXMoKS5icmVha3BvaW50KS5zb21lKFxuICAgICAgICAoa2V5KSA9PiBicmVha3BvaW50TWFwICYmIGtleSBpbiBicmVha3BvaW50TWFwLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=