import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { useFeedLazyQuery } from '../generated/graphql'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Home = () => {
  const [hasMore, setHasMore] = useState(true)
  const [offSet, setOffSet] = useState(0)
  const [feed, setFeed] = useState<any[]>([])
  const [getFeed] = useFeedLazyQuery()

  const fetchMore = async () => {
    const take = 20
    const { data } = await getFeed({ variables: { offset: offSet, take }})
    if (data?.feed) {
      setFeed([...feed, ...data?.feed])
    }
    setOffSet(offSet + take)
  }

  return (
    <div className="home-container">
      <Navigation />
      <div className="lits-container">
        <InfiniteScroll 
          dataLength={feed.length}
          hasMore={hasMore}
          next={fetchMore}
          loader={<div className="loading">Loading...</div>}
          scrollableTarget='lits-container'
          endMessage={<div className="empty">No more lits to show</div>}
        >
          {feed.map((lit, i) => 
            <Lit 
            image={/* TODO: add image*/ ''}
            username={lit.username}
            text={lit.content}
            createdAt={lit.createdAt}
            userid={lit.user_id}
            key={i}
            />
          )}
        </InfiniteScroll>
        </div>
    </div>
  )
}
