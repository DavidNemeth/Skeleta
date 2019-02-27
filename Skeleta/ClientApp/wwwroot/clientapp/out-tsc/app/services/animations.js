"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.fadeInOut = animations_1.trigger('fadeInOut', [
    animations_1.transition(':enter', [animations_1.style({ opacity: 0 }), animations_1.animate('0.4s ease-in', animations_1.style({ opacity: 1 })), animations_1.animateChild()]),
    animations_1.transition(':leave', [animations_1.animate('0.4s 10ms ease-out', animations_1.style({ opacity: 0 })), animations_1.animateChild()])
]);
exports.fadeInOutRoute = animations_1.trigger('fadeInOutRoute', [
    animations_1.transition('* <=> *', [animations_1.style({ opacity: 0 }), animations_1.animate('0.4s ease-in', animations_1.style({ opacity: 1 })), animations_1.animateChild()]),
    animations_1.transition('* <=> *', [animations_1.animate('0.4s 10ms ease-out', animations_1.style({ opacity: 0 })), animations_1.animateChild()])
]);
function flyInOut(duration) {
    if (duration === void 0) { duration = 0.2; }
    return animations_1.trigger('flyInOut', [
        animations_1.state('in', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
        animations_1.transition('void => *', [animations_1.style({ opacity: 0, transform: 'translateX(-100%)' }), animations_1.animate(duration + "s ease-in")]),
        animations_1.transition('* => void', [animations_1.animate(duration + "s 10ms ease-out", animations_1.style({ opacity: 0, transform: 'translateX(100%)' }))])
    ]);
}
exports.flyInOut = flyInOut;
//# sourceMappingURL=animations.js.map