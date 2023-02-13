import { Navigation } from './Navigation'

export const Profile = () => {
  return ( 
    <>
    <Navigation />
    <div className="profile-container">
      <div className="info-container">
        <div className="image">
          <img src="../../public/litter.png" alt="profile"></img>
        </div>
        <div className="text-container">
          <p>Username</p>
          <p>Description</p>
        </div>
        <div className="followers-container">
          Followers
        </div>
      </div>
      <div className="lits-container">Lits</div>
    </div>
    </>
  )
}
