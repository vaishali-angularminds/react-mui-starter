import { BehaviorSubject } from "rxjs";
import { get, post, put,patch } from "./http/httpMethods";
import Cookie from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast } from "./toastUtil";


let currentUserFromStorage: any;

/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
    // if (currentUserFromStorage) {
    //   loadCurrentUser();
  
    // }
    
} catch (e) {
  showErrorToast("Could not find user in local storage");
  console.log('user not found')
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
const currentOrganizationSubject = new BehaviorSubject(
  (currentUserFromStorage &&
    currentUserFromStorage._org &&
    currentUserFromStorage._org[0]) ||
    undefined
);

/*
 * Export as a Type
 */
export const authenticationService = {
  logout,
  authToken,
  register,
  register1,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  requestForgotPassword,
  setPassword,
  isUserAndTokenAvailable,
  verifyOTP,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  signup,
  forgotPassword,
  verifyEmail,
  updateUser,
  updateProfilePicture,
  getAllPosts,
  newPost,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  currentOrganization: currentOrganizationSubject.asObservable(),
  get currentOrganizationValue() {
    return currentOrganizationSubject.value;
  },
};

/*
 * Verify OTP method
*/
function verifyCredentials(payload: any) {
  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: payload });
  //   resolve(true);
  // });
  return post('/auth/login', payload)
      .then((response: any) => {
          handleLogin(response)
          // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
          return response
      })
      .catch((error: any) => {
          showErrorToast(
              error.message || 'Error occurred while validating credentials!'
          )
          // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
          return error
      })
}

function register1(payload: any) {
  return post("/auth/register", payload)
  .then((response: any) => {
    
    post("/auth/send-verification-email",{},{
      headers : {
        Authorization : `Bearer ${response.token}`
      }
    })
      .then((response : any) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    return response;
  }
  )
}
function verifyEmail(payload : string)
{
  console.log('email varify')
  return post(`/auth/verify-email?token=${payload}`)
  .then((response: any) => {
    console.log(response)
    if (response.user) {
      history.push(paths.home);
      window.location.reload();
      
    }
    return response;
  });
}



async function register(payload: any) {
  return await post("/auth/register", payload).then((response: any) => {
    handleLogin(response)
    console.log("register")
    return response;
  });
}

/*
* Verify OTP method
*/
async function requestPasswordReset(payload: any) {
  return await post("/api/user/password/reset", payload).then((response: any) => {
    return response;
  });
}

/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
async function logout() {
  return get(`/api/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");
      
      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}



/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");

  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

/*
 * Get auth token from cookie
 */
function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method
 */

/*
 * Set new password
 */
async function setPassword(payload: any, token: string) {
  return await put("/api/user/password", payload, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return  post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  get(`/api/auth/self`).then((response: any) => {
    localStorage.setItem("currentUser", JSON.stringify(response));
    currentUserSubject.next(response);
    currentOrganizationSubject.next(response._org[0]);
  });
}

/*
 * Register user method
 */
function handleLogin(response: any) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  Cookie.set("_token", response.token, { path: "/" });
   console.log(response);
  localStorage.setItem("currentUser", JSON.stringify(response.user));
  localStorage.setItem("token", JSON.stringify(response.token));
  
  currentUserSubject.next(response.user);

  // currentOrganizationSubject.next(response.user._org[0]);
  //  console.log(response.token)
  if (response.user && !response.user._pre) {
    history.push(paths.home);
    window.location.reload();
    
  }
}
function signup(){
  history.push(paths.signup);
  window.location.reload();
}
function forgotPassword(){
  history.push(paths.forgotpassword);
  window.location.reload();

}

function updateUser(payload: any,uId: any){
  return  patch(`users/${uId}`, payload).then((response: any) => {
    // Cookie.set("_token", response.token, { path: "/" });
    localStorage.setItem("currentUser", JSON.stringify(response));
    // currentUserSubject.next(response.user);
    if (response ) {
      history.push(paths.home);
      window.location.reload();
      
    }
    console.log(response);
    return response;
  });
}
function updateProfilePicture(uId: any,payload: any){
  // console.log(payload);
  return  put(`users/${uId}`, payload).then((response: any) => {
    localStorage.setItem("currentUser", JSON.stringify(response));
    // history.push(paths.home);
    // window.location.reload();
    console.log(response);
    console.log(payload);
    return response;
  });
}

 function getAllPosts(){
    get('/post').then((response: any)=>{
      console.log(response);
      return response.results
    })

}
function newPost(payload:any){
 return post('/post',payload).then((response :any) =>{
   console.log(response);
 })

}

function requestForgotPassword(payload:any){
  return post('/auth/forgot-password',payload).then((response :any) =>{
    console.log(response);
  })
}