// ECRIRE LE CODE DU TAG QUE L'ON DONNERA AU CLIENT:

  window.onUserAction= function onUserAction(data) {
      window.__ISDK = window.__ISDK || [];
      window.__ISDK.push(data);
    }