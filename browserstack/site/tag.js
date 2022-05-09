// ECRIRE LE CODE DU TAG QUE L'ON DONNERA AU CLIENT:

  function onUserAction(data) {
      window.__ISDK = window.__ISDK || [];
      window.__ISDK.push(data);
    }

window.__SDKsetUnknown = function () {
  onUserAction(['setUnknown']);
};

window.__SDKsetOptin = function () {
  onUserAction(['setOptin']);
};

window.__SDKsetOptout = function () {
  onUserAction(['setOptout']);
};
