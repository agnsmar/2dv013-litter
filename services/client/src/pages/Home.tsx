import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import {
  FeedQueryResult,
  ProfileDocument,
  useAddLitMutation,
  useFeedLazyQuery,
  useFeedQuery,
  useMeQuery
} from '../generated/graphql'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

type TFeed = NonNullable<NonNullable<FeedQueryResult['data']>['feed']>

export const Home = () => {
  const { data: meData, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [feed, setFeed] = useState<TFeed>([])
  const [addLit] = useAddLitMutation()
  const [isCreatingLit, setIsCreatingLit] = useState(false)
  const { data: feedData, loading: isFeedLoading } = useFeedQuery({
    variables: { offset, take: 20 }
  })
  const [getFeed] = useFeedLazyQuery()
  const [litContent, setLitContent] = useState('')

  const fetchMore = async () => {
    const take = 20
    setOffset(offset + take)
    const { data } = await getFeed({ variables: { offset, take } })
    if (data && data.feed) {
      if (data?.feed?.length < take) {
        setHasMore(false)
      }
      setFeed([...feed, ...data.feed])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreatingLit(true)
    await addLit({ variables: { content: litContent } })
    setIsCreatingLit(false)
    setLitContent('')
  }

  const handleLitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLitLength = 14
    if (litContent.length >= maxLitLength) {
      return
    }
    setLitContent(e.currentTarget.value)
  }

  useEffect(() => {
    if (feedData && feedData.feed) {
      setFeed([...feedData.feed])
    }
  }, [isFeedLoading, feedData])

  if (isMeLoading || isFeedLoading) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='home-container'>
      <Navigation />
      {meData?.me && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='lit-input'>Make a lit</label>
          <input
            id='lit-input'
            name='lit-input'
            value={litContent}
            onChange={handleLitChange}
          />
          {isCreatingLit ? (
            <div className='loading'>Loading...</div>
          ) : (
            <button type='submit'>Lit</button>
          )}
        </form>
      )}
      {meData?.me ? (
        <div className='lits-container'>
          <InfiniteScroll
            dataLength={feed.length}
            hasMore={hasMore}
            next={fetchMore}
            loader={<div className='loading'>Loading...</div>}
            scrollableTarget='lits-container'
            endMessage={<div className='empty'>No more lits to show</div>}
          >
            {feed.map((lit, i) => {
              return lit ? (
                <Lit
                  image={/* TODO: add image*/ ''}
                  username={lit.username}
                  text={lit.content}
                  createdAt={lit.created_at}
                  userid={lit.user_id.toString()}
                  key={i}
                />
              ) : (
                <></>
              )
            })}
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          <span>
            {' '}
            To view your feed please <a href='/login'>login</a>
          </span>{' '}
        </div>
      )}
    </div>
  )
}
