import Navbar from "../components/Navbar"
import { useNavbar } from "../utils/navbar-context"

const BoothLocation = () => {
    const { isOpen } = useNavbar();
    return (
        <div className="BoothLocation">
            <Navbar />
            <div className={`transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                <div className="pageTitleLeft">
                    <p className="mb-1">영암체전</p>
                    <p>부스배치도</p>
                </div>
            </div>
        </div>
    )
}

export default BoothLocation