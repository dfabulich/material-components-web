/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {MDCTabScrollerRTL} from './rtl-scroller';
import {MDCTabScrollerAnimation, MDCTabScrollerHorizontalEdges} from './types';

export class MDCTabScrollerRTLReverse extends MDCTabScrollerRTL {
  getScrollPositionRTL(translateX: number): number {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    // Scroll values on most browsers are ints instead of floats so we round
    return Math.round(currentScrollLeft - translateX);
  }

  scrollToRTL(scrollX: number): MDCTabScrollerAnimation {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft,
    };
  }

  incrementScrollRTL(scrollX: number): MDCTabScrollerAnimation {
    const currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    const clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft,
    };
  }

  getAnimatingScrollPosition(scrollX: number, translateX: number): number {
    return scrollX + translateX;
  }

  private calculateScrollEdges_(): MDCTabScrollerHorizontalEdges {
    const contentWidth = this.adapter_.getScrollContentOffsetWidth();
    const rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return {
      left: contentWidth - rootWidth,
      right: 0,
    };
  }

  private clampScrollValue_(scrollX: number): number {
    const edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.right, scrollX), edges.left);
  }
}

export default MDCTabScrollerRTLReverse; // For backward compatibility
