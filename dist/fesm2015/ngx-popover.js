import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, EventEmitter, Renderer2, Directive, HostListener, ViewContainerRef, ComponentFactoryResolver, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopoverContent {
    /**
     * @param {?} element
     * @param {?} cdr
     * @param {?} renderer
     */
    constructor(element, cdr, renderer) {
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
        this.onDocumentMouseDown = (event) => {
            /** @type {?} */
            const element = this.element.nativeElement;
            if (!element || !this.popover)
                return;
            if (element.contains(event.target) || this.popover.getElement().contains(event.target))
                return;
            this.hide();
            this.onCloseFromOutside.emit(undefined);
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.closeOnClickOutside)
            this.listenClickFunc = this.renderer.listen("document", "mousedown", (event) => this.onDocumentMouseDown(event));
        if (this.closeOnMouseOutside)
            this.listenMouseFunc = this.renderer.listen("document", "mouseover", (event) => this.onDocumentMouseDown(event));
        this.show();
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.closeOnClickOutside)
            this.listenClickFunc();
        if (this.closeOnMouseOutside)
            this.listenMouseFunc();
    }
    /**
     * @return {?}
     */
    show() {
        if (!this.popover || !this.popover.getElement())
            return;
        /** @type {?} */
        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = "block";
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    }
    /**
     * @return {?}
     */
    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    }
    /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
        /** @type {?} */
        let positionStrParts = positionStr.split("-");
        /** @type {?} */
        let pos0 = positionStrParts[0];
        /** @type {?} */
        let pos1 = positionStrParts[1] || "center";
        /** @type {?} */
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        /** @type {?} */
        let targetElWidth = targetEl.offsetWidth;
        /** @type {?} */
        let targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        /** @type {?} */
        let shiftWidth = {
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
        let shiftHeight = {
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
        let targetElPos;
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
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    position(nativeEl) {
        /** @type {?} */
        let offsetParentBCR = { top: 0, left: 0 };
        /** @type {?} */
        const elBCR = this.offset(nativeEl);
        /** @type {?} */
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        /** @type {?} */
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    offset(nativeEl) {
        /** @type {?} */
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }
    /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    getStyle(nativeEl, cssProp) {
        if ((/** @type {?} */ (nativeEl)).currentStyle) // IE
            // IE
            return (/** @type {?} */ (nativeEl)).currentStyle[cssProp];
        if (window.getComputedStyle)
            return (/** @type {?} */ (window.getComputedStyle))(nativeEl)[cssProp];
        // finally try and get inline style
        return (/** @type {?} */ (nativeEl.style))[cssProp];
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    parentOffsetEl(nativeEl) {
        /** @type {?} */
        let offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
    /**
     * @param {?} placement
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    getEffectivePlacement(placement, hostElement, targetElement) {
        /** @type {?} */
        const placementParts = placement.split(" ");
        if (placementParts[0] !== "auto") {
            return placement;
        }
        /** @type {?} */
        const hostElBoundingRect = hostElement.getBoundingClientRect();
        /** @type {?} */
        const desiredPlacement = placementParts[1] || "bottom";
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
    }
}
PopoverContent.decorators = [
    { type: Component, args: [{
                selector: "popover-content",
                template: `
<div #popoverDiv class="popover {{ effectivePlacement }}"
     [style.top]="top + 'px'"
     [style.left]="left + 'px'"
     [class.in]="isIn"
     [class.fade]="animation"
     style="display: block"
     role="popover">
    <div [hidden]="!closeOnMouseOutside" class="virtual-area"></div>
    <div class="arrow"></div> 
    <h3 class="popover-title" [hidden]="!title">{{ title }}</h3>
    <div class="popover-content">
        <ng-content></ng-content>
        {{ content }}
    </div> 
</div>
`,
                styles: [`
.popover .virtual-area {
    height: 11px;
    width: 100%;
    position: absolute;
}
.popover.top .virtual-area {
    bottom: -11px; 
}
.popover.bottom .virtual-area {
    top: -11px; 
}
.popover.left .virtual-area {
    right: -11px; 
}
.popover.right .virtual-area {
    left: -11px; 
}
`]
            }] }
];
/** @nocollapse */
PopoverContent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
PopoverContent.propDecorators = {
    content: [{ type: Input }],
    placement: [{ type: Input }],
    title: [{ type: Input }],
    animation: [{ type: Input }],
    closeOnClickOutside: [{ type: Input }],
    closeOnMouseOutside: [{ type: Input }],
    popoverDiv: [{ type: ViewChild, args: ["popoverDiv",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Popover {
    /**
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    constructor(viewContainerRef, resolver) {
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
    /**
     * @return {?}
     */
    showOrHideOnClick() {
        if (this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.toggle();
    }
    /**
     * @return {?}
     */
    showOnHover() {
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.show();
    }
    /**
     * @return {?}
     */
    hideOnHover() {
        if (this.popoverCloseOnMouseOutside)
            return; // don't do anything since not we control this
        if (!this.popoverOnHover)
            return;
        if (this.popoverDisabled)
            return;
        this.hide();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    show() {
        if (this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            /** @type {?} */
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;
            this.popover = this.viewContainerRef.createComponent(factory);
            /** @type {?} */
            const popover = /** @type {?} */ (this.popover.instance);
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
            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
        }
        else {
            /** @type {?} */
            const popover = /** @type {?} */ (this.content);
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
            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            popover.show();
        }
        this.onShown.emit(this);
    }
    /**
     * @return {?}
     */
    hide() {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.popover)
            this.popover.destroy();
        if (this.content instanceof PopoverContent)
            (/** @type {?} */ (this.content)).hideFromPopover();
        this.onHidden.emit(this);
    }
    /**
     * @return {?}
     */
    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
Popover.decorators = [
    { type: Directive, args: [{
                selector: "[popover]",
                exportAs: "popover"
            },] }
];
/** @nocollapse */
Popover.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopoverModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export default PopoverModule;
export { Popover, PopoverContent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBvcG92ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1wb3BvdmVyL1BvcG92ZXJDb250ZW50LnRzIiwibmc6Ly9uZ3gtcG9wb3Zlci9Qb3BvdmVyLnRzIiwibmc6Ly9uZ3gtcG9wb3Zlci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyfSBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvcG92ZXItY29udGVudFwiLFxuICAgIHRlbXBsYXRlOiBgXG48ZGl2ICNwb3BvdmVyRGl2IGNsYXNzPVwicG9wb3ZlciB7eyBlZmZlY3RpdmVQbGFjZW1lbnQgfX1cIlxuICAgICBbc3R5bGUudG9wXT1cInRvcCArICdweCdcIlxuICAgICBbc3R5bGUubGVmdF09XCJsZWZ0ICsgJ3B4J1wiXG4gICAgIFtjbGFzcy5pbl09XCJpc0luXCJcbiAgICAgW2NsYXNzLmZhZGVdPVwiYW5pbWF0aW9uXCJcbiAgICAgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiXG4gICAgIHJvbGU9XCJwb3BvdmVyXCI+XG4gICAgPGRpdiBbaGlkZGVuXT1cIiFjbG9zZU9uTW91c2VPdXRzaWRlXCIgY2xhc3M9XCJ2aXJ0dWFsLWFyZWFcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj4gXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiIFtoaWRkZW5dPVwiIXRpdGxlXCI+e3sgdGl0bGUgfX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICB7eyBjb250ZW50IH19XG4gICAgPC9kaXY+IFxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Bcbi5wb3BvdmVyIC52aXJ0dWFsLWFyZWEge1xuICAgIGhlaWdodDogMTFweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4ucG9wb3Zlci50b3AgLnZpcnR1YWwtYXJlYSB7XG4gICAgYm90dG9tOiAtMTFweDsgXG59XG4ucG9wb3Zlci5ib3R0b20gLnZpcnR1YWwtYXJlYSB7XG4gICAgdG9wOiAtMTFweDsgXG59XG4ucG9wb3Zlci5sZWZ0IC52aXJ0dWFsLWFyZWEge1xuICAgIHJpZ2h0OiAtMTFweDsgXG59XG4ucG9wb3Zlci5yaWdodCAudmlydHVhbC1hcmVhIHtcbiAgICBsZWZ0OiAtMTFweDsgXG59XG5gXVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5wdXRzIC8gT3V0cHV0cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBASW5wdXQoKVxuICAgIC8vIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgY29udGVudDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFwidG9wXCJ8XCJib3R0b21cInxcImxlZnRcInxcInJpZ2h0XCJ8XCJhdXRvXCJ8XCJhdXRvIHRvcFwifFwiYXV0byBib3R0b21cInxcImF1dG8gbGVmdFwifFwiYXV0byByaWdodFwiID0gXCJib3R0b21cIjtcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uTW91c2VPdXRzaWRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGVydGllc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBWaWV3Q2hpbGQoXCJwb3BvdmVyRGl2XCIpXG4gICAgcG9wb3ZlckRpdjogRWxlbWVudFJlZjtcblxuICAgIHBvcG92ZXI6IFBvcG92ZXI7XG4gICAgb25DbG9zZUZyb21PdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRvcDogbnVtYmVyID0gLTEwMDAwO1xuICAgIGxlZnQ6IG51bWJlciA9IC0xMDAwMDtcbiAgICBpc0luOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzcGxheVR5cGU6IHN0cmluZyA9IFwibm9uZVwiO1xuICAgIGVmZmVjdGl2ZVBsYWNlbWVudDogc3RyaW5nO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFub255bW91cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgZHJvcGRvd24gaWYgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICBvbkRvY3VtZW50TW91c2VEb3duID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgIXRoaXMucG9wb3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAoZWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8IHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCkuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlRnJvbU91dHNpZGUuZW1pdCh1bmRlZmluZWQpO1xuICAgIH07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBMaWZlY3ljbGUgY2FsbGJhY2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgbGlzdGVuQ2xpY2tGdW5jOiBhbnk7XG4gICAgbGlzdGVuTW91c2VGdW5jOiBhbnk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uQ2xpY2tPdXRzaWRlKVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5DbGlja0Z1bmMgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcImRvY3VtZW50XCIsIFwibW91c2Vkb3duXCIsIChldmVudDogYW55KSA9PiB0aGlzLm9uRG9jdW1lbnRNb3VzZURvd24oZXZlbnQpKTtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbk1vdXNlT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuTW91c2VGdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXCJkb2N1bWVudFwiLCBcIm1vdXNlb3ZlclwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRvY3VtZW50TW91c2VEb3duKGV2ZW50KSk7XG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2tGdW5jKCk7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Nb3VzZU91dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk1vdXNlRnVuYygpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQdWJsaWMgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyIHx8ICF0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uRWxlbWVudHModGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSwgdGhpcy5wb3BvdmVyRGl2Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VHlwZSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy50b3AgPSBwLnRvcDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gcC5sZWZ0O1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9wID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmxlZnQgPSAtMTAwMDA7XG4gICAgICAgIHRoaXMuaXNJbiA9IHRydWU7XG4gICAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZUZyb21Qb3BvdmVyKCkge1xuICAgICAgICB0aGlzLnRvcCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm90ZWN0ZWQgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3RlY3RlZCBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbDogSFRNTEVsZW1lbnQsIHRhcmdldEVsOiBIVE1MRWxlbWVudCwgcG9zaXRpb25TdHI6IHN0cmluZywgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gZmFsc2UpOiB7IHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBwb3NpdGlvblN0clBhcnRzID0gcG9zaXRpb25TdHIuc3BsaXQoXCItXCIpO1xuICAgICAgICBsZXQgcG9zMCA9IHBvc2l0aW9uU3RyUGFydHNbMF07XG4gICAgICAgIGxldCBwb3MxID0gcG9zaXRpb25TdHJQYXJ0c1sxXSB8fCBcImNlbnRlclwiO1xuICAgICAgICBsZXQgaG9zdEVsUG9zID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsKTtcbiAgICAgICAgbGV0IHRhcmdldEVsV2lkdGggPSB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IHRhcmdldEVsSGVpZ2h0ID0gdGFyZ2V0RWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZWZmZWN0aXZlUGxhY2VtZW50ID0gcG9zMCA9IHRoaXMuZ2V0RWZmZWN0aXZlUGxhY2VtZW50KHBvczAsIGhvc3RFbCwgdGFyZ2V0RWwpO1xuXG4gICAgICAgIGxldCBzaGlmdFdpZHRoOiBhbnkgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aCAvIDIgLSB0YXJnZXRFbFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2hpZnRIZWlnaHQ6IGFueSA9IHtcbiAgICAgICAgICAgIGNlbnRlcjogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0IC8gMiAtIHRhcmdldEVsSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0YXJnZXRFbFBvczogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH07XG4gICAgICAgIHN3aXRjaCAocG9zMCkge1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMV0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MwXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaGlmdEhlaWdodFtwb3MxXSgpLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBob3N0RWxQb3MubGVmdCAtIHRhcmdldEVsV2lkdGhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMF0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MxXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBob3N0RWxQb3MudG9wIC0gdGFyZ2V0RWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMV0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0RWxQb3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBvZmZzZXRQYXJlbnRCQ1IgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgICAgICBjb25zdCBlbEJDUiA9IHRoaXMub2Zmc2V0KG5hdGl2ZUVsKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLnBhcmVudE9mZnNldEVsKG5hdGl2ZUVsKTtcbiAgICAgICAgaWYgKG9mZnNldFBhcmVudEVsICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUiA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsKTtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUi50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wIC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgb2Zmc2V0UGFyZW50QkNSLmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgfHwgbmF0aXZlRWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgdG9wOiBlbEJDUi50b3AgLSBvZmZzZXRQYXJlbnRCQ1IudG9wLFxuICAgICAgICAgICAgbGVmdDogZWxCQ1IubGVmdCAtIG9mZnNldFBhcmVudEJDUi5sZWZ0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9mZnNldChuYXRpdmVFbDogYW55KTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFxuICAgICAgICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U3R5bGUobmF0aXZlRWw6IEhUTUxFbGVtZW50LCBjc3NQcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlKSAvLyBJRVxuICAgICAgICAgICAgcmV0dXJuIChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZVtjc3NQcm9wXTtcblxuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpXG4gICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGFzIGFueSkobmF0aXZlRWwpW2Nzc1Byb3BdO1xuXG4gICAgICAgIC8vIGZpbmFsbHkgdHJ5IGFuZCBnZXQgaW5saW5lIHN0eWxlXG4gICAgICAgIHJldHVybiAobmF0aXZlRWwuc3R5bGUgYXMgYW55KVtjc3NQcm9wXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNTdGF0aWNQb3NpdGlvbmVkKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0U3R5bGUobmF0aXZlRWwsIFwicG9zaXRpb25cIikgfHwgXCJzdGF0aWNcIiApID09PSBcInN0YXRpY1wiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwYXJlbnRPZmZzZXRFbChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBhbnkge1xuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50OiBhbnkgPSBuYXRpdmVFbC5vZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEVmZmVjdGl2ZVBsYWNlbWVudChwbGFjZW1lbnQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudFBhcnRzID0gcGxhY2VtZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgICAgaWYgKHBsYWNlbWVudFBhcnRzWzBdICE9PSBcImF1dG9cIikge1xuICAgICAgICAgICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhvc3RFbEJvdW5kaW5nUmVjdCA9IGhvc3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGRlc2lyZWRQbGFjZW1lbnQgPSBwbGFjZW1lbnRQYXJ0c1sxXSB8fCBcImJvdHRvbVwiO1xuXG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcInRvcFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC50b3AgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcImJvdHRvbVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcImJvdHRvbVwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5ib3R0b20gKyB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidG9wXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwibGVmdFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5sZWZ0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInJpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwicmlnaHRcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QucmlnaHQgKyB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcImxlZnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXNpcmVkUGxhY2VtZW50O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250ZW50fSBmcm9tIFwiLi9Qb3BvdmVyQ29udGVudFwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbcG9wb3Zlcl1cIixcbiAgICBleHBvcnRBczogXCJwb3BvdmVyXCJcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGVydGllc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3RlY3RlZCBQb3BvdmVyQ29tcG9uZW50ID0gUG9wb3ZlckNvbnRlbnQ7XG4gICAgcHJvdGVjdGVkIHBvcG92ZXI6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudD47XG4gICAgcHJvdGVjdGVkIHZpc2libGU6IGJvb2xlYW47XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbnB1dHMgLyBPdXRwdXRzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgQElucHV0KFwicG9wb3ZlclwiKVxuICAgIGNvbnRlbnQ6IHN0cmluZ3xQb3BvdmVyQ29udGVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQW5pbWF0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyUGxhY2VtZW50OiBcInRvcFwifFwiYm90dG9tXCJ8XCJsZWZ0XCJ8XCJyaWdodFwifFwiYXV0b1wifFwiYXV0byB0b3BcInxcImF1dG8gYm90dG9tXCJ8XCJhdXRvIGxlZnRcInxcImF1dG8gcmlnaHRcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlclRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJPbkhvdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckRpc21pc3NUaW1lb3V0OiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25TaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8UG9wb3Zlcj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BvdmVyPigpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKVxuICAgIHNob3dPckhpZGVPbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyT25Ib3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIpXG4gICAgc2hvd09uSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyT25Ib3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIpXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIilcbiAgICBoaWRlT25Ib3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUpIHJldHVybjsgLy8gZG9uJ3QgZG8gYW55dGhpbmcgc2luY2Ugbm90IHdlIGNvbnRyb2wgdGhpc1xuICAgICAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgICAgIGlmIChjaGFuZ2VzW1wicG9wb3ZlckRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlc1tcInBvcG92ZXJEaXNhYmxlZFwiXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQdWJsaWMgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuUG9wb3ZlckNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5wb3BvdmVyLmluc3RhbmNlIGFzIFBvcG92ZXJDb250ZW50O1xuICAgICAgICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcbiAgICAgICAgICAgIHBvcG92ZXIuY29udGVudCA9IHRoaXMuY29udGVudCBhcyBzdHJpbmc7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyUGxhY2VtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5wbGFjZW1lbnQgPSB0aGlzLnBvcG92ZXJQbGFjZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQW5pbWF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5hbmltYXRpb24gPSB0aGlzLnBvcG92ZXJBbmltYXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyVGl0bGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbkNsaWNrT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbk1vdXNlT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGU7XG5cbiAgICAgICAgICAgIHBvcG92ZXIub25DbG9zZUZyb21PdXRzaWRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAvLyBpZiBkaXNtaXNzVGltZW91dCBvcHRpb24gaXMgc2V0LCB0aGVuIHRoaXMgcG9wb3ZlciB3aWxsIGJlIGRpc21pc3NlZCBpbiBkaXNtaXNzVGltZW91dCB0aW1lXG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQgPiAwKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLmNvbnRlbnQgYXMgUG9wb3ZlckNvbnRlbnQ7XG4gICAgICAgICAgICBwb3BvdmVyLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25DbGlja091dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25Nb3VzZU91dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlO1xuXG4gICAgICAgICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgLy8gaWYgZGlzbWlzc1RpbWVvdXQgb3B0aW9uIGlzIHNldCwgdGhlbiB0aGlzIHBvcG92ZXIgd2lsbCBiZSBkaXNtaXNzZWQgaW4gZGlzbWlzc1RpbWVvdXQgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMClcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICAgICAgICBwb3BvdmVyLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TaG93bi5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgaW5zdGFuY2VvZiBQb3BvdmVyQ29udGVudClcbiAgICAgICAgICAgICh0aGlzLmNvbnRlbnQgYXMgUG9wb3ZlckNvbnRlbnQpLmhpZGVGcm9tUG9wb3ZlcigpO1xuXG4gICAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1BvcG92ZXJ9IGZyb20gXCIuL1BvcG92ZXJcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRlbnR9IGZyb20gXCIuL1BvcG92ZXJDb250ZW50XCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Qb3BvdmVyQ29udGVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUG9wb3ZlckNvbnRlbnQsXG4gICAgICAgIFBvcG92ZXIsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFBvcG92ZXJDb250ZW50LFxuICAgICAgICBQb3BvdmVyLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFBvcG92ZXJDb250ZW50XG4gICAgXVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJNb2R1bGUge1xuICAgIFxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztJQXVHSSxZQUFzQixPQUFtQixFQUNuQixHQUFzQixFQUN0QixRQUFtQjtRQUZuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7eUJBbEQyRCxRQUFRO3lCQU12RixJQUFJO21DQUdNLEtBQUs7bUNBR0wsS0FBSztrQ0FVZixJQUFJLFlBQVksRUFBRTttQkFDekIsQ0FBQyxLQUFLO29CQUNMLENBQUMsS0FBSztvQkFDTCxLQUFLOzJCQUNDLE1BQU07Ozs7bUNBVU4sQ0FBQyxLQUFVOztZQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUN0QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQUUsT0FBTztZQUMvRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNDO0tBU0E7Ozs7SUFRRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsbUJBQW1CO1lBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLEtBQVUsS0FBSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxSCxJQUFJLElBQUksQ0FBQyxtQkFBbUI7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