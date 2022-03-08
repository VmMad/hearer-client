import React, { createContext, useState, useEffect } from "react"
import authService from "../services/auth.service"

const AuthContext = createContext()

const AuthProviderWrapper = (props) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const removeToken = () => {
        localStorage.removeItem("authToken")
    }

    const getToken = () => {
        return localStorage.getItem("authToken")
    }

    const logOutUser = () => {
        removeToken()
        setIsLoading(false)
        setIsLoggedIn(false)
        setUser(null)
    }

    const authUser = () => {

        const userToken = getToken()

        if (!userToken) {
            
            logOutUser()
        }
        else {
            authService
                .verify(userToken)
                .then(({ data }) => {
                    const user = data

                    setIsLoggedIn(true)
                    setIsLoading(false)
                    setUser(user)
                   
                })
                .catch(() => logOutUser())
        }
    }

    useEffect(() => authUser(), [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }