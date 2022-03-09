import { useContext, useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner"

const SearchPosts = ({ setSearchParams, loadTroubles }) => {

    const [postsData, setPostsData] = useState({
        ownername: "",
        description: ""
    })

    const handleFormChange = e => {
        const { name, value } = e.target
        setPostsData({
            ...postsData,
            [name]: value
        })
        setSearchParams(postsData)

        loadTroubles()
    }

    const handleInputSubmit = e => {
        e.preventDefault()
    }

    const { ownername, description } = postsData

    const { isLoading } = useContext(AuthContext)

    if (!isLoading) {
        return (
            <Form onSubmit={handleInputSubmit}>
                <Form.Group className="mb-3" controlId="events">
                    <Form.Label>Posted by:</Form.Label>
                    <Form.Control type="text" name="ownername" placeholder="Search users posts..."
                        onChange={handleFormChange}
                        value={ownername} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="events">
                    <Form.Label>description</Form.Label>
                    <Form.Control type="text" name="description" placeholder="description..."
                        onChange={handleFormChange}
                        value={description} />
                </Form.Group>
            </Form>
        )
    } else {
        <LoadingSpinner />
    }
}
export default SearchPosts