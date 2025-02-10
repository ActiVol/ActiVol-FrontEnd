import { getToken } from '../utils/auth';

export default {
  mounted(el) {
    if(getToken()) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};