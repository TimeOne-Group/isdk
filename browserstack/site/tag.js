function onUserAction(data) {
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push(data);
}

window.__SDKsetUnknown = function () {
  onUserAction(['_setUnknown']);
};

window.__SDKsetOptin = function () {
  onUserAction(['_setOptin']);
};

window.__SDKsetOptout = function () {
  onUserAction(['_setOptout']);
};
