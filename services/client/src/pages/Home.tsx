import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'

const litter = '../../public/litter.png'
// TODO: hämta followers lits

export const Home = () => {
  return (
    <div className="home-container">
      <Navigation/>
      <div className="lits-container">
          {/* TODO: lits.map */}
          <Lit isLiked={false} image={litter} username="testuser" text="text1"/>
          <Lit isLiked={true} image={litter} username="testuser" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!" />
        </div>
    </div>
  )
}
