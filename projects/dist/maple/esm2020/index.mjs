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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsMEJBQTBCLEdBQzNCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RCwrRUFBK0U7QUFDL0UsTUFBTSxVQUFVLEdBQVE7SUFDdEIsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBQ0YsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFNBQVMsR0FBRyxHQUFHLENB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QUMzQixjQUFRLEdBQVEsRUFBRSxDQUFDO0FBQ25CLGVBQVMsR0FBUSxFQUFFLENBQUM7QUFDckIsb0JBQWMsR0FBeUIsSUFBSSxlQUFlLENBQ3RFLElBQUksQ0FDTCxDQUFDO0FBQ1ksYUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9XG4gIC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9HUklEX1JPV19TUEFDRSA9IC9cXC0vZztcbmNvbnN0IFJfU0VQX1VUSUxfVkFMID0gLz0oPzouKD8hPSkpKyQvO1xuY29uc3QgUl9TRVBfVVRJTF9LRVkgPSAvXFw6KD86Lig/IVxcOikpKyQvO1xuY29uc3QgUl9DVVNUT00gPSAvXFwoKC4qPylcXCkvO1xuY29uc3QgUl9XSUxEQ0FSRCA9IC9cXCovZztcbmNvbnN0IFJfRVhUUkFDVF9DTEFTUyA9IC9jbGFzc1xcPVxcXCIoW1xcc1xcU10rPylcXFwiL2c7XG5jb25zdCBSX1VOSUZJWSA9IC9cXD0oPz1bXi5dKiQpLztcblxubGV0IHByZUluaXRDbGFzc0xpc3QgPSBbXTtcbmxldCBwcmVJbml0Q2xhc3NMaXN0R2VuZXJhdGVkID0gZmFsc2U7XG5sZXQgaXNNYXBsZUVuYWJsZWQgPSB0cnVlO1xubGV0IGRvYztcblxuY29uc3QgZXNjID0gKHNlbGVjdG9yOiBzdHJpbmcpID0+XG4gIHNlbGVjdG9yLnJlcGxhY2UoUl9TRUxFQ1RPUl9SRVNFUlZFRCwgUl9FU0NBUEVfUkVTRVJWRUQpO1xuXG5leHBvcnQgY2xhc3MgTWFwbGUge1xuICBwcml2YXRlIHN0YXRpYyBDQUNIRSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IHtcbiAgICBicmVha3BvaW50OiBNQVBMRV9WQVJfQlJFQUtQT0lOVCxcbiAgICBjb2xvcjogTUFQTEVfVkFSX0NPTE9SLFxuICAgIGZvbnRGYW1pbHk6IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSxcbiAgICBmb250U2l6ZTogTUFQTEVfVkFSX0ZPTlRfU0laRSxcbiAgICBmb250V2VpZ2h0OiBNQVBMRV9WQVJfRk9OVF9XRUlHSFQsXG4gICAgbWF4V2lkdGg6IE1BUExFX1ZBUl9NQVhfV0lEVEgsXG4gICAgc3BhY2VyOiBNQVBMRV9WQVJfU1BBQ0VSLFxuICAgIHRyYW5zaXRpb246IE1BUExFX1ZBUl9UUkFOU0lUSU9OLFxuICAgIGJ1dHRvbjogTUFQTEVfVkFSX0JVVFRPTixcbiAgICBhbGVydDogTUFQTEVfVkFSX0FMRVJULFxuICB9O1xuICBwcml2YXRlIHN0YXRpYyBicmVha3BvaW50TWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbENsYXNzTWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJhd0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdGVtcENhY2hlOiBhbnkgPSB7fTtcbiAgcHVibGljIHN0YXRpYyBvblN0eWxlQXBwZW5kJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxuICAgIG51bGwsXG4gICk7XG4gIHB1YmxpYyBzdGF0aWMgb25Jbml0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBGaW5kIG1pbiBhbmQgbWF4IGJyZWFrcG9pbnRzXG4gIHByaXZhdGUgc3RhdGljIHNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBicmVha3BvaW50S2V5c1xuICAgICAgLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHNpemU6IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFtrZXldKSxcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc2l6ZSAtIGIuc2l6ZSk7XG5cbiAgICBCUkVBS1BPSU5ULm1pbktleSA9IGJyZWFrcG9pbnRzWzBdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1heEtleSA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRzLmxlbmd0aCAtIDFdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1pbk1lZGlhID0gQlJFQUtQT0lOVC5taW5LZXkgKyBTVUZGSVhfTUVESUFfVVA7XG5cbiAgICBicmVha3BvaW50cy5mb3JFYWNoKChicDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBicmVha3BvaW50c1tpICsgMV07XG4gICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9VUF0gPSBicC5zaXplO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVXNlcyAwLjAycHggcmF0aGVyIHRoYW4gMC4wMXB4IHRvIHdvcmsgYXJvdW5kIGEgY3VycmVudCByb3VuZGluZyBidWcgaW4gU2FmYXJpLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuICAgICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9ET1dOXSA9IG5leHQuc2l6ZSAtIDAuMDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURvbUVsZW1lbnRzKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBwcmVmaXg6IHN0cmluZyA9ICdtYXBsZScsXG4gICAgZG9jdW1lbnQ/OiBhbnksXG4gICk6IHZvaWQge1xuICAgIC8vIFByZXBhcmUgc3R5bGUgZWxlbWVudCBvbiBoZWFkXG4gICAgY29uc3QgZG9jSGVhZCA9IGRvY3VtZW50Py5ob3N0XG4gICAgICA/IGRvY3VtZW50XG4gICAgICA6IChkb2N1bWVudCB8fCBkb2MpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKS5zb3J0KFxuICAgICAgKGEsIGIpID0+IEJSRUFLUE9JTlQubWVkaWFbYV0gLSBCUkVBS1BPSU5ULm1lZGlhW2JdLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNVcCA9IGJyZWFrcG9pbnRzLmZpbHRlcigoa2V5KSA9PlxuICAgICAga2V5LmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCksXG4gICAgKTtcbiAgICBjb25zdCBicmVha3BvaW50c0Rvd24gPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTiksXG4gICAgKTtcblxuICAgIGJyZWFrcG9pbnRzVXAuY29uY2F0KGJyZWFrcG9pbnRzRG93bi5yZXZlcnNlKCkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVJZCA9IGAke3ByZWZpeH0tJHtrZXl9YDtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQ/Lmhvc3QgPyBudWxsIDogZG9jLmdldEVsZW1lbnRCeUlkKHN0eWxlSWQpO1xuICAgICAgaWYgKCEhZWwpIHtcbiAgICAgICAgZG9jSGVhZC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9XG4gICAgICBzdHlsZUVsZW1lbnRzW2tleV0gPSAoZG9jIGFzIERvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgKHN0eWxlRWxlbWVudHNba2V5XSBhcyBIVE1MRWxlbWVudCkuc2V0QXR0cmlidXRlKCdpZCcsIHN0eWxlSWQpO1xuXG4gICAgICBkb2NIZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudHNba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBleHRlbmRQcm9wZXJ0aWVzKCk6IHZvaWQge1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0LmZvckVhY2goKGRlZjogYW55KSA9PiB7XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gPSBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gfHwge307XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge307XG4gICAgICBPYmplY3Qua2V5cyhkZWYubWFwKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV0gPSB7fTtcbiAgICAgICAgZGVmLnByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge1xuICAgICAgICAgICAgLi4uTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSxcbiAgICAgICAgICAgIFtwcm9wXTogV0lMRENBUkQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1ba2V5XVtwcm9wXSA9IGRlZi5tYXBba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFNlbGVjdG9ycyhcbiAgICBtZWRpYTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHNlbEtleTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHV0aWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsVmFsOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgX3NlbGVjdG9yOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgaW1wb3J0YW50OiBib29sZWFuID0gZmFsc2UsXG4gICAgc2hhZG93Um9vdDogYm9vbGVhbixcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFtzZWxLZXldIHx8IHt9O1xuICAgIGNvbnN0IHBhcmVudFNlbGVjdG9yID0gc2VsS2V5LmluY2x1ZGVzKFNFUF9PVVRFUl9TUEFDRSlcbiAgICAgID8gc2VsS2V5LnNwbGl0KFNFUF9PVVRFUl9TUEFDRSkucG9wKCkuc3BsaXQoUl9TRVBfU0VMX1NQQUNFX0FMTCkuc2hpZnQoKVxuICAgICAgOiBTVFJfRU1QVFk7XG5cbiAgICBjb25zdCBiYXNlU2VsID0gW1xuICAgICAgbWVkaWEgfHwgU1RSX0VNUFRZLFxuICAgICAgbWFwbGUuX3NlbGVjdG9yID8gU0VQX1NFTEVDVE9SIDogU1RSX0VNUFRZLFxuICAgICAgc2VsS2V5LFxuICAgICAgdXRpbEtleSA/IFNFUF9VVElMX0tFWSA6IFNUUl9FTVBUWSxcbiAgICAgIHV0aWxLZXksXG4gICAgICB1dGlsVmFsID8gU0VQX1VUSUxfVkFMIDogU1RSX0VNUFRZLFxuICAgIF0uam9pbihTVFJfRU1QVFkpO1xuXG4gICAgcmV0dXJuICgobWFwbGUuX3NlbGVjdG9yIHx8IHNlbEtleSB8fCAnJykgKyBfc2VsZWN0b3IpXG4gICAgICAuc3BsaXQoLyxcXHMqLylcbiAgICAgIC5tYXAoKHNlbGVjdG9yKSA9PlxuICAgICAgICBbXG4gICAgICAgICAgLi4uKCFzaGFkb3dSb290XG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgU1RSX1NQQUNFIDogU1RSX0VNUFRZLFxuICAgICAgICAgICAgICAgIHV0aWxWYWwgPyBTVFJfRE9UIDogU1RSX0VNUFRZLFxuICAgICAgICAgICAgICAgIHV0aWxWYWwgPyBlc2MoYmFzZVNlbCArIHV0aWxWYWwpIDogYFtjbGFzcyo9XCIke2Jhc2VTZWx9XCJdYCxcbiAgICAgICAgICAgICAgICB1dGlsVmFsICYmIGltcG9ydGFudCA/IGVzYyhJTVBPUlRBTlQpIDogU1RSX0VNUFRZLFxuICAgICAgICAgICAgICAgIG1hcGxlLl9zZWxlY3RvciB8fCAhc2VsS2V5IHx8IHNlbEtleS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICBzZWxlY3RvclxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoU0VQX09VVEVSX1NQQUNFICsgcGFyZW50U2VsZWN0b3IsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1NFTF9TUEFDRSwgU1RSX1NQQUNFKVxuICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgIC5yZXBsYWNlKHNoYWRvd1Jvb3QgPyAvXlxcPi8gOiBTVFJfRU1QVFksIFNUUl9FTVBUWSksXG4gICAgICAgIF0uam9pbihTVFJfRU1QVFkpLFxuICAgICAgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlKFxuICAgIG1lZGlhOiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBtYXBUb0JlQ2FjaGVkOiBhbnksXG4gICAgc2hhZG93Um9vdDogYm9vbGVhbiA9IGZhbHNlLFxuICApOiB2b2lkIHtcbiAgICBpZiAoIW1hcFRvQmVDYWNoZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgbWFwIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHttZWRpYX0ke3NlbGVjdG9yfSR7SlNPTi5zdHJpbmdpZnkobWFwVG9CZUNhY2hlZCl9YDtcbiAgICBpZiAoIU1hcGxlLkNBQ0hFW2NhY2hlS2V5XSB8fCBzaGFkb3dSb290KSB7XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0gTWFwbGUudGVtcENhY2hlW21lZGlhXSB8fCB7fTtcbiAgICAgIE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gPSB7XG4gICAgICAgIC4uLk1hcGxlLnRlbXBDYWNoZVttZWRpYV0sXG4gICAgICAgIFtzZWxlY3Rvcl06IHtcbiAgICAgICAgICAuLi4oTWFwbGUudGVtcENhY2hlW21lZGlhXVtzZWxlY3Rvcl0gfHwge30pLFxuICAgICAgICAgIC4uLm1hcFRvQmVDYWNoZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgTWFwbGUuQ0FDSEVbY2FjaGVLZXldID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHlsZXMobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2FjaGVJdGVtID0gTWFwbGUudGVtcENhY2hlW21lZGlhXTtcbiAgICBpZiAoIWNhY2hlSXRlbSkge1xuICAgICAgcmV0dXJuIFNUUl9FTVBUWTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvcnMgPSBPYmplY3Qua2V5cyhjYWNoZUl0ZW0pO1xuXG4gICAgaWYgKHNlbGVjdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJlYWtwb2ludFBhcnRzID0gbWVkaWEuc3BsaXQoU0VQX01FRElBKTtcbiAgICBjb25zdCBicmVha3BvaW50RGlyID0gYnJlYWtwb2ludFBhcnRzWzFdO1xuICAgIGNvbnN0IG1lZGlhUXVlcnkgPSBicmVha3BvaW50RGlyID09PSBTVFJfVVAgPyAnbWluLXdpZHRoJyA6ICdtYXgtd2lkdGgnO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgLy8gb3BlbiBtZWRpYSBxdWVyeVxuICAgIGlmIChtZWRpYSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgcmVzdWx0LnB1c2goYEBtZWRpYSAoJHttZWRpYVF1ZXJ5fTogJHtCUkVBS1BPSU5ULm1lZGlhW21lZGlhXX1weCkge2ApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBjb25zdCBwcm9wTWFwID0gY2FjaGVJdGVtW3NlbGVjdG9yXTtcbiAgICAgIGlmICghcHJvcE1hcCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcE1hcEtleXMgPSBPYmplY3Qua2V5cyhwcm9wTWFwKS5maWx0ZXIoKHApID0+IHAgIT09IElNUE9SVEFOVCk7XG4gICAgICBpZiAocHJvcE1hcEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBvcGVuIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgJHtzZWxlY3Rvcn17YCk7XG5cbiAgICAgIC8vIGZpbGwgc2VsZWN0b3Igd2l0aCBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE1hcEtleXMpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcE1hcFtwcm9wXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBpbXBvcnRhbnQgPVxuICAgICAgICAgIHZhbC5pbmRleE9mKElNUE9SVEFOVCkgPCAwICYmIHByb3BNYXBbSU1QT1JUQU5UXVxuICAgICAgICAgICAgPyAnICFpbXBvcnRhbnQnXG4gICAgICAgICAgICA6IFNUUl9FTVBUWTtcbiAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXVxuICAgICAgICAgICAgPyBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwW3Byb3BdKHZhbCwgaW1wb3J0YW50KVxuICAgICAgICAgICAgOiBgJHtwcm9wfToke3ZhbH0ke2ltcG9ydGFudH07YCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2xvc2Ugc2VsZWN0b3JcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMiA/IHJlc3VsdC5qb2luKFNUUl9FTVBUWSkgOiBTVFJfRU1QVFk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXSk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IFtdO1xuICAgIGZvciAoY29uc3QgdXRpbEtleSBvZiB3aGl0ZWxpc3QpIHtcbiAgICAgIGlmICghTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKSB7XG4gICAgICAgIGNsYXNzTGlzdC5wdXNoKHV0aWxLZXkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV0pO1xuICAgICAgZm9yIChjb25zdCB1dGlsVmFsIG9mIHByb3BzKSB7XG4gICAgICAgIGlmICh1dGlsVmFsLmNoYXJBdCgwKSA9PT0gUFJFRklYX01BUExFX1BST1ApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgICAgIGZvciAoY29uc3QgYnAgb2YgYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBjb25zdCBtZWRpYVVwID0gYnAgKyBTVUZGSVhfTUVESUFfVVA7XG4gICAgICAgICAgY29uc3QgbWVkaWFEb3duID0gYnAgKyBTVUZGSVhfTUVESUFfRE9XTjtcbiAgICAgICAgICBjb25zdCB1dGlsQ2xhc3MgPSBTRVBfVVRJTF9LRVkgKyB1dGlsS2V5ICsgU0VQX1VUSUxfVkFMICsgdXRpbFZhbDtcbiAgICAgICAgICBpZiAobWVkaWFVcCBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYVVwICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lZGlhRG93biBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYURvd24gKyB1dGlsQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBNYXBsZS5mbHkocHJlSW5pdENsYXNzTGlzdC5jb25jYXQoY2xhc3NMaXN0KSk7XG4gICAgcHJlSW5pdENsYXNzTGlzdEdlbmVyYXRlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdExhc3RPY2N1cnJlbmNlKHN0cjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5sYXN0SW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdEZpcnN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoXG4gICAgZG9jdW1lbnQ6IGFueSxcbiAgICBlbmFibGVkOiBib29sZWFuLFxuICAgIHV0aWxDbGFzc01hcDogYW55ID0ge30sXG4gICAgd2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+LFxuICAgIHZhcmlhYmxlczogTWFwbGVWYXJpYWJsZU1vZGVsID0gTWFwbGUudmFyaWFibGVzLFxuICAgIGlzUnRsOiBib29sZWFuID0gZmFsc2UsXG4gICAgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXSxcbiAgICBwcm9wRXh0ZW5zaW9uTWFwOiBhbnkgPSB7fSxcbiAgKTogdm9pZCB7XG4gICAgaXNNYXBsZUVuYWJsZWQgPSBlbmFibGVkO1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgTWFwbGUuQ0FDSEUgPSB7fTtcbiAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMsXG4gICAgICAuLi52YXJpYWJsZXMsXG4gICAgfTtcbiAgICBNYXBsZUNvbG9ySGVscGVyLmdlbmVyYXRlQWxwaGFDb2xvcnMoTWFwbGUudmFyaWFibGVzLmNvbG9yKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSB7XG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbENsYXNzTWFwLFxuICAgIH07XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbFByZWZpeExpc3QsXG4gICAgXTtcbiAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwID0ge1xuICAgICAgLi4uTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQLFxuICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICB9O1xuICAgIE1hcGxlLmJyZWFrcG9pbnRNYXAgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICB9O1xuICAgIE1hcGxlLnNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk7XG4gICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgIE1hcGxlLmV4dGVuZFByb3BlcnRpZXMoKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXAsXG4gICAgICBpc1J0bCxcbiAgICApO1xuICAgIE1hcGxlLmdlbmVyYXRlV2hpdGVsaXN0KHdoaXRlbGlzdCk7XG4gICAgdGhpcy5vbkluaXQkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbmRBbmRGbHkoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIE1hcGxlLmZseShcbiAgICAgICAgKHN0ci5tYXRjaChSX0VYVFJBQ1RfQ0xBU1MpIHx8IFtdKVxuICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAucmVwbGFjZSgvY2xhc3NcXD1cXFwiL2csICcnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJyksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgIHV0aWxpdHlDbGFzczogYW55LFxuICAgIGlzUnRsOiBib29sZWFuLFxuICApOiBhbnkge1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHJldHVybiB1dGlsaXR5Q2xhc3M7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh1dGlsaXR5Q2xhc3MpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB1dGlsaXR5Q2xhc3Nba2V5XTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnJ0bCkge1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZS5ydGwpLnJlZHVjZSgocnRsVmFsdWUsIHJ0bEtleSkgPT4ge1xuICAgICAgICAgIHJ0bFZhbHVlW3J0bEtleV0gPSB2YWx1ZS5ydGxbcnRsS2V5XTtcbiAgICAgICAgfSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKCdsZWZ0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdsZWZ0JywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIGtleSA9PT0gJ3RyYW5zZm9ybScgJiZcbiAgICAgICAgICB2YWx1ZS5pbmNsdWRlcygndHJhbnNsYXRlJykgJiZcbiAgICAgICAgICAhWydZKCcsICdaKCddLnNvbWUoKHQpID0+IHZhbHVlLmluY2x1ZGVzKHQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRWYWx1ZSA9IGl0ZW0uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSA9XG4gICAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSAmJiBzcGxpdHRlZFZhbHVlWzFdLnN0YXJ0c1dpdGgoJy0nKVxuICAgICAgICAgICAgICAgICAgPyBzcGxpdHRlZFZhbHVlWzFdLnJlcGxhY2UoJy0nLCAnKCcpXG4gICAgICAgICAgICAgICAgICA6IHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgID8gJygtJyArIHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNwbGl0dGVkVmFsdWVbMF0gKyBzcGxpdHRlZFZhbHVlWzFdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpeGVkVXRpbGl0eSA9IE1hcGxlLmNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICAgICAgICB7IC4uLnZhbHVlIH0sXG4gICAgICAgICAgaXNSdGwsXG4gICAgICAgICk7XG4gICAgICAgIGRhdGFba2V5XSA9IHsgLi4uZml4ZWRVdGlsaXR5IH07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZseShjbGFzc0xpc3Q6IGFueSwgc2hhZG93Um9vdD86IERvY3VtZW50RnJhZ21lbnQpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcHJlSW5pdENsYXNzTGlzdEdlbmVyYXRlZCkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSAmJiAhc2hhZG93Um9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBsZXQgc2VsS2V5ID0gcGFydHMuam9pbihTRVBfVVRJTF9LRVkpO1xuICAgICAgaWYgKCFzZWxLZXkgJiYgc2hhZG93Um9vdCkge1xuICAgICAgICBzZWxLZXkgPSAnOmhvc3QnO1xuICAgICAgfVxuICAgICAgLy8gR2V0IHN0eWxlIG1hcFxuICAgICAgY29uc3QgbWFwbGUgPSBNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV07XG5cbiAgICAgIC8vIFdpdGhvdXQgYSBzdHlsZSBtYXAgd2UgY2FuJ3QgY3JlYXRlIHN0eWxlc1xuICAgICAgaWYgKCFtYXBsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgZGVmYXVsdCBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKG1hcGxlLl9kZWZhdWx0KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcGxlLl9kZWZhdWx0KS5mb3JFYWNoKChtZWRpYUl0ZW0pID0+IHtcbiAgICAgICAgICBNYXBsZS5jYWNoZShcbiAgICAgICAgICAgIG1lZGlhSXRlbSxcbiAgICAgICAgICAgIE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgc2VsS2V5LFxuICAgICAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IsXG4gICAgICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgICAgICAgISFzaGFkb3dSb290LFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAgICAgLi4ubWFwbGVbbWFwbGUuX2RlZmF1bHRbbWVkaWFJdGVtXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgISFzaGFkb3dSb290LFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWNoZSB1dGlsaXR5IHN0eWxlcyB3aXRoIHNlbGVjdG9yXG4gICAgICBpZiAodXRpbFZhbCkge1xuICAgICAgICBjb25zdCBjID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuICAgICAgICBjb25zdCB1Y20gPSBNYXBsZS51dGlsQ2xhc3NNYXA7XG5cbiAgICAgICAgLy8jcmVnaW9uIFdpbGRjYXJkIHNlbGVjdG9yc1xuICAgICAgICAvLyAqOnV0aWwta2V5XG4gICAgICAgIC8vICo6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgLy8gKi5zZWxlY3Rvcjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICBjb25zdCB3Y01lZGlhID0gYy5yZXBsYWNlKG1lZGlhLCBXSUxEQ0FSRCk7XG5cbiAgICAgICAgLy8gbWVkaWE6KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3RvcjoqXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleToqXG4gICAgICAgIGNvbnN0IHdjdXRpbEtleSA9IGMucmVwbGFjZShSX1NFUF9VVElMX0tFWSwgYDoke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vIG1lZGlhOnV0aWwta2V5PSpcbiAgICAgICAgLy8gbWVkaWEuc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYTpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9KlxuICAgICAgICBjb25zdCB3Y3V0aWxWYWwgPSBjLnJlcGxhY2UoUl9TRVBfVVRJTF9WQUwsIGA9JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyAqOipcbiAgICAgICAgLy8gKi5zZWxlY3RvcjoqXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2NNZWRpYUtleSA9IHdjTWVkaWEucmVwbGFjZShSX1NFUF9VVElMX0tFWSwgYDoke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PSpcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9KlxuICAgICAgICBjb25zdCB3Y01lZGlhVmFsID0gd2N1dGlsVmFsLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcbiAgICAgICAgLy8jZW5kcmVnaW9uXG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgbWVkaWEsXG4gICAgICAgICAgc2VsS2V5LFxuICAgICAgICAgIHV0aWxLZXksXG4gICAgICAgICAgdXRpbFZhbCxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IsXG4gICAgICAgICAgaW1wb3J0YW50LFxuICAgICAgICAgICEhc2hhZG93Um9vdCxcbiAgICAgICAgKTtcblxuICAgICAgICBNYXBsZS5jYWNoZShcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgLi4ubWFwbGVbdXRpbFZhbF0sXG4gICAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBtYXBsZVt1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sIFdJTERDQVJEKV0gfHwge30sXG4gICAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgICBSX1dJTERDQVJELFxuICAgICAgICAgICAgICAgIHV0aWxLZXkgPT09ICdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgICA6IHV0aWxLZXkgPT09ICdncmlkLWFyZWFzJ1xuICAgICAgICAgICAgICAgICAgPyBgXFxcXFwiJHt1dGlsVmFsXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfR1JJRF9ST1dfU1BBQ0UsICdcXFxcXCIgXFxcXFwiJyl9XFxcXFwiYFxuICAgICAgICAgICAgICAgICAgOiB1dGlsVmFsXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgICAgLi4uKHVjbVt3Y3V0aWxLZXldIHx8IHt9KSxcbiAgICAgICAgICAgIC4uLih1Y21bd2NNZWRpYVZhbF0gfHwge30pLFxuICAgICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAgIC4uLih1Y21bd2NNZWRpYV0gfHwge30pLFxuICAgICAgICAgICAgLi4uKHVjbVtjXSB8fCB7fSksXG4gICAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgISFzaGFkb3dSb290LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vI3JlZ2lvbiBHZW5lcmF0ZSBzdHlsZXNcbiAgICAvLyBHZW5lcmF0ZSBtaW4gbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50cyA9IHNoYWRvd1Jvb3QgPyB7fSA6IFNUWUxFX0VMRU1FTlRTO1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIHN0eWxlRWxlbWVudHMsXG4gICAgICAgIEJSRUFLUE9JTlQubWluTWVkaWEsXG4gICAgICAgIG1pbk1lZGlhU3R5bGVzLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgc2hhZG93Um9vdCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3QgbWVkaWFRdWVyeVN0eWxlcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKE1hcGxlLnRlbXBDYWNoZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSA9IG1lZGlhUXVlcnlTdHlsZXNba2V5XSB8fCAnJztcbiAgICAgICAgbWVkaWFRdWVyeVN0eWxlc1trZXldICs9IE1hcGxlLnN0eWxlcyhrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG1lZGlhUXVlcnlTdHlsZXMpLmZvckVhY2goKGtleSkgPT5cbiAgICAgIE1hcGxlLmFwcGVuZFN0eWxlKFxuICAgICAgICBzdHlsZUVsZW1lbnRzLFxuICAgICAgICBrZXksXG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIHNoYWRvd1Jvb3QsXG4gICAgICApLFxuICAgICk7XG4gICAgLy8jZW5kcmVnaW9uXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVuaWZ5VXRpbGl0eUNsYXNzKGNsYXNzTGlzdDogQXJyYXk8c3RyaW5nPik6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBjbGFzc0xpc3QucmVkdWNlKChhY2MsIGNsYXNzSXRlbSkgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmdTdHlsZUluZGV4ID0gYWNjLmZpbmRJbmRleChcbiAgICAgICAgKHApID0+XG4gICAgICAgICAgKChwIHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdID09PVxuICAgICAgICAgICgoY2xhc3NJdGVtIHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdLFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ1N0eWxlSW5kZXggPCAwKSB7XG4gICAgICAgIGFjYy5wdXNoKGNsYXNzSXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2NbZXhpc3RpbmdTdHlsZUluZGV4XSA9IGNsYXNzSXRlbTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhcHBlbmRTdHlsZShcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgYnA6IHN0cmluZyxcbiAgICBzdHlsZTogc3RyaW5nLFxuICAgIHNpbGVudDogYm9vbGVhbiA9IHRydWUsXG4gICAgc2hhZG93Um9vdD86IERvY3VtZW50RnJhZ21lbnQsXG4gICk6IHZvaWQge1xuICAgIGlmICghT2JqZWN0LmtleXMoc3R5bGVFbGVtZW50cykubGVuZ3RoICYmIHNoYWRvd1Jvb3QpIHtcbiAgICAgIE1hcGxlLmNyZWF0ZURvbUVsZW1lbnRzKHN0eWxlRWxlbWVudHMsICdtYXBsZScsIHNoYWRvd1Jvb3QpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnRzW2JwXS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBNYXBsZS5vblN0eWxlQXBwZW5kJC5uZXh0KHsgYnAsIHN0eWxlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYVZhbGlkKG1lZGlhOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWVkaWEgaW4gQlJFQUtQT0lOVC5tZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgaW4gTWFwbGUuYnJlYWtwb2ludE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYU1hdGNoZXNXaXRoQnJlYWtwb2ludChcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZyxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSB8fCAhTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG1lZGlhU2l6ZSA9IEJSRUFLUE9JTlQubWVkaWFbbWVkaWFdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRTaXplID0gcGFyc2VGbG9hdChNYXBsZS5icmVha3BvaW50TWFwW2JyZWFrcG9pbnRdKTtcblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTikpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA8PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCkpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA+PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYWxpZE1lZGlhTWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4uQlJFQUtQT0lOVC5tZWRpYSB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5NZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5CcmVha3BvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluS2V5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTWluKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBNYXBsZS5nZXRNaW5NZWRpYSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTnVsbChtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTWluKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpXG4gICAgICA/IGJyZWFrcG9pbnRcbiAgICAgIDogTWFwbGUuZ2V0TWluQnJlYWtwb2ludCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JOdWxsKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpID8gYnJlYWtwb2ludCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlcygpOiBNYXBsZVZhcmlhYmxlTW9kZWwge1xuICAgIHJldHVybiB7IC4uLk1hcGxlLnZhcmlhYmxlcyB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxsSW5UaGVHYXBzKGJyZWFrcG9pbnRNYXA6IGFueSk6IGFueSB7XG4gICAgY29uc3QgZnVsbEJyZWFrcG9pbnRNYXAgPSBNYXBsZS5nZXRWYXJpYWJsZXMoKS5icmVha3BvaW50O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhmdWxsQnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgbWluS2V5ID0ga2V5cy5maW5kKChrZXkpID0+IGtleSBpbiBicmVha3BvaW50TWFwKTtcbiAgICByZXR1cm4ga2V5c1xuICAgICAgLnNvcnQoKGEsIGIpID0+IGZ1bGxCcmVha3BvaW50TWFwW2FdIC0gZnVsbEJyZWFrcG9pbnRNYXBbYl0pXG4gICAgICAucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c1tpICsgMV07XG4gICAgICAgIGlmIChrZXkgaW4gYWNjID09PSBmYWxzZSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtrZXldOlxuICAgICAgICAgICAgICBrZXkgaW4gYnJlYWtwb2ludE1hcCA/IGJyZWFrcG9pbnRNYXBba2V5XSA6IGJyZWFrcG9pbnRNYXBbbWluS2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0S2V5ICYmICFicmVha3BvaW50TWFwW25leHRLZXldKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW25leHRLZXldOiBhY2Nba2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludE1hcChicmVha3BvaW50TWFwOiBhbnkpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludE1hcCA9PT0gJ29iamVjdCcgJiYgYnJlYWtwb2ludE1hcCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQpLnNvbWUoXG4gICAgICAgIChrZXkpID0+IGJyZWFrcG9pbnRNYXAgJiYga2V5IGluIGJyZWFrcG9pbnRNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==