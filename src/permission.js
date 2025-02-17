import router from './router';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from './utils/auth';
import { isPathMatch } from './utils/validate';
import { isRelogin } from './utils/request';
import useUserStore from './stores/modules/user';

NProgress.configure({ showSpinner: false });

const whiteList = ['/404', '/login', '/register','/home','/selfSubmission','/activity','/userDetails','/activityDetail','/agreement','/privacy','/resetPasswordByUrl/*','/socialLogin','/forget'];
// const whiteList = ['/volunteer/login', '/volunteer/register','/volunteer/home','/volunteer/selfSubmission','/volunteer/activity','/volunteer/userDetails','/volunteer/activityDetail'];
const isWhiteList = (path) => {
  return whiteList.some(pattern => isPathMatch(pattern, path));
};
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title;
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else if (isWhiteList(to.path)) {
      next();
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已拉取完user_info信息
        useUserStore().getInfo().then(() => {
          isRelogin.show = false;
          next({ ...to, replace: true });
        }).catch(err => {
          useUserStore().logOut().then(() => {
            ElMessage.error(err);
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
