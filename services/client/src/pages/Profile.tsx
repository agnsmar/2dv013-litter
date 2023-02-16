import { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { Loading } from '../components/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useFollowMutation,
  useIsFollowingQuery,
  useMeQuery,
  useProfileQuery,
  useUnfollowMutation
} from '../generated/graphql'

export const Profile = () => {
  const navigate = useNavigate()
  const { data: onlineUser, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache' })
  const [isLoading, setIsLoading] = useState(false)
  let { id } = useParams()

  if (!id) {
    id = ''
  }
  const {
    data: profileData,
    loading: isProfileLoading,
    error
  } = useProfileQuery({ variables: { userid: id }, fetchPolicy: 'no-cache' })
  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()
  const {
    data: isFollowingData,
    loading: isFollowingLoading,
    refetch
  } = useIsFollowingQuery({
    variables: { userid: id }
  })
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    isFollowingData && setIsFollowing(isFollowingData.isFollowing)
  }, [isFollowingData])

  const handleFollow = async () => {
    setIsLoading(true)
    if (isFollowing) {
      const result = await unfollow({
        variables: { followeeId: id || '' }
      })
      if (result.data?.unfollow.success) {
        setIsFollowing(false)
        refetch({ userid: id })
      }
    } else {
      const result = await follow({
        variables: { followeeId: id || '' }
      })
      if (result.data?.follow.success) {
        setIsFollowing(true)
        refetch({ userid: id })
      }
    }
    setIsLoading(false)
  }

  if (isMeLoading || isProfileLoading || isFollowingLoading) {
    return  <Loading/>
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
              src={profileData?.profile?.profile?.avatar}
              alt='profile'
            />
          </div>
          <div className='profile-info-container'>
            <p className='username'>{profileData?.profile?.profile?.username}</p>
            {onlineUser?.me?.id === parseInt(id) || !onlineUser?.me ? (
              <></>
            ) : (
              <div className='follow'>
                {isLoading ? <Loading/> : (
                  <button
                    className='follow-button'
                    onClick={() => handleFollow()}
                  >
                    {isFollowing ? 'following' : 'follow'}
                  </button>
                )}
              </div>
            )}
            <div className='profile-info'>
              <div className='lits-nmr'>
                <p>
                  {profileData?.profile?.profile?.lits
                    ? profileData.profile?.profile?.lits.length
                    : 0}{' '}
                  lits
                </p>
              </div>
            </div>
            <div className='text-container'>{profileData?.profile?.profile?.content}</div>
          </div>
        </div>
        <div className='lits-container'>
          {profileData?.profile?.profile?.lits &&
            profileData?.profile?.profile?.lits.map((lit, i) => (
              <Lit
                image={profileData?.profile?.profile?.avatar || ''}
                username={profileData?.profile?.profile?.username || ''}
                text={lit?.content || ''}
                createdAt={lit?.created_at || ''}
                userid={id || ''}
                key={i}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
