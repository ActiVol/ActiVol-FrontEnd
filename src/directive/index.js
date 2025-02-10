import hasLogin from './hasLogin';
export default function directive(app) {
  app.directive('hasLogin', hasLogin);
}