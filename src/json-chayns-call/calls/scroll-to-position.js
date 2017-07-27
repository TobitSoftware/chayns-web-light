import { scrollTo } from '../../utils/helper';

export default function scrollToPosition(req, res) {
    if (req.value && 'position' in req.value) {
        scrollTo(req.value.position);
    }
}