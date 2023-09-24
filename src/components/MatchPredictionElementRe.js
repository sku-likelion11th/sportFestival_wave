import { images } from '../utils/images';
import PredictionChart from './PredictionChart';
import { useEffect, useState } from 'react';
import { authenticate } from '../utils/Auth';
import { getToken } from '../utils/Auth';

const MatchPredictionElement = ({ title, teamA, teamB }) => {
    const [result, setResult] = useState(null);

    const convertCategoryToEnglish = (category) => {
        switch (category) {
            case '축구':
                return 'soccer';
            case '농구':
                return 'basketball';
            case '손족구':
                return 'handball';
            case '발야구':
                return 'kickbaseball';
            case '족구':
                return 'football';
            case '피구':
                return 'dodgeball';
            default:
                return category;
        }
    };

    useEffect(() => {
        const result_state = async () => {
            const response = await authenticate(getToken()).get(`/user/game`);
            return response.data
        }
        result_state().then((res) => {
            setResult(res[title]);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const handleClickBtn = async (buttonIndex, title) => {
        const userConfirmed = window.confirm(`응모하시겠습니까?`);

        if (userConfirmed) {
            try {
                const englishCategory = convertCategoryToEnglish(title);
                const formData = {
                    "category": englishCategory, "predict": buttonIndex
                }
                const response = await authenticate(getToken()).post(`/user/game`, formData);

                if (!response.data) {
                    throw new Error(`오류 : ${response.status}`);
                }
                const res = response.data;
                const resultValue = await res[title];
                setResult(resultValue)
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
    }

    return (
        <div className='my-8'>
            <div className='text-center mb-5 text-2xl'>{title}</div>
            <div>
                <div>
                    <div className='predictTeam w-10/12 mx-auto flex justify-evenly items-center text-xl'>
                        <div className='flex justify-evenly'>
                            <img className='w-8' src={images[teamA]} alt="학과로고" />
                            <span className='ml-3'>{teamA}</span>
                        </div>

                        <div>VS</div>

                        <div className='flex justify-evenly'>
                            <span className='mr-3'>{teamB}</span>
                            <img className='w-8' src={images[teamB]} alt="" />
                        </div>
                    </div>
                </div>

                <div className='-my-5'>
                    <PredictionChart sport={title} result={result} />
                </div>

                <div className='letspredict flex justify-around NanumGothicEB mt-2'>
                    {result !== null ? (
                        <>
                            {result === 1 ?
                                (<>
                                    <div className='letspredictEnd swirl-in-fwd'><button>응모완료</button></div>
                                    <div className=''><button>응모완료</button></div>
                                </>) :
                                (<>
                                    <div className=''><button>응모완료</button></div>
                                    <div className='letspredictEnd swirl-in-fwd'><button>응모완료</button></div>
                                </>)
                            }
                        </>) :
                        (<>
                            <div><button onClick={() => handleClickBtn(1, title)}>응모하기</button></div>
                            <div><button onClick={() => handleClickBtn(0, title)}>응모하기</button></div>
                        </>)
                    }
                </div>
            </div >
        </div >
    )
}

export default MatchPredictionElement;