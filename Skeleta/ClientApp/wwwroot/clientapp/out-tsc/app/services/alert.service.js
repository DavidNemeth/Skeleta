"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var utilities_1 = require("../services/utilities");
// ******************** Dialog ********************//
var AlertDialog = /** @class */ (function () {
    function AlertDialog(message, type, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
        this.message = message;
        this.type = type;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
        this.defaultValue = defaultValue;
        this.okLabel = okLabel;
        this.cancelLabel = cancelLabel;
    }
    return AlertDialog;
}());
exports.AlertDialog = AlertDialog;
var DialogType;
(function (DialogType) {
    DialogType[DialogType["alert"] = 0] = "alert";
    DialogType[DialogType["confirm"] = 1] = "confirm";
    DialogType[DialogType["prompt"] = 2] = "prompt";
})(DialogType = exports.DialogType || (exports.DialogType = {}));
// ******************** End ********************//
// ******************** Growls ********************//
var AlertMessage = /** @class */ (function () {
    function AlertMessage(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
    return AlertMessage;
}());
exports.AlertMessage = AlertMessage;
var MessageSeverity;
(function (MessageSeverity) {
    MessageSeverity[MessageSeverity["default"] = 0] = "default";
    MessageSeverity[MessageSeverity["info"] = 1] = "info";
    MessageSeverity[MessageSeverity["success"] = 2] = "success";
    MessageSeverity[MessageSeverity["error"] = 3] = "error";
    MessageSeverity[MessageSeverity["warn"] = 4] = "warn";
    MessageSeverity[MessageSeverity["wait"] = 5] = "wait";
})(MessageSeverity = exports.MessageSeverity || (exports.MessageSeverity = {}));
// ******************** End ********************//
var AlertService = /** @class */ (function () {
    function AlertService() {
        this.messages = new rxjs_1.Subject();
        this.stickyMessages = new rxjs_1.Subject();
        this.dialogs = new rxjs_1.Subject();
        this._isLoading = false;
    }
    AlertService.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({
            message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel,
            cancelLabel: cancelLabel, defaultValue: defaultValue
        });
    };
    AlertService.prototype.showMessage = function (data, separatorOrDetail, severity) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof http_1.HttpResponseBase) {
            data = utilities_1.Utilities.getHttpResponseMessage(data);
            separatorOrDetail = utilities_1.Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var message = data_1[_i];
                var msgObject = utilities_1.Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    };
    AlertService.prototype.showStickyMessage = function (data, separatorOrDetail, severity, error) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof http_1.HttpResponseBase) {
            data = utilities_1.Utilities.getHttpResponseMessage(data);
            separatorOrDetail = utilities_1.Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var message = data_2[_i];
                var msgObject = utilities_1.Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
                var msg = 'Severity: "${MessageSeverity[severity]}", Summary: "${data}", Detail: "${separatorOrDetail}", ' +
                    'Error: "${Utilities.safeStringify(error)}"';
                switch (severity) {
                    case MessageSeverity.default:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.info:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.success:
                        this.logMessage(msg);
                        break;
                    case MessageSeverity.error:
                        this.logError(msg);
                        break;
                    case MessageSeverity.warn:
                        this.logWarning(msg);
                        break;
                    case MessageSeverity.wait:
                        this.logTrace(msg);
                        break;
                }
            }
            this.showMessageHelper(data, separatorOrDetail, severity, true);
        }
    };
    AlertService.prototype.showMessageHelper = function (summary, detail, severity, isSticky) {
        if (isSticky) {
            this.stickyMessages.next({ severity: severity, summary: summary, detail: detail });
        }
        else {
            this.messages.next({ severity: severity, summary: summary, detail: detail });
        }
    };
    AlertService.prototype.startLoadingMessage = function (message, caption) {
        var _this = this;
        if (message === void 0) { message = 'Loading...'; }
        if (caption === void 0) { caption = ''; }
        this._isLoading = true;
        clearTimeout(this.loadingMessageId);
        this.loadingMessageId = setTimeout(function () {
            _this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
    };
    AlertService.prototype.stopLoadingMessage = function () {
        this._isLoading = false;
        clearTimeout(this.loadingMessageId);
        this.resetStickyMessage();
    };
    AlertService.prototype.logDebug = function (msg) {
        console.debug(msg);
    };
    AlertService.prototype.logError = function (msg) {
        console.error(msg);
    };
    AlertService.prototype.logInfo = function (msg) {
        console.info(msg);
    };
    AlertService.prototype.logMessage = function (msg) {
        console.log(msg);
    };
    AlertService.prototype.logTrace = function (msg) {
        console.trace(msg);
    };
    AlertService.prototype.logWarning = function (msg) {
        console.warn(msg);
    };
    AlertService.prototype.resetStickyMessage = function () {
        this.stickyMessages.next();
    };
    AlertService.prototype.getDialogEvent = function () {
        return this.dialogs.asObservable();
    };
    AlertService.prototype.getMessageEvent = function () {
        return this.messages.asObservable();
    };
    AlertService.prototype.getStickyMessageEvent = function () {
        return this.stickyMessages.asObservable();
    };
    Object.defineProperty(AlertService.prototype, "isLoadingInProgress", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    AlertService = __decorate([
        core_1.Injectable()
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map