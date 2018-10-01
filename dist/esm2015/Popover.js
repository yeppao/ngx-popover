/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter } from "@angular/core";
import { PopoverContent } from "./PopoverContent";
export class Popover {
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
function Popover_tsickle_Closure_declarations() {
    /** @type {?} */
    Popover.prototype.PopoverComponent;
    /** @type {?} */
    Popover.prototype.popover;
    /** @type {?} */
    Popover.prototype.visible;
    /** @type {?} */
    Popover.prototype.content;
    /** @type {?} */
    Popover.prototype.popoverDisabled;
    /** @type {?} */
    Popover.prototype.popoverAnimation;
    /** @type {?} */
    Popover.prototype.popoverPlacement;
    /** @type {?} */
    Popover.prototype.popoverTitle;
    /** @type {?} */
    Popover.prototype.popoverOnHover;
    /** @type {?} */
    Popover.prototype.popoverCloseOnClickOutside;
    /** @type {?} */
    Popover.prototype.popoverCloseOnMouseOutside;
    /** @type {?} */
    Popover.prototype.popoverDismissTimeout;
    /** @type {?} */
    Popover.prototype.onShown;
    /** @type {?} */
    Popover.prototype.onHidden;
    /** @type {?} */
    Popover.prototype.viewContainerRef;
    /** @type {?} */
    Popover.prototype.resolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wb3BvdmVyLyIsInNvdXJjZXMiOlsiUG9wb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWdCLGdCQUFnQixFQUFFLHdCQUF3QixFQUFvQixLQUFLLEVBQTJCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUwsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBTWhELE1BQU07Ozs7O0lBY0YsWUFBc0IsZ0JBQWtDLEVBQ2xDLFFBQWtDO1FBRGxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7Ozs7Z0NBVDNCLGNBQWM7OEJBZ0NqQixLQUFLO3FDQVNDLENBQUM7dUJBR3ZCLElBQUksWUFBWSxFQUFXO3dCQUcxQixJQUFJLFlBQVksRUFBVztLQXJDckM7Ozs7SUE0Q0QsaUJBQWlCO1FBQ2IsSUFBSSxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDaEMsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2pCOzs7O0lBSUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDakMsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2Y7Ozs7SUFJRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsMEJBQTBCO1lBQUUsT0FBTztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQ2pDLElBQUksSUFBSSxDQUFDLGVBQWU7WUFBRSxPQUFPO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELFdBQVcsQ0FBQyxPQUErQztR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TCxLQUFLOytCQUdMLEtBQUs7MkJBR0wsS0FBSzs2QkFHTCxLQUFLO3lDQUdMLEtBQUs7eUNBR0wsS0FBSztvQ0FHTCxLQUFLO3NCQUdMLE1BQU07dUJBR04sTUFBTTtnQ0FPTixZQUFZLFNBQUMsT0FBTzswQkFPcEIsWUFBWSxTQUFDLFNBQVMsY0FDdEIsWUFBWSxTQUFDLFlBQVk7MEJBT3pCLFlBQVksU0FBQyxVQUFVLGNBQ3ZCLFlBQVksU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRlbnR9IGZyb20gXCIuL1BvcG92ZXJDb250ZW50XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltwb3BvdmVyXVwiLFxuICAgIGV4cG9ydEFzOiBcInBvcG92ZXJcIlxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQcm9wZXJ0aWVzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgcHJvdGVjdGVkIFBvcG92ZXJDb21wb25lbnQgPSBQb3BvdmVyQ29udGVudDtcbiAgICBwcm90ZWN0ZWQgcG9wb3ZlcjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50PjtcbiAgICBwcm90ZWN0ZWQgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIElucHV0cyAvIE91dHB1dHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBASW5wdXQoXCJwb3BvdmVyXCIpXG4gICAgY29udGVudDogc3RyaW5nfFBvcG92ZXJDb250ZW50O1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJBbmltYXRpb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJQbGFjZW1lbnQ6IFwidG9wXCJ8XCJib3R0b21cInxcImxlZnRcInxcInJpZ2h0XCJ8XCJhdXRvXCJ8XCJhdXRvIHRvcFwifFwiYXV0byBib3R0b21cInxcImF1dG8gbGVmdFwifFwiYXV0byByaWdodFwiO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyVGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3Zlck9uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckNsb3NlT25DbGlja091dHNpZGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyRGlzbWlzc1RpbWVvdXQ6IG51bWJlciA9IDA7XG5cbiAgICBAT3V0cHV0KClcbiAgICBvblNob3duID0gbmV3IEV2ZW50RW1pdHRlcjxQb3BvdmVyPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25IaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyPFBvcG92ZXI+KCk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgc2hvd09ySGlkZU9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJPbkhvdmVyKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c2luXCIpXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIilcbiAgICBzaG93T25Ib3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXJPbkhvdmVyKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIilcbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VsZWF2ZVwiKVxuICAgIGhpZGVPbkhvdmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZSkgcmV0dXJuOyAvLyBkb24ndCBkbyBhbnl0aGluZyBzaW5jZSBub3Qgd2UgY29udHJvbCB0aGlzXG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyT25Ib3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1twcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbXCJwb3BvdmVyRGlzYWJsZWRcIl0pIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzW1wicG9wb3ZlckRpc2FibGVkXCJdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFB1YmxpYyBNZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLnZpc2libGUpIHJldHVybjtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5Qb3BvdmVyQ29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmICghdGhpcy52aXNpYmxlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLnBvcG92ZXIuaW5zdGFuY2UgYXMgUG9wb3ZlckNvbnRlbnQ7XG4gICAgICAgICAgICBwb3BvdmVyLnBvcG92ZXIgPSB0aGlzO1xuICAgICAgICAgICAgcG9wb3Zlci5jb250ZW50ID0gdGhpcy5jb250ZW50IGFzIHN0cmluZztcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnBsYWNlbWVudCA9IHRoaXMucG9wb3ZlclBsYWNlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmFuaW1hdGlvbiA9IHRoaXMucG9wb3ZlckFuaW1hdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uQ2xpY2tPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uTW91c2VPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZTtcblxuICAgICAgICAgICAgcG9wb3Zlci5vbkNsb3NlRnJvbU91dHNpZGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgIC8vIGlmIGRpc21pc3NUaW1lb3V0IG9wdGlvbiBpcyBzZXQsIHRoZW4gdGhpcyBwb3BvdmVyIHdpbGwgYmUgZGlzbWlzc2VkIGluIGRpc21pc3NUaW1lb3V0IHRpbWVcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMuY29udGVudCBhcyBQb3BvdmVyQ29udGVudDtcbiAgICAgICAgICAgIHBvcG92ZXIucG9wb3ZlciA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyUGxhY2VtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5wbGFjZW1lbnQgPSB0aGlzLnBvcG92ZXJQbGFjZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQW5pbWF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5hbmltYXRpb24gPSB0aGlzLnBvcG92ZXJBbmltYXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyVGl0bGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbkNsaWNrT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGU7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuY2xvc2VPbk1vdXNlT3V0c2lkZSA9IHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGU7XG5cbiAgICAgICAgICAgIHBvcG92ZXIub25DbG9zZUZyb21PdXRzaWRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAvLyBpZiBkaXNtaXNzVGltZW91dCBvcHRpb24gaXMgc2V0LCB0aGVuIHRoaXMgcG9wb3ZlciB3aWxsIGJlIGRpc21pc3NlZCBpbiBkaXNtaXNzVGltZW91dCB0aW1lXG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQgPiAwKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0KTtcbiAgICAgICAgICAgIHBvcG92ZXIuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNob3duLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHJldHVybjtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlcilcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudCBpbnN0YW5jZW9mIFBvcG92ZXJDb250ZW50KVxuICAgICAgICAgICAgKHRoaXMuY29udGVudCBhcyBQb3BvdmVyQ29udGVudCkuaGlkZUZyb21Qb3BvdmVyKCk7XG5cbiAgICAgICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRoaXMpO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxufVxuIl19