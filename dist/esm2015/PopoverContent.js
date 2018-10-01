/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, EventEmitter, Renderer2 } from "@angular/core";
export class PopoverContent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wb3ZlckNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcG9wb3Zlci8iLCJzb3VyY2VzIjpbIlBvcG92ZXJDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBaUIsVUFBVSxFQUFFLGlCQUFpQixFQUFhLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBMEM3SSxNQUFNOzs7Ozs7SUE2REYsWUFBc0IsT0FBbUIsRUFDbkIsR0FBc0IsRUFDdEIsUUFBbUI7UUFGbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO3lCQWxEMkQsUUFBUTt5QkFNdkYsSUFBSTttQ0FHTSxLQUFLO21DQUdMLEtBQUs7a0NBVWYsSUFBSSxZQUFZLEVBQUU7bUJBQ3pCLENBQUMsS0FBSztvQkFDTCxDQUFDLEtBQUs7b0JBQ0wsS0FBSzsyQkFDQyxNQUFNOzs7O21DQVVOLENBQUMsS0FBVSxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3RDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPO1lBQy9GLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0M7S0FTQTs7OztJQVFELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxtQkFBbUI7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QixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDMUcsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0tBQzNCOzs7WUFoVEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCYjt5QkFDWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0JaO2FBQ0E7Ozs7WUF6Q3dDLFVBQVU7WUFBRSxpQkFBaUI7WUFBc0MsU0FBUzs7O3NCQW1EaEgsS0FBSzt3QkFHTCxLQUFLO29CQUdMLEtBQUs7d0JBR0wsS0FBSztrQ0FHTCxLQUFLO2tDQUdMLEtBQUs7eUJBT0wsU0FBUyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyfSBmcm9tIFwiLi9Qb3BvdmVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvcG92ZXItY29udGVudFwiLFxuICAgIHRlbXBsYXRlOiBgXG48ZGl2ICNwb3BvdmVyRGl2IGNsYXNzPVwicG9wb3ZlciB7eyBlZmZlY3RpdmVQbGFjZW1lbnQgfX1cIlxuICAgICBbc3R5bGUudG9wXT1cInRvcCArICdweCdcIlxuICAgICBbc3R5bGUubGVmdF09XCJsZWZ0ICsgJ3B4J1wiXG4gICAgIFtjbGFzcy5pbl09XCJpc0luXCJcbiAgICAgW2NsYXNzLmZhZGVdPVwiYW5pbWF0aW9uXCJcbiAgICAgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiXG4gICAgIHJvbGU9XCJwb3BvdmVyXCI+XG4gICAgPGRpdiBbaGlkZGVuXT1cIiFjbG9zZU9uTW91c2VPdXRzaWRlXCIgY2xhc3M9XCJ2aXJ0dWFsLWFyZWFcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj4gXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiIFtoaWRkZW5dPVwiIXRpdGxlXCI+e3sgdGl0bGUgfX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICB7eyBjb250ZW50IH19XG4gICAgPC9kaXY+IFxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Bcbi5wb3BvdmVyIC52aXJ0dWFsLWFyZWEge1xuICAgIGhlaWdodDogMTFweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4ucG9wb3Zlci50b3AgLnZpcnR1YWwtYXJlYSB7XG4gICAgYm90dG9tOiAtMTFweDsgXG59XG4ucG9wb3Zlci5ib3R0b20gLnZpcnR1YWwtYXJlYSB7XG4gICAgdG9wOiAtMTFweDsgXG59XG4ucG9wb3Zlci5sZWZ0IC52aXJ0dWFsLWFyZWEge1xuICAgIHJpZ2h0OiAtMTFweDsgXG59XG4ucG9wb3Zlci5yaWdodCAudmlydHVhbC1hcmVhIHtcbiAgICBsZWZ0OiAtMTFweDsgXG59XG5gXVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5wdXRzIC8gT3V0cHV0cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBASW5wdXQoKVxuICAgIC8vIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgY29udGVudDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFwidG9wXCJ8XCJib3R0b21cInxcImxlZnRcInxcInJpZ2h0XCJ8XCJhdXRvXCJ8XCJhdXRvIHRvcFwifFwiYXV0byBib3R0b21cInxcImF1dG8gbGVmdFwifFwiYXV0byByaWdodFwiID0gXCJib3R0b21cIjtcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uTW91c2VPdXRzaWRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHJvcGVydGllc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBWaWV3Q2hpbGQoXCJwb3BvdmVyRGl2XCIpXG4gICAgcG9wb3ZlckRpdjogRWxlbWVudFJlZjtcblxuICAgIHBvcG92ZXI6IFBvcG92ZXI7XG4gICAgb25DbG9zZUZyb21PdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRvcDogbnVtYmVyID0gLTEwMDAwO1xuICAgIGxlZnQ6IG51bWJlciA9IC0xMDAwMDtcbiAgICBpc0luOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzcGxheVR5cGU6IHN0cmluZyA9IFwibm9uZVwiO1xuICAgIGVmZmVjdGl2ZVBsYWNlbWVudDogc3RyaW5nO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEFub255bW91cyBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgZHJvcGRvd24gaWYgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICBvbkRvY3VtZW50TW91c2VEb3duID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgIXRoaXMucG9wb3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAoZWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8IHRoaXMucG9wb3Zlci5nZXRFbGVtZW50KCkuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlRnJvbU91dHNpZGUuZW1pdCh1bmRlZmluZWQpO1xuICAgIH07XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBMaWZlY3ljbGUgY2FsbGJhY2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgbGlzdGVuQ2xpY2tGdW5jOiBhbnk7XG4gICAgbGlzdGVuTW91c2VGdW5jOiBhbnk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uQ2xpY2tPdXRzaWRlKVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5DbGlja0Z1bmMgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcImRvY3VtZW50XCIsIFwibW91c2Vkb3duXCIsIChldmVudDogYW55KSA9PiB0aGlzLm9uRG9jdW1lbnRNb3VzZURvd24oZXZlbnQpKTtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbk1vdXNlT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuTW91c2VGdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXCJkb2N1bWVudFwiLCBcIm1vdXNlb3ZlclwiLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRvY3VtZW50TW91c2VEb3duKGV2ZW50KSk7XG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuQ2xpY2tGdW5jKCk7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Nb3VzZU91dHNpZGUpXG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk1vdXNlRnVuYygpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQdWJsaWMgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyIHx8ICF0aGlzLnBvcG92ZXIuZ2V0RWxlbWVudCgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uRWxlbWVudHModGhpcy5wb3BvdmVyLmdldEVsZW1lbnQoKSwgdGhpcy5wb3BvdmVyRGl2Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VHlwZSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy50b3AgPSBwLnRvcDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gcC5sZWZ0O1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9wID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmxlZnQgPSAtMTAwMDA7XG4gICAgICAgIHRoaXMuaXNJbiA9IHRydWU7XG4gICAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZUZyb21Qb3BvdmVyKCkge1xuICAgICAgICB0aGlzLnRvcCA9IC0xMDAwMDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gLTEwMDAwO1xuICAgICAgICB0aGlzLmlzSW4gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm90ZWN0ZWQgTWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHByb3RlY3RlZCBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbDogSFRNTEVsZW1lbnQsIHRhcmdldEVsOiBIVE1MRWxlbWVudCwgcG9zaXRpb25TdHI6IHN0cmluZywgYXBwZW5kVG9Cb2R5OiBib29sZWFuID0gZmFsc2UpOiB7IHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBwb3NpdGlvblN0clBhcnRzID0gcG9zaXRpb25TdHIuc3BsaXQoXCItXCIpO1xuICAgICAgICBsZXQgcG9zMCA9IHBvc2l0aW9uU3RyUGFydHNbMF07XG4gICAgICAgIGxldCBwb3MxID0gcG9zaXRpb25TdHJQYXJ0c1sxXSB8fCBcImNlbnRlclwiO1xuICAgICAgICBsZXQgaG9zdEVsUG9zID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsKTtcbiAgICAgICAgbGV0IHRhcmdldEVsV2lkdGggPSB0YXJnZXRFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IHRhcmdldEVsSGVpZ2h0ID0gdGFyZ2V0RWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZWZmZWN0aXZlUGxhY2VtZW50ID0gcG9zMCA9IHRoaXMuZ2V0RWZmZWN0aXZlUGxhY2VtZW50KHBvczAsIGhvc3RFbCwgdGFyZ2V0RWwpO1xuXG4gICAgICAgIGxldCBzaGlmdFdpZHRoOiBhbnkgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aCAvIDIgLSB0YXJnZXRFbFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiBmdW5jdGlvbiAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9zdEVsUG9zLmxlZnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MubGVmdCArIGhvc3RFbFBvcy53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2hpZnRIZWlnaHQ6IGFueSA9IHtcbiAgICAgICAgICAgIGNlbnRlcjogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0IC8gMiAtIHRhcmdldEVsSGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpOiBudW1iZXIge1xuICAgICAgICAgICAgICAgIHJldHVybiBob3N0RWxQb3MudG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvc3RFbFBvcy50b3AgKyBob3N0RWxQb3MuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0YXJnZXRFbFBvczogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH07XG4gICAgICAgIHN3aXRjaCAocG9zMCkge1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMV0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MwXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaGlmdEhlaWdodFtwb3MxXSgpLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBob3N0RWxQb3MubGVmdCAtIHRhcmdldEVsV2lkdGhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc2hpZnRIZWlnaHRbcG9zMF0oKSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc2hpZnRXaWR0aFtwb3MxXSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0YXJnZXRFbFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBob3N0RWxQb3MudG9wIC0gdGFyZ2V0RWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNoaWZ0V2lkdGhbcG9zMV0oKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0RWxQb3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfSB7XG4gICAgICAgIGxldCBvZmZzZXRQYXJlbnRCQ1IgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgICAgICBjb25zdCBlbEJDUiA9IHRoaXMub2Zmc2V0KG5hdGl2ZUVsKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLnBhcmVudE9mZnNldEVsKG5hdGl2ZUVsKTtcbiAgICAgICAgaWYgKG9mZnNldFBhcmVudEVsICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUiA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsKTtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudEJDUi50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wIC0gb2Zmc2V0UGFyZW50RWwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgb2Zmc2V0UGFyZW50QkNSLmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdCAtIG9mZnNldFBhcmVudEVsLnNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBuYXRpdmVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGggfHwgbmF0aXZlRWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgfHwgbmF0aXZlRWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgdG9wOiBlbEJDUi50b3AgLSBvZmZzZXRQYXJlbnRCQ1IudG9wLFxuICAgICAgICAgICAgbGVmdDogZWxCQ1IubGVmdCAtIG9mZnNldFBhcmVudEJDUi5sZWZ0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9mZnNldChuYXRpdmVFbDogYW55KTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gbmF0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogYm91bmRpbmdDbGllbnRSZWN0LndpZHRoIHx8IG5hdGl2ZUVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0IHx8IG5hdGl2ZUVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApLFxuICAgICAgICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U3R5bGUobmF0aXZlRWw6IEhUTUxFbGVtZW50LCBjc3NQcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoKG5hdGl2ZUVsIGFzIGFueSkuY3VycmVudFN0eWxlKSAvLyBJRVxuICAgICAgICAgICAgcmV0dXJuIChuYXRpdmVFbCBhcyBhbnkpLmN1cnJlbnRTdHlsZVtjc3NQcm9wXTtcblxuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpXG4gICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGFzIGFueSkobmF0aXZlRWwpW2Nzc1Byb3BdO1xuXG4gICAgICAgIC8vIGZpbmFsbHkgdHJ5IGFuZCBnZXQgaW5saW5lIHN0eWxlXG4gICAgICAgIHJldHVybiAobmF0aXZlRWwuc3R5bGUgYXMgYW55KVtjc3NQcm9wXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNTdGF0aWNQb3NpdGlvbmVkKG5hdGl2ZUVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0U3R5bGUobmF0aXZlRWwsIFwicG9zaXRpb25cIikgfHwgXCJzdGF0aWNcIiApID09PSBcInN0YXRpY1wiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwYXJlbnRPZmZzZXRFbChuYXRpdmVFbDogSFRNTEVsZW1lbnQpOiBhbnkge1xuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50OiBhbnkgPSBuYXRpdmVFbC5vZmZzZXRQYXJlbnQgfHwgd2luZG93LmRvY3VtZW50O1xuICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudCAhPT0gd2luZG93LmRvY3VtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEVmZmVjdGl2ZVBsYWNlbWVudChwbGFjZW1lbnQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBsYWNlbWVudFBhcnRzID0gcGxhY2VtZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgICAgaWYgKHBsYWNlbWVudFBhcnRzWzBdICE9PSBcImF1dG9cIikge1xuICAgICAgICAgICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhvc3RFbEJvdW5kaW5nUmVjdCA9IGhvc3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGRlc2lyZWRQbGFjZW1lbnQgPSBwbGFjZW1lbnRQYXJ0c1sxXSB8fCBcImJvdHRvbVwiO1xuXG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcInRvcFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC50b3AgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcImJvdHRvbVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNpcmVkUGxhY2VtZW50ID09PSBcImJvdHRvbVwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5ib3R0b20gKyB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidG9wXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwibGVmdFwiICYmIGhvc3RFbEJvdW5kaW5nUmVjdC5sZWZ0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInJpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2lyZWRQbGFjZW1lbnQgPT09IFwicmlnaHRcIiAmJiBob3N0RWxCb3VuZGluZ1JlY3QucmlnaHQgKyB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcImxlZnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXNpcmVkUGxhY2VtZW50O1xuICAgIH1cbn1cbiJdfQ==