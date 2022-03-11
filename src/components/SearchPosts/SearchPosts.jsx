import { useContext, useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner"

const SearchPosts = ({ setSearchParams, loadTroubles }) => {

    const [postsData, setPostsData] = useState({
        ownername: "",
    })

    const handleFormChange = e => {
        const { name, value } = e.target
        setPostsData({
            ...postsData,
            [name]: value
        })
        setSearchParams(postsData)
    }

    const handleInputSubmit = e => {
        e.preventDefault()
    }

    const { ownername } = postsData

    const { isLoading } = useContext(AuthContext)

    if (!isLoading) {
        return (
            <Form onSubmit={handleInputSubmit}>
                <Form.Group className="mb-3" controlId="events">
                    <Form.Label>Posteado por:</Form.Label>
                    <Form.Control type="text" name="ownername" placeholder="Search users posts..."
                        value={ownername}
                        onChange={handleFormChange}
                        autoComplete="off" />
                </Form.Group>
            </Form>
        )
    } else {
        <LoadingSpinner />
    }
}
export default SearchPosts