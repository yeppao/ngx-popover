/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, EventEmitter, Renderer2 } from "@angular/core";
var PopoverContent = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function PopoverContent(element, cdr, renderer) {
        var _this = this;
        this.element = element;
        this.cdr = cdr;
        this.renderer = renderer;
        this.placement = "bottom";
        this.animation = true;
        this.closeOnClickOutside = false;
        this.closeOnMouseOutside = false;
        this.onCloseFromOutside = new EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.isIn = false;
        this.displayType = "none";
        /**
         * Closes dropdown if user clicks outside of this directive.
         */
        this.onDocumentMouseDown = function (event) {
            /** @type {?} */
            var element = _this.element.nativeElement;
            if (!element || !_this.popover)
                return;
            if (element.contains(event.target) || _this.popover.getElement().contains(event.target))
                return;
            _this.hide();
            _this.onCloseFromOutside.emit(undefined);
        };
    }
    /**
     * @return {?}
     */
    PopoverContent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.closeOnClickOutside)
            this.listenClickFunc = this.renderer.listen("document", "mousedown", function (event) { return _this.onDocumentMouseDown(event); });
        if (this.closeOnMouseOutside)
            this.listenMouseFunc = this.renderer.listen("document", "mouseover", function (event) { return _this.onDocumentMouseDown(event); });
        this.show();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    PopoverContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.closeOnClickOutside)
            this.listenClickFunc();
        if (this.closeOnMouseOutside)
            this.listenMouseFunc();
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * @return {?}
     */
    PopoverContent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (!this.popover || !this.popover.getElement())
            return;
        /** @type {?} */
        var p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = "block";
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
    };
    /**
     * @return {?}
     */
    PopoverContent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    };
    /**
     * @return {?}
     */
    PopoverContent.prototype.hideFromPopover = /**
     * @return {?}
     */
    function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    PopoverContent.prototype.positionElements = /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        /** @type {?} */
        var positionStrParts = positionStr.split("-");
        /** @type {?} */
        var pos0 = positionStrParts[0];
        /** @type {?} */
        var pos1 = positionStrParts[1] || "center";
        /** @type {?} */
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        /** @type {?} */
        var targetElWidth = targetEl.offsetWidth;
        /** @type {?} */
        var targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        /** @type {?} */
        var shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        /** @type {?} */
        var shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        /** @type {?} */
        var targetElPos;
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    PopoverContent.prototype.position = /**
     * @param {?} nativeEl
     * @return {?}
     */
    function (nativeEl) {
        /** @type {?} */
        var offsetParentBCR = { top: 0, left: 0 };
        /** @type {?} */
        var elBCR = this.offset(nativeEl);
        /** @type {?} */
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        /** @type {?} */
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    PopoverContent.prototype.offset = /**
     * @param {?} nativeEl
     * @return {?}
     */
    function (nativeEl) {
        /** @type {?} */
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    PopoverContent.prototype.getStyle = /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    function (nativeEl, cssProp) {
        if ((/** @type {?} */ (nativeEl)).currentStyle) // IE
            // IE
            return (/** @type {?} */ (nativeEl)).currentStyle[cssProp];
        if (window.getComputedStyle)
            return (/** @type {?} */ (window.getComputedStyle))(nativeEl)[cssProp];
        // finally try and get inline style
        return (/** @type {?} */ (nativeEl.style))[cssProp];
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    PopoverContent.prototype.isStaticPositioned = /**
     * @param {?} nativeEl
     * @return {?}
     */
    function (nativeEl) {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    PopoverContent.prototype.parentOffsetEl = /**
     * @param {?} nativeEl
     * @return {?}
     */
    function (nativeEl) {
        /** @type {?} */
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    /**
     * @param {?} placement
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    PopoverContent.prototype.getEffectivePlacement = /**
     * @param {?} placement
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    function (placement, hostElement, targetElement) {
        /** @type {?} */
        var placementParts = placement.split(" ");
        if (placementParts[0] !== "auto") {
            return placement;
        }
        /** @type {?} */
        var hostElBoundingRect = hostElement.getBoundingClientRect();
        /** @type {?} */
        var desiredPlacement = placementParts[1] || "bottom";
        if (desiredPlacement === "top" && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return "bottom";
        }
        if (desiredPlacement === "bottom" && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return "top";
        }
        if (desiredPlacement === "left" && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return "right";
        }
        if (desiredPlacement === "right" && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return "left";
        }
        return desiredPlacement;
    };
    PopoverContent.decorators = [
        { type: Component, args: [{
                    selector: "popover-content",
                    template: "\n<div #popoverDiv class=\"popover {{ effectivePlacement }}\"\n     [style.top]=\"top + 'px'\"\n     [style.left]=\"left + 'px'\"\n     [class.in]=\"isIn\"\n     [class.fade]=\"animation\"\n     style=\"display: block\"\n     role=\"popover\">\n    <div [hidden]=\"!closeOnMouseOutside\" class=\"virtual-area\"></div>\n    <div class=\"arrow\"></div> \n    <h3 class=\"popover-title\" [hidden]=\"!title\">{{ title }}</h3>\n    <div class=\"popover-content\">\n        <ng-content></ng-content>\n        {{ content }}\n    </div> \n</div>\n",
                    styles: ["\n.popover .virtual-area {\n    height: 11px;\n    width: 100%;\n    position: absolute;\n}\n.popover.top .virtual-area {\n    bottom: -11px; \n}\n.popover.bottom .virtual-area {\n    top: -11px; \n}\n.popover.left .virtual-area {\n    right: -11px; \n}\n.popover.right .virtual-area {\n    left: -11px; \n}\n"]
                }] }
    ];
    /** @nocollapse */
    PopoverContent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    PopoverContent.propDecorators = {
        content: [{ type: Input }],
        placement: [{ type: Input }],
        title: [{ type: Input }],
        animation: [{ type: Input }],
        closeOnClickOutside: [{ type: Input }],
        closeOnMouseOutside: [{ type: Input }],
        popoverDiv: [{ type: ViewChild, args: ["popoverDiv",] }]
    };
    return PopoverContent;
}());
export { PopoverContent };
function PopoverContent_tsickle_Closure_declarations() {
    /** @type {?} */
    PopoverContent.prototype.content;
    /** @type {?} */
    PopoverContent.prototype.placement;
    /** @type {?} */
    PopoverContent.prototype.title;
    /** @type {?} */
    PopoverContent.prototype.animation;
    /** @type {?} */
    PopoverContent.prototype.closeOnClickOutside;
    /** @type {?} */
    PopoverContent.prototype.closeOnMouseOutside;
    /** @type {?} */
    PopoverContent.prototype.popoverDiv;
    /** @type {?} */
    PopoverContent.prototype.popover;
    /** @type {?} */
    PopoverContent.prototype.onCloseFromOutside;
    /** @type {?} */
    PopoverContent.prototype.top;
    /** @type {?} */
    PopoverContent.prototype.left;
    /** @type {?} */
    PopoverContent.prototype.isIn;
    /** @type {?} */
    PopoverContent.prototype.displayType;
    /** @type {?} */
    PopoverContent.prototype.effectivePlacement;
    /**
     * Closes dropdown if user clicks outside of this directive.
     * @type {?}
     */
    PopoverContent.prototype.onDocumentMouseDown;
    /** @type {?} */
    PopoverContent.prototype.listenClickFunc;
    /** @type {?} */
    PopoverContent.prototype.listenMouseFunc;
    /** @type {?} */
    PopoverContent.prototype.element;
    /** @type {?} */
    PopoverContent.prototype.cdr;
    /** @type {?} */
    PopoverContent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wb3ZlckNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcG9wb3Zlci8iLCJzb3VyY2VzIjpbIlBvcG92ZXJDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLGlCQUFpQixFQUFhLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQW1HekksNEVBQTRFO0lBQzVFLGNBQWM7SUFDZCw0RUFBNEU7SUFFNUUsd0JBQXNCLE9BQW1CLEVBQ25CLEdBQXNCLEVBQ3RCLFFBQW1CO1FBRnpDLGlCQUdDO1FBSHFCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVzt5QkFsRDJELFFBQVE7eUJBTXZGLElBQUk7bUNBR00sS0FBSzttQ0FHTCxLQUFLO2tDQVVmLElBQUksWUFBWSxFQUFFO21CQUN6QixDQUFDLEtBQUs7b0JBQ0wsQ0FBQyxLQUFLO29CQUNMLEtBQUs7MkJBQ0MsTUFBTTs7OzttQ0FVTixVQUFDLEtBQVU7O1lBQzdCLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3RDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPO1lBQy9GLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7S0FTQTs7OztJQVFELHdDQUFlOzs7SUFBZjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsbUJBQW1CO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQzFILElBQUksSUFBSSxDQUFDLG1CQUFtQjtZQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUUxSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxtQkFBbUI7WUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQzlCO0lBRUQsNEVBQTRFO0lBQzVFLGlCQUFpQjtJQUNqQiw0RUFBNEU7Ozs7SUFFNUUsNkJBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUMzQyxPQUFPOztRQUVYLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBRUQsNkJBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCx3Q0FBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDcEI7SUFFRCw0RUFBNEU7SUFDNUUsb0JBQW9CO0lBQ3BCLDRFQUE0RTs7Ozs7Ozs7SUFFbEUseUNBQWdCOzs7Ozs7O0lBQTFCLFVBQTJCLE1BQW1CLEVBQUUsUUFBcUIsRUFBRSxXQUFtQixFQUFFLFlBQTZCO1FBQTdCLDZCQUFBLEVBQUEsb0JBQTZCOztRQUNySCxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQzlDLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUMvQixJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUM7O1FBQzNDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDM0UsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQzs7UUFDekMsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUUzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUVwRixJQUFJLFVBQVUsR0FBUTtZQUNsQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE9BQU8sU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzNDO1NBQ0osQ0FBQzs7UUFFRixJQUFJLFdBQVcsR0FBUTtZQUNuQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUM7YUFDcEU7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDO2FBQ3hCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLE9BQU8sU0FBUyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQzNDO1NBQ0osQ0FBQzs7UUFFRixJQUFJLFdBQVcsQ0FBZ0M7UUFDL0MsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLE9BQU87Z0JBQ1IsV0FBVyxHQUFHO29CQUNWLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3hCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7aUJBQzNCLENBQUM7Z0JBQ0YsTUFBTTtZQUVWLEtBQUssTUFBTTtnQkFDUCxXQUFXLEdBQUc7b0JBQ1YsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEdBQUcsYUFBYTtpQkFDdkMsQ0FBQztnQkFDRixNQUFNO1lBRVYsS0FBSyxRQUFRO2dCQUNULFdBQVcsR0FBRztvQkFDVixHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN4QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2lCQUMzQixDQUFDO2dCQUNGLE1BQU07WUFFVjtnQkFDSSxXQUFXLEdBQUc7b0JBQ1YsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEdBQUcsY0FBYztvQkFDbkMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtpQkFDM0IsQ0FBQztnQkFDRixNQUFNO1NBQ2I7UUFFRCxPQUFPLFdBQVcsQ0FBQztLQUN0Qjs7Ozs7SUFFUyxpQ0FBUTs7OztJQUFsQixVQUFtQixRQUFxQjs7UUFDcEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzs7UUFDMUMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFDcEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLGNBQWMsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3BDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlDLGVBQWUsQ0FBQyxHQUFHLElBQUksY0FBYyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzNFLGVBQWUsQ0FBQyxJQUFJLElBQUksY0FBYyxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO1NBQ2pGOztRQUVELElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUQsT0FBTztZQUNILEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFdBQVc7WUFDdkQsTUFBTSxFQUFFLGtCQUFrQixDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsWUFBWTtZQUMxRCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRztZQUNwQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSTtTQUMxQyxDQUFDO0tBQ0w7Ozs7O0lBRVMsK0JBQU07Ozs7SUFBaEIsVUFBaUIsUUFBYTs7UUFDMUIsSUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1RCxPQUFPO1lBQ0gsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsV0FBVztZQUN2RCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZO1lBQzFELEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUMvRixJQUFJLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7U0FDckcsQ0FBQztLQUNMOzs7Ozs7SUFFUyxpQ0FBUTs7Ozs7SUFBbEIsVUFBbUIsUUFBcUIsRUFBRSxPQUFlO1FBQ3JELElBQUksbUJBQUMsUUFBZSxFQUFDLENBQUMsWUFBWSxFQUFFLEtBQUs7O1lBQ3JDLE9BQU8sbUJBQUMsUUFBZSxFQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5ELElBQUksTUFBTSxDQUFDLGdCQUFnQjtZQUN2QixPQUFPLG1CQUFDLE1BQU0sQ0FBQyxnQkFBdUIsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUcvRCxPQUFPLG1CQUFDLFFBQVEsQ0FBQyxLQUFZLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQzs7Ozs7SUFFUywyQ0FBa0I7Ozs7SUFBNUIsVUFBNkIsUUFBcUI7UUFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBRSxLQUFLLFFBQVEsQ0FBQztLQUMxRTs7Ozs7SUFFUyx1Q0FBYzs7OztJQUF4QixVQUF5QixRQUFxQjs7UUFDMUMsSUFBSSxZQUFZLEdBQVEsUUFBUSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pFLE9BQU8sWUFBWSxJQUFJLFlBQVksS0FBSyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RixZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztTQUM1QztRQUNELE9BQU8sWUFBWSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDMUM7Ozs7Ozs7SUFFUyw4Q0FBcUI7Ozs7OztJQUEvQixVQUFnQyxTQUFpQixFQUFFLFdBQXdCLEVBQUUsYUFBMEI7O1FBQ25HLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQzlCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCOztRQUVELElBQU0sa0JBQWtCLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7O1FBRS9ELElBQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUV2RCxJQUFJLGdCQUFnQixLQUFLLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDdkYsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFDRCxJQUFJLGdCQUFnQixLQUFLLFFBQVEsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzlHLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxNQUFNLElBQUksa0JBQWtCLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ3hGLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxPQUFPLElBQUksa0JBQWtCLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMxRyxPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7S0FDM0I7O2dCQWhUSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDZoQkFnQmI7NkJBQ1ksdVRBa0JaO2lCQUNBOzs7O2dCQXpDd0MsVUFBVTtnQkFBRSxpQkFBaUI7Z0JBQXNDLFNBQVM7OzswQkFtRGhILEtBQUs7NEJBR0wsS0FBSzt3QkFHTCxLQUFLOzRCQUdMLEtBQUs7c0NBR0wsS0FBSztzQ0FHTCxLQUFLOzZCQU9MLFNBQVMsU0FBQyxZQUFZOzt5QkF6RTNCOztTQTBDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3Zlcn0gZnJvbSBcIi4vUG9wb3ZlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwb3BvdmVyLWNvbnRlbnRcIixcbiAgICB0ZW1wbGF0ZTogYFxuPGRpdiAjcG9wb3ZlckRpdiBjbGFzcz1cInBvcG92ZXIge3sgZWZmZWN0aXZlUGxhY2VtZW50IH19XCJcbiAgICAgW3N0eWxlLnRvcF09XCJ0b3AgKyAncHgnXCJcbiAgICAgW3N0eWxlLmxlZnRdPVwibGVmdCArICdweCdcIlxuICAgICBbY2xhc3MuaW5dPVwiaXNJblwiXG4gICAgIFtjbGFzcy5mYWRlXT1cImFuaW1hdGlvblwiXG4gICAgIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIlxuICAgICByb2xlPVwicG9wb3ZlclwiPlxuICAgIDxkaXYgW2hpZGRlbl09XCIhY2xvc2VPbk1vdXNlT3V0c2lkZVwiIGNsYXNzPVwidmlydHVhbC1hcmVhXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+IFxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIiBbaGlkZGVuXT1cIiF0aXRsZVwiPnt7IHRpdGxlIH19PC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAge3sgY29udGVudCB9fVxuICAgIDwvZGl2PiBcbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgXG4ucG9wb3ZlciAudmlydHVhbC1hcmVhIHtcbiAgICBoZWlnaHQ6IDExcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLnBvcG92ZXIudG9wIC52aXJ0dWFsLWFyZWEge1xuICAgIGJvdHRvbTogLTExcHg7IFxufVxuLnBvcG92ZXIuYm90dG9tIC52aXJ0dWFsLWFyZWEge1xuICAgIHRvcDogLTExcHg7IFxufVxuLnBvcG92ZXIubGVmdCAudmlydHVhbC1hcmVhIHtcbiAgICByaWdodDogLTExcHg7IFxufVxuLnBvcG92ZXIucmlnaHQgLnZpcnR1YWwtYXJlYSB7XG4gICAgbGVmdDogLTExcHg7IFxufVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRlbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIElucHV0cyAvIE91dHB1dHMgXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gQElucHV0KClcbiAgICAvLyBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGNvbnRlbnQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBcInRvcFwifFwiYm90dG9tXCJ8XCJsZWZ0XCJ8XCJyaWdodFwifFwiYXV0b1wifFwiYXV0byB0b3BcInxcImF1dG8gYm90dG9tXCJ8XCJhdXRvIGxlZnRcInxcImF1dG8gcmlnaHRcIiA9IFwiYm90dG9tXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGNsb3NlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbk1vdXNlT3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BlcnRpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBAVmlld0NoaWxkKFwicG9wb3ZlckRpdlwiKVxuICAgIHBvcG92ZXJEaXY6IEVsZW1lbnRSZWY7XG5cbiAgICBwb3BvdmVyOiBQb3BvdmVyO1xuICAgIG9uQ2xvc2VGcm9tT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0b3A6IG51bWJlciA9IC0xMDAwMDtcbiAgICBsZWZ0OiBudW1iZXIgPSAtMTAwMDA7XG4gICAgaXNJbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGRpc3BsYXlUeXBlOiBzdHJpbmcgPSBcIm5vbmVcIjtcbiAgICBlZmZlY3RpdmVQbGFjZW1lbnQ6IHN0cmluZztcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBbm9ueW1vdXMgXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGRyb3Bkb3duIGlmIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgb25Eb2N1bWVudE1vdXNlRG93biA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50IHx8ICF0aGlzLnBvcG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKGVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMub25DbG9zZUZyb21PdXRzaWRlLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9O1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gTGlmZWN5Y2xlIGNhbGxiYWNrc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGxpc3RlbkNsaWNrRnVuYzogYW55O1xuICAgIGxpc3Rlbk1vdXNlRnVuYzogYW55O1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2tGdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXCJkb2N1bWVudFwiLCBcIm1vdXNlZG93blwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRvY3VtZW50TW91c2VEb3duKGV2ZW50KSk7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Nb3VzZU91dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk1vdXNlRnVuYyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFwiZG9jdW1lbnRcIiwgXCJtb3VzZW92ZXJcIiwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25Eb2N1bWVudE1vdXNlRG93bihldmVudCkpO1xuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25DbGlja091dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkNsaWNrRnVuYygpO1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uTW91c2VPdXRzaWRlKVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5Nb3VzZUZ1bmMoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHVibGljIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucG9wb3ZlciB8fCAhdGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBwID0gdGhpcy5wb3NpdGlvbkVsZW1lbnRzKHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCksIHRoaXMucG9wb3ZlckRpdi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCk7XG4gICAgICAgIHRoaXMuZGlzcGxheVR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMudG9wID0gcC50b3A7XG4gICAgICAgIHRoaXMubGVmdCA9IHAubGVmdDtcbiAgICAgICAgdGhpcy5pc0luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGVGcm9tUG9wb3ZlcigpIHtcbiAgICAgICAgdGhpcy50b3AgPSAtMTAwMDA7XG4gICAgICAgIHRoaXMubGVmdCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5pc0luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvdGVjdGVkIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25FbGVtZW50cyhob3N0RWw6IEhUTUxFbGVtZW50LCB0YXJnZXRFbDogSFRNTEVsZW1lbnQsIHBvc2l0aW9uU3RyOiBzdHJpbmcsIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IGZhbHNlKTogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgcG9zaXRpb25TdHJQYXJ0cyA9IHBvc2l0aW9uU3RyLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbGV0IHBvczAgPSBwb3NpdGlvblN0clBhcnRzWzBdO1xuICAgICAgICBsZXQgcG9zMSA9IHBvc2l0aW9uU3RyUGFydHNbMV0gfHwgXCJjZW50ZXJcIjtcbiAgICAgICAgbGV0IGhvc3RFbFBvcyA9IGFwcGVuZFRvQm9keSA/IHRoaXMub2Zmc2V0KGhvc3RFbCkgOiB0aGlzLnBvc2l0aW9uKGhvc3RFbCk7XG4gICAgICAgIGxldCB0YXJnZXRFbFdpZHRoID0gdGFyZ2V0RWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCB0YXJnZXRFbEhlaWdodCA9IHRhcmdldEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB0aGlzLmVmZmVjdGl2ZVBsYWNlbWVudCA9IHBvczAgPSB0aGlzLmdldEVmZmVjdGl2ZVBsYWNlbWVudChwb3MwLCBob3N0RWwsIHRhcmdldEVsKTtcblxuICAgICAgICBsZXQgc2hpZnRXaWR0aDogYW55ID0ge1xuICAgICAgICAgICAgY2VudGVyOiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyBob3N0RWxQb3Mud2lkdGggLyAyIC0gdGFyZ2V0RWxXaWR0aCAvIDI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy5sZWZ0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyBob3N0RWxQb3Mud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHNoaWZ0SGVpZ2h0OiBhbnkgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgaG9zdEVsUG9zLmhlaWdodCAvIDIgLSB0YXJnZXRFbEhlaWdodCAvIDI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9wOiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLnRvcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b206IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgaG9zdEVsUG9zLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGFyZ2V0RWxQb3M6IHsgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9O1xuICAgICAgICBzd2l0Y2ggKHBvczApIHtcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHNoaWZ0SGVpZ2h0W3BvczFdKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMF0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMV0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogaG9zdEVsUG9zLmxlZnQgLSB0YXJnZXRFbFdpZHRoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHNoaWZ0SGVpZ2h0W3BvczBdKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMV0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogaG9zdEVsUG9zLnRvcCAtIHRhcmdldEVsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzaGlmdFdpZHRoW3BvczFdKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldEVsUG9zO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwb3NpdGlvbihuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50QkNSID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgY29uc3QgZWxCQ1IgPSB0aGlzLm9mZnNldChuYXRpdmVFbCk7XG4gICAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5wYXJlbnRPZmZzZXRFbChuYXRpdmVFbCk7XG4gICAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnRCQ1IgPSB0aGlzLm9mZnNldChvZmZzZXRQYXJlbnRFbCk7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnRCQ1IudG9wICs9IG9mZnNldFBhcmVudEVsLmNsaWVudFRvcCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUi5sZWZ0ICs9IG9mZnNldFBhcmVudEVsLmNsaWVudExlZnQgLSBvZmZzZXRQYXJlbnRFbC5zY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRvcDogZWxCQ1IudG9wIC0gb2Zmc2V0UGFyZW50QkNSLnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGVsQkNSLmxlZnQgLSBvZmZzZXRQYXJlbnRCQ1IubGVmdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvZmZzZXQobmF0aXZlRWw6IGFueSk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IG5hdGl2ZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCB8fCBuYXRpdmVFbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFN0eWxlKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCwgY3NzUHJvcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZSkgLy8gSUVcbiAgICAgICAgICAgIHJldHVybiAobmF0aXZlRWwgYXMgYW55KS5jdXJyZW50U3R5bGVbY3NzUHJvcF07XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKVxuICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSBhcyBhbnkpKG5hdGl2ZUVsKVtjc3NQcm9wXTtcblxuICAgICAgICAvLyBmaW5hbGx5IHRyeSBhbmQgZ2V0IGlubGluZSBzdHlsZVxuICAgICAgICByZXR1cm4gKG5hdGl2ZUVsLnN0eWxlIGFzIGFueSlbY3NzUHJvcF07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzU3RhdGljUG9zaXRpb25lZChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmdldFN0eWxlKG5hdGl2ZUVsLCBcInBvc2l0aW9uXCIpIHx8IFwic3RhdGljXCIgKSA9PT0gXCJzdGF0aWNcIjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGFyZW50T2Zmc2V0RWwobmF0aXZlRWw6IEhUTUxFbGVtZW50KTogYW55IHtcbiAgICAgICAgbGV0IG9mZnNldFBhcmVudDogYW55ID0gbmF0aXZlRWwub2Zmc2V0UGFyZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQgIT09IHdpbmRvdy5kb2N1bWVudCAmJiB0aGlzLmlzU3RhdGljUG9zaXRpb25lZChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRFZmZlY3RpdmVQbGFjZW1lbnQocGxhY2VtZW50OiBzdHJpbmcsIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRQYXJ0cyA9IHBsYWNlbWVudC5zcGxpdChcIiBcIik7XG4gICAgICAgIGlmIChwbGFjZW1lbnRQYXJ0c1swXSAhPT0gXCJhdXRvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBob3N0RWxCb3VuZGluZ1JlY3QgPSBob3N0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCBkZXNpcmVkUGxhY2VtZW50ID0gcGxhY2VtZW50UGFydHNbMV0gfHwgXCJib3R0b21cIjtcblxuICAgICAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QudG9wIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJib3R0b21cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gXCJib3R0b21cIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QuYm90dG9tICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBcInRvcFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcImxlZnRcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QubGVmdCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyaWdodFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcInJpZ2h0XCIgJiYgaG9zdEVsQm91bmRpbmdSZWN0LnJpZ2h0ICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVzaXJlZFBsYWNlbWVudDtcbiAgICB9XG59XG4iXX0=