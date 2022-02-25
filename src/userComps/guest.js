import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section>
            <h1>Guests Page</h1>
            <br />
            <p>You must have been assigned an Guest role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin