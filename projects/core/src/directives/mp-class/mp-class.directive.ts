/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  Renderer2,
  ɵstringify as stringify,
} from '@angular/core';
import { Maple } from '../../main';

type NgClassSupportedTypes =
  | Array<string>
  | Set<string>
  | { [klass: string]: any }
  | null
  | undefined;

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

@Directive({
  selector: '[mpClass]',
})
export class MpClass implements DoCheck {
  private _iterableDiffer: IterableDiffer<string> | null = null;
  private _keyValueDiffer: KeyValueDiffer<string, any> | null = null;
  private _initialClasses: Array<string> = [];
  private _rawClass: NgClassSupportedTypes = null;

  constructor(
    private _iterableDiffers: IterableDiffers,
    private _keyValueDiffers: KeyValueDiffers,
    private _ngEl: ElementRef,
    private _renderer: Renderer2,
  ) {}

  @Input('class')
  public set klass(value: string) {
    this._removeClasses(this._initialClasses);
    this._initialClasses = typeof value === 'string' ? value.split(/\s+/) : [];
    this._applyClasses(this._initialClasses);
    this._applyClasses(this._rawClass);
  }

  @Input('mpClass')
  public set mpClass(
    value: string | Array<string> | Set<string> | { [klass: string]: any },
  ) {
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
      } else {
        this._keyValueDiffer = this._keyValueDiffers
          .find(this._rawClass)
          .create();
      }
    }
  }

  public ngDoCheck() {
    if (this._iterableDiffer) {
      const iterableChanges = this._iterableDiffer.diff(
        this._rawClass as Array<string>,
      );
      if (iterableChanges) {
        this._applyIterableChanges(iterableChanges);
      }
    } else if (this._keyValueDiffer) {
      const keyValueChanges = this._keyValueDiffer.diff(
        this._rawClass as { [k: string]: any },
      );
      if (keyValueChanges) {
        this._applyKeyValueChanges(keyValueChanges);
      }
    }
  }

  private _applyKeyValueChanges(changes: KeyValueChanges<string, any>): void {
    changes.forEachAddedItem((record) =>
      this._toggleClass(record.key, record.currentValue),
    );
    changes.forEachChangedItem((record) =>
      this._toggleClass(record.key, record.currentValue),
    );
    changes.forEachRemovedItem((record) => {
      if (record.previousValue) {
        this._toggleClass(record.key, false);
      }
    });
  }

  private _applyIterableChanges(changes: IterableChanges<string>): void {
    changes.forEachAddedItem((record) => {
      if (typeof record.item === 'string') {
        this._toggleClass(record.item, true);
      } else {
        throw new Error(
          `NgClass can only toggle CSS classes expressed as strings, got ${stringify(
            record.item,
          )}`,
        );
      }
    });

    changes.forEachRemovedItem((record) =>
      this._toggleClass(record.item, false),
    );
  }

  private isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
  }

  private isListLikeIterable(obj) {
    if (!this.isJsObject(obj)) return false;
    return (
      Array.isArray(obj) ||
      (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
        Symbol.iterator in obj)
    ); // JS Iterable have a Symbol.iterator prop
  }

  /**
   * Applies a collection of CSS classes to the DOM element.
   *
   * For argument of type Set and Array CSS class names contained in those collections are always
   * added.
   * For argument of type Map CSS class name in the map's key is toggled based on the value (added
   * for truthy and removed for falsy).
   */
  private _applyClasses(rawClassVal: NgClassSupportedTypes) {
    if (rawClassVal) {
      if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
        (rawClassVal as any).forEach((klass: string) =>
          this._toggleClass(klass, true),
        );
      } else {
        Object.keys(rawClassVal).forEach((klass) =>
          this._toggleClass(klass, !!rawClassVal[klass]),
        );
      }
    }
  }

  /**
   * Removes a collection of CSS classes from the DOM element. This is mostly useful for cleanup
   * purposes.
   */
  private _removeClasses(rawClassVal: NgClassSupportedTypes) {
    if (rawClassVal) {
      if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
        (rawClassVal as any).forEach((klass: string) =>
          this._toggleClass(klass, false),
        );
      } else {
        Object.keys(rawClassVal).forEach((klass) =>
          this._toggleClass(klass, false),
        );
      }
    }
  }

  private _toggleClass(klass: string, enabled: boolean): void {
    klass = klass.trim();
    if (klass) {
      if (enabled) {
        Maple.fly(klass);
      }
      klass.split(/\s+/g).forEach((klass) => {
        if (enabled) {
          this._renderer.addClass(this._ngEl.nativeElement, klass);
        } else {
          this._renderer.removeClass(this._ngEl.nativeElement, klass);
        }
      });
    }
  }
}
