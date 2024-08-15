import DefaultLayout from '@/layouts/DefaultLayout';
import styles from '../../../styles/pages/classes.module.scss';
function ClassPage() {
    return (
        <DefaultLayout>
            <div className={`${styles.home} w-full h-full min-h-[100vh]`}>
                {/* HomePage */}
            </div>
        </DefaultLayout>
    );
}

export default ClassPage;