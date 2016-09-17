import loadTapp from './customTapp';
import {getUrlParameters, loginTappId} from '../config/customTapps';
import Textstrings from '../shared/utils/textstings';
import {validateTobitAccessToken} from '../shared/utils/helper';
import Dialog from '../shared/dialog';

document.addEventListener('DOMContentLoaded', () => {
    Textstrings.init().then(() => {
        let urlParameters = getUrlParameters();
        let tappId = urlParameters && urlParameters.tappid ? urlParameters.tappid : loginTappId;
        window.CustomTappCommunication.Init();

        window.alert = (message, title) => Dialog.show('alert', {
            title: title || null,
            message
        });
        let tobitAccessToken = document.parentWindow.external.Chayns.GetAccessToken();
        console.log('tobitAccessToken', tobitAccessToken);
        if (validateTobitAccessToken(tobitAccessToken)) {
            loadTapp((tappId !== loginTappId) ? tappId : '-7');
        } else {
            loadTapp(loginTappId);
        }
    });
}, false);

(function () {
    let $icons = document.querySelectorAll('.dev-navigation__element:not(.text)');

    for (let i = 0, l = $icons.length; i < l; i++) {
        $icons[i].addEventListener('click', () => {
            loadTapp($icons[i].getAttribute('data-tappid'));
        });
    }
}());
