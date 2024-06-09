
import { FC } from "react"
import { toast } from "react-toastify";

const Home: FC = () => {
    const notify = () => toast.success("Wow so easy!", { style: { background: '#2a2a2a', borderWidth: 1, borderColor: '#FFF', boxShadow: '0px 0px 30px 0px rgba(255,94,0,0.3)' } });


    return (
        <div>
            <button onClick={notify}
                className="bg-primary p-2">Call Toast</button>
        </div>
    )
}

export default Home