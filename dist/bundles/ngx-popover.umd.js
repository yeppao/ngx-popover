(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-popover', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-popover'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

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
            this.onCloseFromOutside = new core.EventEmitter();
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
                if (appendToBody === void 0) {
                    appendToBody = false;
                }
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
                if (( /** @type {?} */(nativeEl)).currentStyle) // IE
                    // IE
                    return ( /** @type {?} */(nativeEl)).currentStyle[cssProp];
                if (window.getComputedStyle)
                    return ( /** @type {?} */(window.getComputedStyle))(nativeEl)[cssProp];
                // finally try and get inline style
                return ( /** @type {?} */(nativeEl.style))[cssProp];
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
            { type: core.Component, args: [{
                        selector: "popover-content",
                        template: "\n<div #popoverDiv class=\"popover {{ effectivePlacement }}\"\n     [style.top]=\"top + 'px'\"\n     [style.left]=\"left + 'px'\"\n     [class.in]=\"isIn\"\n     [class.fade]=\"animation\"\n     style=\"display: block\"\n     role=\"popover\">\n    <div [hidden]=\"!closeOnMouseOutside\" class=\"virtual-area\"></div>\n    <div class=\"arrow\"></div> \n    <h3 class=\"popover-title\" [hidden]=\"!title\">{{ title }}</h3>\n    <div class=\"popover-content\">\n        <ng-content></ng-content>\n        {{ content }}\n    </div> \n</div>\n",
                        styles: ["\n.popover .virtual-area {\n    height: 11px;\n    width: 100%;\n    position: absolute;\n}\n.popover.top .virtual-area {\n    bottom: -11px; \n}\n.popover.bottom .virtual-area {\n    top: -11px; \n}\n.popover.left .virtual-area {\n    right: -11px; \n}\n.popover.right .virtual-area {\n    left: -11px; \n}\n"]
                    }] }
        ];
        /** @nocollapse */
        PopoverContent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef },
                { type: core.Renderer2 }
            ];
        };
        PopoverContent.propDecorators = {
            content: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            title: [{ type: core.Input }],
            animation: [{ type: core.Input }],
            closeOnClickOutside: [{ type: core.Input }],
            closeOnMouseOutside: [{ type: core.Input }],
            popoverDiv: [{ type: core.ViewChild, args: ["popoverDiv",] }]
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
            this.onShown = new core.EventEmitter();
            this.onHidden = new core.EventEmitter();
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
                    ( /** @type {?} */(this.content)).hideFromPopover();
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
            { type: core.Directive, args: [{
                        selector: "[popover]",
                        exportAs: "popover"
                    },] }
        ];
        /** @nocollapse */
        Popover.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef },
                { type: core.ComponentFactoryResolver }
            ];
        };
        Popover.propDecorators = {
            content: [{ type: core.Input, args: ["popover",] }],
            popoverDisabled: [{ type: core.Input }],
            popoverAnimation: [{ type: core.Input }],
            popoverPlacement: [{ type: core.Input }],
            popoverTitle: [{ type: core.Input }],
            popoverOnHover: [{ type: core.Input }],
            popoverCloseOnClickOutside: [{ type: core.Input }],
            popoverCloseOnMouseOutside: [{ type: core.Input }],
            popoverDismissTimeout: [{ type: core.Input }],
            onShown: [{ type: core.Output }],
            onHidden: [{ type: core.Output }],
            showOrHideOnClick: [{ type: core.HostListener, args: ["click",] }],
            showOnHover: [{ type: core.HostListener, args: ["focusin",] }, { type: core.HostListener, args: ["mouseenter",] }],
            hideOnHover: [{ type: core.HostListener, args: ["focusout",] }, { type: core.HostListener, args: ["mouseleave",] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.default = PopoverModule;
    exports.Popover = Popover;
    exports.PopoverContent = PopoverContent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvcG92ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtcG9wb3Zlci9Qb3BvdmVyQ29udGVudC50cyIsIm5nOi8vbmd4LXBvcG92ZXIvUG9wb3Zlci50cyIsIm5nOi8vbmd4LXBvcG92ZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3Zlcn0gZnJvbSBcIi4vUG9wb3ZlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwb3BvdmVyLWNvbnRlbnRcIixcbiAgICB0ZW1wbGF0ZTogYFxuPGRpdiAjcG9wb3ZlckRpdiBjbGFzcz1cInBvcG92ZXIge3sgZWZmZWN0aXZlUGxhY2VtZW50IH19XCJcbiAgICAgW3N0eWxlLnRvcF09XCJ0b3AgKyAncHgnXCJcbiAgICAgW3N0eWxlLmxlZnRdPVwibGVmdCArICdweCdcIlxuICAgICBbY2xhc3MuaW5dPVwiaXNJblwiXG4gICAgIFtjbGFzcy5mYWRlXT1cImFuaW1hdGlvblwiXG4gICAgIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIlxuICAgICByb2xlPVwicG9wb3ZlclwiPlxuICAgIDxkaXYgW2hpZGRlbl09XCIhY2xvc2VPbk1vdXNlT3V0c2lkZVwiIGNsYXNzPVwidmlydHVhbC1hcmVhXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+IFxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIiBbaGlkZGVuXT1cIiF0aXRsZVwiPnt7IHRpdGxlIH19PC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAge3sgY29udGVudCB9fVxuICAgIDwvZGl2PiBcbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgXG4ucG9wb3ZlciAudmlydHVhbC1hcmVhIHtcbiAgICBoZWlnaHQ6IDExcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLnBvcG92ZXIudG9wIC52aXJ0dWFsLWFyZWEge1xuICAgIGJvdHRvbTogLTExcHg7IFxufVxuLnBvcG92ZXIuYm90dG9tIC52aXJ0dWFsLWFyZWEge1xuICAgIHRvcDogLTExcHg7IFxufVxuLnBvcG92ZXIubGVmdCAudmlydHVhbC1hcmVhIHtcbiAgICByaWdodDogLTExcHg7IFxufVxuLnBvcG92ZXIucmlnaHQgLnZpcnR1YWwtYXJlYSB7XG4gICAgbGVmdDogLTExcHg7IFxufVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRlbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIElucHV0cyAvIE91dHB1dHMgXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gQElucHV0KClcbiAgICAvLyBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGNvbnRlbnQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBcInRvcFwifFwiYm90dG9tXCJ8XCJsZWZ0XCJ8XCJyaWdodFwifFwiYXV0b1wifFwiYXV0byB0b3BcInxcImF1dG8gYm90dG9tXCJ8XCJhdXRvIGxlZnRcInxcImF1dG8gcmlnaHRcIiA9IFwiYm90dG9tXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGNsb3NlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbk1vdXNlT3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BlcnRpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBAVmlld0NoaWxkKFwicG9wb3ZlckRpdlwiKVxuICAgIHBvcG92ZXJEaXY6IEVsZW1lbnRSZWY7XG5cbiAgICBwb3BvdmVyOiBQb3BvdmVyO1xuICAgIG9uQ2xvc2VGcm9tT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0b3A6IG51bWJlciA9IC0xMDAwMDtcbiAgICBsZWZ0OiBudW1iZXIgPSAtMTAwMDA7XG4gICAgaXNJbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGRpc3BsYXlUeXBlOiBzdHJpbmcgPSBcIm5vbmVcIjtcbiAgICBlZmZlY3RpdmVQbGFjZW1lbnQ6IHN0cmluZztcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBBbm9ueW1vdXMgXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGRyb3Bkb3duIGlmIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgb25Eb2N1bWVudE1vdXNlRG93biA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKCFlbGVtZW50IHx8ICF0aGlzLnBvcG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKGVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMub25DbG9zZUZyb21PdXRzaWRlLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9O1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gTGlmZWN5Y2xlIGNhbGxiYWNrc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGxpc3RlbkNsaWNrRnVuYzogYW55O1xuICAgIGxpc3Rlbk1vdXNlRnVuYzogYW55O1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2tGdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXCJkb2N1bWVudFwiLCBcIm1vdXNlZG93blwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRvY3VtZW50TW91c2VEb3duKGV2ZW50KSk7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Nb3VzZU91dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk1vdXNlRnVuYyA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFwiZG9jdW1lbnRcIiwgXCJtb3VzZW92ZXJcIiwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25Eb2N1bWVudE1vdXNlRG93bihldmVudCkpO1xuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25DbGlja091dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkNsaWNrRnVuYygpO1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uTW91c2VPdXRzaWRlKVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5Nb3VzZUZ1bmMoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHVibGljIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucG9wb3ZlciB8fCAhdGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjb25zdCBwID0gdGhpcy5wb3NpdGlvbkVsZW1lbnRzKHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCksIHRoaXMucG9wb3ZlckRpdi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCk7XG4gICAgICAgIHRoaXMuZGlzcGxheVR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgIHRoaXMudG9wID0gcC50b3A7XG4gICAgICAgIHRoaXMubGVmdCA9IHAubGVmdDtcbiAgICAgICAgdGhpcy5pc0luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGVGcm9tUG9wb3ZlcigpIHtcbiAgICAgICAgdGhpcy50b3AgPSAtMTAwMDA7XG4gICAgICAgIHRoaXMubGVmdCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5pc0luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvdGVjdGVkIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25FbGVtZW50cyhob3N0RWw6IEhUTUxFbGVtZW50LCB0YXJnZXRFbDogSFRNTEVsZW1lbnQsIHBvc2l0aW9uU3RyOiBzdHJpbmcsIGFwcGVuZFRvQm9keTogYm9vbGVhbiA9IGZhbHNlKTogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgcG9zaXRpb25TdHJQYXJ0cyA9IHBvc2l0aW9uU3RyLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgbGV0IHBvczAgPSBwb3NpdGlvblN0clBhcnRzWzBdO1xuICAgICAgICBsZXQgcG9zMSA9IHBvc2l0aW9uU3RyUGFydHNbMV0gfHwgXCJjZW50ZXJcIjtcbiAgICAgICAgbGV0IGhvc3RFbFBvcyA9IGFwcGVuZFRvQm9keSA/IHRoaXMub2Zmc2V0KGhvc3RFbCkgOiB0aGlzLnBvc2l0aW9uKGhvc3RFbCk7XG4gICAgICAgIGxldCB0YXJnZXRFbFdpZHRoID0gdGFyZ2V0RWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCB0YXJnZXRFbEhlaWdodCA9IHRhcmdldEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB0aGlzLmVmZmVjdGl2ZVBsYWNlbWVudCA9IHBvczAgPSB0aGlzLmdldEVmZmVjdGl2ZVBsYWNlbWVudChwb3MwLCBob3N0RWwsIHRhcmdldEVsKTtcblxuICAgICAgICBsZXQgc2hpZnRXaWR0aDogYW55ID0ge1xuICAgICAgICAgICAgY2VudGVyOiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyBob3N0RWxQb3Mud2lkdGggLyAyIC0gdGFyZ2V0RWxXaWR0aCAvIDI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy5sZWZ0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0OiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQgKyBob3N0RWxQb3Mud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHNoaWZ0SGVpZ2h0OiBhbnkgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgaG9zdEVsUG9zLmhlaWdodCAvIDIgLSB0YXJnZXRFbEhlaWdodCAvIDI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9wOiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLnRvcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b206IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wICsgaG9zdEVsUG9zLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGFyZ2V0RWxQb3M6IHsgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9O1xuICAgICAgICBzd2l0Y2ggKHBvczApIHtcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHNoaWZ0SGVpZ2h0W3BvczFdKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMF0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMV0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogaG9zdEVsUG9zLmxlZnQgLSB0YXJnZXRFbFdpZHRoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICAgIHRhcmdldEVsUG9zID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHNoaWZ0SGVpZ2h0W3BvczBdKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMV0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogaG9zdEVsUG9zLnRvcCAtIHRhcmdldEVsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzaGlmdFdpZHRoW3BvczFdKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldEVsUG9zO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwb3NpdGlvbihuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50QkNSID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgY29uc3QgZWxCQ1IgPSB0aGlzLm9mZnNldChuYXRpdmVFbCk7XG4gICAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5wYXJlbnRPZmZzZXRFbChuYXRpdmVFbCk7XG4gICAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnRCQ1IgPSB0aGlzLm9mZnNldChvZmZzZXRQYXJlbnRFbCk7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnRCQ1IudG9wICs9IG9mZnNldFBhcmVudEVsLmNsaWVudFRvcCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUi5sZWZ0ICs9IG9mZnNldFBhcmVudEVsLmNsaWVudExlZnQgLSBvZmZzZXRQYXJlbnRFbC5zY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRvcDogZWxCQ1IudG9wIC0gb2Zmc2V0UGFyZW50QkNSLnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGVsQkNSLmxlZnQgLSBvZmZzZXRQYXJlbnRCQ1IubGVmdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvZmZzZXQobmF0aXZlRWw6IGFueSk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IG5hdGl2ZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCB8fCBuYXRpdmVFbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmhlaWdodCB8fCBuYXRpdmVFbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgIGxlZnQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFN0eWxlKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCwgY3NzUHJvcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZSkgLy8gSUVcbiAgICAgICAgICAgIHJldHVybiAobmF0aXZlRWwgYXMgYW55KS5jdXJyZW50U3R5bGVbY3NzUHJvcF07XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKVxuICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSBhcyBhbnkpKG5hdGl2ZUVsKVtjc3NQcm9wXTtcblxuICAgICAgICAvLyBmaW5hbGx5IHRyeSBhbmQgZ2V0IGlubGluZSBzdHlsZVxuICAgICAgICByZXR1cm4gKG5hdGl2ZUVsLnN0eWxlIGFzIGFueSlbY3NzUHJvcF07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzU3RhdGljUG9zaXRpb25lZChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmdldFN0eWxlKG5hdGl2ZUVsLCBcInBvc2l0aW9uXCIpIHx8IFwic3RhdGljXCIgKSA9PT0gXCJzdGF0aWNcIjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGFyZW50T2Zmc2V0RWwobmF0aXZlRWw6IEhUTUxFbGVtZW50KTogYW55IHtcbiAgICAgICAgbGV0IG9mZnNldFBhcmVudDogYW55ID0gbmF0aXZlRWwub2Zmc2V0UGFyZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQgIT09IHdpbmRvdy5kb2N1bWVudCAmJiB0aGlzLmlzU3RhdGljUG9zaXRpb25lZChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRFZmZlY3RpdmVQbGFjZW1lbnQocGxhY2VtZW50OiBzdHJpbmcsIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRQYXJ0cyA9IHBsYWNlbWVudC5zcGxpdChcIiBcIik7XG4gICAgICAgIGlmIChwbGFjZW1lbnRQYXJ0c1swXSAhPT0gXCJhdXRvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBob3N0RWxCb3VuZGluZ1JlY3QgPSBob3N0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCBkZXNpcmVkUGxhY2VtZW50ID0gcGxhY2VtZW50UGFydHNbMV0gfHwgXCJib3R0b21cIjtcblxuICAgICAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QudG9wIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJib3R0b21cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzaXJlZFBsYWNlbWVudCA9PT0gXCJib3R0b21cIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QuYm90dG9tICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBcInRvcFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcImxlZnRcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QubGVmdCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyaWdodFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcInJpZ2h0XCIgJiYgaG9zdEVsQm91bmRpbmdSZWN0LnJpZ2h0ICsgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVzaXJlZFBsYWNlbWVudDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udGVudH0gZnJvbSBcIi4vUG9wb3ZlckNvbnRlbnRcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3BvcG92ZXJdXCIsXG4gICAgZXhwb3J0QXM6IFwicG9wb3ZlclwiXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BlcnRpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBwcm90ZWN0ZWQgUG9wb3ZlckNvbXBvbmVudCA9IFBvcG92ZXJDb250ZW50O1xuICAgIHByb3RlY3RlZCBwb3BvdmVyOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnQ+O1xuICAgIHByb3RlY3RlZCB2aXNpYmxlOiBib29sZWFuO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5wdXRzIC8gT3V0cHV0c1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBJbnB1dChcInBvcG92ZXJcIilcbiAgICBjb250ZW50OiBzdHJpbmd8UG9wb3ZlckNvbnRlbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckFuaW1hdGlvbjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlclBsYWNlbWVudDogXCJ0b3BcInxcImJvdHRvbVwifFwibGVmdFwifFwicmlnaHRcInxcImF1dG9cInxcImF1dG8gdG9wXCJ8XCJhdXRvIGJvdHRvbVwifFwiYXV0byBsZWZ0XCJ8XCJhdXRvIHJpZ2h0XCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJUaXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyT25Ib3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJEaXNtaXNzVGltZW91dDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uU2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPFBvcG92ZXI+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9wb3Zlcj4oKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIilcbiAgICBzaG93T3JIaWRlT25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3VzaW5cIilcbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VlbnRlclwiKVxuICAgIHNob3dPbkhvdmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiKVxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIpXG4gICAgaGlkZU9uSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlKSByZXR1cm47IC8vIGRvbid0IGRvIGFueXRoaW5nIHNpbmNlIG5vdCB3ZSBjb250cm9sIHRoaXNcbiAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXJPbkhvdmVyKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgICAgICBpZiAoY2hhbmdlc1tcInBvcG92ZXJEaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXNbXCJwb3BvdmVyRGlzYWJsZWRcIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHVibGljIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLlBvcG92ZXJDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucG9wb3Zlci5pbnN0YW5jZSBhcyBQb3BvdmVyQ29udGVudDtcbiAgICAgICAgICAgIHBvcG92ZXIucG9wb3ZlciA9IHRoaXM7XG4gICAgICAgICAgICBwb3BvdmVyLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQgYXMgc3RyaW5nO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25DbGlja091dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25Nb3VzZU91dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlO1xuXG4gICAgICAgICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgLy8gaWYgZGlzbWlzc1RpbWVvdXQgb3B0aW9uIGlzIHNldCwgdGhlbiB0aGlzIHBvcG92ZXIgd2lsbCBiZSBkaXNtaXNzZWQgaW4gZGlzbWlzc1RpbWVvdXQgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMClcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5jb250ZW50IGFzIFBvcG92ZXJDb250ZW50O1xuICAgICAgICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnBsYWNlbWVudCA9IHRoaXMucG9wb3ZlclBsYWNlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmFuaW1hdGlvbiA9IHRoaXMucG9wb3ZlckFuaW1hdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uQ2xpY2tPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uTW91c2VPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZTtcblxuICAgICAgICAgICAgcG9wb3Zlci5vbkNsb3NlRnJvbU91dHNpZGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgIC8vIGlmIGRpc21pc3NUaW1lb3V0IG9wdGlvbiBpcyBzZXQsIHRoZW4gdGhpcyBwb3BvdmVyIHdpbGwgYmUgZGlzbWlzc2VkIGluIGRpc21pc3NUaW1lb3V0IHRpbWVcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xuICAgICAgICAgICAgcG9wb3Zlci5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2hvd24uZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKVxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmRlc3Ryb3koKTtcblxuICAgICAgICBpZiAodGhpcy5jb250ZW50IGluc3RhbmNlb2YgUG9wb3ZlckNvbnRlbnQpXG4gICAgICAgICAgICAodGhpcy5jb250ZW50IGFzIFBvcG92ZXJDb250ZW50KS5oaWRlRnJvbVBvcG92ZXIoKTtcblxuICAgICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtQb3BvdmVyfSBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5pbXBvcnQge1BvcG92ZXJDb250ZW50fSBmcm9tIFwiLi9Qb3BvdmVyQ29udGVudFwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZXhwb3J0ICogZnJvbSBcIi4vUG9wb3ZlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vUG9wb3ZlckNvbnRlbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBvcG92ZXJDb250ZW50LFxuICAgICAgICBQb3BvdmVyLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQb3BvdmVyQ29udGVudCxcbiAgICAgICAgUG9wb3ZlcixcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBQb3BvdmVyQ29udGVudFxuICAgIF1cbn0pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyTW9kdWxlIHtcbiAgICBcbn0iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIkNoYW5nZURldGVjdG9yUmVmIiwiUmVuZGVyZXIyIiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJEaXJlY3RpdmUiLCJWaWV3Q29udGFpbmVyUmVmIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiT3V0cHV0IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztRQXVHSSx3QkFBc0IsT0FBbUIsRUFDbkIsR0FBc0IsRUFDdEIsUUFBbUI7WUFGekMsaUJBR0M7WUFIcUIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtZQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXOzZCQWxEMkQsUUFBUTs2QkFNdkYsSUFBSTt1Q0FHTSxLQUFLO3VDQUdMLEtBQUs7c0NBVWYsSUFBSUEsaUJBQVksRUFBRTt1QkFDekIsQ0FBQyxLQUFLO3dCQUNMLENBQUMsS0FBSzt3QkFDTCxLQUFLOytCQUNDLE1BQU07Ozs7dUNBVU4sVUFBQyxLQUFVOztnQkFDN0IsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUN0QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQUUsT0FBTztnQkFDL0YsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNaLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FB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