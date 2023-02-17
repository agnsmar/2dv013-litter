import { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { Loading } from '../components/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import {
  LitsQueryResult,
  useFollowMutation,
  useIsFollowingQuery,
  useLitsLazyQuery,
  useMeQuery,
  useProfileQuery,
  useUnfollowMutation
} from '../generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'

type TLits = NonNullable<NonNullable<NonNullable<LitsQueryResult['data']>['lits']>['data']>

export const Profile = () => {
  const navigate = useNavigate()
  const { data: onlineUser, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  let { id } = useParams()

  if (!id) {
    id = ''
  }
  const {
    data: profileData,
    loading: isProfileLoading,
    error
  } = useProfileQuery({ variables: { userid: id }, fetchPolicy: 'no-cache' })
  const [getLits] = useLitsLazyQuery()
  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()
  const { data: isFollowingData, loading: isFollowingLoading } = useIsFollowingQuery({
    variables: { userid: id }
  })
  const [lits, setLits] = useState<TLits>([])
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)

  const fetchMore = async () => {
    const take = 20
    const { data } = await getLits({
      variables: { offset, take, userid: id ?? '' },
      fetchPolicy: 'no-cache'
    })
    if (data && data.lits.data) {
      if (data.lits.data.length < take) {
        setHasMore(false)
      }
      setLits([...lits, ...data.lits.data])
    }
    setOffset(offset + take)
  }

  useEffect(() => {
    isFollowingData && setIsFollowing(isFollowingData.isFollowing)
    if (!isFetched) {
      fetchMore()
      setIsFetched(true)
    }
  }, [isFollowingData, isFetched])

  const handleFollow = async () => {
    setIsLoading(true)
    if (isFollowing) {
      const result = await unfollow({
        variables: { followeeId: id || '' }
      })
      if (result.data?.unfollow.success) {
        setIsFollowing(false)
      }
    } else {
      const result = await follow({
        variables: { followeeId: id || '' }
      })
      if (result.data?.follow.success) {
        setIsFollowing(true)
      }
    }
    setIsLoading(false)
  }

  if (isMeLoading || isProfileLoading || isFollowingLoading) {
    return <Loading />
  }

  if (error) {
    navigate('/error-404')
  }

  return (
    <div className='home-container'>
      <Navigation />
      <div className='profile-container'>
        <div className='info-container'>
          <div className='profile-image'>
            <img
              src={profileData?.profile?.data?.avatar}
              alt='profile'
            />
          </div>
          <div className='profile-info-container'>
            <p className='username'>{profileData?.profile?.data?.username}</p>
            {onlineUser?.me?.id === parseInt(id) || !onlineUser?.me ? (
              <></>
            ) : (
              <div className='follow'>
                {isLoading ? (
                  <Loading />
                ) : (
                  <button
                    className='follow-button'
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'following' : 'follow'}
                  </button>
                )}
              </div>
            )}
            <div className='profile-info'></div>
            <div className='text-container'>{profileData?.profile?.data?.content}</div>
          </div>
        </div>
        <div
          className='lits-container'
          id='scrollableDiv'
        >
          <InfiniteScroll
            dataLength={lits.length}
            hasMore={hasMore}
            next={fetchMore}
            loader={<Loading />}
            scrollableTarget='scrollableDiv'
            endMessage={<div className='empty'>No more lits to show</div>}
          >
            {lits.map((lit, i) => (
              <Lit
                image={profileData?.profile.data?.avatar || ''}
                username={profileData?.profile?.data?.username || ''}
                text={lit?.content || ''}
                createdAt={lit?.created_at || ''}
                userid={id || ''}
                key={i}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
