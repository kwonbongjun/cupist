import React, {useEffect} from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faHeart, faComment, faUser, faTimes, faStar} from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import { selectProfileIds, selectProfileById, decision, decisionUser } from './profileSlice'

import {  fetchUsers, selectUserIds, selectUserById, like, likeUser } from './userSlice'

const People = ({ userId }) => {
    const profileIds = useSelector(selectProfileIds)
    const dispatch = useDispatch()
    const clickLike = (person, profileId ) => {
        dispatch(likeUser({ destId: person.id, srcId: profileId }))
        dispatch(decisionUser({ destId: person.id, srcId: profileId }))
        dispatch(like({ destId: person.id, srcId: profileId }))
        dispatch(decision({ destId: person.id, srcId: profileId }))
    }
    const cancel = (person, profileId ) => {
        dispatch(decisionUser({ destId: person.id, srcId: profileId }))
        dispatch(decision({ destId: person.id, srcId: profileId }))
    }
    const item = useSelector((state) => selectUserById(state, userId))
    return <div key={item.id}
      className='main-container-img-wrap' 
      style={{backgroundImage: `url(${item.img})`, 
      backgroundRepeat: 'no-repeat',
      height: 'calc(100% - 20px)',
      width: 'calc(50% - 20px)',
      margin: '10px 10px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
     }}
    >
    <div className='person-img-header'>
        <div className='person-img-header-bar'></div>
    </div>
    <div className='person-img-container'>
        <div className='person-info'>
            {item.id},{item.age} 
        </div>
        <div className='person-info'>
            {item.introduce}
        </div>
        <div className='person-img-container-btns'>
            <button type='button' 
                className='person-img-container-btn-left'
                onClick={() => cancel(item, profileIds[0])}
            >
                <FontAwesomeIcon size="lg" icon={faTimes} />
            </button>
            <button type='button' 
                className='person-img-container-btn-center'
                onClick={() => clickLike(item, profileIds[0])}>
                좋아요
            </button>
            <button type='button' className='person-img-container-btn-right'>
            <FontAwesomeIcon size="lg" icon={faStar} />
            </button>
        </div>
    </div>
    <div className='person-img-footer'></div>
    </div>
  };

const Main = () => {
    const userStatus = useSelector((state) => state.user.status)
    const profileIds = useSelector(selectProfileIds)
    const profile = useSelector((state) => selectProfileById(state, profileIds[0]))
    const dispatch = useDispatch()
    useEffect(() => {
        if (userStatus === 'idle') {
          dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])
    const userIds = useSelector(selectUserIds)
        return <div className='main'>
            <div className='main-header'>
                <ul className='main-nav-ul'>
                    <li className='main-nav-li main-nav-selected'>glam</li>
                    <li className='main-nav-li'>라이브</li>
                    <li className='main-nav-li'>근처</li>
                </ul>
            </div>
            <div className='main-container'>
            {profile && userIds.map((userId) => (
            ! profile.decisionObj[userId] && <People key={userId} userId={userId} />
            ))}
            </div>
            <div className='main-footer'>
                <div className='main-footer-menu'>
                    <FontAwesomeIcon size="lg" icon={faHome} />
                </div>
                <div className='main-footer-menu'>
                    <FontAwesomeIcon size="lg" icon={faThLarge} />
                </div>
                <div className='main-footer-menu'>
                    <FontAwesomeIcon size="lg" icon={faHeart} />
                </div>
                <div className='main-footer-menu'>
                    <FontAwesomeIcon size="lg" icon={faComment} />
                </div>
                <div className='main-footer-menu'>
                    <FontAwesomeIcon size="lg" icon={faUser} />
                </div>
            </div>
        </div>
}
export default Main;