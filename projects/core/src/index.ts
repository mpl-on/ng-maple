import { BehaviorSubject } from 'rxjs';
import { MapleColorHelper } from './helpers/color.helper';
import { MAPLE_PROP_EXTENSION_MAP } from './property-extension-map';
import { MapleVariableModel } from './types/variables.model';
import {
  getMapleUtilityClassMap,
  getMapleUtilityVariableMap,
} from './utility-class-map';
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
const BREAKPOINT: any = {
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

const R_SELECTOR_RESERVED =
  /(\.|\+|\~|\<|\>|\[|\]|\(|\)|\!|\:|\,|\=|\||\%|\#|\*|\"|\/)/g;
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

const esc = (selector: string) =>
  selector.replace(R_SELECTOR_RESERVED, R_ESCAPE_RESERVED);

export class Maple {
  private static CACHE = {};
  private static variables: MapleVariableModel = {
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
  private static breakpointMap: any = {};
  private static utilClassMap: any = {};
  private static utilPrefixList: Array<any> = [];
  private static propExtensionMap: any = {};
  private static rawCache: any = {};
  private static tempCache: any = {};
  public static onStyleAppend$: BehaviorSubject<any> = new BehaviorSubject(
    null,
  );
  public static onInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  // Find min and max breakpoints
  private static setMinAndMaxBreakpoints(): void {
    const breakpointKeys: Array<string> = Object.keys(Maple.breakpointMap);
    const breakpoints = breakpointKeys
      .map((key) => ({
        key,
        size: parseFloat(Maple.breakpointMap[key]),
      }))
      .sort((a, b) => a.size - b.size);

    BREAKPOINT.minKey = breakpoints[0].key;
    BREAKPOINT.maxKey = breakpoints[breakpoints.length - 1].key;
    BREAKPOINT.minMedia = BREAKPOINT.minKey + SUFFIX_MEDIA_UP;

    breakpoints.forEach((bp: any, i: number) => {
      const next = breakpoints[i + 1];
      BREAKPOINT.media[bp.key + SUFFIX_MEDIA_UP] = bp.size;
      if (next) {
        // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
        // See https://bugs.webkit.org/show_bug.cgi?id=178261
        BREAKPOINT.media[bp.key + SUFFIX_MEDIA_DOWN] = next.size - 0.02;
      }
    });
  }

  public static createDomElements(
    styleElements: any,
    prefix: string = 'maple',
    document?: any,
  ): void {
    // Prepare style element on head
    const docHead = document?.host
      ? document
      : (document || doc).getElementsByTagName('head')[0];
    const breakpoints = Object.keys(BREAKPOINT.media).sort(
      (a, b) => BREAKPOINT.media[a] - BREAKPOINT.media[b],
    );
    const breakpointsUp = breakpoints.filter((key) =>
      key.includes(SUFFIX_MEDIA_UP),
    );
    const breakpointsDown = breakpoints.filter((key) =>
      key.includes(SUFFIX_MEDIA_DOWN),
    );

    breakpointsUp.concat(breakpointsDown.reverse()).forEach((key) => {
      const styleId = `${prefix}-${key}`;
      const el = document?.host ? null : doc.getElementById(styleId);
      if (!!el) {
        docHead.removeChild(el);
      }
      styleElements[key] = (doc as Document).createElement('style');
      (styleElements[key] as HTMLElement).setAttribute('id', styleId);

      docHead.appendChild(styleElements[key]);
    });
  }

  private static extendProperties(): void {
    Maple.utilPrefixList.forEach((def: any) => {
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

  private static getSelectors(
    media: string = STR_EMPTY,
    selKey: string = STR_EMPTY,
    utilKey: string = STR_EMPTY,
    utilVal: string = STR_EMPTY,
    // tslint:disable-next-line: variable-name
    _selector: string = STR_EMPTY,
    important: boolean = false,
    shadowRoot: boolean,
  ): string {
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
      .map((selector) =>
        [
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
        ].join(STR_EMPTY),
      )
      .join(',');
  }

  private static cache(
    media: string,
    selector: string,
    mapToBeCached: any,
    shadowRoot: boolean = false,
  ): void {
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

  private static styles(media: string): string {
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
        const important =
          val.indexOf(IMPORTANT) < 0 && propMap[IMPORTANT]
            ? ' !important'
            : STR_EMPTY;
        result.push(
          Maple.propExtensionMap[prop]
            ? Maple.propExtensionMap[prop](val, important)
            : `${prop}:${val}${important};`,
        );
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

  private static generateWhitelist(whitelist: Array<string> = []): void {
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

  private static splitLastOccurrence(str: string, key: string): Array<string> {
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

  private static splitFirstOccurrence(str: string, key: string): Array<string> {
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

  public static init(
    document: any,
    enabled: boolean,
    utilClassMap: any = {},
    whitelist: Array<string>,
    variables: MapleVariableModel = Maple.variables,
    isRtl: boolean = false,
    utilPrefixList: Array<any> = [],
    propExtensionMap: any = {},
  ): void {
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
    Maple.utilClassMap = Maple.convertUtilClassMapToRtl(
      Maple.utilClassMap,
      isRtl,
    );
    Maple.generateWhitelist(whitelist);
    this.onInit$.next(true);
  }

  public static findAndFly(str: string): void {
    if (isMapleEnabled === false) {
      return;
    }
    if (str) {
      Maple.fly(
        (str.match(R_EXTRACT_CLASS) || [])
          .join(' ')
          .replace(/class\=\"/g, '')
          .replace(/"/g, ''),
      );
    }
  }

  public static convertUtilClassMapToRtl(
    utilityClass: any,
    isRtl: boolean,
  ): any {
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
        } else if (key.includes('right')) {
          const replacedKey = key.replace('right', 'left');
          data[replacedKey] = value;
        } else {
          data[key] = value;
        }
        if (typeof value === 'string' && value.includes('left')) {
          data[key] = value.replace('left', 'right');
        } else if (typeof value === 'string' && value.includes('right')) {
          data[key] = value.replace('right', 'left');
        } else if (
          typeof value === 'string' &&
          key === 'transform' &&
          value.includes('translate') &&
          !['Y(', 'Z('].some((t) => value.includes(t))
        ) {
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
      } else {
        const fixedUtility = Maple.convertUtilClassMapToRtl(
          { ...value },
          isRtl,
        );
        data[key] = { ...fixedUtility };
      }
    });
    return data;
  }

  public static fly(classList: any, shadowRoot?: DocumentFragment): void {
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

      let parts = Maple.splitLastOccurrence(
        classItemWithoutImportant,
        SEP_UTIL_VAL,
      );

      // Extract utility value
      const utilVal = parts.length === 1 ? null : parts.pop();

      // Extract media query
      const media =
        Object.keys(BREAKPOINT.media).find(
          (key: string) => classItem.indexOf(key) === 0,
        ) || BREAKPOINT.minMedia;

      parts = Maple.splitFirstOccurrence(parts.join(STR_EMPTY), media)
        .join(STR_EMPTY)
        .split(SEP_UTIL_KEY)
        .filter((p: string) => !!p);

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
          Maple.cache(
            mediaItem,
            Maple.getSelectors(
              null,
              selKey,
              utilKey,
              null,
              maple._selector,
              important,
              !!shadowRoot,
            ),
            {
              ...maple._common,
              ...maple[maple._default[mediaItem]],
            },
            !!shadowRoot,
          );
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

        const selector = Maple.getSelectors(
          media,
          selKey,
          utilKey,
          utilVal,
          maple._selector,
          important,
          !!shadowRoot,
        );

        Maple.cache(
          media,
          selector,
          {
            ...maple._common,
            ...maple[utilVal],
            ...JSON.parse(
              JSON.stringify(
                maple[utilVal.replace(R_CUSTOM, WILDCARD)] || {},
              ).replace(
                R_WILDCARD,
                utilKey === 'content'
                  ? utilVal.replace(R_CUSTOM, '$1')
                  : utilKey === 'grid-areas'
                  ? `\\"${utilVal
                      .replace(R_CUSTOM, '$1')
                      .replace(R_SEP_VAL_SPACE, ' ')
                      .replace(R_SEP_GRID_ROW_SPACE, '\\" \\"')}\\"`
                  : utilVal
                      .replace(R_CUSTOM, '$1')
                      .replace(R_SEP_VAL_SPACE, ' '),
              ),
            ),
            ...(ucm[wcMediaKey] || {}),
            ...(ucm[wcutilKey] || {}),
            ...(ucm[wcMediaVal] || {}),
            ...(ucm[wcutilVal] || {}),
            ...(ucm[wcMedia] || {}),
            ...(ucm[c] || {}),
            [IMPORTANT]: important,
          },
          !!shadowRoot,
        );
      }
    }

    //#region Generate styles
    // Generate min media query styles
    const styleElements = shadowRoot ? {} : STYLE_ELEMENTS;
    const minMediaStyles = Maple.styles(BREAKPOINT.minMedia);
    if (minMediaStyles) {
      Maple.appendStyle(
        styleElements,
        BREAKPOINT.minMedia,
        minMediaStyles,
        false,
        shadowRoot,
      );
    }

    // Generate media query styles
    const mediaQueryStyles = {};
    Object.keys(Maple.tempCache).forEach((key) => {
      if (key !== BREAKPOINT.minMedia) {
        mediaQueryStyles[key] = mediaQueryStyles[key] || '';
        mediaQueryStyles[key] += Maple.styles(key);
      }
    });
    Object.keys(mediaQueryStyles).forEach((key) =>
      Maple.appendStyle(
        styleElements,
        key,
        mediaQueryStyles[key],
        false,
        shadowRoot,
      ),
    );
    //#endregion
  }

  public static unifyUtilityClass(classList: Array<string>): Array<string> {
    return classList.reduce((acc, classItem) => {
      const existingStyleIndex = acc.findIndex(
        (p) =>
          ((p || '').split(R_UNIFIY) || [])[0] ===
          ((classItem || '').split(R_UNIFIY) || [])[0],
      );
      if (existingStyleIndex < 0) {
        acc.push(classItem);
      } else {
        acc[existingStyleIndex] = classItem;
      }
      return acc;
    }, []);
  }

  public static appendStyle(
    styleElements: any,
    bp: string,
    style: string,
    silent: boolean = true,
    shadowRoot?: DocumentFragment,
  ): void {
    if (!Object.keys(styleElements).length && shadowRoot) {
      Maple.createDomElements(styleElements, 'maple', shadowRoot);
    }
    styleElements[bp].appendChild(doc.createTextNode(style));

    if (!silent) {
      Maple.onStyleAppend$.next({ bp, style });
    }
  }

  public static isMediaValid(media: string): boolean {
    return media in BREAKPOINT.media;
  }

  public static isBreakpointValid(breakpoint: string): boolean {
    return breakpoint in Maple.breakpointMap;
  }

  public static isMediaMatchesWithBreakpoint(
    media: string,
    breakpoint: string,
  ): boolean {
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

  public static getValidMediaMap(): any {
    return { ...BREAKPOINT.media };
  }

  public static getMinMedia(): string {
    return BREAKPOINT.minMedia;
  }

  public static getMinBreakpoint(): string {
    return BREAKPOINT.minKey;
  }

  public static getMappedMediaOrMin(media: string): string {
    return Maple.isMediaValid(media) ? media : Maple.getMinMedia();
  }

  public static getMappedMediaOrNull(media: string): string {
    return Maple.isMediaValid(media) ? media : null;
  }

  public static getMappedBreakpointOrMin(breakpoint: string): string {
    return Maple.isBreakpointValid(breakpoint)
      ? breakpoint
      : Maple.getMinBreakpoint();
  }

  public static getMappedBreakpointOrNull(breakpoint: string): string {
    return Maple.isBreakpointValid(breakpoint) ? breakpoint : null;
  }

  public static getVariables(): MapleVariableModel {
    return { ...Maple.variables };
  }

  public static fillInTheGaps(breakpointMap: any): any {
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
            [key]:
              key in breakpointMap ? breakpointMap[key] : breakpointMap[minKey],
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

  public static isBreakpointMap(breakpointMap: any): any {
    if (typeof breakpointMap === 'object' && breakpointMap !== null) {
      return Object.keys(Maple.getVariables().breakpoint).some(
        (key) => breakpointMap && key in breakpointMap,
      );
    }
    return false;
  }
}
