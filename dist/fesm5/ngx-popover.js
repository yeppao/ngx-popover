import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, EventEmitter, Renderer2, Directive, HostListener, ViewContainerRef, ComponentFactoryResolver, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Popover = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function Popover(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.PopoverComponent = PopoverContent;
        this.popoverOnHover = false;
        this.popoverDismissTimeout = 0;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    /**
     * @return {?}
     */
    Popover.prototype.showOrHideOnClick = /**
     * @return {?}
     */
    function () {
        if (this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.toggle();
    };
    /**
     * @return {?}
     */
    Popover.prototype.showOnHover = /**
     * @return {?}
     */
    function () {
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.show();
    };
    /**
     * @return {?}
     */
    Popover.prototype.hideOnHover = /**
     * @return {?}
     */
    function () {
        if (this.popoverCloseOnMouseOutside)
            return; // don't do anything since not we control this
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.hide();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    Popover.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * @return {?}
     */
    Popover.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    Popover.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            /** @type {?} */
            var factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;
            this.popover = this.viewContainerRef.createComponent(factory);
            /** @type {?} */
            var popover = /** @type {?} */ (this.popover.instance);
            popover.popover = this;
            popover.content = /** @type {?} */ (this.content);
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
        }
        else {
            /** @type {?} */
            var popover = /** @type {?} */ (this.content);
            popover.popover = this;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            popover.show();
        }
        this.onShown.emit(this);
    };
    /**
     * @return {?}
     */
    Popover.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.popover)
            this.popover.destroy();
        if (this.content instanceof PopoverContent)
            (/** @type {?} */ (this.content)).hideFromPopover();
        this.onHidden.emit(this);
    };
    /**
     * @return {?}
     */
    Popover.prototype.getElement = /**
     * @return {?}
     */
    function () {
        return this.viewContainerRef.element.nativeElement;
    };
    Popover.decorators = [
        { type: Directive, args: [{
                    selector: "[popover]",
                    exportAs: "popover"
                },] }
    ];
    /** @nocollapse */
    Popover.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver }
    ]; };
    Popover.propDecorators = {
        content: [{ type: Input, args: ["popover",] }],
        popoverDisabled: [{ type: Input }],
        popoverAnimation: [{ type: Input }],
        popoverPlacement: [{ type: Input }],
        popoverTitle: [{ type: Input }],
        popoverOnHover: [{ type: Input }],
        popoverCloseOnClickOutside: [{ type: Input }],
        popoverCloseOnMouseOutside: [{ type: Input }],
        popoverDismissTimeout: [{ type: Input }],
        onShown: [{ type: Output }],
        onHidden: [{ type: Output }],
        showOrHideOnClick: [{ type: HostListener, args: ["click",] }],
        showOnHover: [{ type: HostListener, args: ["focusin",] }, { type: HostListener, args: ["mouseenter",] }],
        hideOnHover: [{ type: HostListener, args: ["focusout",] }, { type: HostListener, args: ["mouseleave",] }]
    };
    return Popover;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        PopoverContent,
                        Popover,
                    ],
                    exports: [
                        PopoverContent,
                        Popover,
                    ],
                    entryComponents: [
                        PopoverContent
                    ]
                },] }
    ];
    return PopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export default PopoverModule;
