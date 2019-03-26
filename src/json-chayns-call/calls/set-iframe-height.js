import { chaynsInfo } from '../../chayns-info';

export default function setIframeHeigth(req, res) {
    const $iframe = req.srcIframe[0];
    const value = req.value;

    if (!value.full && !('height' in value) && !('fullViewport' in value)) {
        res.event(2, 'Field height missing.');
        return;
    } else if (value.full || value.fullViewport || chaynsInfo.fullSizeMode) {
        $iframe.style.height = '100vh';
        document.body.classList.add('no-scroll');
        return;
    }

    value.height = parseInt(value.height, 10);
    document.body.classList.remove('no-scroll');

    if (Number.isNaN(value.height)) {
        req.event(1, 'Field heigth is not typeof number');
        return;
    }

    value.growOnly = value.growOnly !== false; // true als default

    if ($iframe && (!value.growOnly || parseInt($iframe.style.height, 10) < value.height)) {
        $iframe.style.height = `${value.height}px`;
    }
}
