class TokenService {
    getLocalRefreshToken() {

      return localStorage.getItem("refreshToken");
    }
    getLocalAccessToken() {
      
      return localStorage.getItem("token");
    }
    
  }
  export default new TokenService();