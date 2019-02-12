/* eslint no-restricted-globals:0 */
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import jwt_decode from 'jwt-decode'

const LOGIN_SUCCESS_PAGE = "/dashboard"
const LOGIN_FAILED_PAGE = "/"


export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login = ()=> {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
        location.pathname = LOGIN_FAILED_PAGE
      }
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = ()=> {
    return this.idToken;
  }

  setSession = (authResult)=> {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem("access_token", authResult.accessToken)
    localStorage.setItem("id_token", authResult.idToken)
    localStorage.setItem("expiresAt", expiresAt)
    localStorage.setItem("isLoggedIn", true)
    location.hash = ""
    location.pathname = LOGIN_SUCCESS_PAGE 
  }

  renewSession = () =>{
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("id_token")
    localStorage.removeItem("expiresAt")
    localStorage.removeItem("isLoggedIn")
    location.pathname = LOGIN_FAILED_PAGE 
  }

  isAuthenticated = ()=> {
    let expiresAt = JSON.parse(localStorage.getItem("expiresAt"))
    return new Date().getTime() < expiresAt;
  }


  // getProfile = (cb)=> {
  //   let accessToken = localStorage.getItem("access_token")
  //   if(accessToken){
  //     this.auth0.client.userInfo(accessToken, (err, profile) => {
  //       if (profile) {
  //         return profile
  //       }
  //       cb(err, profile);
  //     });
  //   }
  // }


  getProfile = ()=> {
    let idToken = localStorage.getItem("id_token")
    if(idToken){
      return jwt_decode(idToken)
    }
    return {}
  }



  
  
}