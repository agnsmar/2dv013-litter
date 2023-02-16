import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.css'
 
export const Loading = () => {
    return (
        <div className="loading">
            <Spinner animation="grow">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
   