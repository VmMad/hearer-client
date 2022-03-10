import React, { useState } from "react"
import { Dropdown, FormControl, Button } from "react-bootstrap"

const PostDropDown = ({ feeling, viewHelpers, isHelper, handleChange, userData, setUserData, owner, user, offerHelp, _id, className, setEditing }) => {

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
            className={`d-flex flex-row align-items-center postDropDown relativeDropdown ${owner == user?._id ? "ownerDropdown" : "userDropdown"} ${className}`}
        >
            {children}
            {(owner == user?._id && feeling.helpers.length) ? <span className="threelines">
                &#x2709;

            </span> : <span className="threelines">
                &#x2630;
            </span>}
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
        <Dropdown >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {(window.location.pathname == "/assist" && !isHelper && owner != user?._id && !userData?.contacts?.includes(owner)) &&
                    <Dropdown.Item eventKey="1" onClick={() => {
                        offerHelp(_id)
                    }}>Send help offer</Dropdown.Item>}
                {feeling.helpers.length > 0 &&
                    (user?._id === feeling.owner && !viewHelpers && window.location.pathname != "/home")
                    ? <Dropdown.Item eventKey="2" onClick={() => handleChange()}>Show helper request list</Dropdown.Item>
                    : null
                }
                {(feeling.helpers.length > 0 && viewHelpers && window.location.pathname != "/home") ?
                    <Dropdown.Item eventKey="3" onClick={() => handleChange()}>Hide helper request list</Dropdown.Item>
                    : null
                }
                {userData?.contacts?.includes(owner) && <Dropdown.Item eventKey="3">Ya ayudas a este usuario</Dropdown.Item>}
                {isHelper && <Dropdown.Item className="offeredHelp">Ya has ofrecido ayuda a este usuario</Dropdown.Item>}
                {!feeling.helpers.length && feeling.owner === user?._id ?
                    <Dropdown.Item className="noHelpers">No tienes solicitudes</Dropdown.Item > : null}
                {window.location.pathname == "/home" && < Dropdown.Item onClick={() => setEditing(true)}>Edit</Dropdown.Item >}
            </Dropdown.Menu>
        </Dropdown >
    )
}
export default PostDropDown