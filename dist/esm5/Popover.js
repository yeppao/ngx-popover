/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter } from "@angular/core";
import { PopoverContent } from "./PopoverContent";
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
export { Popover };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wb3BvdmVyLyIsInNvdXJjZXMiOlsiUG9wb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWdCLGdCQUFnQixFQUFFLHdCQUF3QixFQUFvQixLQUFLLEVBQTJCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUwsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDOztJQWdCNUMsNEVBQTRFO0lBQzVFLGNBQWM7SUFDZCw0RUFBNEU7SUFFNUUsaUJBQXNCLGdCQUFrQyxFQUNsQyxRQUFrQztRQURsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQTBCOzs7O2dDQVQzQixjQUFjOzhCQWdDakIsS0FBSztxQ0FTQyxDQUFDO3VCQUd2QixJQUFJLFlBQVksRUFBVzt3QkFHMUIsSUFBSSxZQUFZLEVBQVc7S0FyQ3JDO0lBdUNELDRFQUE0RTtJQUM1RSxrQkFBa0I7SUFDbEIsNEVBQTRFOzs7O0lBRzVFLG1DQUFpQjs7O0lBRGpCO1FBRUksSUFBSSxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU87UUFDaEMsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2pCOzs7O0lBSUQsNkJBQVc7OztJQUZYO1FBR0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUNqQyxJQUFJLElBQUksQ0FBQyxlQUFlO1lBQUUsT0FBTztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZjs7OztJQUlELDZCQUFXOzs7SUFGWDtRQUdJLElBQUksSUFBSSxDQUFDLDBCQUEwQjtZQUFFLE9BQU87UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUNqQyxJQUFJ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Ozs7SUFBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7S0FDdEQ7O2dCQTlLSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxTQUFTO2lCQUN0Qjs7OztnQkFOK0MsZ0JBQWdCO2dCQUFFLHdCQUF3Qjs7OzBCQTZCckYsS0FBSyxTQUFDLFNBQVM7a0NBR2YsS0FBSzttQ0FHTCxLQUFLO21DQUdMLEtBQUs7K0JBR0wsS0FBSztpQ0FHTCxLQUFLOzZDQUdMLEtBQUs7NkNBR0wsS0FBSzt3Q0FHTCxLQUFLOzBCQUdMLE1BQU07MkJBR04sTUFBTTtvQ0FPTixZQUFZLFNBQUMsT0FBTzs4QkFPcEIsWUFBWSxTQUFDLFNBQVMsY0FDdEIsWUFBWSxTQUFDLFlBQVk7OEJBT3pCLFlBQVksU0FBQyxVQUFVLGNBQ3ZCLFlBQVksU0FBQyxZQUFZOztrQkFsRjlCOztTQU9hLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udGVudH0gZnJvbSBcIi4vUG9wb3ZlckNvbnRlbnRcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3BvcG92ZXJdXCIsXG4gICAgZXhwb3J0QXM6IFwicG9wb3ZlclwiXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFByb3BlcnRpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBwcm90ZWN0ZWQgUG9wb3ZlckNvbXBvbmVudCA9IFBvcG92ZXJDb250ZW50O1xuICAgIHByb3RlY3RlZCBwb3BvdmVyOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnQ+O1xuICAgIHByb3RlY3RlZCB2aXNpYmxlOiBib29sZWFuO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5wdXRzIC8gT3V0cHV0c1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIEBJbnB1dChcInBvcG92ZXJcIilcbiAgICBjb250ZW50OiBzdHJpbmd8UG9wb3ZlckNvbnRlbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckFuaW1hdGlvbjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlclBsYWNlbWVudDogXCJ0b3BcInxcImJvdHRvbVwifFwibGVmdFwifFwicmlnaHRcInxcImF1dG9cInxcImF1dG8gdG9wXCJ8XCJhdXRvIGJvdHRvbVwifFwiYXV0byBsZWZ0XCJ8XCJhdXRvIHJpZ2h0XCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJUaXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyT25Ib3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBwb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHBvcG92ZXJEaXNtaXNzVGltZW91dDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uU2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPFBvcG92ZXI+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8UG9wb3Zlcj4oKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIilcbiAgICBzaG93T3JIaWRlT25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3VzaW5cIilcbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VlbnRlclwiKVxuICAgIHNob3dPbkhvdmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucG9wb3Zlck9uSG92ZXIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiKVxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIpXG4gICAgaGlkZU9uSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlKSByZXR1cm47IC8vIGRvbid0IGRvIGFueXRoaW5nIHNpbmNlIG5vdCB3ZSBjb250cm9sIHRoaXNcbiAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXJPbkhvdmVyKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgICAgICBpZiAoY2hhbmdlc1tcInBvcG92ZXJEaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXNbXCJwb3BvdmVyRGlzYWJsZWRcIl0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUHVibGljIE1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLlBvcG92ZXJDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucG9wb3Zlci5pbnN0YW5jZSBhcyBQb3BvdmVyQ29udGVudDtcbiAgICAgICAgICAgIHBvcG92ZXIucG9wb3ZlciA9IHRoaXM7XG4gICAgICAgICAgICBwb3BvdmVyLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQgYXMgc3RyaW5nO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIucGxhY2VtZW50ID0gdGhpcy5wb3BvdmVyUGxhY2VtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckFuaW1hdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIuYW5pbWF0aW9uID0gdGhpcy5wb3BvdmVyQW5pbWF0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlclRpdGxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25DbGlja091dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25DbGlja091dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNsb3NlT25Nb3VzZU91dHNpZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmNsb3NlT25Nb3VzZU91dHNpZGUgPSB0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlO1xuXG4gICAgICAgICAgICBwb3BvdmVyLm9uQ2xvc2VGcm9tT3V0c2lkZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgLy8gaWYgZGlzbWlzc1RpbWVvdXQgb3B0aW9uIGlzIHNldCwgdGhlbiB0aGlzIHBvcG92ZXIgd2lsbCBiZSBkaXNtaXNzZWQgaW4gZGlzbWlzc1RpbWVvdXQgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckRpc21pc3NUaW1lb3V0ID4gMClcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5jb250ZW50IGFzIFBvcG92ZXJDb250ZW50O1xuICAgICAgICAgICAgcG9wb3Zlci5wb3BvdmVyID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJQbGFjZW1lbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnBsYWNlbWVudCA9IHRoaXMucG9wb3ZlclBsYWNlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJBbmltYXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBwb3BvdmVyLmFuaW1hdGlvbiA9IHRoaXMucG9wb3ZlckFuaW1hdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJUaXRsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uQ2xpY2tPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uQ2xpY2tPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbkNsaWNrT3V0c2lkZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDbG9zZU9uTW91c2VPdXRzaWRlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5jbG9zZU9uTW91c2VPdXRzaWRlID0gdGhpcy5wb3BvdmVyQ2xvc2VPbk1vdXNlT3V0c2lkZTtcblxuICAgICAgICAgICAgcG9wb3Zlci5vbkNsb3NlRnJvbU91dHNpZGUuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgIC8vIGlmIGRpc21pc3NUaW1lb3V0IG9wdGlvbiBpcyBzZXQsIHRoZW4gdGhpcyBwb3BvdmVyIHdpbGwgYmUgZGlzbWlzc2VkIGluIGRpc21pc3NUaW1lb3V0IHRpbWVcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJEaXNtaXNzVGltZW91dCA+IDApXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5wb3BvdmVyRGlzbWlzc1RpbWVvdXQpO1xuICAgICAgICAgICAgcG9wb3Zlci5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2hvd24uZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKVxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmRlc3Ryb3koKTtcblxuICAgICAgICBpZiAodGhpcy5jb250ZW50IGluc3RhbmNlb2YgUG9wb3ZlckNvbnRlbnQpXG4gICAgICAgICAgICAodGhpcy5jb250ZW50IGFzIFBvcG92ZXJDb250ZW50KS5oaWRlRnJvbVBvcG92ZXIoKTtcblxuICAgICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG59XG4iXX0=