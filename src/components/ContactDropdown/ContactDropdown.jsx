import { Dropdown, Button } from "react-bootstrap"
import React, { useState } from "react";
import "./ContactDropdown.css"

const PostDropdown = ({ showButton, setShowButton, acceptHelp, deleteContact, role, navigate, setShow, _id }) => {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            &#x2630;
        </a>
    ))

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

            const [value, setValue] = useState('')

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            )
        }
    )


    return (
        <Dropdown className={`dropdown-contact-list `}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {(!showButton && window.location.pathname != "/mycontacts") ?
                    <Dropdown.Item className="btn-accepthelp" eventKey="1" onClick={() => {
                        setShowButton(!showButton)
                        acceptHelp(_id)
                    }}>Aceptar ayuda</Dropdown.Item> :
                    <Dropdown.Item className="btn-eliminar-contacto" onClick={() => {
                        setShowButton(!showButton)
                        deleteContact(_id)
                    }}>Eliminar contacto</Dropdown.Item>}
                {role === 'helper' && <Dropdown.Item onClick={() => navigate(`/helperprofile/${_id}`)} eventKey="3">Credenciales</Dropdown.Item>}
                {<Dropdown.Item onClick={() => setShow(true)} eventKey="4" >Enviar Mensaje</Dropdown.Item >}
            </Dropdown.Menu>
        </Dropdown >
    )
}
export default PostDropdown