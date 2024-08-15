import Button from "@/components/Button";
import { redirect } from "@/navigation";
import { useTranslations } from "next-intl";
import styles from "../../../../styles/pages/auth.module.scss";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Settings from "./components/Settings";
function Auth(props: any) {
    const t = useTranslations('Auth');
    if (props?.params?.actions !== 'login' && props?.params?.actions !== 'register') {
        redirect('/')
    }
    return (
        <div className={`${styles.auth} h-full w-full`}>
            <div className={`${styles.header} w-full h-[80px] flex justify-end flex-wrap px-[30px] overflow-hidden`}>
                <div className="groupButton w-full flex justify-end items-center">
                    <Button link='/login' text={t('login')} className='btn-primary w-[150px]' typeNavi={2} />
                    <Button link='/register' text={t('register')} className='btn-normal w-[150px]' typeNavi={2} />
                    <Settings />
                </div>
            </div>
            {
                props?.params?.actions === 'login' &&
                <LoginPage />
            }
            {
                props?.params?.actions === 'register' &&
                <RegisterPage />
            }
        </div>
    );
}

export default Auth;