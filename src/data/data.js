import kihoon from '../img/성기훈.jpg'
import minyu from '../img/한미녀.jpg'
import jiyeong from '../img/지영.jpg'
import sebyuk from '../img/강새벽.jpg'
const data = [
    {
        name: '강새벽',
        img: sebyuk,
        id: 'sebyeok',
        age: 25,
        job: 'none',
        address: '서울 성북',
        height: '180cm',
        education: '고졸',
        introduce: '안녕하세요',
        acceptList: []
    },
    {
        name: '지영',
        img: jiyeong,
        id: 'jiyeong',
        age: 24,
        job: 'none',
        address: '서울 강동',
        height: '165cm',
        education: '고졸',
        introduce: '안녕하세요',
        acceptList: []
    },
    {
        name: '한미녀',
        img: minyu,
        id: 'sebyeok3',
        age: 38,
        job: 'none',
        address: '서울 용산',
        height: '160cm',
        education: '고졸',
        introduce: '안녕하세요',
        acceptList: []
    }
]
export const myData = {
    name: '성기훈',
    imgs: [kihoon, kihoon, kihoon, kihoon],
    id: 'kihoon456',
    age: 40,
    job: '준비 중',
    address: '쌍문동',
    height: '180cm',
    education: '고졸',
    introduce: '안녕하세요',
    sex: '남성',
    birth: '1971-01-01',
    body: '보통',
    company: undefined,
    school: undefined,
    personality: undefined,
    religion: '없음',
    alcohol: '가끔',
    smoking: '가끔',
    blood: undefined,
    race: undefined,
    charmingPoint: ['다정해요', '배려심이 깊어요',],
    interestedList: ['도박'],
    lifeStyleList: ['가족과 함께 살아요'],
    decisionObj: {a:1},
    acceptList: [{
        id: 'sebyeok',
        type: 'like',
        msg: '',
    }]
};
export default data;