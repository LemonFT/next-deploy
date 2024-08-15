import { Electron } from '@/assets/images/svg';
import { loginApi } from '@/server/auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import '../../../../../styles/global/noScroll.scss';
import styles from '../../../../../styles/pages/auth.module.scss';
function LoginPage() {
    const t = useTranslations('Auth');
    return (<div className={`${styles.login} h-full w-full`}>
        <div className={`${styles.formLogin} w-full h-4/5 flex justify-center items-center mt-[30px]`}>
            <form action={loginApi} className={`h-full flex flex-col items-center gap-[20px] backdrop-blur-[5px] rounded-[10px] py-[50px] px-[100px]`}>
                <div className={`${styles.logoImage} flex flex-col gap-2 justify-center items-center mb-[50px]`}>
                    <Electron props={'text-[60px]'} />
                </div>
                <div className={`username`}>
                    <input
                        className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none px-[20px] text-font-primary`}
                        type="text"
                        name='identifier'
                        placeholder={t('studentCode')}
                    />
                </div>
                <div className={`password`}>
                    <input
                        className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none px-[20px] text-font-primary`}
                        type="password"
                        name='password'
                        placeholder={t('password')}
                    />
                </div>
                <div className={`${styles.forgot} w-full flex justify-end`}>
                    <Link href={"/forgot-password"}>
                        <span className="forgotNavi text-[14px] underline text-font-thin">{t('forgotPassword')}</span>
                    </Link>
                </div>
                <div className={`${styles.btnLogin} submit w-[350px] flex justify-center items-center`}>
                    <button className="btn btn-primary w-full mt-[50px]">{t('login')}</button>
                </div>
            </form>
        </div>
    </div>);
}

export default LoginPage;