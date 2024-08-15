import { Checked } from '@/assets/images/svg';
import { _Alert } from '@/models/interfaces/alert';
import styles from '../styles/components/alert.module.scss';

const Alert: React.FC<_Alert> = ({ type = 'success', message, position = 'top-left', animation = 'left-to-right' }) => {
    return ( <div className={`${styles.alert} ${styles[type]} ${styles[position]} ${styles[animation]}
                 absolute backdrop-blur-[5px] text-white
                 min-w-[300px] min-h[100px] py-[15px] px-[50px]
                 flex justify-center items-center gap-[10px]
                 rounded-[10px] text-font-primary font-bold z-[1000] `} >
        <div className="icon absolute left-2 top-1/2 -translate-y-1/2">
            <Checked props={'text-white text-[25px]'} />
        </div>
        <div className={`${styles.message}`}>{message}</div>
    </div> );
}

export default Alert;