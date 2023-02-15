import { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { useParams } from 'react-router-dom'
import { useCheckFollowingQuery, useFollowMutation, useMeQuery, useProfileQuery, useUnfollowMutation } from '../generated/graphql'

export const Profile = () => {
  const { data: onlineUser, loading: isMeLoading } = useMeQuery({ fetchPolicy: 'no-cache'})
  const [isLoading, setLoading] = useState(false)
  let { id } = useParams() 

  if (!id) {
    id = ''
  }
  const { data: profile, loading: isProfileLoading } = useProfileQuery({ variables: { userid: id }})
  const [follow] = useFollowMutation()
  const [unfollow] = useUnfollowMutation()
  const { data: followingData, loading: isFollowingLoading } = useCheckFollowingQuery({ variables: { followeeId: id }})
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    followingData?.checkFollowing && setIsFollowing(followingData.checkFollowing.isFollowing)
  }, [followingData])

  const handleFollow = async () => {
    setLoading(true)
    if (isFollowing) {
      const result = await unfollow({ variables: { followeeId: id  || '' }})
      if (result.data?.unfollow.success) {
        setIsFollowing(false)
      }
    } else {
      const result = await follow({ variables: { followeeId: id  || '' }})
      if (result.data?.follow.success) {
        setIsFollowing(true)
      }
    }
    setLoading(false)
  }

  if (isMeLoading || isProfileLoading || isFollowingLoading) {
    return <div className="loading">Loading...</div>
  } 
  
  if (!profile || !followingData || !onlineUser) {
    return <div>Something went wrong...</div>
  }
  return ( 
    <div className="home-container">
      <Navigation/>
      <div className="profile-container">
        <div className="info-container">
          <div className="profile-image">
            <img src={profile?.profile?.profile?.avatar} alt="profile"/>
          </div>
          <div className="profile-info-container">
            <p className="username">{profile?.profile?.profile?.username}</p>
            <div className="follow">
              {onlineUser.me?.id?.toString() === id ? '' : 
                isLoading ? <div className="loading">Loading...</div> :
                <button 
                  className="follow-button"
                  onClick={() => handleFollow()}
                > 
                {isFollowing ? 'following' : 'follow' }
                </button>}
            </div>
            <div className="profile-info">
              <div className="lits-nmr">
                <p>{profile.profile?.profile?.lits ? profile.profile?.profile?.lits.length : 0 } lits</p>
              </div>
              <div className="followers">
                <p>{followingData.checkFollowing?.followerCount} followers</p>
              </div>
            </div>
            <div className="text-container">{profile.profile?.profile?.content}</div>
          </div>
        </div>
        <div className="lits-container">
          {profile.profile?.profile?.lits && profile.profile?.profile?.lits.map((lit, i) => 
            <Lit 
              image={profile?.profile?.profile?.avatar || ''}
              username={profile?.profile?.profile?.username || ''}
              text={lit?.content || ''}
              createdAt={lit?.createdAt || ''}
              userid={id || ''}
              key={i}
            />)}
        </div>
      </div>
    </div>
    
  )
}
