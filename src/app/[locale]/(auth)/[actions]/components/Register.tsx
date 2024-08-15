'use client'
import { Electron, Loader } from '@/assets/images/svg';
import Button from '@/components/Button';
import { showAlert } from '@/helpers/interfaces';
import { validateEmail, validateOptEmail } from '@/helpers/logic';
import type { GetProp } from 'antd';
import { Flex, Input, Typography } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';
import '../../../../../styles/global/noScroll.scss';
import styles from '../../../../../styles/pages/auth.module.scss';
const { Title } = Typography;
function RegisterPage() {
    const t = useTranslations("Auth");
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const emailRef = useRef<HTMLInputElement>(null);
    const [codeVerify, setCodeVerify] = useState<string>('-')
    const [disableCodeVerify, setDisableCodeVerify] = useState<boolean>(true);
    const [waitGetCodeVerify, setWaitGetCodeVerify] = useState<boolean>(false);
    const [waitCheckCodeVerify, setWaitCheckCodeVerify] = useState<boolean>(false);
    //UI
    const handleFocusEmail = () => {
        emailRef?.current?.focus()
    }
    const handleFocusCodeVerify = () => {
        const inputElement = document.querySelector('.ant-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }
    const openCodeVerify = (): void => {
        setCodeVerify('')
        setDisableCodeVerify(false)
        handleFocusCodeVerify()
    }
    const closeCodeVerify = (): void => {
        setCodeVerify('-')
        setDisableCodeVerify(true)
    }
    const handleEmailUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        if (!disableCodeVerify) {
            closeCodeVerify()
        }
        if (step !== 1) {
            setStep(1)
        }
    }
    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (otp) => {
        setCodeVerify(otp)
    };
    const sharedProps: OTPProps = {
        onChange,
    };


    //LOGIC
    const handleGetCode = (): void => {
        if(validateEmail(email)){
            setWaitGetCodeVerify(true)
            setTimeout(() => {
                setWaitGetCodeVerify(false)
                openCodeVerify()
                setStep(2)
            }, 2000)
        }else{
            showAlert({
                type: 'warning',
                message: 'Email không đúng định dạng',
                position: 'top-right',
                animation: 'right-to-left'
            })
        }
    }

    const handleVerifycationEmail = (otp: string) => {
        setWaitCheckCodeVerify(true)
        setDisableCodeVerify(true)
        if (validateOptEmail(otp)) {
            setTimeout(() => {
                setDisableCodeVerify(false)
                setWaitCheckCodeVerify(false)
            }, 2000);
        } else {
            showAlert({
                type: 'warning',
                message: 'Mã xác thực của bạn không chính xác',
                position: 'top-right',
                animation: 'right-to-left'
            })
            setDisableCodeVerify(false)
            setWaitCheckCodeVerify(false)
        }
        
    }

    // Mounted
    useEffect(() => {
        handleFocusEmail()
    }, [])


    return (
        <div className={`${styles.formRegister} w-full h-4/5 flex justify-center items-center mt-[30px]`}>
            <form className={`h-full flex flex-col items-center gap-[25px] backdrop-blur-[5px] rounded-[10px] py-[50px] px-[100px]`}>
                <div className={`${styles.logoImage} flex flex-col gap-2 justify-center items-center mb-[50px]`}>
                    <Electron props={'text-[60px]'} />
                </div>
                {(step === 1 || step === 2) &&
                    <>
                        <div className={`email w-[350px] relative flex justify-center items-center`}>
                            <input
                                ref={emailRef}
                                className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none pl-[20px] pr-[60px] text-font-primary`}
                                type="email"
                                placeholder='Email'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleGetCode()
                                    }
                                }}
                                value={email}
                                onChange={(event) => handleEmailUpdate(event)}
                                onFocus={() => closeCodeVerify()}
                            />
                            {waitGetCodeVerify && <Loader props={"text-[30px] absolute right-[10px] text-black loader"} />}
                        </div>

                        <Flex style={{
                            opacity: disableCodeVerify ? '.5' : '1',
                            pointerEvents: disableCodeVerify ? 'none' : 'auto',
                            userSelect: disableCodeVerify ? 'none' : 'auto',
                            width: '100%',
                            justifyContent: 'space-between'
                        }}
                            vertical
                        >
                            <Title style={{
                                fontFamily: "'Courier New', Courier, monospace",
                                textAlign: 'center',
                                width: '100%',
                            }} level={5}>{t('requestEnterCode')}</Title>
                            <Input.OTP
                                value={codeVerify}
                                style={{ height: '46px' }}
                                formatter={(str) => str.toUpperCase()}
                                {...sharedProps}
                            />
                        </Flex>
                        {
                            step === 1 &&
                            <div className={`${styles.btnRegister} submit w-[350px] flex justify-center`}>
                                <Button
                                    text={t('getCode')}
                                    className="btn btn-primary w-full mt-[50px]"
                                    loading={waitGetCodeVerify}
                                    onclick={handleGetCode}
                                />
                            </div>
                        }
                        {
                            step === 2 &&
                            <div className={`${styles.btnRegister} submit w-[350px] flex justify-center items-center`}>
                                <Button
                                    text={t('verify')}
                                    className="btn btn-primary w-full mt-[50px]"
                                    loading={waitCheckCodeVerify}
                                    onclick={() => { handleVerifycationEmail(codeVerify) }}
                                />
                            </div>
                        }
                    </>
                }
            </form>
        </div>
   );
}

export default RegisterPage;