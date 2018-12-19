class Auth {

    static authenticateUser(token) {
        console.log("token", token)
        localStorage.setItem('token', token)
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null
    }

    static deauthenticateUser() {
        localStorage.removeItem('token')
    }

    static getToken() {
        return localStorage.getItem('token')
    }

    static isTokenValid() {
        if (this.getToken()) {
            var token = JSON.parse(this.getToken())
            console.log("tokenTime", token.timestamp)
            var tokenTime = (token.timestamp),
            currentTime = new Date().getTime().toString()
        }

        if (currentTime - tokenTime < (10000 * 60 * 2)) {
            return true
        }
        else {
            this.deauthenticateUser()
            return false
        }
    }
}

export default Auth