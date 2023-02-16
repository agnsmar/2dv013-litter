import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { Loading } from '../components/Loading'
import {
  FeedQueryResult,
  useAddLitMutation,
  useFeedLazyQuery,
  useMeQuery
} from '../generated/graphql'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

type TFeed = NonNullable<NonNullable<FeedQueryResult['data']>['feed']>

export const Home = () => {
  const { data: meData, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [feed, setFeed] = useState<TFeed>([])
  const [addLit] = useAddLitMutation()
  const [isCreatingLit, setIsCreatingLit] = useState(false)
  const [getFeed] = useFeedLazyQuery()
  const [litContent, setLitContent] = useState('')

  const fetchMore = async () => {
    const take = 20
    const { data } = await getFeed({ variables: { offset, take }, fetchPolicy: 'no-cache' })
    if (data && data.feed) {
      if (data?.feed?.length < take) {
        setHasMore(false)
      }
      setFeed([...feed, ...data.feed])
    }
    setOffset(offset + take)
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
    fetchMore()
  }, [])

  if (isMeLoading) {
    return <Loading />
  }

  return (
    <div className='home-container'>
      <Navigation />
      {meData?.me && (
        <form
          onSubmit={handleSubmit}
          className='create-lit-container'
        >
          <label
            className='lit-label'
            htmlFor='lit-input'
          >
            Make a lit
          </label>
          <input
            id='lit-input'
            name='lit-input'
            value={litContent}
            placeholder='Type something...'
            onChange={handleLitChange}
          />
          {isCreatingLit ? (
            <Loading />
          ) : (
            <button
              className='submit-button'
              type='submit'
            >
              Create lit
            </button>
          )}
        </form>
      )}
      {meData?.me ? (
        <div
          className='lits-container'
          id='scrollableDiv'
        >
          <InfiniteScroll
            dataLength={feed.length}
            hasMore={hasMore}
            next={fetchMore}
            loader={<Loading />}
            scrollableTarget='scrollableDiv'
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
        <div className='empty-feed-container'>
          <span>
            {' '}
            To view your feed please <Link to='/login'>login</Link>
          </span>{' '}
        </div>
      )}
    </div>
  )
}
