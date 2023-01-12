import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Link to='/login'>Login</Link>
    </div>
  )
}
