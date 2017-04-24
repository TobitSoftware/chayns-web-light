import jsonCalls from '../json-chayns-call/json-calls.js';
import * as jsonCallHelper from '../json-chayns-call/json-call-helper';
import { answerJsonCall } from '../tapp/custom-tapp-communication';

export function chaynscall(param, srcIframe) {
    let value;
    let action;

    if (typeof (param) === 'string') {
        try {
            const temp = JSON.parse(param);
            value = temp.value;
            action = temp.action;
        } catch (e) {
            jsonCallHelper.throwEvent(window.NaN, 4, 'Error parsing JSON', param, srcIframe);
            return;
        }
    } else if (typeof (param) === 'object' && param.action !== undefined) {
        value = param.value;
        action = param.action;
    } else {
        jsonCallHelper.throwEvent(window.NaN, 2, 'Field action missing', param, srcIframe);
        return;
    }

    if (typeof value !== 'object' && typeof value === 'string') {
        try {
            value = JSON.parse(value);
        } catch (e) {
            jsonCallHelper.throwEvent(action, 4, 'Error parsing JSON', param, srcIframe);
            return;
        }
    }
    if (typeof jsonCalls[action] === 'function') {
        const req = {
            action,
            value,
            srcIframe,
            addJsonCallEventListener: (action) => jsonCallHelper.addJsonCallEventListener(action, value, srcIframe)
        };
        const res = {
            event: (code, message) => jsonCallHelper.throwEvent(action, code, message, value, srcIframe),
            answer: (response) => answerJsonCall(value, response, srcIframe)
        };

        jsonCalls[action](req, res);
    } else {
        jsonCallHelper.throwEvent(action, 3, `chaynsCall ${action} doesn't exist`, value, srcIframe);
    }
}

export const jsoncall = chaynscall;