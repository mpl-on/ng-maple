import { __assign } from "tslib";
export var getMapleUtilityClassMap = function (_a) {
    var fontFamily = _a.fontFamily, fontSize = _a.fontSize, fontWeight = _a.fontWeight, maxWidth = _a.maxWidth, spacer = _a.spacer, transition = _a.transition, button = _a.button, alert = _a.alert;
    var buttonCommonStyles = {
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-weight': button.normal.fontWeight,
        'user-select': 'none',
        'border-style': 'solid',
        'white-space': 'nowrap',
        'border-width': button.normal.borderWidth,
        'border-radius': button.normal.borderRadius,
        'font-size': button.normal.fontSize,
        'line-height': button.normal.lineHeight,
        'text-decoration': 'none',
        'text-transform': button.normal.textCase || 'none',
        'letter-spacing': button.normal.letterSpacing || 'normal',
        padding: button.normal.padding,
        transition: "\n      color " + button.transitionDuration + " " + button.transitionTiming + ",\n      background-color " + button.transitionDuration + " " + button.transitionTiming + ",\n      border-color " + button.transitionDuration + " " + button.transitionTiming + "\n    ",
    };
    var alertCommonStyles = {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'flex-start',
        'font-weight': alert.normal.fontWeight,
        'user-select': 'none',
        'border-style': 'solid',
        'border-width': alert.normal.borderWidth,
        'border-radius': alert.normal.borderRadius,
        'font-size': alert.normal.fontSize,
        'line-height': alert.normal.lineHeight,
        'text-decoration': 'none',
        padding: alert.normal.padding,
    };
    return {
        alert: {
            _common: alertCommonStyles,
        },
        'alert-outline': {
            _common: alertCommonStyles,
        },
        'alert-size': {
            small: {
                'border-width': alert.small.borderWidth,
                'border-radius': alert.small.borderRadius,
                'font-size': alert.small.fontSize,
                'font-weight': alert.small.fontWeight,
                'line-height': alert.small.lineHeight,
                padding: alert.small.padding,
            },
            normal: {
                'border-width': alert.normal.borderWidth,
                'border-radius': alert.normal.borderRadius,
                'font-size': alert.normal.fontSize,
                'font-weight': alert.normal.fontWeight,
                'line-height': alert.normal.lineHeight,
                padding: alert.normal.padding,
            },
            medium: {
                'border-width': alert.medium.borderWidth,
                'border-radius': alert.medium.borderRadius,
                'font-size': alert.medium.fontSize,
                'font-weight': alert.medium.fontWeight,
                'line-height': alert.medium.lineHeight,
                padding: alert.medium.padding,
            },
            large: {
                'border-width': alert.large.borderWidth,
                'border-radius': alert.large.borderRadius,
                'font-size': alert.large.fontSize,
                'font-weight': alert.large.fontWeight,
                'line-height': alert.large.lineHeight,
                padding: alert.large.padding,
            },
        },
        // animation
        animation: {
            '*': { animation: '*' },
        },
        // background-image
        bgi: {
            none: { 'background-image': 'none' },
            '*': { 'background-image': 'url("*")' },
        },
        // background-repeat
        'bg-repeat': {
            no: { 'background-repeat': 'no-repeat' },
            yes: { 'background-repeat': 'repeat' },
            '*': { 'background-repeat': '*' },
        },
        // border
        b: {
            none: { border: 'none' },
            '*': { border: '*' },
        },
        // border-radius
        br: {
            full: { 'border-radius': '100%' },
            half: { 'border-radius': '50%' },
            quarter: { 'border-radius': '25%' },
            0: { 'border-radius': 0 },
            '*': { 'border-radius': '*' },
        },
        // border-spacing
        'border-spacing': {
            0: { 'border-spacing': 0 },
            '*': { 'border-spacing': '*' },
        },
        // border-collapse
        'border-collapse': {
            collapse: { 'border-collapse': 'collapse' },
            revert: { 'border-collapse': 'revert' },
            separate: { 'border-collapse': 'separate' },
            '*': { 'border-collapse': '*' },
        },
        // box-shadow
        bs: {
            none: { 'box-shadow': 'none' },
            '*': { 'box-shadow': '*' },
        },
        bw: {
            _common: { 'border-style': 'solid' },
            0: { 'border-width': '0' },
            '*': { 'border-width': '*' },
        },
        'bw-top': {
            _common: { 'border-top-style': 'solid' },
            0: { 'border-top-width': '0' },
            '*': { 'border-top-width': '*' },
        },
        'bw-bottom': {
            _common: { 'border-bottom-style': 'solid' },
            0: { 'border-bottom-width': '0' },
            '*': { 'border-bottom-width': '*' },
        },
        'bw-left': {
            _common: { 'border-left-style': 'solid' },
            0: { 'border-left-width': '0' },
            '*': { 'border-left-width': '*' },
        },
        'bw-right': {
            _common: { 'border-right-style': 'solid' },
            0: { 'border-right-width': '0' },
            '*': { 'border-right-width': '*' },
        },
        link: {
            _common: __assign(__assign({}, buttonCommonStyles), { border: 'none', 'text-decoration': 'underline', 'background-color': 'transparent' }),
        },
        btn: {
            _common: buttonCommonStyles,
        },
        'btn-outline': {
            _common: buttonCommonStyles,
        },
        'btn-size': {
            small: {
                'border-width': button.small.borderWidth,
                'border-radius': button.small.borderRadius,
                'font-size': button.small.fontSize,
                'font-weight': button.small.fontWeight,
                'line-height': button.small.lineHeight,
                'text-transform': button.small.textCase || 'none',
                'letter-spacing': button.small.letterSpacing || 'normal',
                padding: button.small.padding,
            },
            normal: {
                'border-width': button.normal.borderWidth,
                'border-radius': button.normal.borderRadius,
                'font-size': button.normal.fontSize,
                'font-weight': button.normal.fontWeight,
                'line-height': button.normal.lineHeight,
                'text-transform': button.normal.textCase || 'none',
                'letter-spacing': button.normal.letterSpacing || 'normal',
                padding: button.normal.padding,
            },
            medium: {
                'border-width': button.medium.borderWidth,
                'border-radius': button.medium.borderRadius,
                'font-size': button.medium.fontSize,
                'font-weight': button.medium.fontWeight,
                'line-height': button.medium.lineHeight,
                'text-transform': button.medium.textCase || 'none',
                'letter-spacing': button.medium.letterSpacing || 'normal',
                padding: button.medium.padding,
            },
            large: {
                'border-width': button.large.borderWidth,
                'border-radius': button.large.borderRadius,
                'font-size': button.large.fontSize,
                'font-weight': button.large.fontWeight,
                'line-height': button.large.lineHeight,
                'text-transform': button.large.textCase || 'none',
                'letter-spacing': button.large.letterSpacing || 'normal',
                padding: button.large.padding,
            },
        },
        // mix-blend-mode
        blend: {
            'color-burn': { 'mix-blend-mode': 'color-burn' },
            'color-dodge': { 'mix-blend-mode': 'color-dodge' },
            'hard-light': { 'mix-blend-mode': 'hard-light' },
            'soft-light': { 'mix-blend-mode': 'soft-light' },
            color: { 'mix-blend-mode': 'color' },
            darken: { 'mix-blend-mode': 'darken' },
            difference: { 'mix-blend-mode': 'difference' },
            exclusion: { 'mix-blend-mode': 'exclusion' },
            hue: { 'mix-blend-mode': 'hue' },
            inherit: { 'mix-blend-mode': 'inherit' },
            lighten: { 'mix-blend-mode': 'lighten' },
            luminosity: { 'mix-blend-mode': 'luminosity' },
            multiply: { 'mix-blend-mode': 'multiply' },
            normal: { 'mix-blend-mode': 'normal' },
            overlay: { 'mix-blend-mode': 'overlay' },
            saturation: { 'mix-blend-mode': 'saturation' },
            screen: { 'mix-blend-mode': 'screen' },
        },
        // backdrop blur
        'backdrop-blur': {
            0: { 'backdrop-filter': 'blur(0)' },
            '*': { 'backdrop-filter': 'blur(*)' },
        },
        // filter invert
        invert: {
            full: { filter: 'invert(1)' },
            none: { filter: 'invert(0)' },
            '*': { filter: 'invert(*)' },
        },
        grayscale: {
            full: { filter: 'grayscale(1)' },
            none: { filter: 'grayscale(0)' },
            '*': { filter: 'grayscale(*)' },
        },
        content: {
            '*': { content: '"*"' },
        },
        // element attribute
        attr: {
            '*': { content: 'attr(*)' },
        },
        // column-count
        'col-count': {
            1: { 'column-count': 1 },
            2: { 'column-count': 2 },
            3: { 'column-count': 3 },
            4: { 'column-count': 4 },
            5: { 'column-count': 5 },
            '*': { 'column-count': '*' },
        },
        // column-rule-width
        'col-bw': {
            _common: { 'column-rule-width': 'solid' },
            0: { 'column-rule-width': '0' },
            '*': { 'column-rule-width': '*' },
        },
        // column-span
        'col-span': {
            all: { 'column-span': 'all' },
            none: { 'column-span': 'none' },
        },
        // cursor
        cursor: {
            pointer: { cursor: 'pointer' },
            default: { cursor: 'default' },
            '*': { cursor: '*' },
        },
        // break-after
        'break-before': {
            yes: { 'break-before': 'column' },
            no: { 'break-before': 'avoid' },
        },
        // break-before
        'break-after': {
            yes: { 'break-after': 'column' },
            no: { 'break-after': 'avoid' },
        },
        // break-inside
        'break-inside': {
            yes: { 'break-inside': 'column' },
            no: { 'break-inside': 'avoid' },
        },
        // display
        d: {
            none: { display: 'none' },
            block: { display: 'block' },
            inline: { display: 'inline' },
            inblock: { display: 'inline-block' },
            flx: { display: 'flex' },
            inflx: { display: 'inline-flex' },
            table: { display: 'table' },
            trow: { display: 'table-row' },
            tcell: { display: 'table-cell' },
            litem: { display: 'list-item' },
        },
        // headings from 1 to 6
        fh: {
            _common: { 'font-weight': fontWeight.heading },
            1: {
                'font-size': fontSize.h1,
                'margin-bottom': spacer[5],
            },
            2: {
                'font-size': fontSize.h2,
                'margin-bottom': spacer[4],
            },
            3: {
                'font-size': fontSize.h3,
                'margin-bottom': spacer[3],
            },
            4: {
                'font-size': fontSize.h4,
                'margin-bottom': spacer[3],
            },
            5: {
                'font-size': fontSize.h5,
                'margin-bottom': spacer[3],
            },
            6: {
                'font-size': fontSize.h6,
                'margin-bottom': spacer[2],
            },
        },
        // pragraph from 1 to 6
        fp: {
            1: {
                'font-size': fontSize.p1,
                'margin-bottom': spacer[2],
            },
            2: {
                'font-size': fontSize.p2,
                'margin-bottom': spacer[2],
            },
            3: {
                'font-size': fontSize.p3,
                'margin-bottom': spacer[2],
            },
            4: {
                'font-size': fontSize.p4,
                'margin-bottom': spacer[1],
            },
            5: {
                'font-size': fontSize.p5,
                'margin-bottom': spacer[1],
            },
            6: {
                'font-size': fontSize.p6,
                'margin-bottom': spacer[1],
            },
        },
        // font-size
        fs: {
            inherit: { 'font-size': 'inherit' },
            h1: { 'font-size': fontSize.h1 },
            h2: { 'font-size': fontSize.h2 },
            h3: { 'font-size': fontSize.h3 },
            h4: { 'font-size': fontSize.h4 },
            h5: { 'font-size': fontSize.h5 },
            h6: { 'font-size': fontSize.h6 },
            p1: { 'font-size': fontSize.p1 },
            p2: { 'font-size': fontSize.p2 },
            p3: { 'font-size': fontSize.p3 },
            p4: { 'font-size': fontSize.p4 },
            p5: { 'font-size': fontSize.p5 },
            p6: { 'font-size': fontSize.p6 },
            i1: { 'font-size': fontSize.i1 },
            i2: { 'font-size': fontSize.i2 },
            i3: { 'font-size': fontSize.i3 },
            i4: { 'font-size': fontSize.i4 },
            i5: { 'font-size': fontSize.i5 },
            i6: { 'font-size': fontSize.i6 },
            '*': { 'font-size': '*' },
        },
        // font-weight
        fw: {
            light: { 'font-weight': fontWeight.light },
            regular: { 'font-weight': fontWeight.regular },
            normal: { 'font-weight': fontWeight.regular },
            medium: { 'font-weight': fontWeight.medium },
            semi: { 'font-weight': fontWeight.semi },
            bold: { 'font-weight': fontWeight.bold },
            extra: { 'font-weight': fontWeight.extra },
            heading: { 'font-weight': fontWeight.heading },
        },
        // font-style
        fi: {
            yes: { 'font-style': 'italic' },
            no: { 'font-style': 'normal' },
        },
        // flex-column align-self
        'flx-col-align-self': {
            'top-left': { 'justify-self': 'flex-start', 'align-self': 'flex-start' },
            'top-center': { 'justify-self': 'flex-start', 'align-self': 'center' },
            'top-right': { 'justify-self': 'flex-start', 'align-self': 'flex-end' },
            'center-left': { 'justify-self': 'center', 'align-self': 'flex-start' },
            'center-center': { 'justify-self': 'center', 'align-self': 'center' },
            'center-right': { 'justify-self': 'center', 'align-self': 'flex-end' },
            'bottom-left': { 'justify-self': 'flex-end', 'align-self': 'flex-start' },
            'bottom-center': { 'justify-self': 'flex-end', 'align-self': 'center' },
            'bottom-right': { 'justify-self': 'flex-end', 'align-self': 'flex-end' },
        },
        // flex-colum-align
        'flx-col-align': {
            _common: { display: 'flex', 'flex-direction': 'column' },
            'top-left': {
                'justify-content': 'flex-start',
                'align-items': 'flex-start',
            },
            'top-center': {
                'justify-content': 'flex-start',
                'align-items': 'center',
            },
            'top-right': {
                'justify-content': 'flex-start',
                'align-items': 'flex-end',
            },
            'center-left': {
                'justify-content': 'center',
                'align-items': 'flex-start',
            },
            'center-center': { 'justify-content': 'center', 'align-items': 'center' },
            'center-right': {
                'justify-content': 'center',
                'align-items': 'flex-end',
            },
            'bottom-left': {
                'justify-content': 'flex-end',
                'align-items': 'flex-start',
            },
            'bottom-center': {
                'justify-content': 'flex-end',
                'align-items': 'center',
            },
            'bottom-right': {
                'justify-content': 'flex-end',
                'align-items': 'flex-end',
            },
            'between-left': {
                'justify-content': 'space-between',
                'align-items': 'flex-start',
            },
            'between-center': {
                'justify-content': 'space-between',
                'align-items': 'center',
            },
            'between-right': {
                'justify-content': 'space-between',
                'align-items': 'flex-end',
            },
        },
        // flex-row align-self
        'flx-row-align-self': {
            none: { 'align-self': 'normal', 'justify-self': 'normal' },
            'top-left': { 'align-self': 'flex-start', 'justify-self': 'flex-start' },
            'top-center': { 'align-self': 'flex-start', 'justify-self': 'center' },
            'top-right': { 'align-self': 'flex-start', 'justify-self': 'flex-end' },
            'center-left': { 'align-self': 'center', 'justify-self': 'flex-start' },
            'center-center': { 'align-self': 'center', 'justify-self': 'center' },
            'center-right': { 'align-self': 'center', 'justify-self': 'flex-end' },
            'bottom-left': { 'align-self': 'flex-end', 'justify-self': 'flex-start' },
            'bottom-center': { 'align-self': 'flex-end', 'justify-self': 'center' },
            'bottom-right': { 'align-self': 'flex-end', 'justify-self': 'flex-end' },
        },
        // flex-row-align
        'flx-row-align': {
            _common: { display: 'flex', 'flex-direction': 'row' },
            'top-left': {
                'align-items': 'flex-start',
                'justify-content': 'flex-start',
            },
            'top-center': {
                'align-items': 'flex-start',
                'justify-content': 'center',
            },
            'top-right': {
                'align-items': 'flex-start',
                'justify-content': 'flex-end',
            },
            'top-between': {
                'align-items': 'flex-start',
                'justify-content': 'space-between',
            },
            'center-left': {
                'align-items': 'center',
                'justify-content': 'flex-start',
            },
            'center-center': { 'align-items': 'center', 'justify-content': 'center' },
            'center-right': {
                'align-items': 'center',
                'justify-content': 'flex-end',
            },
            'center-between': {
                'align-items': 'center',
                'justify-content': 'space-between',
            },
            'bottom-left': {
                'align-items': 'flex-end',
                'justify-content': 'flex-start',
            },
            'bottom-center': {
                'align-items': 'flex-end',
                'justify-content': 'center',
            },
            'bottom-right': {
                'align-items': 'flex-end',
                'justify-content': 'flex-end',
            },
            'bottom-between': {
                'align-items': 'flx-end',
                'justify-content': 'space-between',
            },
            'stretch-left': {
                'align-items': 'stretch',
                'justify-content': 'flex-start',
            },
            'stretch-center': {
                'align-items': 'stretch',
                'justify-content': 'center',
            },
            'stretch-right': {
                'align-items': 'stretch',
                'justify-content': 'flex-end',
            },
            'stretch-between': {
                'align-items': 'stretch',
                'justify-content': 'space-between',
            },
        },
        // flex-direction
        'flx-dir': {
            col: { 'flex-direction': 'column' },
            row: { 'flex-direction': 'row' },
            colrev: { 'flex-direction': 'column-reverse' },
            rowrev: { 'flex-direction': 'row-reverse' },
        },
        // justify-content
        'flx-justify-content': {
            center: { 'justify-content': 'center' },
            start: { 'justify-content': 'flex-start' },
            end: { 'justify-content': 'flex-end' },
            between: { 'justify-content': 'space-between' },
            around: { 'justify-content': 'space-around' },
        },
        // align-items
        'flx-align-items': {
            center: { 'align-items': 'center' },
            start: { 'align-items': 'flex-start' },
            end: { 'align-items': 'flex-end' },
        },
        // object-fit
        ofit: {
            none: { 'object-fit': 'none' },
            contain: { 'object-fit': 'contain' },
            cover: { 'object-fit': 'cover' },
            fill: { 'object-fit': 'fill' },
            scaledown: { 'object-fit': 'scale-down' },
        },
        // object-position
        opos: {
            none: { 'object-position': 'unset' },
            center: { 'object-position': 'center' },
            '*': { 'object-position': '*' },
        },
        // order
        'flx-order': {
            n1: { order: -1 },
            0: { order: 0 },
            1: { order: 1 },
            2: { order: 2 },
            3: { order: 3 },
            4: { order: 4 },
            5: { order: 5 },
            6: { order: 6 },
            7: { order: 7 },
            8: { order: 8 },
            9: { order: 9 },
            10: { order: 10 },
            11: { order: 11 },
            12: { order: 12 },
            '*': { order: '*' },
        },
        // flex-wrap
        'flx-wrap': {
            yes: { 'flex-wrap': 'wrap' },
            no: { 'flex-wrap': 'nowrap' },
            rev: { 'flex-wrap': 'wrap-reverse' },
        },
        // flex
        flx: {
            fill: { flex: '1 1 auto' },
            '*': { flex: '*' },
        },
        // flex-grow
        'flx-grow': {
            0: { 'flex-grow': '0' },
            1: { 'flex-grow': '1' },
        },
        // flex-shrink
        'flx-shrink': {
            0: { 'flex-shrink': '0' },
            1: { 'flex-shrink': '1' },
        },
        // flex-basis
        'flx-basis': {
            auto: { 'flex-basis': 'auto' },
        },
        // float
        float: {
            left: { float: 'left' },
            right: { float: 'right' },
            none: { float: 'none' },
        },
        // list-style
        'list-style': {
            none: { 'list-style': 'none', margin: 0, padding: 0 },
            '*': { 'list-style': '*' },
        },
        // list-style-positiom
        'list-style-position': {
            inside: { 'list-style-position': 'inside' },
            outside: { 'list-style-position': 'outside' },
            '*': { 'list-style-position': '*' },
        },
        // linear-gradient
        'linear-gradient': {
            '*': { background: 'linear-gradient(*)' },
        },
        // line-height
        lh: {
            0: { 'line-height': 0 },
            1: { 'line-height': 1 },
            1.125: { 'line-height': 1.125 },
            1.25: { 'line-height': 1.25 },
            1.375: { 'line-height': 1.375 },
            1.5: { 'line-height': 1.5 },
            1.625: { 'line-height': 1.625 },
            1.75: { 'line-height': 1.75 },
            1.875: { 'line-height': 1.875 },
            2: { 'line-height': 2 },
            2.25: { 'line-height': 2.25 },
            2.5: { 'line-height': 2.5 },
            2.75: { 'line-height': 2.75 },
            3: { 'line-height': 3 },
            3.5: { 'line-height': 3.5 },
            4: { 'line-height': 4 },
            5: { 'line-height': 5 },
            '*': { 'line-height': '*' },
        },
        ls: {
            'n.2': { 'letter-spacing': '-.2rem' },
            'n.18': { 'letter-spacing': '-.18rem' },
            'n.16': { 'letter-spacing': '-.16rem' },
            'n.14': { 'letter-spacing': '-.14rem' },
            'n.12': { 'letter-spacing': '-.12rem' },
            'n.1': { 'letter-spacing': '-.1rem' },
            'n.08': { 'letter-spacing': '-.08rem' },
            'n.06': { 'letter-spacing': '-.06rem' },
            'n.04': { 'letter-spacing': '-.04rem' },
            'n.02': { 'letter-spacing': '-.02rem' },
            0: { 'letter-spacing': 0 },
            '.02': { 'letter-spacing': '.02rem' },
            '.04': { 'letter-spacing': '.04rem' },
            '.06': { 'letter-spacing': '.06rem' },
            '.08': { 'letter-spacing': '.08rem' },
            '.1': { 'letter-spacing': '.1rem' },
            '.12': { 'letter-spacing': '.12rem' },
            '.14': { 'letter-spacing': '.14rem' },
            '.16': { 'letter-spacing': '.16rem' },
            '.18': { 'letter-spacing': '.18rem' },
            '.2': { 'letter-spacing': '.2rem' },
            '.4': { 'letter-spacing': '.4rem' },
            '.6': { 'letter-spacing': '.6rem' },
            '.8': { 'letter-spacing': '.8rem' },
            1: { 'letter-spacing': '1rem' },
            2: { 'letter-spacing': '2rem' },
            '*': { 'letter-spacing': '*' },
        },
        // opacity
        opacity: {
            0: { opacity: 0 },
            10: { opacity: 0.1 },
            20: { opacity: 0.2 },
            30: { opacity: 0.3 },
            40: { opacity: 0.4 },
            50: { opacity: 0.5 },
            60: { opacity: 0.6 },
            70: { opacity: 0.7 },
            80: { opacity: 0.8 },
            90: { opacity: 0.9 },
            100: { opacity: 1 },
            '*': { opacity: '*' },
        },
        // outline
        outline: {
            none: { outline: 'none' },
            '*': { outline: '*' },
        },
        // outline-width
        ow: {
            _common: { 'outline-style': 'solid' },
            0: { 'outline-width': '0' },
            '*': { 'outline-width': '*' },
        },
        // outline-offset
        oo: {
            0: { 'outline-offset': '0' },
            '*': { 'outline-offset': '*' },
        },
        // position align
        'pos-align': {
            _common: {
                position: 'absolute',
            },
            none: {
                position: 'static',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                transform: 'none',
            },
            'top-left': {
                bottom: 'auto',
                left: 0,
                right: 'auto',
                top: 0,
                transform: 'none',
            },
            'top-center': {
                bottom: 'auto',
                left: '50%',
                right: 'auto',
                top: 0,
                transform: 'translateX(-50%)',
            },
            'top-right': {
                bottom: 'auto',
                left: 'auto',
                right: 0,
                top: 0,
                transform: 'none',
            },
            'center-left': {
                bottom: 'auto',
                left: 0,
                right: 'auto',
                top: '50%',
                transform: 'translateY(-50%)',
            },
            'center-center': {
                bottom: 'auto',
                left: '50%',
                right: 'auto',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            },
            'center-right': {
                bottom: 'auto',
                left: 'auto',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
            },
            'bottom-left': {
                bottom: 0,
                left: 0,
                right: 'auto',
                top: 'auto',
                transform: 'none',
            },
            'bottom-center': {
                bottom: 0,
                left: '50%',
                right: 'auto',
                top: 'auto',
                transform: 'translateX(-50%)',
            },
            'bottom-right': {
                bottom: 0,
                left: 'auto',
                right: 0,
                top: 'auto',
                transform: 'none',
            },
            'bottom-stretch': {
                bottom: 0,
                left: 0,
                right: 0,
                top: 'auto',
                transform: 'none',
            },
            'top-stretch': {
                bottom: 'auto',
                left: 0,
                right: 0,
                top: 0,
                transform: 'none',
            },
        },
        // position overlay
        'pos-overlay': {
            _common: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            abs: { position: 'absolute' },
            fix: { position: 'fixed' },
        },
        // position overlay link
        'pos-overlay-link': {
            _common: {
                border: 'none',
                bottom: 0,
                cursor: 'pointer',
                'font-size': 0,
                left: 0,
                'line-height': 0,
                margin: 0,
                opacity: 0,
                overflow: 'hidden',
                padding: 0,
                right: 0,
                top: 0,
                'white-space': 'nowrap',
                'z-index': 1,
            },
            abs: { position: 'absolute' },
            fix: { position: 'fixed' },
        },
        // position
        pos: {
            abs: { position: 'absolute' },
            fix: { position: 'fixed' },
            rel: { position: 'relative' },
            static: { position: 'static' },
            sticky: { position: 'sticky' },
        },
        // pointer-events
        'pointer-events': {
            disabled: { 'pointer-events': 'none' },
            active: { 'pointer-events': 'auto' },
        },
        rtl: {
            yes: { direction: 'rtl' },
            no: { direction: 'ltr' },
        },
        // overflow
        scrollable: {
            _common: { 'flex-wrap': 'nowrap' },
            all: { overflow: 'auto' },
            visible: { overflow: 'visible' },
            none: { overflow: 'hidden', 'flex-wrap': 'wrap !important' },
            hidden: { overflow: 'hidden' },
            x: { 'overflow-x': 'auto', 'overflow-y': 'hidden' },
            y: { 'overflow-y': 'auto', 'overflow-x': 'hidden' },
        },
        // visiblity
        visible: {
            yes: { visibility: 'visible' },
            no: { visibility: 'hidden' },
        },
        // transition
        transition: {
            all: { transition: "all " + transition.duration + " " + transition.timing },
            bgc: {
                transition: "background-color " + transition.duration + " " + transition.timing,
            },
            fc: {
                transition: "color " + transition.duration + " " + transition.timing,
            },
            w: { transition: "width " + transition.duration + " " + transition.timing },
            h: {
                transition: "height " + transition.duration + " " + transition.timing,
            },
            hmax: {
                transition: "max-height " + transition.duration + " " + transition.timing,
            },
            transform: {
                transition: "transform " + transition.duration + " " + transition.timing,
            },
            opacity: {
                transition: "opacity " + transition.duration + " " + transition.timing,
            },
            none: { transition: 'none' },
            '*': { transition: '*' },
        },
        // transform rotate
        rotate: {
            n180: { transform: 'rotate(-180deg)' },
            n135: { transform: 'rotate(-135deg)' },
            n90: { transform: 'rotate(-90deg)' },
            n45: { transform: 'rotate(-45deg)' },
            0: { transform: 'rotate(0)' },
            45: { transform: 'rotate(45deg)' },
            90: { transform: 'rotate(90deg)' },
            135: { transform: 'rotate(135deg)' },
            180: { transform: 'rotate(180deg)' },
            '*': { transform: 'rotate(*)' },
        },
        // transform translate
        translate: {
            0: { transform: 'translate(0, 0)' },
            '*': { transform: 'translate(*)' },
        },
        'translate-x': {
            n50: { transform: 'translateX(-50%)' },
            n100: { transform: 'translateX(-100%)' },
            0: { transform: 'translateX(0)' },
            50: { transform: 'translateX(50%)' },
            100: { transform: 'translateX(100%)' },
            '*': { transform: 'translateX(*)' },
        },
        'translate-y': {
            n50: { transform: 'translateY(-50%)' },
            n100: { transform: 'translateY(-100%)' },
            0: { transform: 'translateY(0)' },
            50: { transform: 'translateY(50%)' },
            100: { transform: 'translateY(100%)' },
            '*': { transform: 'translateY(*)' },
        },
        'translate-z': {
            n100: { transform: 'translateZ(-100%)' },
            0: { transform: 'translateZ(0)' },
            100: { transform: 'translateZ(100%)' },
            '*': { transform: 'translateZ(*)' },
        },
        // transform scale
        scale: {
            default: { transform: 'scale(1)' },
            '*': { transform: 'scale(*)' },
        },
        'scale-x': {
            1: { transform: 'scaleX(1)' },
            n1: { transform: 'scaleX(-1)' },
            '*': { transform: 'scaleX(*)' },
        },
        // transform-origin
        'transform-o': {
            0: { 'transform-origin': '0 0' },
            '100-0': { 'transform-origin': '100% 0' },
        },
        // text-align
        'txt-align': {
            left: { 'text-align': 'left' },
            center: { 'text-align': 'center' },
            right: { 'text-align': 'right' },
            justify: { 'text-align': 'justify' },
        },
        // text-shadow
        'txt-shadow': {
            '*': { 'text-shadow': '*' },
        },
        // white-space
        'txt-wrap': {
            yes: { 'white-space': 'normal' },
            no: { 'white-space': 'nowrap' },
            '*': { 'white-space': '*' },
        },
        // text-transform
        'txt-case': {
            none: { 'text-transform': 'none' },
            lower: { 'text-transform': 'lowercase' },
            upper: { 'text-transform': 'uppercase' },
            title: { 'text-transform': 'capitalize' },
        },
        // ellipsis
        'txt-truncate': {
            yes: {
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
            },
            no: {
                overflow: 'initial',
                'text-overflow': 'initial',
                'white-space': 'wrap',
            },
        },
        'txt-underline': {
            yes: { 'text-decoration': 'underline' },
            no: { 'text-decoration': 'none' },
        },
        'txt-line-through': {
            yes: { 'text-decoration': 'line-through' },
            no: { 'text-decoration': 'none' },
        },
        'v-align': {
            none: { 'vertical-align': 'unset' },
            top: { 'vertical-align': 'top' },
            middle: { 'vertical-align': 'middle' },
            bottom: { 'vertical-align': 'bottom' },
            sub: { 'vertical-align': 'sub' },
            sup: { 'vertical-align': 'super' },
            '*': { 'vertical-align': '*' },
        },
        // stroke-width
        'stroke-width': {
            0: { 'stroke-width': 0 },
            1: { 'stroke-width': 1 },
            1.1: { 'stroke-width': 1.1 },
            1.2: { 'stroke-width': 1.2 },
            1.3: { 'stroke-width': 1.3 },
            1.4: { 'stroke-width': 1.4 },
            1.5: { 'stroke-width': 1.5 },
            1.6: { 'stroke-width': 1.6 },
            1.7: { 'stroke-width': 1.7 },
            1.8: { 'stroke-width': 1.8 },
            1.9: { 'stroke-width': 1.9 },
            2: { 'stroke-width': 2 },
            3: { 'stroke-width': 3 },
            4: { 'stroke-width': 4 },
            '*': { 'stroke-width': '*' },
        },
        // width
        w: {
            '100vw': { width: '100vw' },
            cover: {
                left: '50%',
                'margin-left': '-50vw',
                'margin-right': '-50vw',
                position: 'relative',
                right: '50%',
                width: '100vw',
            },
            auto: { width: 'auto' },
            0: { width: 0 },
            5: { width: '5%' },
            10: { width: '10%' },
            15: { width: '15%' },
            20: { width: '20%' },
            25: { width: '25%' },
            30: { width: '30%' },
            33: { width: '33%' },
            35: { width: '35%' },
            40: { width: '40%' },
            45: { width: '45%' },
            50: { width: '50%' },
            55: { width: '55%' },
            60: { width: '60%' },
            65: { width: '65%' },
            66: { width: '66%' },
            70: { width: '70%' },
            75: { width: '75%' },
            80: { width: '80%' },
            85: { width: '85%' },
            90: { width: '90%' },
            95: { width: '95%' },
            100: { width: '100%' },
            '*': { width: '*' },
        },
        // max-width
        wmax: {
            narrow: { 'max-width': maxWidth.sm },
            normal: { 'max-width': maxWidth.md },
            wide: { 'max-width': maxWidth.lg },
            vast: { 'max-width': maxWidth.xl },
            extra: { 'max-width': maxWidth.xxl },
            5: { 'max-width': '5%' },
            10: { 'max-width': '10%' },
            15: { 'max-width': '15%' },
            20: { 'max-width': '20%' },
            25: { 'max-width': '25%' },
            30: { 'max-width': '30%' },
            33: { 'max-width': '33%' },
            35: { 'max-width': '35%' },
            40: { 'max-width': '40%' },
            45: { 'max-width': '45%' },
            50: { 'max-width': '50%' },
            55: { 'max-width': '55%' },
            60: { 'max-width': '60%' },
            65: { 'max-width': '65%' },
            66: { 'max-width': '66%' },
            70: { 'max-width': '70%' },
            75: { 'max-width': '75%' },
            80: { 'max-width': '80%' },
            85: { 'max-width': '85%' },
            90: { 'max-width': '90%' },
            95: { 'max-width': '95%' },
            100: { 'max-width': '100%' },
            '*': { 'max-width': '*' },
        },
        // min-width
        wmin: {
            '100vw': { 'min-width': '100vw' },
            narrow: { 'min-width': maxWidth.sm },
            normal: { 'min-width': maxWidth.md },
            wide: { 'min-width': maxWidth.lg },
            vast: { 'min-width': maxWidth.xl },
            extra: { 'min-width': maxWidth.xxl },
            5: { 'min-width': '5%' },
            10: { 'min-width': '10%' },
            15: { 'min-width': '15%' },
            20: { 'min-width': '20%' },
            25: { 'min-width': '25%' },
            30: { 'min-width': '30%' },
            33: { 'min-width': '33%' },
            35: { 'min-width': '35%' },
            40: { 'min-width': '40%' },
            45: { 'min-width': '45%' },
            50: { 'min-width': '50%' },
            55: { 'min-width': '55%' },
            60: { 'min-width': '60%' },
            65: { 'min-width': '65%' },
            66: { 'min-width': '66%' },
            70: { 'min-width': '70%' },
            75: { 'min-width': '75%' },
            80: { 'min-width': '80%' },
            85: { 'min-width': '85%' },
            90: { 'min-width': '90%' },
            95: { 'min-width': '95%' },
            100: { 'min-width': '100%' },
            '*': { 'min-width': '*' },
        },
        // width calc
        wcalc: {
            '*': { width: 'calc(*)' },
        },
        // max-width calc
        wmaxcalc: {
            '*': { 'max-width': 'calc(*)' },
        },
        // min-width calc
        wmincalc: {
            '*': { 'min-width': 'calc(*)' },
        },
        // height
        h: {
            '100vh': { height: '100vh' },
            auto: { height: 'auto' },
            0: { height: 0 },
            100: { height: '100%' },
            '*': { height: '*' },
        },
        // max-height
        hmax: {
            '100vh': { 'max-height': '100vh' },
            none: { 'max-height': 'none' },
            100: { 'max-height': '100%' },
            0: { 'max-height': '0' },
            '*': { 'max-height': '*' },
        },
        // min-height
        hmin: {
            '100vh': { 'min-height': '100vh' },
            auto: { 'min-height': 'auto' },
            100: { 'min-height': '100%' },
            '*': { 'min-height': '*' },
        },
        // height calc
        hcalc: {
            '*': { height: 'calc(*)' },
        },
        // max-height calc
        hmaxcalc: {
            '*': { 'max-height': 'calc(*)' },
        },
        // min-height calc
        hmincalc: {
            '*': { 'min-height': 'calc(*)' },
        },
        // square
        square: {
            auto: { width: 'auto', height: 'auto' },
            0: { width: 0, height: 0 },
            '*': { width: '*', height: '*' },
        },
        // z-index
        z: {
            n: { 'z-index': -1 },
            0: { 'z-index': 0 },
            1: { 'z-index': 1 },
            3: { 'z-index': 3 },
            6: { 'z-index': 6 },
            9: { 'z-index': 9 },
            99: { 'z-index': 99 },
            999: { 'z-index': 999 },
            9999: { 'z-index': 9999 },
            '*': { 'z-index': '*' },
        },
        // scroll snap type
        'ss-type': {
            none: { 'scroll-snap-type': 'none' },
            both: { 'scroll-snap-type': 'both' },
        },
        // scroll snap align
        'ss-align': {
            none: { 'scroll-snap-align': 'none' },
            start: { 'scroll-snap-align': 'start' },
        },
        // scroll margin top
        'sm-top': {
            '*': { 'scroll-margin-top': '*' },
        },
    };
};
export var getMapleUtilityVariableMap = function (_a) {
    var color = _a.color, spacer = _a.spacer, fontFamily = _a.fontFamily;
    return [
        { prefix: 'ff', map: fontFamily, props: ['font-family'] },
        { prefix: 'bgc', map: color, props: ['background-color'] },
        { prefix: 'bc', map: color, props: ['border-color'] },
        { prefix: 'bc-top', map: color, props: ['border-top-color'] },
        { prefix: 'bc-bottom', map: color, props: ['border-bottom-color'] },
        { prefix: 'bc-left', map: color, props: ['border-left-color'] },
        { prefix: 'bc-right', map: color, props: ['border-right-color'] },
        { prefix: 'col-bc', map: color, props: ['column-rule-color'] },
        { prefix: 'link', map: color, props: ['link'] },
        { prefix: 'btn', map: color, props: ['theme'] },
        { prefix: 'btn-outline', map: color, props: ['theme-outline'] },
        { prefix: 'alert', map: color, props: ['theme'] },
        { prefix: 'alert-outline', map: color, props: ['theme-outline'] },
        { prefix: 'stroke', map: color, props: ['stroke'] },
        { prefix: 'fc', map: color, props: ['color'] },
        { prefix: 'oc', map: color, props: ['outline-color'] },
        { prefix: 'p', map: spacer, props: ['padding'] },
        { prefix: 'pb', map: spacer, props: ['padding-bottom'] },
        { prefix: 'pl', map: spacer, props: ['padding-left'] },
        { prefix: 'pr', map: spacer, props: ['padding-right'] },
        { prefix: 'pt', map: spacer, props: ['padding-top'] },
        { prefix: 'px', map: spacer, props: ['padding-left', 'padding-right'] },
        { prefix: 'py', map: spacer, props: ['padding-top', 'padding-bottom'] },
        { prefix: 'm', map: spacer, props: ['margin'] },
        { prefix: 'mb', map: spacer, props: ['margin-bottom'] },
        { prefix: 'ml', map: spacer, props: ['margin-left'] },
        { prefix: 'mr', map: spacer, props: ['margin-right'] },
        { prefix: 'mt', map: spacer, props: ['margin-top'] },
        { prefix: 'mx', map: spacer, props: ['margin-left', 'margin-right'] },
        { prefix: 'my', map: spacer, props: ['margin-top', 'margin-bottom'] },
        { prefix: 'top', map: spacer, props: ['top'] },
        { prefix: 'left', map: spacer, props: ['left'] },
        { prefix: 'right', map: spacer, props: ['right'] },
        { prefix: 'bottom', map: spacer, props: ['bottom'] },
        { prefix: 'tobo', map: spacer, props: ['top', 'bottom'] },
        { prefix: 'leri', map: spacer, props: ['left', 'right'] },
        { prefix: 'lebo', map: spacer, props: ['left', 'bottom'] },
        {
            prefix: 'tblr',
            map: spacer,
            props: ['top', 'bottom', 'left', 'right'],
        },
        { prefix: 'tblr', map: spacer, props: ['top', 'bottom', 'left', 'right'] },
        { prefix: 'bw', map: spacer, props: ['border-width'] },
        { prefix: 'bw-bottom', map: spacer, props: ['border-bottom-width'] },
        { prefix: 'bw-top', map: spacer, props: ['border-top-width'] },
        { prefix: 'bw-left', map: spacer, props: ['border-left-width'] },
        { prefix: 'bw-right', map: spacer, props: ['border-right-width'] },
        { prefix: 'col-gap', map: spacer, props: ['column-gap'] },
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS1jbGFzcy1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbInV0aWxpdHktY2xhc3MtbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEVBU25CO1FBUm5CLDBCQUFVLEVBQ1Ysc0JBQVEsRUFDUiwwQkFBVSxFQUNWLHNCQUFRLEVBQ1Isa0JBQU0sRUFDTiwwQkFBVSxFQUNWLGtCQUFNLEVBQ04sZ0JBQUs7SUFFTCxJQUFNLGtCQUFrQixHQUFHO1FBQ3pCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7UUFDM0IsYUFBYSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTtRQUN2QyxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsT0FBTztRQUN2QixhQUFhLEVBQUUsUUFBUTtRQUN2QixjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1FBQ3pDLGVBQWUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVk7UUFDM0MsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUNuQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1FBQ3ZDLGlCQUFpQixFQUFFLE1BQU07UUFDekIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTTtRQUNsRCxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxRQUFRO1FBQ3pELE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU87UUFDOUIsVUFBVSxFQUFFLG1CQUNGLE1BQU0sQ0FBQyxrQkFBa0IsU0FBSSxNQUFNLENBQUMsZ0JBQWdCLGtDQUN6QyxNQUFNLENBQUMsa0JBQWtCLFNBQUksTUFBTSxDQUFDLGdCQUFnQiw4QkFDeEQs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Q2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7U0FDMUI7UUFFRCxjQUFjO1FBQ2QsRUFBRSxFQUFFO1lBQ0YsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDN0MsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7U0FDL0M7UUFFRCxhQUFhO1FBQ2IsRUFBRSxFQUFFO1lBQ0YsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEs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cEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7U0FDcEI7UUFFRCxZQUFZO1FBQ1osSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDcEMsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtZQUN4QixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZ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SyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDL0QsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakQsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDakUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDOUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdEQsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDaEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUN4RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN0RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN2RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNyRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLEVBQUU7UUFDdkUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEVBQUU7UUFDdkUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0MsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDckQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDdEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDcEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxFQUFFO1FBQ3JFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsRUFBRTtRQUNyRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM5QyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNoRCxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNsRCxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwRCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUU7UUFDekQsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQ3pELEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRTtRQUMxRDtZQUNFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxFQUFFLE1BQU07WUFDWCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7U0FDMUM7UUFDRCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtRQUMxRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN0RCxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ3BFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUQsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUNoRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ2xFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFO0tBQzFEO0FBbER5QixDQWtEekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwID0gKHtcbiAgZm9udEZhbWlseSxcbiAgZm9udFNpemUsXG4gIGZvbnRXZWlnaHQsXG4gIG1heFdpZHRoLFxuICBzcGFjZXIsXG4gIHRyYW5zaXRpb24sXG4gIGJ1dHRvbixcbiAgYWxlcnQsXG59OiBNYXBsZVZhcmlhYmxlTW9kZWwpID0+IHtcbiAgY29uc3QgYnV0dG9uQ29tbW9uU3R5bGVzID0ge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICdmb250LXdlaWdodCc6IGJ1dHRvbi5ub3JtYWwuZm9udFdlaWdodCxcbiAgICAndXNlci1zZWxlY3QnOiAnbm9uZScsXG4gICAgJ2JvcmRlci1zdHlsZSc6ICdzb2xpZCcsXG4gICAgJ3doaXRlLXNwYWNlJzogJ25vd3JhcCcsXG4gICAgJ2JvcmRlci13aWR0aCc6IGJ1dHRvbi5ub3JtYWwuYm9yZGVyV2lkdGgsXG4gICAgJ2JvcmRlci1yYWRpdXMnOiBidXR0b24ubm9ybWFsLmJvcmRlclJhZGl1cyxcbiAgICAnZm9udC1zaXplJzogYnV0dG9uLm5vcm1hbC5mb250U2l6ZSxcbiAgICAnbGluZS1oZWlnaHQnOiBidXR0b24ubm9ybWFsLmxpbmVIZWlnaHQsXG4gICAgJ3RleHQtZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICAndGV4dC10cmFuc2Zvcm0nOiBidXR0b24ubm9ybWFsLnRleHRDYXNlIHx8ICdub25lJyxcbiAgICAnbGV0dGVyLXNwYWNpbmcnOiBidXR0b24ubm9ybWFsLmxldHRlclNwYWNpbmcgfHwgJ25vcm1hbCcsXG4gICAgcGFkZGluZzogYnV0dG9uLm5vcm1hbC5wYWRkaW5nLFxuICAgIHRyYW5zaXRpb246IGBcbiAgICAgIGNvbG9yICR7YnV0dG9uLnRyYW5zaXRpb25EdXJhdGlvbn0gJHtidXR0b24udHJhbnNpdGlvblRpbWluZ30sXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yICR7YnV0dG9uLnRyYW5zaXRpb25EdXJhdGlvbn0gJHtidXR0b24udHJhbnNpdGlvblRpbWluZ30sXG4gICAgICBib3JkZXItY29sb3IgJHtidXR0b24udHJhbnNpdGlvbkR1cmF0aW9ufSAke2J1dHRvbi50cmFuc2l0aW9uVGltaW5nfVxuICAgIGAsXG4gIH07XG5cbiAgY29uc3QgYWxlcnRDb21tb25TdHlsZXMgPSB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgJ2ZvbnQtd2VpZ2h0JzogYWxlcnQubm9ybWFsLmZvbnRXZWlnaHQsXG4gICAgJ3VzZXItc2VsZWN0JzogJ25vbmUnLFxuICAgICdib3JkZXItc3R5bGUnOiAnc29saWQnLFxuICAgICdib3JkZXItd2lkdGgnOiBhbGVydC5ub3JtYWwuYm9yZGVyV2lkdGgsXG4gICAgJ2JvcmRlci1yYWRpdXMnOiBhbGVydC5ub3JtYWwuYm9yZGVyUmFkaXVzLFxuICAgICdmb250LXNpemUnOiBhbGVydC5ub3JtYWwuZm9udFNpemUsXG4gICAgJ2xpbmUtaGVpZ2h0JzogYWxlcnQubm9ybWFsLmxpbmVIZWlnaHQsXG4gICAgJ3RleHQtZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICBwYWRkaW5nOiBhbGVydC5ub3JtYWwucGFkZGluZyxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFsZXJ0OiB7XG4gICAgICBfY29tbW9uOiBhbGVydENvbW1vblN0eWxlcyxcbiAgICB9LFxuXG4gICAgJ2FsZXJ0LW91dGxpbmUnOiB7XG4gICAgICBfY29tbW9uOiBhbGVydENvbW1vblN0eWxlcyxcbiAgICB9LFxuXG4gICAgJ2FsZXJ0LXNpemUnOiB7XG4gICAgICBzbWFsbDoge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYWxlcnQuc21hbGwuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYWxlcnQuc21hbGwuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYWxlcnQuc21hbGwuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGFsZXJ0LnNtYWxsLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGFsZXJ0LnNtYWxsLmxpbmVIZWlnaHQsXG4gICAgICAgIHBhZGRpbmc6IGFsZXJ0LnNtYWxsLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbm9ybWFsOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBhbGVydC5ub3JtYWwuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYWxlcnQubm9ybWFsLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGFsZXJ0Lm5vcm1hbC5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYWxlcnQubm9ybWFsLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGFsZXJ0Lm5vcm1hbC5saW5lSGVpZ2h0LFxuICAgICAgICBwYWRkaW5nOiBhbGVydC5ub3JtYWwucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBtZWRpdW06IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGFsZXJ0Lm1lZGl1bS5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBhbGVydC5tZWRpdW0uYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYWxlcnQubWVkaXVtLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBhbGVydC5tZWRpdW0uZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYWxlcnQubWVkaXVtLmxpbmVIZWlnaHQsXG4gICAgICAgIHBhZGRpbmc6IGFsZXJ0Lm1lZGl1bS5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIGxhcmdlOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBhbGVydC5sYXJnZS5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBhbGVydC5sYXJnZS5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBhbGVydC5sYXJnZS5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYWxlcnQubGFyZ2UuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYWxlcnQubGFyZ2UubGluZUhlaWdodCxcbiAgICAgICAgcGFkZGluZzogYWxlcnQubGFyZ2UucGFkZGluZyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIGFuaW1hdGlvblxuICAgIGFuaW1hdGlvbjoge1xuICAgICAgJyonOiB7IGFuaW1hdGlvbjogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJhY2tncm91bmQtaW1hZ2VcbiAgICBiZ2k6IHtcbiAgICAgIG5vbmU6IHsgJ2JhY2tncm91bmQtaW1hZ2UnOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoXCIqXCIpJyB9LFxuICAgIH0sXG5cbiAgICAvLyBiYWNrZ3JvdW5kLXJlcGVhdFxuICAgICdiZy1yZXBlYXQnOiB7XG4gICAgICBubzogeyAnYmFja2dyb3VuZC1yZXBlYXQnOiAnbm8tcmVwZWF0JyB9LFxuICAgICAgeWVzOiB7ICdiYWNrZ3JvdW5kLXJlcGVhdCc6ICdyZXBlYXQnIH0sXG4gICAgICAnKic6IHsgJ2JhY2tncm91bmQtcmVwZWF0JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJvcmRlclxuICAgIGI6IHtcbiAgICAgIG5vbmU6IHsgYm9yZGVyOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyBib3JkZXI6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBib3JkZXItcmFkaXVzXG4gICAgYnI6IHtcbiAgICAgIGZ1bGw6IHsgJ2JvcmRlci1yYWRpdXMnOiAnMTAwJScgfSxcbiAgICAgIGhhbGY6IHsgJ2JvcmRlci1yYWRpdXMnOiAnNTAlJyB9LFxuICAgICAgcXVhcnRlcjogeyAnYm9yZGVyLXJhZGl1cyc6ICcyNSUnIH0sXG4gICAgICAwOiB7ICdib3JkZXItcmFkaXVzJzogMCB9LFxuICAgICAgJyonOiB7ICdib3JkZXItcmFkaXVzJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJvcmRlci1zcGFjaW5nXG5cbiAgICAnYm9yZGVyLXNwYWNpbmcnOiB7XG4gICAgICAwOiB7ICdib3JkZXItc3BhY2luZyc6IDAgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLXNwYWNpbmcnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYm9yZGVyLWNvbGxhcHNlXG5cbiAgICAnYm9yZGVyLWNvbGxhcHNlJzoge1xuICAgICAgY29sbGFwc2U6IHsgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScgfSxcbiAgICAgIHJldmVydDogeyAnYm9yZGVyLWNvbGxhcHNlJzogJ3JldmVydCcgfSxcbiAgICAgIHNlcGFyYXRlOiB7ICdib3JkZXItY29sbGFwc2UnOiAnc2VwYXJhdGUnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1jb2xsYXBzZSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBib3gtc2hhZG93XG4gICAgYnM6IHtcbiAgICAgIG5vbmU6IHsgJ2JveC1zaGFkb3cnOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyAnYm94LXNoYWRvdyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICBidzoge1xuICAgICAgX2NvbW1vbjogeyAnYm9yZGVyLXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnYnctdG9wJzoge1xuICAgICAgX2NvbW1vbjogeyAnYm9yZGVyLXRvcC1zdHlsZSc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci10b3Atd2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLXRvcC13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnYnctYm90dG9tJzoge1xuICAgICAgX2NvbW1vbjogeyAnYm9yZGVyLWJvdHRvbS1zdHlsZSc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci1ib3R0b20td2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLWJvdHRvbS13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnYnctbGVmdCc6IHtcbiAgICAgIF9jb21tb246IHsgJ2JvcmRlci1sZWZ0LXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLWxlZnQtd2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLWxlZnQtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2J3LXJpZ2h0Jzoge1xuICAgICAgX2NvbW1vbjogeyAnYm9yZGVyLXJpZ2h0LXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLXJpZ2h0LXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1yaWdodC13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICBsaW5rOiB7XG4gICAgICBfY29tbW9uOiB7XG4gICAgICAgIC4uLmJ1dHRvbkNvbW1vblN0eWxlcyxcbiAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICd0ZXh0LWRlY29yYXRpb24nOiAndW5kZXJsaW5lJyxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAndHJhbnNwYXJlbnQnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnRuOiB7XG4gICAgICBfY29tbW9uOiBidXR0b25Db21tb25TdHlsZXMsXG4gICAgfSxcblxuICAgICdidG4tb3V0bGluZSc6IHtcbiAgICAgIF9jb21tb246IGJ1dHRvbkNvbW1vblN0eWxlcyxcbiAgICB9LFxuXG4gICAgJ2J0bi1zaXplJzoge1xuICAgICAgc21hbGw6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGJ1dHRvbi5zbWFsbC5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBidXR0b24uc21hbGwuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYnV0dG9uLnNtYWxsLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBidXR0b24uc21hbGwuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYnV0dG9uLnNtYWxsLmxpbmVIZWlnaHQsXG4gICAgICAgICd0ZXh0LXRyYW5zZm9ybSc6IGJ1dHRvbi5zbWFsbC50ZXh0Q2FzZSB8fCAnbm9uZScsXG4gICAgICAgICdsZXR0ZXItc3BhY2luZyc6IGJ1dHRvbi5zbWFsbC5sZXR0ZXJTcGFjaW5nIHx8ICdub3JtYWwnLFxuICAgICAgICBwYWRkaW5nOiBidXR0b24uc21hbGwucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBub3JtYWw6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGJ1dHRvbi5ub3JtYWwuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYnV0dG9uLm5vcm1hbC5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBidXR0b24ubm9ybWFsLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBidXR0b24ubm9ybWFsLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGJ1dHRvbi5ub3JtYWwubGluZUhlaWdodCxcbiAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogYnV0dG9uLm5vcm1hbC50ZXh0Q2FzZSB8fCAnbm9uZScsXG4gICAgICAgICdsZXR0ZXItc3BhY2luZyc6IGJ1dHRvbi5ub3JtYWwubGV0dGVyU3BhY2luZyB8fCAnbm9ybWFsJyxcbiAgICAgICAgcGFkZGluZzogYnV0dG9uLm5vcm1hbC5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIG1lZGl1bToge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYnV0dG9uLm1lZGl1bS5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBidXR0b24ubWVkaXVtLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGJ1dHRvbi5tZWRpdW0uZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGJ1dHRvbi5tZWRpdW0uZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYnV0dG9uLm1lZGl1bS5saW5lSGVpZ2h0LFxuICAgICAgICAndGV4dC10cmFuc2Zvcm0nOiBidXR0b24ubWVkaXVtLnRleHRDYXNlIHx8ICdub25lJyxcbiAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogYnV0dG9uLm1lZGl1bS5sZXR0ZXJTcGFjaW5nIHx8ICdub3JtYWwnLFxuICAgICAgICBwYWRkaW5nOiBidXR0b24ubWVkaXVtLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbGFyZ2U6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGJ1dHRvbi5sYXJnZS5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBidXR0b24ubGFyZ2UuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYnV0dG9uLmxhcmdlLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBidXR0b24ubGFyZ2UuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYnV0dG9uLmxhcmdlLmxpbmVIZWlnaHQsXG4gICAgICAgICd0ZXh0LXRyYW5zZm9ybSc6IGJ1dHRvbi5sYXJnZS50ZXh0Q2FzZSB8fCAnbm9uZScsXG4gICAgICAgICdsZXR0ZXItc3BhY2luZyc6IGJ1dHRvbi5sYXJnZS5sZXR0ZXJTcGFjaW5nIHx8ICdub3JtYWwnLFxuICAgICAgICBwYWRkaW5nOiBidXR0b24ubGFyZ2UucGFkZGluZyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIG1peC1ibGVuZC1tb2RlXG4gICAgYmxlbmQ6IHtcbiAgICAgICdjb2xvci1idXJuJzogeyAnbWl4LWJsZW5kLW1vZGUnOiAnY29sb3ItYnVybicgfSxcbiAgICAgICdjb2xvci1kb2RnZSc6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2NvbG9yLWRvZGdlJyB9LFxuICAgICAgJ2hhcmQtbGlnaHQnOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdoYXJkLWxpZ2h0JyB9LFxuICAgICAgJ3NvZnQtbGlnaHQnOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdzb2Z0LWxpZ2h0JyB9LFxuICAgICAgY29sb3I6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2NvbG9yJyB9LFxuICAgICAgZGFya2VuOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdkYXJrZW4nIH0sXG4gICAgICBkaWZmZXJlbmNlOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdkaWZmZXJlbmNlJyB9LFxuICAgICAgZXhjbHVzaW9uOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdleGNsdXNpb24nIH0sXG4gICAgICBodWU6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2h1ZScgfSxcbiAgICAgIGluaGVyaXQ6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2luaGVyaXQnIH0sXG4gICAgICBsaWdodGVuOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdsaWdodGVuJyB9LFxuICAgICAgbHVtaW5vc2l0eTogeyAnbWl4LWJsZW5kLW1vZGUnOiAnbHVtaW5vc2l0eScgfSxcbiAgICAgIG11bHRpcGx5OiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdtdWx0aXBseScgfSxcbiAgICAgIG5vcm1hbDogeyAnbWl4LWJsZW5kLW1vZGUnOiAnbm9ybWFsJyB9LFxuICAgICAgb3ZlcmxheTogeyAnbWl4LWJsZW5kLW1vZGUnOiAnb3ZlcmxheScgfSxcbiAgICAgIHNhdHVyYXRpb246IHsgJ21peC1ibGVuZC1tb2RlJzogJ3NhdHVyYXRpb24nIH0sXG4gICAgICBzY3JlZW46IHsgJ21peC1ibGVuZC1tb2RlJzogJ3NjcmVlbicgfSxcbiAgICB9LFxuXG4gICAgLy8gYmFja2Ryb3AgYmx1clxuICAgICdiYWNrZHJvcC1ibHVyJzoge1xuICAgICAgMDogeyAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoMCknIH0sXG4gICAgICAnKic6IHsgJ2JhY2tkcm9wLWZpbHRlcic6ICdibHVyKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmaWx0ZXIgaW52ZXJ0XG4gICAgaW52ZXJ0OiB7XG4gICAgICBmdWxsOiB7IGZpbHRlcjogJ2ludmVydCgxKScgfSxcbiAgICAgIG5vbmU6IHsgZmlsdGVyOiAnaW52ZXJ0KDApJyB9LFxuICAgICAgJyonOiB7IGZpbHRlcjogJ2ludmVydCgqKScgfSxcbiAgICB9LFxuXG4gICAgZ3JheXNjYWxlOiB7XG4gICAgICBmdWxsOiB7IGZpbHRlcjogJ2dyYXlzY2FsZSgxKScgfSxcbiAgICAgIG5vbmU6IHsgZmlsdGVyOiAnZ3JheXNjYWxlKDApJyB9LFxuICAgICAgJyonOiB7IGZpbHRlcjogJ2dyYXlzY2FsZSgqKScgfSxcbiAgICB9LFxuXG4gICAgY29udGVudDoge1xuICAgICAgJyonOiB7IGNvbnRlbnQ6ICdcIipcIicgfSxcbiAgICB9LFxuXG4gICAgLy8gZWxlbWVudCBhdHRyaWJ1dGVcbiAgICBhdHRyOiB7XG4gICAgICAnKic6IHsgY29udGVudDogJ2F0dHIoKiknIH0sXG4gICAgfSxcblxuICAgIC8vIGNvbHVtbi1jb3VudFxuICAgICdjb2wtY291bnQnOiB7XG4gICAgICAxOiB7ICdjb2x1bW4tY291bnQnOiAxIH0sXG4gICAgICAyOiB7ICdjb2x1bW4tY291bnQnOiAyIH0sXG4gICAgICAzOiB7ICdjb2x1bW4tY291bnQnOiAzIH0sXG4gICAgICA0OiB7ICdjb2x1bW4tY291bnQnOiA0IH0sXG4gICAgICA1OiB7ICdjb2x1bW4tY291bnQnOiA1IH0sXG4gICAgICAnKic6IHsgJ2NvbHVtbi1jb3VudCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBjb2x1bW4tcnVsZS13aWR0aFxuICAgICdjb2wtYncnOiB7XG4gICAgICBfY29tbW9uOiB7ICdjb2x1bW4tcnVsZS13aWR0aCc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2NvbHVtbi1ydWxlLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2NvbHVtbi1ydWxlLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGNvbHVtbi1zcGFuXG4gICAgJ2NvbC1zcGFuJzoge1xuICAgICAgYWxsOiB7ICdjb2x1bW4tc3Bhbic6ICdhbGwnIH0sXG4gICAgICBub25lOiB7ICdjb2x1bW4tc3Bhbic6ICdub25lJyB9LFxuICAgIH0sXG5cbiAgICAvLyBjdXJzb3JcbiAgICBjdXJzb3I6IHtcbiAgICAgIHBvaW50ZXI6IHsgY3Vyc29yOiAncG9pbnRlcicgfSxcbiAgICAgIGRlZmF1bHQ6IHsgY3Vyc29yOiAnZGVmYXVsdCcgfSxcbiAgICAgICcqJzogeyBjdXJzb3I6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBicmVhay1hZnRlclxuICAgICdicmVhay1iZWZvcmUnOiB7XG4gICAgICB5ZXM6IHsgJ2JyZWFrLWJlZm9yZSc6ICdjb2x1bW4nIH0sXG4gICAgICBubzogeyAnYnJlYWstYmVmb3JlJzogJ2F2b2lkJyB9LFxuICAgIH0sXG5cbiAgICAvLyBicmVhay1iZWZvcmVcbiAgICAnYnJlYWstYWZ0ZXInOiB7XG4gICAgICB5ZXM6IHsgJ2JyZWFrLWFmdGVyJzogJ2NvbHVtbicgfSxcbiAgICAgIG5vOiB7ICdicmVhay1hZnRlcic6ICdhdm9pZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gYnJlYWstaW5zaWRlXG4gICAgJ2JyZWFrLWluc2lkZSc6IHtcbiAgICAgIHllczogeyAnYnJlYWstaW5zaWRlJzogJ2NvbHVtbicgfSxcbiAgICAgIG5vOiB7ICdicmVhay1pbnNpZGUnOiAnYXZvaWQnIH0sXG4gICAgfSxcblxuICAgIC8vIGRpc3BsYXlcbiAgICBkOiB7XG4gICAgICBub25lOiB7IGRpc3BsYXk6ICdub25lJyB9LFxuICAgICAgYmxvY2s6IHsgZGlzcGxheTogJ2Jsb2NrJyB9LFxuICAgICAgaW5saW5lOiB7IGRpc3BsYXk6ICdpbmxpbmUnIH0sXG4gICAgICBpbmJsb2NrOiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0sXG4gICAgICBmbHg6IHsgZGlzcGxheTogJ2ZsZXgnIH0sXG4gICAgICBpbmZseDogeyBkaXNwbGF5OiAnaW5saW5lLWZsZXgnIH0sXG4gICAgICB0YWJsZTogeyBkaXNwbGF5OiAndGFibGUnIH0sXG4gICAgICB0cm93OiB7IGRpc3BsYXk6ICd0YWJsZS1yb3cnIH0sXG4gICAgICB0Y2VsbDogeyBkaXNwbGF5OiAndGFibGUtY2VsbCcgfSxcbiAgICAgIGxpdGVtOiB7IGRpc3BsYXk6ICdsaXN0LWl0ZW0nIH0sXG4gICAgfSxcblxuICAgIC8vIGhlYWRpbmdzIGZyb20gMSB0byA2XG4gICAgZmg6IHtcbiAgICAgIF9jb21tb246IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5oZWFkaW5nIH0sXG4gICAgICAxOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oMSxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbNV0sXG4gICAgICB9LFxuICAgICAgMjoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDIsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzRdLFxuICAgICAgfSxcbiAgICAgIDM6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgzLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclszXSxcbiAgICAgIH0sXG4gICAgICA0OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oNCxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbM10sXG4gICAgICB9LFxuICAgICAgNToge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDUsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzNdLFxuICAgICAgfSxcbiAgICAgIDY6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg2LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsyXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIHByYWdyYXBoIGZyb20gMSB0byA2XG4gICAgZnA6IHtcbiAgICAgIDE6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAxLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsyXSxcbiAgICAgIH0sXG4gICAgICAyOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wMixcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMl0sXG4gICAgICB9LFxuICAgICAgMzoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDMsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzJdLFxuICAgICAgfSxcbiAgICAgIDQ6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA0LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsxXSxcbiAgICAgIH0sXG4gICAgICA1OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wNSxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMV0sXG4gICAgICB9LFxuICAgICAgNjoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDYsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzFdLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gZm9udC1zaXplXG4gICAgZnM6IHtcbiAgICAgIGluaGVyaXQ6IHsgJ2ZvbnQtc2l6ZSc6ICdpbmhlcml0JyB9LFxuICAgICAgaDE6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgxIH0sXG4gICAgICBoMjogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDIgfSxcbiAgICAgIGgzOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oMyB9LFxuICAgICAgaDQ6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg0IH0sXG4gICAgICBoNTogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDUgfSxcbiAgICAgIGg2OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oNiB9LFxuICAgICAgcDE6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAxIH0sXG4gICAgICBwMjogeyAnZm9udC1zaXplJzogZm9udFNpemUucDIgfSxcbiAgICAgIHAzOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wMyB9LFxuICAgICAgcDQ6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA0IH0sXG4gICAgICBwNTogeyAnZm9udC1zaXplJzogZm9udFNpemUucDUgfSxcbiAgICAgIHA2OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wNiB9LFxuICAgICAgaTE6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmkxIH0sXG4gICAgICBpMjogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTIgfSxcbiAgICAgIGkzOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pMyB9LFxuICAgICAgaTQ6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmk0IH0sXG4gICAgICBpNTogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTUgfSxcbiAgICAgIGk2OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pNiB9LFxuICAgICAgJyonOiB7ICdmb250LXNpemUnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gZm9udC13ZWlnaHRcbiAgICBmdzoge1xuICAgICAgbGlnaHQ6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5saWdodCB9LFxuICAgICAgcmVndWxhcjogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LnJlZ3VsYXIgfSxcbiAgICAgIG5vcm1hbDogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LnJlZ3VsYXIgfSwgLy8gYWxpYXNcbiAgICAgIG1lZGl1bTogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0Lm1lZGl1bSB9LFxuICAgICAgc2VtaTogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LnNlbWkgfSxcbiAgICAgIGJvbGQ6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5ib2xkIH0sXG4gICAgICBleHRyYTogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LmV4dHJhIH0sXG4gICAgICBoZWFkaW5nOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQuaGVhZGluZyB9LFxuICAgIH0sXG5cbiAgICAvLyBmb250LXN0eWxlXG4gICAgZmk6IHtcbiAgICAgIHllczogeyAnZm9udC1zdHlsZSc6ICdpdGFsaWMnIH0sXG4gICAgICBubzogeyAnZm9udC1zdHlsZSc6ICdub3JtYWwnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtY29sdW1uIGFsaWduLXNlbGZcbiAgICAnZmx4LWNvbC1hbGlnbi1zZWxmJzoge1xuICAgICAgJ3RvcC1sZWZ0JzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ3RvcC1jZW50ZXInOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcsICdhbGlnbi1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcsICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgICAgJ2NlbnRlci1sZWZ0JzogeyAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicsICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInLCAnYWxpZ24tc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0JzogeyAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicsICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0JzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJywgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICdib3R0b20tY2VudGVyJzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJywgJ2FsaWduLXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcsICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LWNvbHVtLWFsaWduXG4gICAgJ2ZseC1jb2wtYWxpZ24nOiB7XG4gICAgICBfY29tbW9uOiB7IGRpc3BsYXk6ICdmbGV4JywgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicgfSxcbiAgICAgICd0b3AtbGVmdCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICd0b3AtY2VudGVyJzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAndG9wLXJpZ2h0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJywgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWxlZnQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLXJpZ2h0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnYmV0d2Vlbi1sZWZ0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tY2VudGVyJzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAnYmV0d2Vlbi1yaWdodCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtcm93IGFsaWduLXNlbGZcbiAgICAnZmx4LXJvdy1hbGlnbi1zZWxmJzoge1xuICAgICAgbm9uZTogeyAnYWxpZ24tc2VsZic6ICdub3JtYWwnLCAnanVzdGlmeS1zZWxmJzogJ25vcm1hbCcgfSxcbiAgICAgICd0b3AtbGVmdCc6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICd0b3AtY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAndG9wLXJpZ2h0JzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHsgJ2FsaWduLXNlbGYnOiAnY2VudGVyJywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7ICdhbGlnbi1zZWxmJzogJ2NlbnRlcicsICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ2NlbnRlci1yaWdodCc6IHsgJ2FsaWduLXNlbGYnOiAnY2VudGVyJywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1yb3ctYWxpZ25cbiAgICAnZmx4LXJvdy1hbGlnbic6IHtcbiAgICAgIF9jb21tb246IHsgZGlzcGxheTogJ2ZsZXgnLCAnZmxleC1kaXJlY3Rpb24nOiAncm93JyB9LFxuICAgICAgJ3RvcC1sZWZ0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ3RvcC1jZW50ZXInOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ3RvcC1iZXR3ZWVuJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1sZWZ0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyB9LFxuICAgICAgJ2NlbnRlci1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItYmV0d2Vlbic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tY2VudGVyJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1iZXR3ZWVuJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmx4LWVuZCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICB9LFxuICAgICAgJ3N0cmV0Y2gtbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0cmV0Y2gnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdzdHJldGNoLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0cmV0Y2gnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ3N0cmV0Y2gtcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdHJldGNoJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ3N0cmV0Y2gtYmV0d2Vlbic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0cmV0Y2gnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1kaXJlY3Rpb25cbiAgICAnZmx4LWRpcic6IHtcbiAgICAgIGNvbDogeyAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyB9LFxuICAgICAgcm93OiB7ICdmbGV4LWRpcmVjdGlvbic6ICdyb3cnIH0sXG4gICAgICBjb2xyZXY6IHsgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbi1yZXZlcnNlJyB9LFxuICAgICAgcm93cmV2OiB7ICdmbGV4LWRpcmVjdGlvbic6ICdyb3ctcmV2ZXJzZScgfSxcbiAgICB9LFxuXG4gICAgLy8ganVzdGlmeS1jb250ZW50XG4gICAgJ2ZseC1qdXN0aWZ5LWNvbnRlbnQnOiB7XG4gICAgICBjZW50ZXI6IHsgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInIH0sXG4gICAgICBzdGFydDogeyAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICBlbmQ6IHsgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcgfSxcbiAgICAgIGJldHdlZW46IHsgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyB9LFxuICAgICAgYXJvdW5kOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYXJvdW5kJyB9LFxuICAgIH0sXG5cbiAgICAvLyBhbGlnbi1pdGVtc1xuICAgICdmbHgtYWxpZ24taXRlbXMnOiB7XG4gICAgICBjZW50ZXI6IHsgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicgfSxcbiAgICAgIHN0YXJ0OiB7ICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgZW5kOiB7ICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gb2JqZWN0LWZpdFxuICAgIG9maXQ6IHtcbiAgICAgIG5vbmU6IHsgJ29iamVjdC1maXQnOiAnbm9uZScgfSxcbiAgICAgIGNvbnRhaW46IHsgJ29iamVjdC1maXQnOiAnY29udGFpbicgfSxcbiAgICAgIGNvdmVyOiB7ICdvYmplY3QtZml0JzogJ2NvdmVyJyB9LFxuICAgICAgZmlsbDogeyAnb2JqZWN0LWZpdCc6ICdmaWxsJyB9LFxuICAgICAgc2NhbGVkb3duOiB7ICdvYmplY3QtZml0JzogJ3NjYWxlLWRvd24nIH0sXG4gICAgfSxcblxuICAgIC8vIG9iamVjdC1wb3NpdGlvblxuICAgIG9wb3M6IHtcbiAgICAgIG5vbmU6IHsgJ29iamVjdC1wb3NpdGlvbic6ICd1bnNldCcgfSxcbiAgICAgIGNlbnRlcjogeyAnb2JqZWN0LXBvc2l0aW9uJzogJ2NlbnRlcicgfSxcbiAgICAgICcqJzogeyAnb2JqZWN0LXBvc2l0aW9uJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG9yZGVyXG4gICAgJ2ZseC1vcmRlcic6IHtcbiAgICAgIG4xOiB7IG9yZGVyOiAtMSB9LFxuICAgICAgMDogeyBvcmRlcjogMCB9LFxuICAgICAgMTogeyBvcmRlcjogMSB9LFxuICAgICAgMjogeyBvcmRlcjogMiB9LFxuICAgICAgMzogeyBvcmRlcjogMyB9LFxuICAgICAgNDogeyBvcmRlcjogNCB9LFxuICAgICAgNTogeyBvcmRlcjogNSB9LFxuICAgICAgNjogeyBvcmRlcjogNiB9LFxuICAgICAgNzogeyBvcmRlcjogNyB9LFxuICAgICAgODogeyBvcmRlcjogOCB9LFxuICAgICAgOTogeyBvcmRlcjogOSB9LFxuICAgICAgMTA6IHsgb3JkZXI6IDEwIH0sXG4gICAgICAxMTogeyBvcmRlcjogMTEgfSxcbiAgICAgIDEyOiB7IG9yZGVyOiAxMiB9LFxuICAgICAgJyonOiB7IG9yZGVyOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC13cmFwXG4gICAgJ2ZseC13cmFwJzoge1xuICAgICAgeWVzOiB7ICdmbGV4LXdyYXAnOiAnd3JhcCcgfSxcbiAgICAgIG5vOiB7ICdmbGV4LXdyYXAnOiAnbm93cmFwJyB9LFxuICAgICAgcmV2OiB7ICdmbGV4LXdyYXAnOiAnd3JhcC1yZXZlcnNlJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4XG4gICAgZmx4OiB7XG4gICAgICBmaWxsOiB7IGZsZXg6ICcxIDEgYXV0bycgfSxcbiAgICAgICcqJzogeyBmbGV4OiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1ncm93XG4gICAgJ2ZseC1ncm93Jzoge1xuICAgICAgMDogeyAnZmxleC1ncm93JzogJzAnIH0sXG4gICAgICAxOiB7ICdmbGV4LWdyb3cnOiAnMScgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1zaHJpbmtcbiAgICAnZmx4LXNocmluayc6IHtcbiAgICAgIDA6IHsgJ2ZsZXgtc2hyaW5rJzogJzAnIH0sXG4gICAgICAxOiB7ICdmbGV4LXNocmluayc6ICcxJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LWJhc2lzXG4gICAgJ2ZseC1iYXNpcyc6IHtcbiAgICAgIGF1dG86IHsgJ2ZsZXgtYmFzaXMnOiAnYXV0bycgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxvYXRcbiAgICBmbG9hdDoge1xuICAgICAgbGVmdDogeyBmbG9hdDogJ2xlZnQnIH0sXG4gICAgICByaWdodDogeyBmbG9hdDogJ3JpZ2h0JyB9LFxuICAgICAgbm9uZTogeyBmbG9hdDogJ25vbmUnIH0sXG4gICAgfSxcblxuICAgIC8vIGxpc3Qtc3R5bGVcbiAgICAnbGlzdC1zdHlsZSc6IHtcbiAgICAgIG5vbmU6IHsgJ2xpc3Qtc3R5bGUnOiAnbm9uZScsIG1hcmdpbjogMCwgcGFkZGluZzogMCB9LFxuICAgICAgJyonOiB7ICdsaXN0LXN0eWxlJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGxpc3Qtc3R5bGUtcG9zaXRpb21cbiAgICAnbGlzdC1zdHlsZS1wb3NpdGlvbic6IHtcbiAgICAgIGluc2lkZTogeyAnbGlzdC1zdHlsZS1wb3NpdGlvbic6ICdpbnNpZGUnIH0sXG4gICAgICBvdXRzaWRlOiB7ICdsaXN0LXN0eWxlLXBvc2l0aW9uJzogJ291dHNpZGUnIH0sXG4gICAgICAnKic6IHsgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gbGluZWFyLWdyYWRpZW50XG4gICAgJ2xpbmVhci1ncmFkaWVudCc6IHtcbiAgICAgICcqJzogeyBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBsaW5lLWhlaWdodFxuICAgIGxoOiB7XG4gICAgICAwOiB7ICdsaW5lLWhlaWdodCc6IDAgfSxcbiAgICAgIDE6IHsgJ2xpbmUtaGVpZ2h0JzogMSB9LFxuICAgICAgMS4xMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4xMjUgfSxcbiAgICAgIDEuMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4yNSB9LFxuICAgICAgMS4zNzU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4zNzUgfSxcbiAgICAgIDEuNTogeyAnbGluZS1oZWlnaHQnOiAxLjUgfSxcbiAgICAgIDEuNjI1OiB7ICdsaW5lLWhlaWdodCc6IDEuNjI1IH0sXG4gICAgICAxLjc1OiB7ICdsaW5lLWhlaWdodCc6IDEuNzUgfSxcbiAgICAgIDEuODc1OiB7ICdsaW5lLWhlaWdodCc6IDEuODc1IH0sXG4gICAgICAyOiB7ICdsaW5lLWhlaWdodCc6IDIgfSxcbiAgICAgIDIuMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMi4yNSB9LFxuICAgICAgMi41OiB7ICdsaW5lLWhlaWdodCc6IDIuNSB9LFxuICAgICAgMi43NTogeyAnbGluZS1oZWlnaHQnOiAyLjc1IH0sXG4gICAgICAzOiB7ICdsaW5lLWhlaWdodCc6IDMgfSxcbiAgICAgIDMuNTogeyAnbGluZS1oZWlnaHQnOiAzLjUgfSxcbiAgICAgIDQ6IHsgJ2xpbmUtaGVpZ2h0JzogNCB9LFxuICAgICAgNTogeyAnbGluZS1oZWlnaHQnOiA1IH0sXG4gICAgICAnKic6IHsgJ2xpbmUtaGVpZ2h0JzogJyonIH0sXG4gICAgfSxcblxuICAgIGxzOiB7XG4gICAgICAnbi4yJzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4ycmVtJyB9LFxuICAgICAgJ24uMTgnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE4cmVtJyB9LFxuICAgICAgJ24uMTYnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE2cmVtJyB9LFxuICAgICAgJ24uMTQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE0cmVtJyB9LFxuICAgICAgJ24uMTInOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjEycmVtJyB9LFxuICAgICAgJ24uMSc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMXJlbScgfSxcbiAgICAgICduLjA4JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wOHJlbScgfSxcbiAgICAgICduLjA2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wNnJlbScgfSxcbiAgICAgICduLjA0JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wNHJlbScgfSxcbiAgICAgICduLjAyJzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wMnJlbScgfSxcbiAgICAgIDA6IHsgJ2xldHRlci1zcGFjaW5nJzogMCB9LFxuICAgICAgJy4wMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4wMnJlbScgfSxcbiAgICAgICcuMDQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMDRyZW0nIH0sXG4gICAgICAnLjA2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjA2cmVtJyB9LFxuICAgICAgJy4wOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4wOHJlbScgfSxcbiAgICAgICcuMSc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xcmVtJyB9LFxuICAgICAgJy4xMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xMnJlbScgfSxcbiAgICAgICcuMTQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMTRyZW0nIH0sXG4gICAgICAnLjE2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjE2cmVtJyB9LFxuICAgICAgJy4xOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xOHJlbScgfSxcbiAgICAgICcuMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4ycmVtJyB9LFxuICAgICAgJy40JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjRyZW0nIH0sXG4gICAgICAnLjYnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuNnJlbScgfSxcbiAgICAgICcuOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy44cmVtJyB9LFxuICAgICAgMTogeyAnbGV0dGVyLXNwYWNpbmcnOiAnMXJlbScgfSxcbiAgICAgIDI6IHsgJ2xldHRlci1zcGFjaW5nJzogJzJyZW0nIH0sXG4gICAgICAnKic6IHsgJ2xldHRlci1zcGFjaW5nJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG9wYWNpdHlcbiAgICBvcGFjaXR5OiB7XG4gICAgICAwOiB7IG9wYWNpdHk6IDAgfSxcbiAgICAgIDEwOiB7IG9wYWNpdHk6IDAuMSB9LFxuICAgICAgMjA6IHsgb3BhY2l0eTogMC4yIH0sXG4gICAgICAzMDogeyBvcGFjaXR5OiAwLjMgfSxcbiAgICAgIDQwOiB7IG9wYWNpdHk6IDAuNCB9LFxuICAgICAgNTA6IHsgb3BhY2l0eTogMC41IH0sXG4gICAgICA2MDogeyBvcGFjaXR5OiAwLjYgfSxcbiAgICAgIDcwOiB7IG9wYWNpdHk6IDAuNyB9LFxuICAgICAgODA6IHsgb3BhY2l0eTogMC44IH0sXG4gICAgICA5MDogeyBvcGFjaXR5OiAwLjkgfSxcbiAgICAgIDEwMDogeyBvcGFjaXR5OiAxIH0sXG4gICAgICAnKic6IHsgb3BhY2l0eTogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG91dGxpbmVcbiAgICBvdXRsaW5lOiB7XG4gICAgICBub25lOiB7IG91dGxpbmU6ICdub25lJyB9LFxuICAgICAgJyonOiB7IG91dGxpbmU6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvdXRsaW5lLXdpZHRoXG4gICAgb3c6IHtcbiAgICAgIF9jb21tb246IHsgJ291dGxpbmUtc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdvdXRsaW5lLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ291dGxpbmUtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3V0bGluZS1vZmZzZXRcbiAgICBvbzoge1xuICAgICAgMDogeyAnb3V0bGluZS1vZmZzZXQnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnb3V0bGluZS1vZmZzZXQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gcG9zaXRpb24gYWxpZ25cbiAgICAncG9zLWFsaWduJzoge1xuICAgICAgX2NvbW1vbjoge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIH0sXG4gICAgICBub25lOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAndG9wLWxlZnQnOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICd0b3AtY2VudGVyJzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1sZWZ0Jzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0Jzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0Jzoge1xuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHtcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7XG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tc3RyZXRjaCc6IHtcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICd0b3Atc3RyZXRjaCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gcG9zaXRpb24gb3ZlcmxheVxuICAgICdwb3Mtb3ZlcmxheSc6IHtcbiAgICAgIF9jb21tb246IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgfSxcbiAgICAgIGFiczogeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9LFxuICAgICAgZml4OiB7IHBvc2l0aW9uOiAnZml4ZWQnIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uIG92ZXJsYXkgbGlua1xuICAgICdwb3Mtb3ZlcmxheS1saW5rJzoge1xuICAgICAgX2NvbW1vbjoge1xuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IDAsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyxcbiAgICAgICAgJ3otaW5kZXgnOiAxLFxuICAgICAgfSxcbiAgICAgIGFiczogeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9LFxuICAgICAgZml4OiB7IHBvc2l0aW9uOiAnZml4ZWQnIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgcG9zOiB7XG4gICAgICBhYnM6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSxcbiAgICAgIGZpeDogeyBwb3NpdGlvbjogJ2ZpeGVkJyB9LFxuICAgICAgcmVsOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sXG4gICAgICBzdGF0aWM6IHsgcG9zaXRpb246ICdzdGF0aWMnIH0sXG4gICAgICBzdGlja3k6IHsgcG9zaXRpb246ICdzdGlja3knIH0sXG4gICAgfSxcblxuICAgIC8vIHBvaW50ZXItZXZlbnRzXG4gICAgJ3BvaW50ZXItZXZlbnRzJzoge1xuICAgICAgZGlzYWJsZWQ6IHsgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnIH0sXG4gICAgICBhY3RpdmU6IHsgJ3BvaW50ZXItZXZlbnRzJzogJ2F1dG8nIH0sXG4gICAgfSxcblxuICAgIHJ0bDoge1xuICAgICAgeWVzOiB7IGRpcmVjdGlvbjogJ3J0bCcgfSxcbiAgICAgIG5vOiB7IGRpcmVjdGlvbjogJ2x0cicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3ZlcmZsb3dcbiAgICBzY3JvbGxhYmxlOiB7XG4gICAgICBfY29tbW9uOiB7ICdmbGV4LXdyYXAnOiAnbm93cmFwJyB9LFxuICAgICAgYWxsOiB7IG92ZXJmbG93OiAnYXV0bycgfSxcbiAgICAgIHZpc2libGU6IHsgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9LFxuICAgICAgbm9uZTogeyBvdmVyZmxvdzogJ2hpZGRlbicsICdmbGV4LXdyYXAnOiAnd3JhcCAhaW1wb3J0YW50JyB9LFxuICAgICAgaGlkZGVuOiB7IG92ZXJmbG93OiAnaGlkZGVuJyB9LFxuICAgICAgeDogeyAnb3ZlcmZsb3cteCc6ICdhdXRvJywgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9LFxuICAgICAgeTogeyAnb3ZlcmZsb3cteSc6ICdhdXRvJywgJ292ZXJmbG93LXgnOiAnaGlkZGVuJyB9LFxuICAgIH0sXG5cbiAgICAvLyB2aXNpYmxpdHlcbiAgICB2aXNpYmxlOiB7XG4gICAgICB5ZXM6IHsgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0sXG4gICAgICBubzogeyB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2l0aW9uXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgYWxsOiB7IHRyYW5zaXRpb246IGBhbGwgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAgfSxcbiAgICAgIGJnYzoge1xuICAgICAgICB0cmFuc2l0aW9uOiBgYmFja2dyb3VuZC1jb2xvciAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICBmYzoge1xuICAgICAgICB0cmFuc2l0aW9uOiBgY29sb3IgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgdzogeyB0cmFuc2l0aW9uOiBgd2lkdGggJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAgfSxcbiAgICAgIGg6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYGhlaWdodCAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICBobWF4OiB7XG4gICAgICAgIHRyYW5zaXRpb246IGBtYXgtaGVpZ2h0ICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIHRyYW5zZm9ybToge1xuICAgICAgICB0cmFuc2l0aW9uOiBgdHJhbnNmb3JtICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgbm9uZTogeyB0cmFuc2l0aW9uOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyB0cmFuc2l0aW9uOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNmb3JtIHJvdGF0ZVxuICAgIHJvdGF0ZToge1xuICAgICAgbjE4MDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTE4MGRlZyknIH0sXG4gICAgICBuMTM1OiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtMTM1ZGVnKScgfSxcbiAgICAgIG45MDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTkwZGVnKScgfSxcbiAgICAgIG40NTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAncm90YXRlKDApJyB9LFxuICAgICAgNDU6IHsgdHJhbnNmb3JtOiAncm90YXRlKDQ1ZGVnKScgfSxcbiAgICAgIDkwOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0sXG4gICAgICAxMzU6IHsgdHJhbnNmb3JtOiAncm90YXRlKDEzNWRlZyknIH0sXG4gICAgICAxODA6IHsgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAncm90YXRlKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0gdHJhbnNsYXRlXG4gICAgdHJhbnNsYXRlOiB7XG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAwKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteCc6IHtcbiAgICAgIG41MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyB9LFxuICAgICAgbjEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSxcbiAgICAgIDUwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNTAlKScgfSxcbiAgICAgIDEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteSc6IHtcbiAgICAgIG41MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyB9LFxuICAgICAgbjEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScgfSxcbiAgICAgIDUwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNTAlKScgfSxcbiAgICAgIDEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwMCUpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteic6IHtcbiAgICAgIG4xMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigtMTAwJSknIH0sXG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVooMCknIH0sXG4gICAgICAxMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigxMDAlKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVaKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0gc2NhbGVcbiAgICBzY2FsZToge1xuICAgICAgZGVmYXVsdDogeyB0cmFuc2Zvcm06ICdzY2FsZSgxKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICdzY2FsZSgqKScgfSxcbiAgICB9LFxuXG4gICAgJ3NjYWxlLXgnOiB7XG4gICAgICAxOiB7IHRyYW5zZm9ybTogJ3NjYWxlWCgxKScgfSxcbiAgICAgIG4xOiB7IHRyYW5zZm9ybTogJ3NjYWxlWCgtMSknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAnc2NhbGVYKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0tb3JpZ2luXG4gICAgJ3RyYW5zZm9ybS1vJzoge1xuICAgICAgMDogeyAndHJhbnNmb3JtLW9yaWdpbic6ICcwIDAnIH0sXG4gICAgICAnMTAwLTAnOiB7ICd0cmFuc2Zvcm0tb3JpZ2luJzogJzEwMCUgMCcgfSxcbiAgICB9LFxuXG4gICAgLy8gdGV4dC1hbGlnblxuICAgICd0eHQtYWxpZ24nOiB7XG4gICAgICBsZWZ0OiB7ICd0ZXh0LWFsaWduJzogJ2xlZnQnIH0sXG4gICAgICBjZW50ZXI6IHsgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyB9LFxuICAgICAgcmlnaHQ6IHsgJ3RleHQtYWxpZ24nOiAncmlnaHQnIH0sXG4gICAgICBqdXN0aWZ5OiB7ICd0ZXh0LWFsaWduJzogJ2p1c3RpZnknIH0sXG4gICAgfSxcblxuICAgIC8vIHRleHQtc2hhZG93XG4gICAgJ3R4dC1zaGFkb3cnOiB7XG4gICAgICAnKic6IHsgJ3RleHQtc2hhZG93JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHdoaXRlLXNwYWNlXG4gICAgJ3R4dC13cmFwJzoge1xuICAgICAgeWVzOiB7ICd3aGl0ZS1zcGFjZSc6ICdub3JtYWwnIH0sXG4gICAgICBubzogeyAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyB9LFxuICAgICAgJyonOiB7ICd3aGl0ZS1zcGFjZSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0ZXh0LXRyYW5zZm9ybVxuICAgICd0eHQtY2FzZSc6IHtcbiAgICAgIG5vbmU6IHsgJ3RleHQtdHJhbnNmb3JtJzogJ25vbmUnIH0sXG4gICAgICBsb3dlcjogeyAndGV4dC10cmFuc2Zvcm0nOiAnbG93ZXJjYXNlJyB9LFxuICAgICAgdXBwZXI6IHsgJ3RleHQtdHJhbnNmb3JtJzogJ3VwcGVyY2FzZScgfSxcbiAgICAgIHRpdGxlOiB7ICd0ZXh0LXRyYW5zZm9ybSc6ICdjYXBpdGFsaXplJyB9LFxuICAgIH0sXG5cbiAgICAvLyBlbGxpcHNpc1xuICAgICd0eHQtdHJ1bmNhdGUnOiB7XG4gICAgICB5ZXM6IHtcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAndGV4dC1vdmVyZmxvdyc6ICdlbGxpcHNpcycsXG4gICAgICAgICd3aGl0ZS1zcGFjZSc6ICdub3dyYXAnLFxuICAgICAgfSxcbiAgICAgIG5vOiB7XG4gICAgICAgIG92ZXJmbG93OiAnaW5pdGlhbCcsXG4gICAgICAgICd0ZXh0LW92ZXJmbG93JzogJ2luaXRpYWwnLFxuICAgICAgICAnd2hpdGUtc3BhY2UnOiAnd3JhcCcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAndHh0LXVuZGVybGluZSc6IHtcbiAgICAgIHllczogeyAndGV4dC1kZWNvcmF0aW9uJzogJ3VuZGVybGluZScgfSxcbiAgICAgIG5vOiB7ICd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScgfSxcbiAgICB9LFxuXG4gICAgJ3R4dC1saW5lLXRocm91Z2gnOiB7XG4gICAgICB5ZXM6IHsgJ3RleHQtZGVjb3JhdGlvbic6ICdsaW5lLXRocm91Z2gnIH0sXG4gICAgICBubzogeyAndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnIH0sXG4gICAgfSxcblxuICAgICd2LWFsaWduJzoge1xuICAgICAgbm9uZTogeyAndmVydGljYWwtYWxpZ24nOiAndW5zZXQnIH0sXG4gICAgICB0b3A6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3RvcCcgfSxcbiAgICAgIG1pZGRsZTogeyAndmVydGljYWwtYWxpZ24nOiAnbWlkZGxlJyB9LFxuICAgICAgYm90dG9tOiB7ICd2ZXJ0aWNhbC1hbGlnbic6ICdib3R0b20nIH0sXG4gICAgICBzdWI6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3N1YicgfSxcbiAgICAgIHN1cDogeyAndmVydGljYWwtYWxpZ24nOiAnc3VwZXInIH0sXG4gICAgICAnKic6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHN0cm9rZS13aWR0aFxuICAgICdzdHJva2Utd2lkdGgnOiB7XG4gICAgICAwOiB7ICdzdHJva2Utd2lkdGgnOiAwIH0sXG4gICAgICAxOiB7ICdzdHJva2Utd2lkdGgnOiAxIH0sXG4gICAgICAxLjE6IHsgJ3N0cm9rZS13aWR0aCc6IDEuMSB9LFxuICAgICAgMS4yOiB7ICdzdHJva2Utd2lkdGgnOiAxLjIgfSxcbiAgICAgIDEuMzogeyAnc3Ryb2tlLXdpZHRoJzogMS4zIH0sXG4gICAgICAxLjQ6IHsgJ3N0cm9rZS13aWR0aCc6IDEuNCB9LFxuICAgICAgMS41OiB7ICdzdHJva2Utd2lkdGgnOiAxLjUgfSxcbiAgICAgIDEuNjogeyAnc3Ryb2tlLXdpZHRoJzogMS42IH0sXG4gICAgICAxLjc6IHsgJ3N0cm9rZS13aWR0aCc6IDEuNyB9LFxuICAgICAgMS44OiB7ICdzdHJva2Utd2lkdGgnOiAxLjggfSxcbiAgICAgIDEuOTogeyAnc3Ryb2tlLXdpZHRoJzogMS45IH0sXG4gICAgICAyOiB7ICdzdHJva2Utd2lkdGgnOiAyIH0sXG4gICAgICAzOiB7ICdzdHJva2Utd2lkdGgnOiAzIH0sXG4gICAgICA0OiB7ICdzdHJva2Utd2lkdGgnOiA0IH0sXG4gICAgICAnKic6IHsgJ3N0cm9rZS13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyB3aWR0aFxuICAgIHc6IHtcbiAgICAgICcxMDB2dyc6IHsgd2lkdGg6ICcxMDB2dycgfSxcbiAgICAgIGNvdmVyOiB7XG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAnbWFyZ2luLWxlZnQnOiAnLTUwdncnLFxuICAgICAgICAnbWFyZ2luLXJpZ2h0JzogJy01MHZ3JyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHJpZ2h0OiAnNTAlJyxcbiAgICAgICAgd2lkdGg6ICcxMDB2dycsXG4gICAgICB9LFxuICAgICAgYXV0bzogeyB3aWR0aDogJ2F1dG8nIH0sXG4gICAgICAwOiB7IHdpZHRoOiAwIH0sXG4gICAgICA1OiB7IHdpZHRoOiAnNSUnIH0sXG4gICAgICAxMDogeyB3aWR0aDogJzEwJScgfSxcbiAgICAgIDE1OiB7IHdpZHRoOiAnMTUlJyB9LFxuICAgICAgMjA6IHsgd2lkdGg6ICcyMCUnIH0sXG4gICAgICAyNTogeyB3aWR0aDogJzI1JScgfSxcbiAgICAgIDMwOiB7IHdpZHRoOiAnMzAlJyB9LFxuICAgICAgMzM6IHsgd2lkdGg6ICczMyUnIH0sXG4gICAgICAzNTogeyB3aWR0aDogJzM1JScgfSxcbiAgICAgIDQwOiB7IHdpZHRoOiAnNDAlJyB9LFxuICAgICAgNDU6IHsgd2lkdGg6ICc0NSUnIH0sXG4gICAgICA1MDogeyB3aWR0aDogJzUwJScgfSxcbiAgICAgIDU1OiB7IHdpZHRoOiAnNTUlJyB9LFxuICAgICAgNjA6IHsgd2lkdGg6ICc2MCUnIH0sXG4gICAgICA2NTogeyB3aWR0aDogJzY1JScgfSxcbiAgICAgIDY2OiB7IHdpZHRoOiAnNjYlJyB9LFxuICAgICAgNzA6IHsgd2lkdGg6ICc3MCUnIH0sXG4gICAgICA3NTogeyB3aWR0aDogJzc1JScgfSxcbiAgICAgIDgwOiB7IHdpZHRoOiAnODAlJyB9LFxuICAgICAgODU6IHsgd2lkdGg6ICc4NSUnIH0sXG4gICAgICA5MDogeyB3aWR0aDogJzkwJScgfSxcbiAgICAgIDk1OiB7IHdpZHRoOiAnOTUlJyB9LFxuICAgICAgMTAwOiB7IHdpZHRoOiAnMTAwJScgfSxcbiAgICAgICcqJzogeyB3aWR0aDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG1heC13aWR0aFxuICAgIHdtYXg6IHtcbiAgICAgIG5hcnJvdzogeyAnbWF4LXdpZHRoJzogbWF4V2lkdGguc20gfSxcbiAgICAgIG5vcm1hbDogeyAnbWF4LXdpZHRoJzogbWF4V2lkdGgubWQgfSxcbiAgICAgIHdpZGU6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLmxnIH0sXG4gICAgICB2YXN0OiB7ICdtYXgtd2lkdGgnOiBtYXhXaWR0aC54bCB9LFxuICAgICAgZXh0cmE6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLnh4bCB9LFxuICAgICAgNTogeyAnbWF4LXdpZHRoJzogJzUlJyB9LFxuICAgICAgMTA6IHsgJ21heC13aWR0aCc6ICcxMCUnIH0sXG4gICAgICAxNTogeyAnbWF4LXdpZHRoJzogJzE1JScgfSxcbiAgICAgIDIwOiB7ICdtYXgtd2lkdGgnOiAnMjAlJyB9LFxuICAgICAgMjU6IHsgJ21heC13aWR0aCc6ICcyNSUnIH0sXG4gICAgICAzMDogeyAnbWF4LXdpZHRoJzogJzMwJScgfSxcbiAgICAgIDMzOiB7ICdtYXgtd2lkdGgnOiAnMzMlJyB9LFxuICAgICAgMzU6IHsgJ21heC13aWR0aCc6ICczNSUnIH0sXG4gICAgICA0MDogeyAnbWF4LXdpZHRoJzogJzQwJScgfSxcbiAgICAgIDQ1OiB7ICdtYXgtd2lkdGgnOiAnNDUlJyB9LFxuICAgICAgNTA6IHsgJ21heC13aWR0aCc6ICc1MCUnIH0sXG4gICAgICA1NTogeyAnbWF4LXdpZHRoJzogJzU1JScgfSxcbiAgICAgIDYwOiB7ICdtYXgtd2lkdGgnOiAnNjAlJyB9LFxuICAgICAgNjU6IHsgJ21heC13aWR0aCc6ICc2NSUnIH0sXG4gICAgICA2NjogeyAnbWF4LXdpZHRoJzogJzY2JScgfSxcbiAgICAgIDcwOiB7ICdtYXgtd2lkdGgnOiAnNzAlJyB9LFxuICAgICAgNzU6IHsgJ21heC13aWR0aCc6ICc3NSUnIH0sXG4gICAgICA4MDogeyAnbWF4LXdpZHRoJzogJzgwJScgfSxcbiAgICAgIDg1OiB7ICdtYXgtd2lkdGgnOiAnODUlJyB9LFxuICAgICAgOTA6IHsgJ21heC13aWR0aCc6ICc5MCUnIH0sXG4gICAgICA5NTogeyAnbWF4LXdpZHRoJzogJzk1JScgfSxcbiAgICAgIDEwMDogeyAnbWF4LXdpZHRoJzogJzEwMCUnIH0sXG4gICAgICAnKic6IHsgJ21heC13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4td2lkdGhcbiAgICB3bWluOiB7XG4gICAgICAnMTAwdncnOiB7ICdtaW4td2lkdGgnOiAnMTAwdncnIH0sXG4gICAgICBuYXJyb3c6IHsgJ21pbi13aWR0aCc6IG1heFdpZHRoLnNtIH0sXG4gICAgICBub3JtYWw6IHsgJ21pbi13aWR0aCc6IG1heFdpZHRoLm1kIH0sXG4gICAgICB3aWRlOiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC5sZyB9LFxuICAgICAgdmFzdDogeyAnbWluLXdpZHRoJzogbWF4V2lkdGgueGwgfSxcbiAgICAgIGV4dHJhOiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC54eGwgfSxcbiAgICAgIDU6IHsgJ21pbi13aWR0aCc6ICc1JScgfSxcbiAgICAgIDEwOiB7ICdtaW4td2lkdGgnOiAnMTAlJyB9LFxuICAgICAgMTU6IHsgJ21pbi13aWR0aCc6ICcxNSUnIH0sXG4gICAgICAyMDogeyAnbWluLXdpZHRoJzogJzIwJScgfSxcbiAgICAgIDI1OiB7ICdtaW4td2lkdGgnOiAnMjUlJyB9LFxuICAgICAgMzA6IHsgJ21pbi13aWR0aCc6ICczMCUnIH0sXG4gICAgICAzMzogeyAnbWluLXdpZHRoJzogJzMzJScgfSxcbiAgICAgIDM1OiB7ICdtaW4td2lkdGgnOiAnMzUlJyB9LFxuICAgICAgNDA6IHsgJ21pbi13aWR0aCc6ICc0MCUnIH0sXG4gICAgICA0NTogeyAnbWluLXdpZHRoJzogJzQ1JScgfSxcbiAgICAgIDUwOiB7ICdtaW4td2lkdGgnOiAnNTAlJyB9LFxuICAgICAgNTU6IHsgJ21pbi13aWR0aCc6ICc1NSUnIH0sXG4gICAgICA2MDogeyAnbWluLXdpZHRoJzogJzYwJScgfSxcbiAgICAgIDY1OiB7ICdtaW4td2lkdGgnOiAnNjUlJyB9LFxuICAgICAgNjY6IHsgJ21pbi13aWR0aCc6ICc2NiUnIH0sXG4gICAgICA3MDogeyAnbWluLXdpZHRoJzogJzcwJScgfSxcbiAgICAgIDc1OiB7ICdtaW4td2lkdGgnOiAnNzUlJyB9LFxuICAgICAgODA6IHsgJ21pbi13aWR0aCc6ICc4MCUnIH0sXG4gICAgICA4NTogeyAnbWluLXdpZHRoJzogJzg1JScgfSxcbiAgICAgIDkwOiB7ICdtaW4td2lkdGgnOiAnOTAlJyB9LFxuICAgICAgOTU6IHsgJ21pbi13aWR0aCc6ICc5NSUnIH0sXG4gICAgICAxMDA6IHsgJ21pbi13aWR0aCc6ICcxMDAlJyB9LFxuICAgICAgJyonOiB7ICdtaW4td2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gd2lkdGggY2FsY1xuICAgIHdjYWxjOiB7XG4gICAgICAnKic6IHsgd2lkdGg6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtYXgtd2lkdGggY2FsY1xuICAgIHdtYXhjYWxjOiB7XG4gICAgICAnKic6IHsgJ21heC13aWR0aCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4td2lkdGggY2FsY1xuICAgIHdtaW5jYWxjOiB7XG4gICAgICAnKic6IHsgJ21pbi13aWR0aCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBoZWlnaHRcbiAgICBoOiB7XG4gICAgICAnMTAwdmgnOiB7IGhlaWdodDogJzEwMHZoJyB9LFxuICAgICAgYXV0bzogeyBoZWlnaHQ6ICdhdXRvJyB9LFxuICAgICAgMDogeyBoZWlnaHQ6IDAgfSxcbiAgICAgIDEwMDogeyBoZWlnaHQ6ICcxMDAlJyB9LFxuICAgICAgJyonOiB7IGhlaWdodDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG1heC1oZWlnaHRcbiAgICBobWF4OiB7XG4gICAgICAnMTAwdmgnOiB7ICdtYXgtaGVpZ2h0JzogJzEwMHZoJyB9LFxuICAgICAgbm9uZTogeyAnbWF4LWhlaWdodCc6ICdub25lJyB9LFxuICAgICAgMTAwOiB7ICdtYXgtaGVpZ2h0JzogJzEwMCUnIH0sXG4gICAgICAwOiB7ICdtYXgtaGVpZ2h0JzogJzAnIH0sXG4gICAgICAnKic6IHsgJ21heC1oZWlnaHQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gbWluLWhlaWdodFxuICAgIGhtaW46IHtcbiAgICAgICcxMDB2aCc6IHsgJ21pbi1oZWlnaHQnOiAnMTAwdmgnIH0sXG4gICAgICBhdXRvOiB7ICdtaW4taGVpZ2h0JzogJ2F1dG8nIH0sXG4gICAgICAxMDA6IHsgJ21pbi1oZWlnaHQnOiAnMTAwJScgfSxcbiAgICAgICcqJzogeyAnbWluLWhlaWdodCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBoZWlnaHQgY2FsY1xuICAgIGhjYWxjOiB7XG4gICAgICAnKic6IHsgaGVpZ2h0OiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbWF4LWhlaWdodCBjYWxjXG4gICAgaG1heGNhbGM6IHtcbiAgICAgICcqJzogeyAnbWF4LWhlaWdodCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4taGVpZ2h0IGNhbGNcbiAgICBobWluY2FsYzoge1xuICAgICAgJyonOiB7ICdtaW4taGVpZ2h0JzogJ2NhbGMoKiknIH0sXG4gICAgfSxcblxuICAgIC8vIHNxdWFyZVxuICAgIHNxdWFyZToge1xuICAgICAgYXV0bzogeyB3aWR0aDogJ2F1dG8nLCBoZWlnaHQ6ICdhdXRvJyB9LFxuICAgICAgMDogeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0sXG4gICAgICAnKic6IHsgd2lkdGg6ICcqJywgaGVpZ2h0OiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gei1pbmRleFxuICAgIHo6IHtcbiAgICAgIG46IHsgJ3otaW5kZXgnOiAtMSB9LFxuICAgICAgMDogeyAnei1pbmRleCc6IDAgfSxcbiAgICAgIDE6IHsgJ3otaW5kZXgnOiAxIH0sXG4gICAgICAzOiB7ICd6LWluZGV4JzogMyB9LFxuICAgICAgNjogeyAnei1pbmRleCc6IDYgfSxcbiAgICAgIDk6IHsgJ3otaW5kZXgnOiA5IH0sXG4gICAgICA5OTogeyAnei1pbmRleCc6IDk5IH0sXG4gICAgICA5OTk6IHsgJ3otaW5kZXgnOiA5OTkgfSxcbiAgICAgIDk5OTk6IHsgJ3otaW5kZXgnOiA5OTk5IH0sXG4gICAgICAnKic6IHsgJ3otaW5kZXgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gc2Nyb2xsIHNuYXAgdHlwZVxuICAgICdzcy10eXBlJzoge1xuICAgICAgbm9uZTogeyAnc2Nyb2xsLXNuYXAtdHlwZSc6ICdub25lJyB9LFxuICAgICAgYm90aDogeyAnc2Nyb2xsLXNuYXAtdHlwZSc6ICdib3RoJyB9LFxuICAgIH0sXG5cbiAgICAvLyBzY3JvbGwgc25hcCBhbGlnblxuICAgICdzcy1hbGlnbic6IHtcbiAgICAgIG5vbmU6IHsgJ3Njcm9sbC1zbmFwLWFsaWduJzogJ25vbmUnIH0sXG4gICAgICBzdGFydDogeyAnc2Nyb2xsLXNuYXAtYWxpZ24nOiAnc3RhcnQnIH0sXG4gICAgfSxcblxuICAgIC8vIHNjcm9sbCBtYXJnaW4gdG9wXG4gICAgJ3NtLXRvcCc6IHtcbiAgICAgICcqJzogeyAnc2Nyb2xsLW1hcmdpbi10b3AnOiAnKicgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwID0gKHtcbiAgY29sb3IsXG4gIHNwYWNlcixcbiAgZm9udEZhbWlseSxcbn06IE1hcGxlVmFyaWFibGVNb2RlbCkgPT4gW1xuICB7IHByZWZpeDogJ2ZmJywgbWFwOiBmb250RmFtaWx5LCBwcm9wczogWydmb250LWZhbWlseSddIH0sXG4gIHsgcHJlZml4OiAnYmdjJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnYmFja2dyb3VuZC1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAnYmMnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLXRvcCcsIG1hcDogY29sb3IsIHByb3BzOiBbJ2JvcmRlci10b3AtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLWJvdHRvbScsIG1hcDogY29sb3IsIHByb3BzOiBbJ2JvcmRlci1ib3R0b20tY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLWxlZnQnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItbGVmdC1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAnYmMtcmlnaHQnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItcmlnaHQtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2NvbC1iYycsIG1hcDogY29sb3IsIHByb3BzOiBbJ2NvbHVtbi1ydWxlLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdsaW5rJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnbGluayddIH0sXG4gIHsgcHJlZml4OiAnYnRuJywgbWFwOiBjb2xvciwgcHJvcHM6IFsndGhlbWUnXSB9LFxuICB7IHByZWZpeDogJ2J0bi1vdXRsaW5lJywgbWFwOiBjb2xvciwgcHJvcHM6IFsndGhlbWUtb3V0bGluZSddIH0sXG4gIHsgcHJlZml4OiAnYWxlcnQnLCBtYXA6IGNvbG9yLCBwcm9wczogWyd0aGVtZSddIH0sXG4gIHsgcHJlZml4OiAnYWxlcnQtb3V0bGluZScsIG1hcDogY29sb3IsIHByb3BzOiBbJ3RoZW1lLW91dGxpbmUnXSB9LFxuICB7IHByZWZpeDogJ3N0cm9rZScsIG1hcDogY29sb3IsIHByb3BzOiBbJ3N0cm9rZSddIH0sXG4gIHsgcHJlZml4OiAnZmMnLCBtYXA6IGNvbG9yLCBwcm9wczogWydjb2xvciddIH0sXG4gIHsgcHJlZml4OiAnb2MnLCBtYXA6IGNvbG9yLCBwcm9wczogWydvdXRsaW5lLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdwJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmcnXSB9LFxuICB7IHByZWZpeDogJ3BiJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdwbCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLWxlZnQnXSB9LFxuICB7IHByZWZpeDogJ3ByJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctcmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ3B0JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctdG9wJ10gfSxcbiAgeyBwcmVmaXg6ICdweCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLWxlZnQnLCAncGFkZGluZy1yaWdodCddIH0sXG4gIHsgcHJlZml4OiAncHknLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsncGFkZGluZy10b3AnLCAncGFkZGluZy1ib3R0b20nXSB9LFxuICB7IHByZWZpeDogJ20nLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luJ10gfSxcbiAgeyBwcmVmaXg6ICdtYicsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdtbCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tbGVmdCddIH0sXG4gIHsgcHJlZml4OiAnbXInLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLXJpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdtdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tdG9wJ10gfSxcbiAgeyBwcmVmaXg6ICdteCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ215JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAndG9wJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3RvcCddIH0sXG4gIHsgcHJlZml4OiAnbGVmdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydsZWZ0J10gfSxcbiAgeyBwcmVmaXg6ICdyaWdodCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydyaWdodCddIH0sXG4gIHsgcHJlZml4OiAnYm90dG9tJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAndG9ibycsIG1hcDogc3BhY2VyLCBwcm9wczogWyd0b3AnLCAnYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdsZXJpJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2xlZnQnLCAncmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ2xlYm8nLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbGVmdCcsICdib3R0b20nXSB9LFxuICB7XG4gICAgcHJlZml4OiAndGJscicsXG4gICAgbWFwOiBzcGFjZXIsXG4gICAgcHJvcHM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10sXG4gIH0sXG4gIHsgcHJlZml4OiAndGJscicsIG1hcDogc3BhY2VyLCBwcm9wczogWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ2J3JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci13aWR0aCddIH0sXG4gIHsgcHJlZml4OiAnYnctYm90dG9tJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci1ib3R0b20td2lkdGgnXSB9LFxuICB7IHByZWZpeDogJ2J3LXRvcCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItdG9wLXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdidy1sZWZ0JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci1sZWZ0LXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdidy1yaWdodCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItcmlnaHQtd2lkdGgnXSB9LFxuICB7IHByZWZpeDogJ2NvbC1nYXAnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnY29sdW1uLWdhcCddIH0sXG5dO1xuIl19