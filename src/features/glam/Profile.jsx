import React, {useEffect, useState} from 'react';
import './Profile.css';
import userImg from '../../img/user.jpg';
import { useDispatch, useSelector } from 'react-redux'
import { selectProfileIds, selectProfileById, uploadImg, save, saveToServer } from './profileSlice'

function readfile(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = function(evt) {
            const result = evt.target.result;
            resolve(result)
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function ImgGroup({myData}) {
    const dispatch = useDispatch()
    const handleAttachedFiles = async (e, i) => {
        if (e.target.files[0] !== undefined) {
            const fileBlob = await readfile(e.target.files[0]);
            dispatch(uploadImg({ id: myData.id, file: fileBlob, index: i }))
            e.target.value=null;
        }
    }
    const render = () => {
        const result = [];
        let index;
        for (let i = 0; i < 6; i++) {
        result.push(<div key={i} id="btnfile" className='profile-img' 
        onClick={() => {
        }}>
            { myData.imgs[i] &&
                <img className='profile-img-item' alt={{}} src={myData.imgs[i]}
                onClick={() => {
                    document.querySelector('#uploadfile').click()
                    index = i;
                }}
                >
                </img>
            }
            {
                ! myData.imgs[i] &&
                <img className='profile-img-item' alt={{}} src={userImg}
                onClick={() => {
                    document.querySelector('#uploadfile').click()
                    index = i;
                }}
                ></img>
            }
            <div className="wrapper">
                <input type="file" id="uploadfile" name="file" multiple 
                style={{display:'none'}} 
                onChange={(e) => {handleAttachedFiles(e, index)}}></input>
            </div>
        </div>);
    }
    return result;
    }
    return <div className='profile-img-group'  data-testid='btnfile'>
        { render() }
    </div>
}
const Profile = () => {
    const profileStatus = useSelector((state) => state.profile.status)
    const dispatch = useDispatch()
    
    const profileIds = useSelector(selectProfileIds)
    let srcData = useSelector((state) => selectProfileById(state, profileIds[0]))    
    let [myData, setNewMyData] = useState({});    
    const [address, setAddress] = useState("");

    useEffect(() => {
        setNewMyData(srcData)
    }, [profileStatus, dispatch])

    function changeAddress(event) {
        setAddress(event.target.value);
        setNewMyData({...myData,address:event.target.value})
        console.log(myData, address, event.target.value);
        // myData.address = address;
    }
    function changeBody(event) {
        setNewMyData({...myData,body:event.target.value})
    }
    function changeCompany(event) {
        setNewMyData({...myData,company:event.target.value})
    }
    function changeJob(event) {
        setNewMyData({...myData,job:event.target.value})
    }
    function changeSchool(event) {
        setNewMyData({...myData,school:event.target.value})
    }
    function changeEducation(event) {
        setNewMyData({...myData,education:event.target.value})
    }
    function changePersonality(event) {
        setNewMyData({...myData,personality:event.target.value})
    }
    function changeReligion(event) {
        setNewMyData({...myData,religion:event.target.value})
    }
    function changeAlcohol(event) {
        setNewMyData({...myData,alcohol:event.target.value})
    }
    function changeSmoking(event) {
        setNewMyData({...myData,smoking:event.target.value})
    }
    function saveInfo() {
        dispatch(saveToServer({id: myData.id, myData: myData}));
        dispatch(save({id: myData.id, myData: myData}));
    }
    return (<div className='profile'> {myData && myData.id && <div>
        <ImgGroup myData={myData}></ImgGroup>
        <div className='profile-basic'>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    닉네임 
                </div>
                <div className='profile-basic-item'>
                    {myData.id}
                </div>
                <div className='profile-basic-item'>
                    성별
                </div>
                <div className='profile-basic-item'>
                    {myData.sex}
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    생일 
                </div>
                <div className='profile-basic-item'>
                    {myData.birth}
                </div>
                <div className='profile-basic-item'>
                    위치
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.address} onChange={changeAddress}></input>
                </div>
            </div>
        </div>
        <h3 className='profile-title'>소개</h3>
        <div className='profile-basic'>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    키
                </div>
                <div className='profile-basic-item'>
                    {myData.height}
                </div>
                <div className='profile-basic-item'>
                    체형
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.body} onChange={changeBody}></input>
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    직장
                </div>
                <div className='profile-basic-item'>
                <input type='text' className='profile-basic-item-input' value={myData.company} onChange={changeCompany}></input>
                </div>
                <div className='profile-basic-item'>
                    직업
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.job} onChange={changeJob}></input>
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    학교
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.school} onChange={changeSchool}></input>
                </div>
                <div className='profile-basic-item'>
                    학력
                </div>
                <div className='profile-basic-item'>
                <input type='text' className='profile-basic-item-input' value={myData.education} onChange={changeEducation}></input>
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    성격
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.personality} onChange={changePersonality}></input>
                </div>
                <div className='profile-basic-item'>
                    종교
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.religion} onChange={changeReligion}></input>
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    음주
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.alcohol} onChange={changeAlcohol}></input>
                </div>
                <div className='profile-basic-item'>
                    흡연
                </div>
                <div className='profile-basic-item'>
                    <input type='text' className='profile-basic-item-input' value={myData.smoking} onChange={changeSmoking}></input>
                </div>
            </div>
            <div className='profile-basic-wrap'>
                <div className='profile-basic-item'>
                    혈액형
                </div>
                <div className='profile-basic-item'>
                    {myData.blood}
                </div>
                <div className='profile-basic-item'>
                    인종
                </div>
                <div className='profile-basic-item'>
                    {myData.race}
                </div>
            </div>
        </div>
        <div className='profile-basic-center'>
            <button type='button' className='profile-basic-btn'
                onClick={saveInfo}
            >저장</button>
        </div>
        <h3 className='profile-title'>매력 포인트</h3>
        <div className='profile-basic'>
            {myData.charmingPoint.map((item,i) => {
                return <span key={i} className='profile-charming'>{item}</span>
            })}
        </div>
        <h3 className='profile-title'>관심사</h3>
        <div className='profile-basic'>
            {myData.interestedList.map((item,i) => {
                return <span key={i} className='profile-charming'>{item}</span>
            })}
        </div>
        <h3 className='profile-title'>라이프스타일</h3>
        <div className='profile-basic'>
            {myData.lifeStyleList.map((item,i) => {
                return <span key={i} className='profile-charming'>{item}</span>
            })}
        </div></div>}
    </div>)
}
export default Profile;