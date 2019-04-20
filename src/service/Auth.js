import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTHO_DOMAIN,
      clientID: process.env.REACT_APP_AUTHO_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTHO_CALLBACKURL,
      responseType: "id_token",
      scope: "openid profile"
    });
  }

  getProfile = () => {
    return this.profile;
  };

  getIdToken = () => {
    return this.idToken;
  };

  isAuthenticated = () => {
    return new Date().getTime() < this.expiresAt;
  };

  signIn = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        this.history.push("/");
      }
      if (authResult && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      }
    });
  };

  signOut = () => {
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTHO_CLIENTID,
      returnTo: "http://localhost:3000"
    });
  };

  setSession = authResult => {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  };

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}
