import { Routes, Route } from "react-router-dom"
import ContactsListPage from "../pages/ContactsListPage/ContactsListPage"
import EventsListPage from "../pages/EventsListPage/EventsListPage"
import IndexPage from "../pages/Indexpage/IndexPage"
import HomePage from "../pages/HomePage/HomePage"
import CreateEventPage from "../pages/CreateEventPage/CreateEventPage"
import AssistPage from "../pages/AssistPage/AssistPage"
import HelperProfilePage from "../pages/HelperProfilePage/HelperProfilePage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import EventDetails from "../components/EventDetails/EventDetails"
import PrivateRoute from "./PrivateRoute"
import LoginForm from "../components/LoginForm/LoginForm"
import EditEventForm from "../components/EditEventForm/EditEventForm"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/mycontacts" element={<ContactsListPage />} />
                <Route path="/events" element={<EventsListPage />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/event/:id/edit" element={<EditEventForm />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/assist" element={<AssistPage />} />
                <Route path="/helperprofile/:id" element={<HelperProfilePage />} />
            </Route>
            <Route path="*" element={<h1>ESTA PAGINA NO EXISTE</h1>} />

        </Routes>
    )
}
export default AppRoutes