export { Popover, PopoverContent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvcG92ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1wb3BvdmVyL1BvcG92ZXJDb250ZW50LnRzIiwibmc6Ly9uZ3gtcG9wb3Zlci9Qb3BvdmVyLnRzIiwibmc6Ly9uZ3gtcG9wb3Zlci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyfSBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvcG92ZXItY29udGVudFwiLFxuICAgIHRlbXBsYXRlOiBgXG48ZGl2ICNwb3BvdmVyRGl2IGNsYXNzPVwicG9wb3ZlciB7eyBlZmZlY3RpdmVQbGFjZW1lbnQgfX1cIlxuICAgICBbc3R5bGUudG9wXT1cInRvcCArICdweCdcIlxuICAgICBbc3R5bGUubGVmdF09XCJsZWZ0ICsgJ3B4J1wiXG4gICAgIFtjbGFzcy5pbl09XCJpc0luXCJcbiAgICAgW2NsYXNzLmZhZGVdPVwiYW5pbWF0aW9uXCJcbiAgICAgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiXG4gICAgIHJvbGU9XCJwb3BvdmVyXCI+XG4gICAgPGRpdiBbaGlkZGVuXT1cIiFjbG9zZU9uTW91c2VPdXRzaWRlXCIgY2xhc3M9XCJ2aXJ0dWFsLWFyZWFcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj4gXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiIFtoaWRkZW5dPVwiIXRpdGxlXCI+e3sgdGl0bGUgfX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICB7eyBjb250ZW50IH19XG4gICAgPC9kaXY+IFxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Bcbi5wb3BvdmVyIC52aXJ0dWFsLWFyZWEge1xuICAgIGhlaWdodDogMTFweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4ucG9wb3Zlci50b3AgLnZpcnR1YWwtYXJlYSB7XG4gICAgYm90dG9tOiAtMTFweDsgXG59XG4ucG9wb3Zlci5ib3R0b20gLnZpcnR1YWwtYXJlYSB7XG4gICAgdG9wOiAtMTFweDsgXG59XG4ucG9wb3Zlci5sZWZ0IC52aXJ0dWFsLWFyZWEge1xuICAgIHJpZ2h0OiAtMTFweDsgXG59XG4ucG9wb3Zlci5yaWdodCAudmlydHVhbC1hcmVhIHtcbiAgICBsZWZ0OiAtMTFweDsgXG59XG5gXVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5wdXRzIC8gT3V0cHV0cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBASW5wdXQoKVxuICAgIC8vIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgY29udGVudDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFwidG9wXCJ8XCJib3R0b21cInxcImxlZnRcInxcInJpZ2h0XCJ8XCJhdXRvXCJ8XCJhdXRvIHRvcFwifFwiYXV0byBib3R0b21cInxcImF1dG8gbGVmdFwifFwiYXV0byByaWdodFwiID0gXCJib3R0b21cIjtcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uTW91c2VPdXRzaWRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGVydGllc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBWaWV3Q2hpbGQoXCJwb3BvdmVyRGl2XCIpXG4gICAgcG9wb3ZlckRpdjogRWxlbWVudFJlZjtcblxuICAgIHBvcG92ZXI6IFBvcG92ZXI7XG4gICAgb25DbG9zZUZyb21PdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRvcDogbnVtYmVyID0gLTEwMDAwO1xuICAgIGxlZnQ6IG51bWJlciA9IC0xMDAwMDtcbiAgICBpc0luOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzcGxheVR5cGU6IHN0cmluZyA9IFwibm9uZVwiO1xuICAgIGVmZmVjdGl2ZVBsYWNlbWVudDogc3RyaW5nO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFub255bW91cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgZHJvcGRvd24gaWYgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICBvbkRvY3VtZW50TW91c2VEb3duID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgIXRoaXMucG9wb3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAoZWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8IHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCkuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlRnJvbU91dHNpZGUuZW1pdCh1bmRlZmluZWQpO1xuICAgIH07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBMaWZlY3ljbGUgY2FsbGJhY2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgbGlzdGVuQ2xpY2tGdW5jOiBhbnk7XG4gICAgbGlzdGVuTW91c2VGdW5jOiBhbnk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uQ2xpY2tPdXRzaWRlKVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5DbGlja0Z1bmMgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcImRvY3VtZW50XCIsIFwibW91c2Vkb3duXCIsIChldmVudDogYW55KSA9PiB0aGlzLm9uRG9jdW1lbnRNb3VzZURvd24oZXZlbnQpKTtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbk1vdXNlT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuTW91c2VGdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXCJkb2N1bWVudFwiLCBcIm1vdXNlb3ZlclwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRvY3VtZW50TW91c2VEb3duKGV2ZW50KSk7XG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2tGdW5jKCk7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Nb3VzZU91dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk1vdXNlRnVuYygpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQdWJsaWMgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyIHx8ICF0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uRWxlbWVudHModGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSwgdGhpcy5wb3BvdmVyRGl2Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VHlwZSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy50b3AgPSBwLnRvcDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gcC5sZWZ0O1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9wID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmxlZnQgPSAtMTAwMDA7XG4gICAgICAgIHRoaXMuaXNJbiA9IHRydWU7XG4gICAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZUZyb21Qb3BvdmVyKCkge1xuICAgICAgICB0aGlzLnRvcCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm90ZWN0ZWQgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3RlY3RlZCBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbDogSFRNTEVsZW1lbnQsIHRhcmdldEVsOiBIVE1MRWxlbWVudCwgcG9zaXRpb25TdHI6IHN0cmluZywgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gZmFsc2UpOiB7IHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBwb3NpdGlvblN0clBhcnRzID0gcG9zaXRpb25TdHIuc3BsaXQoXCItXCIpO1xuICAgICAgICBsZXQgcG9zMCA9IHBvc2l0aW9uU3RyUGFydHNbMF07XG4gICAgICAgIGxldCBwb3MxID0gcG9zaXRpb25TdHJQYXJ0c1sxXSB8fCBcImNlbnRlclwiO1xuICAgICAgICBsZXQgaG9zdEVsUG9zID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsKTtcbiAgICAgICAgbGV0IHRhcmdldEVsV2lkdGggPSB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IHRhcmdldEVsSGVpZ2h0ID0gdGFyZ2V0RWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZWZmZWN0aXZlUGxhY2VtZW50ID0gcG9zMCA9IHRoaXMuZ2V0RWZmZWN0aXZlUGxhY2VtZW50KHBvczAsIGhvc3RFbCwgdGFyZ2V0RWwpO1xuXG4gICAgICAgIGxldCBzaGlmdFdpZHRoOiBhbnkgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aCAvIDIgLSB0YXJnZXRFbFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2hpZnRIZWlnaHQ6IGFueSA9IHtcbiAgICAgICAgICAgIGNlbnRlcjogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0IC8gMiAtIHRhcmdldEVsSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0YXJnZXRFbFBvczogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH07XG4gICAgICAgIHN3aXRjaCAocG9zMCkge1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMV0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MwXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaGlmdEhlaWdodFtwb3MxXSgpLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBob3N0RWxQb3MubGVmdCAtIHRhcmdldEVsV2lkdGhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMF0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MxXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBob3N0RWxQb3MudG9wIC0gdGFyZ2V0RWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMV0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0RWxQb3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBvZmZzZXRQYXJlbnRCQ1IgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgICAgICBjb25zdCBlbEJDUiA9IHRoaXMub2Zmc2V0KG5hdGl2ZUVsKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLnBhcmVudE9mZnNldEVsKG5hdGl2ZUVsKTtcbiAgICAgICAgaWYgKG9mZnNldFBhcmVudEVsICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUiA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsKTtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUi50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wIC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgb2Zmc2V0UGFyZW50QkNSLmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgfHwgbmF0aXZlRWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgdG9wOiBlbEJDUi50b3AgLSBvZmZzZXRQYXJlbnRCQ1IudG9wLFxuICAgICAgICAgICAgbGVmdDogZWxCQ1IubGVmdCAtIG9mZnNldFBhcmVudEJDUi5sZWZ0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9mZnNldChuYXRpdmVFbDogYW55KTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFxuICAgICAgICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U3R5bGUobmF0aXZlRWw6IEhUTUxFbGVtZW50LCBjc3NQcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlKSAvLyBJRVxuICAgICAgICAgICAgcmV0dXJuIChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZVtjc3NQcm9wXTtcblxuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpXG4gICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGFzIGFueSkobmF0aXZlRWwpW2Nzc1Byb3BdO1xuXG4gICAgICAgIC8vIGZpbmFsbHkgdHJ5IGFuZCBnZXQgaW5saW5lIHN0eWxlXG4gICAgICAgIHJldHVybiAobmF0aXZlRWwuc3R5bGUgYXMgYW55KVtjc3NQcm9wXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNTdGF0aWNQb3NpdGlvbmVkKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0U3R5bGUobmF0aXZlRWwsIFwicG9zaXRpb25cIikgfHwgXCJzdGF0aWNcIiApID09PSBcInN0YXRpY1wiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwYXJlbnRPZmZzZXRFbChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBhbnkge1xuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50OiBhbnkgPSBuYXRpdmVFbC5vZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEVmZmVjdGl2ZVBsYWNlbWVudChwbGFjZW1lbnQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudFBhcnRzID0gcGxhY2VtZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgICAgaWYgKHBsYWNlbWVudFBhcnRzWzBdICE9PSBcImF1dG9cIikge1xuICAgICAgICAgICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhvc3RFbEJvdW5kaW5nUmVjdCA9IGhvc3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGRlc2lyZWRQbGFjZW1lbnQgPSBwbGFjZW1lbnRQYXJ0c1sxXSB8fCBcImJvdHRvbVwiO1xuXG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcInRvcFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC50b3AgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcImJvdHRvbVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcImJvdHRvbVwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5ib3R0b20gKyB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidG9wXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwibGVmdFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5sZWZ0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInJpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwicmlnaHRcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QucmlnaHQgKyB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcImxlZnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXNpcmVkUGxhY2VtZW50O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250ZW50fSBmcm9tIFwiLi9Qb3BvdmVyQ29udGVudFwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbcG9wb3Zlcl1cIixcbiAgICBleHBvcnRBczogXCJwb3BvdmVyXCJcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGVydGllc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3RlY3RlZCBQb3BvdmVyQ29tcG9uZW50ID0gUG9wb3ZlckNvbnRlbnQ7XG4gICAgcHJvdGVjdGVkIHBvcG92ZXI6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudD47XG4gICAgcHJvdGVjdGVkIHZpc2libGU6IGJvb2xlYW47XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbnB1dHMgLyBPdXRwdXRzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgQElucHV0KFwicG9wb3ZlclwiKVxuICAgIGNvbnRlbnQ6IHN0cmluZ3xQb3BvdmVyQ29udGVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQW5pbWF0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyUGxhY2VtZW50OiBcInRvcFwifFwiYm90dG9tXCJ8XCJsZWZ0XCJ8XCJyaWdodFwifFwiYXV0b1wifFwiYXV0byB0b3BcInxcImF1dG8gYm90dG9tXCJ8XCJhdXRvIGxlZnRcInxcImF1dG8gcmlnaHRcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlclRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJPbkhvdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckRpc21pc3NUaW1lb3V0OiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25TaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8UG9wb3Zlcj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BvdmVyPigpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKVxuICAgIHNob3dPckhpZGVPbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyT25Ib3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIpXG4gICAgc2hvd09uSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyT25Ib3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIpXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIilcbiAgICBoaWRlT25Ib3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUpIHJldHVybjsgLy8gZG9uJ3QgZG8gYW55dGhpbmcgc2luY2Ugbm90IHdlIGNvbnRyb2wgdGhpc1xuICAgICAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgICAgIGlmIChjaGFuZ2VzW1wicG9wb3ZlckRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlc1tcInBvcG92ZXJEaXNhYmxlZFwiXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQdWJsaWMgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuUG9wb3ZlckNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5wb3BvdmVyLmluc3RhbmNlIGFzIFBvcG92ZXJDb250ZW50O1xuICAgICAgICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcbiAgICAgICAgICAgIHBvcG92ZXIuY29udGVudCA9IHRoaXMuY29udGVudCBhcyBzdHJpbmc7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyUGxhY2VtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5wbGFjZW1lbnQgPSB0aGlzLnBvcG92ZXJQbGFjZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQW5pbWF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5hbmltYXRpb24gPSB0aGlzLnBvcG92ZXJBbmltYXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyVGl0bGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbkNsaWNrT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbk1vdXNlT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGU7XG5cbiAgICAgICAgICAgIHBvcG92ZXIub25DbG9zZUZyb21PdXRzaWRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAvLyBpZiBkaXNtaXNzVGltZW91dCBvcHRpb24gaXMgc2V0LCB0aGVuIHRoaXMgcG9wb3ZlciB3aWxsIGJlIGRpc21pc3NlZCBpbiBkaXNtaXNzVGltZW91dCB0aW1lXG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQgPiAwKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmNvbnRlbnQgYXMgUG9wb3ZlckNvbnRlbnQ7XG4gICAgICAgICAgICBwb3BvdmVyLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25DbGlja091dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25Nb3VzZU91dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlO1xuXG4gICAgICAgICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgLy8gaWYgZGlzbWlzc1RpbWVvdXQgb3B0aW9uIGlzIHNldCwgdGhlbiB0aGlzIHBvcG92ZXIgd2lsbCBiZSBkaXNtaXNzZWQgaW4gZGlzbWlzc1RpbWVvdXQgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMClcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICAgICAgICBwb3BvdmVyLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TaG93bi5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgaW5zdGFuY2VvZiBQb3BvdmVyQ29udGVudClcbiAgICAgICAgICAgICh0aGlzLmNvbnRlbnQgYXMgUG9wb3ZlckNvbnRlbnQpLmhpZGVGcm9tUG9wb3ZlcigpO1xuXG4gICAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1BvcG92ZXJ9IGZyb20gXCIuL1BvcG92ZXJcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRlbnR9IGZyb20gXCIuL1BvcG92ZXJDb250ZW50XCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BvdmVyQ29udGVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUG9wb3ZlckNvbnRlbnQsXG4gICAgICAgIFBvcG92ZXIsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFBvcG92ZXJDb250ZW50LFxuICAgICAgICBQb3BvdmVyLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFBvcG92ZXJDb250ZW50XG4gICAgXVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJNb2R1bGUge1xuICAgIFxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7SUF1R0ksd0JBQXNCLE9BQW1CLEVBQ25CLEdBQXNCLEVBQ3RCLFFBQW1CO1FBRnpDLGlCQUdDO1FBSHFCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVzt5QkFsRDJELFFBQVE7eUJBTXZGLElBQUk7bUNBR00sS0FBSzttQ0FHTCxLQUFLO2tDQVVmLElBQUksWUFBWSxFQUFFO21CQUN6QixDQUFDLEtBQUs7b0JBQ0wsQ0FBQyxLQUFLO29CQUNMLEtBQUs7MkJBQ0MsTUFBTTs7OzttQ0FVTixVQUFDLEtBQVU7O1lBQzdCLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3RDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPO1lBQy9GLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7S0FTQTs7OztJQVFELHdDQUFlOzs7SUFBZjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsbUJBQW1CO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FB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