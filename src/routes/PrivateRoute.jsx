import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from "./../components/LoadingSpinner/LoadingSpinner"
import { MessageContext } from "../context/userMessage.context"


function PrivateRoute() {

    const { showMessage, setShowMessage, messageInfo, setMessageInfo } = useContext(MessageContext)
    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isLoggedIn) {
        // const message = { ...messageInfo, title: "Debes iniciar sesion para ver esto" }
        // setMessageInfo(message)
        return <Navigate to="/login" />
    }

    return <Outlet />


}

export default PrivateRoute