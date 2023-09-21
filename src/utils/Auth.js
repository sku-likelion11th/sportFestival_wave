import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavbar } from './navbar-context';
import { images } from './images';

export const Callback = () => {
    const { isOpen } = useNavbar();
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');
    const err_msg = urlParams.get('error');
        if (token) {
            localStorage.setItem('token', token);
            // 로그인 전 조회하고 있던 페이지로 돌아가기
            window.location.href = localStorage.getItem('last')
        }
        console.log('에러메시지 출력 후 홈으로 돌아가는 버튼 출력');
        return (
            <>
                <Navbar/>
                <div className={`min-h-screen flex flex-col justify-center items-center transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                    <p>{err_msg}</p>
                    <button class="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={()=> window.location.href = '/'}>
                        홈으로
                    </button>
                </div>
            </>
        );
    };

export const getToken = () => localStorage.getItem('token');

export const authenticate = async (token) => {
    const authURL = 'http://127.0.0.1:8000/validation';
    try {
        if (token) {
            const response = await axios.get(authURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.validation === true;
        }
    } catch (error) {
        localStorage.removeItem('token')
        console.error(error);
    }
    return false;
};



const LoginBtn = () => {
    const Login = () => {
        localStorage.setItem('last', window.location.href)
        window.location.href = 'http://127.0.0.1:8000/login';
    }
    return (
        <button className="bg-white py-2 px-4 rounded border shadow" onClick={Login}>
            <div className="flex items-center">
                <img src={images.sungkyul} className='md:max-w-[375px] w-[45px] mr-3'/>
                <span className='NanumSquareEB text-black text-xl'>Login with Sungkyul</span>
            </div>
        </button>
      );
};

export default LoginBtn