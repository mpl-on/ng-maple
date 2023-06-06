/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, ɵstringify as stringify, } from '@angular/core';
import { Maple } from '../../main';
import * as i0 from "@angular/core";
/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```
 *     <some-element [mpClass]="'first second'">...</some-element>
 *
 *     <some-element [mpClass]="['first', 'second']">...</some-element>
 *
 *     <some-element [mpClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
 *
 *     <some-element [mpClass]="stringExp|arrayExp|objExp">...</some-element>
 *
 *     <some-element [mpClass]="{'class1 class2 class3' : true}">...</some-element>
 * ```
 *
 * @description
 *
 * Adds and removes CSS classes on an HTML element.
 *
 * The CSS classes are updated as follows, depending on the type of the expression evaluation:
 * - `string` - the CSS classes listed in the string (space delimited) are added,
 * - `Array` - the CSS classes declared as Array elements are added,
 * - `Object` - keys are CSS classes that get added when the expression given in the value
 *              evaluates to a truthy value, otherwise they are removed.
 *
 * @publicApi
 */
export class MpClass {
    constructor(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._iterableDiffer = null;
        this._keyValueDiffer = null;
        this._initialClasses = [];
        this._rawClass = null;
    }
    set klass(value) {
        this._removeClasses(this._initialClasses);
        this._initialClasses = typeof value === 'string' ? value.split(/\s+/) : [];
        this._applyClasses(this._initialClasses);
        this._applyClasses(this._rawClass);
    }
    set mpClass(value) {
        this._removeClasses(this._rawClass);
        this._applyClasses(this._initialClasses);
        this._iterableDiffer = null;
        this._keyValueDiffer = null;
        this._rawClass = typeof value === 'string' ? value.split(/\s+/) : value;
        if (this._rawClass) {
            if (this.isListLikeIterable(this._rawClass)) {
                this._iterableDiffer = this._iterableDiffers
                    .find(this._rawClass)
                    .create();
            }
            else {
                this._keyValueDiffer = this._keyValueDiffers
                    .find(this._rawClass)
                    .create();
            }
        }
    }
    ngDoCheck() {
        if (this._iterableDiffer) {
            const iterableChanges = this._iterableDiffer.diff(this._rawClass);
            if (iterableChanges) {
                this._applyIterableChanges(iterableChanges);
            }
        }
        else if (this._keyValueDiffer) {
            const keyValueChanges = this._keyValueDiffer.diff(this._rawClass);
            if (keyValueChanges) {
                this._applyKeyValueChanges(keyValueChanges);
            }
        }
    }
    _applyKeyValueChanges(changes) {
        changes.forEachAddedItem((record) => this._toggleClass(record.key, record.currentValue));
        changes.forEachChangedItem((record) => this._toggleClass(record.key, record.currentValue));
        changes.forEachRemovedItem((record) => {
            if (record.previousValue) {
                this._toggleClass(record.key, false);
            }
        });
    }
    _applyIterableChanges(changes) {
        changes.forEachAddedItem((record) => {
            if (typeof record.item === 'string') {
                this._toggleClass(record.item, true);
            }
            else {
                throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${stringify(record.item)}`);
            }
        });
        changes.forEachRemovedItem((record) => this._toggleClass(record.item, false));
    }
    isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    isListLikeIterable(obj) {
        if (!this.isJsObject(obj))
            return false;
        return (Array.isArray(obj) ||
            (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
                Symbol.iterator in obj)); // JS Iterable have a Symbol.iterator prop
    }
    /**
     * Applies a collection of CSS classes to the DOM element.
     *
     * For argument of type Set and Array CSS class names contained in those collections are always
     * added.
     * For argument of type Map CSS class name in the map's key is toggled based on the value (added
     * for truthy and removed for falsy).
     */
    _applyClasses(rawClassVal) {
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                rawClassVal.forEach((klass) => this._toggleClass(klass, true));
            }
            else {
                Object.keys(rawClassVal).forEach((klass) => this._toggleClass(klass, !!rawClassVal[klass]));
            }
        }
    }
    /**
     * Removes a collection of CSS classes from the DOM element. This is mostly useful for cleanup
     * purposes.
     */
    _removeClasses(rawClassVal) {
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                rawClassVal.forEach((klass) => this._toggleClass(klass, false));
            }
            else {
                Object.keys(rawClassVal).forEach((klass) => this._toggleClass(klass, false));
            }
        }
    }
    _toggleClass(klass, enabled) {
        klass = klass.trim();
        if (klass) {
            if (enabled) {
                Maple.fly(klass);
            }
            klass.split(/\s+/g).forEach((klass) => {
                if (enabled) {
                    this._renderer.addClass(this._ngEl.nativeElement, klass);
                }
                else {
                    this._renderer.removeClass(this._ngEl.nativeElement, klass);
                }
            });
        }
    }
}
/** @nocollapse */ MpClass.ɵfac = function MpClass_Factory(t) { return new (t || MpClass)(i0.ɵɵdirectiveInject(i0.IterableDiffers), i0.ɵɵdirectiveInject(i0.KeyValueDiffers), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
/** @nocollapse */ MpClass.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MpClass, selectors: [["", "mpClass", ""]], inputs: { klass: ["class", "klass"], mpClass: "mpClass" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MpClass, [{
        type: Directive,
        args: [{
                selector: '[mpClass]',
            }]
    }], function () { return [{ type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { klass: [{
            type: Input,
            args: ['class']
        }], mpClass: [{
            type: Input,
            args: ['mpClass']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXAtY2xhc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9zcmMvZGlyZWN0aXZlcy9tcC1jbGFzcy9tcC1jbGFzcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBUUwsVUFBVSxJQUFJLFNBQVMsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFTbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUtILE1BQU0sT0FBTyxPQUFPO0lBTWxCLFlBQ1UsZ0JBQWlDLEVBQ2pDLGdCQUFpQyxFQUNqQyxLQUFpQixFQUNqQixTQUFvQjtRQUhwQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVHRCLG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUN0RCxvQkFBZSxHQUF1QyxJQUFJLENBQUM7UUFDM0Qsb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBQ3BDLGNBQVMsR0FBMEIsSUFBSSxDQUFDO0lBTzdDLENBQUM7SUFFSixJQUNXLEtBQUssQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFD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O3lGQUFQLE9BQU87dUZBQVAsT0FBTztjQUhuQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7YUFDdEI7aUpBZVksS0FBSztrQkFEZixLQUFLO21CQUFDLE9BQU87WUFTSCxPQUFPO2tCQURqQixLQUFLO21CQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJdGVyYWJsZUNoYW5nZXMsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEtleVZhbHVlQ2hhbmdlcyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgUmVuZGVyZXIyLFxuICDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwbGUgfSBmcm9tICcuLi8uLi9tYWluJztcblxudHlwZSBOZ0NsYXNzU3VwcG9ydGVkVHlwZXMgPVxuICB8IEFycmF5PHN0cmluZz5cbiAgfCBTZXQ8c3RyaW5nPlxuICB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfVxuICB8IG51bGxcbiAgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqICAgICA8c29tZS1lbGVtZW50IFttcENsYXNzXT1cIidmaXJzdCBzZWNvbmQnXCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKlxuICogICAgIDxzb21lLWVsZW1lbnQgW21wQ2xhc3NdPVwiWydmaXJzdCcsICdzZWNvbmQnXVwiPi4uLjwvc29tZS1lbGVtZW50PlxuICpcbiAqICAgICA8c29tZS1lbGVtZW50IFttcENsYXNzXT1cInsnZmlyc3QnOiB0cnVlLCAnc2Vjb25kJzogdHJ1ZSwgJ3RoaXJkJzogZmFsc2V9XCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKlxuICogICAgIDxzb21lLWVsZW1lbnQgW21wQ2xhc3NdPVwic3RyaW5nRXhwfGFycmF5RXhwfG9iakV4cFwiPi4uLjwvc29tZS1lbGVtZW50PlxuICpcbiAqICAgICA8c29tZS1lbGVtZW50IFttcENsYXNzXT1cInsnY2xhc3MxIGNsYXNzMiBjbGFzczMnIDogdHJ1ZX1cIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEFkZHMgYW5kIHJlbW92ZXMgQ1NTIGNsYXNzZXMgb24gYW4gSFRNTCBlbGVtZW50LlxuICpcbiAqIFRoZSBDU1MgY2xhc3NlcyBhcmUgdXBkYXRlZCBhcyBmb2xsb3dzLCBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgdGhlIGV4cHJlc3Npb24gZXZhbHVhdGlvbjpcbiAqIC0gYHN0cmluZ2AgLSB0aGUgQ1NTIGNsYXNzZXMgbGlzdGVkIGluIHRoZSBzdHJpbmcgKHNwYWNlIGRlbGltaXRlZCkgYXJlIGFkZGVkLFxuICogLSBgQXJyYXlgIC0gdGhlIENTUyBjbGFzc2VzIGRlY2xhcmVkIGFzIEFycmF5IGVsZW1lbnRzIGFyZSBhZGRlZCxcbiAqIC0gYE9iamVjdGAgLSBrZXlzIGFyZSBDU1MgY2xhc3NlcyB0aGF0IGdldCBhZGRlZCB3aGVuIHRoZSBleHByZXNzaW9uIGdpdmVuIGluIHRoZSB2YWx1ZVxuICogICAgICAgICAgICAgIGV2YWx1YXRlcyB0byBhIHRydXRoeSB2YWx1ZSwgb3RoZXJ3aXNlIHRoZXkgYXJlIHJlbW92ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttcENsYXNzXScsXG59KVxuZXhwb3J0IGNsYXNzIE1wQ2xhc3MgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgcHJpdmF0ZSBfaXRlcmFibGVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfa2V5VmFsdWVEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9pbml0aWFsQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwcml2YXRlIF9yYXdDbGFzczogTmdDbGFzc1N1cHBvcnRlZFR5cGVzID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBwcml2YXRlIF9rZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge31cblxuICBASW5wdXQoJ2NsYXNzJylcbiAgcHVibGljIHNldCBrbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ2xhc3Nlcyh0aGlzLl9pbml0aWFsQ2xhc3Nlcyk7XG4gICAgdGhpcy5faW5pdGlhbENsYXNzZXMgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUuc3BsaXQoL1xccysvKSA6IFtdO1xuICAgIHRoaXMuX2FwcGx5Q2xhc3Nlcyh0aGlzLl9pbml0aWFsQ2xhc3Nlcyk7XG4gICAgdGhpcy5fYXBwbHlDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzKTtcbiAgfVxuXG4gIEBJbnB1dCgnbXBDbGFzcycpXG4gIHB1YmxpYyBzZXQgbXBDbGFzcyhcbiAgICB2YWx1ZTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9LFxuICApIHtcbiAgICB0aGlzLl9yZW1vdmVDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzKTtcbiAgICB0aGlzLl9hcHBseUNsYXNzZXModGhpcy5faW5pdGlhbENsYXNzZXMpO1xuXG4gICAgdGhpcy5faXRlcmFibGVEaWZmZXIgPSBudWxsO1xuICAgIHRoaXMuX2tleVZhbHVlRGlmZmVyID0gbnVsbDtcblxuICAgIHRoaXMuX3Jhd0NsYXNzID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlLnNwbGl0KC9cXHMrLykgOiB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl9yYXdDbGFzcykge1xuICAgICAgaWYgKHRoaXMuaXNMaXN0TGlrZUl0ZXJhYmxlKHRoaXMuX3Jhd0NsYXNzKSkge1xuICAgICAgICB0aGlzLl9pdGVyYWJsZURpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVyc1xuICAgICAgICAgIC5maW5kKHRoaXMuX3Jhd0NsYXNzKVxuICAgICAgICAgIC5jcmVhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2tleVZhbHVlRGlmZmVyID0gdGhpcy5fa2V5VmFsdWVEaWZmZXJzXG4gICAgICAgICAgLmZpbmQodGhpcy5fcmF3Q2xhc3MpXG4gICAgICAgICAgLmNyZWF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuX2l0ZXJhYmxlRGlmZmVyKSB7XG4gICAgICBjb25zdCBpdGVyYWJsZUNoYW5nZXMgPSB0aGlzLl9pdGVyYWJsZURpZmZlci5kaWZmKFxuICAgICAgICB0aGlzLl9yYXdDbGFzcyBhcyBBcnJheTxzdHJpbmc+LFxuICAgICAgKTtcbiAgICAgIGlmIChpdGVyYWJsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlJdGVyYWJsZUNoYW5nZXMoaXRlcmFibGVDaGFuZ2VzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2tleVZhbHVlRGlmZmVyKSB7XG4gICAgICBjb25zdCBrZXlWYWx1ZUNoYW5nZXMgPSB0aGlzLl9rZXlWYWx1ZURpZmZlci5kaWZmKFxuICAgICAgICB0aGlzLl9yYXdDbGFzcyBhcyB7IFtrOiBzdHJpbmddOiBhbnkgfSxcbiAgICAgICk7XG4gICAgICBpZiAoa2V5VmFsdWVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX2FwcGx5S2V5VmFsdWVDaGFuZ2VzKGtleVZhbHVlQ2hhbmdlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlLZXlWYWx1ZUNoYW5nZXMoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkKSA9PlxuICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSksXG4gICAgKTtcbiAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbSgocmVjb3JkKSA9PlxuICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSksXG4gICAgKTtcbiAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLmtleSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlJdGVyYWJsZUNoYW5nZXMoY2hhbmdlczogSXRlcmFibGVDaGFuZ2VzPHN0cmluZz4pOiB2b2lkIHtcbiAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKHJlY29yZCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZWNvcmQuaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MocmVjb3JkLml0ZW0sIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBOZ0NsYXNzIGNhbiBvbmx5IHRvZ2dsZSBDU1MgY2xhc3NlcyBleHByZXNzZWQgYXMgc3RyaW5ncywgZ290ICR7c3RyaW5naWZ5KFxuICAgICAgICAgICAgcmVjb3JkLml0ZW0sXG4gICAgICAgICAgKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZCkgPT5cbiAgICAgIHRoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5pdGVtLCBmYWxzZSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNKc09iamVjdChvKSB7XG4gICAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG4gIH1cblxuICBwcml2YXRlIGlzTGlzdExpa2VJdGVyYWJsZShvYmopIHtcbiAgICBpZiAoIXRoaXMuaXNKc09iamVjdChvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIChcbiAgICAgIEFycmF5LmlzQXJyYXkob2JqKSB8fFxuICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgIFN5bWJvbC5pdGVyYXRvciBpbiBvYmopXG4gICAgKTsgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhIGNvbGxlY3Rpb24gb2YgQ1NTIGNsYXNzZXMgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgKlxuICAgKiBGb3IgYXJndW1lbnQgb2YgdHlwZSBTZXQgYW5kIEFycmF5IENTUyBjbGFzcyBuYW1lcyBjb250YWluZWQgaW4gdGhvc2UgY29sbGVjdGlvbnMgYXJlIGFsd2F5c1xuICAgKiBhZGRlZC5cbiAgICogRm9yIGFyZ3VtZW50IG9mIHR5cGUgTWFwIENTUyBjbGFzcyBuYW1lIGluIHRoZSBtYXAncyBrZXkgaXMgdG9nZ2xlZCBiYXNlZCBvbiB0aGUgdmFsdWUgKGFkZGVkXG4gICAqIGZvciB0cnV0aHkgYW5kIHJlbW92ZWQgZm9yIGZhbHN5KS5cbiAgICovXG4gIHByaXZhdGUgX2FwcGx5Q2xhc3NlcyhyYXdDbGFzc1ZhbDogTmdDbGFzc1N1cHBvcnRlZFR5cGVzKSB7XG4gICAgaWYgKHJhd0NsYXNzVmFsKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdDbGFzc1ZhbCkgfHwgcmF3Q2xhc3NWYWwgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgKHJhd0NsYXNzVmFsIGFzIGFueSkuZm9yRWFjaCgoa2xhc3M6IHN0cmluZykgPT5cbiAgICAgICAgICB0aGlzLl90b2dnbGVDbGFzcyhrbGFzcywgdHJ1ZSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3Qua2V5cyhyYXdDbGFzc1ZhbCkuZm9yRWFjaCgoa2xhc3MpID0+XG4gICAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3Moa2xhc3MsICEhcmF3Q2xhc3NWYWxba2xhc3NdKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNvbGxlY3Rpb24gb2YgQ1NTIGNsYXNzZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQuIFRoaXMgaXMgbW9zdGx5IHVzZWZ1bCBmb3IgY2xlYW51cFxuICAgKiBwdXJwb3Nlcy5cbiAgICovXG4gIHByaXZhdGUgX3JlbW92ZUNsYXNzZXMocmF3Q2xhc3NWYWw6IE5nQ2xhc3NTdXBwb3J0ZWRUeXBlcykge1xuICAgIGlmIChyYXdDbGFzc1ZhbCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF3Q2xhc3NWYWwpIHx8IHJhd0NsYXNzVmFsIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIChyYXdDbGFzc1ZhbCBhcyBhbnkpLmZvckVhY2goKGtsYXNzOiBzdHJpbmcpID0+XG4gICAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3Moa2xhc3MsIGZhbHNlKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHJhd0NsYXNzVmFsKS5mb3JFYWNoKChrbGFzcykgPT5cbiAgICAgICAgICB0aGlzLl90b2dnbGVDbGFzcyhrbGFzcywgZmFsc2UpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUNsYXNzKGtsYXNzOiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBrbGFzcyA9IGtsYXNzLnRyaW0oKTtcbiAgICBpZiAoa2xhc3MpIHtcbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIE1hcGxlLmZseShrbGFzcyk7XG4gICAgICB9XG4gICAgICBrbGFzcy5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKChrbGFzcykgPT4ge1xuICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwga2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwga2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==