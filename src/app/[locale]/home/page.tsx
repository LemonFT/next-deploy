import DefaultLayout from '@/layouts/DefaultLayout';
import styles from '../../../styles/pages/home.module.scss';

export default function Home() {
    return (
        <DefaultLayout>
            <div className={`${styles.home} bg-orange-300 w-full h-full min-h-[100vh]`}>
                HomePage
            </div>
        </DefaultLayout>
    );
}
