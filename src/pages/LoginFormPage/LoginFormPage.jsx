import LoginForm from "../../components/LoginForm/LoginForm"


const LoginFormPage = () => {

    return (
        <div className="loginform-page d-flex justify-content-center align-items-center">
            <div className="form-container">
                <LoginForm className={"loginform-page"} />
            </div>
        </div>
    )
}
export default LoginFormPage