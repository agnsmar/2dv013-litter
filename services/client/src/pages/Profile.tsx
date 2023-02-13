import { Navigation } from './Navigation'

export const Profile = () => {
  return ( 
    <div className="home-container">
      <Navigation />
      <div className="profile-container">
        <div className="info-container">
          <div className="profile-image">
            <img src="../../public/litter.png" alt="profile"/>
          </div>
          <div className="profile-info">
            Profile
          </div>
        </div>
        <div className="lits-container">
          Lits
        </div>
        {/* <div className="info-container">
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
        <div className="lits-container">Lits</div> */}
      </div>
    </div>
  )
}
