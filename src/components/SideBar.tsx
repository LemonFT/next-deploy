'use client'
import { ChartIcon, ChatIcon, DarkIcon, DashboardIcon, Electron, LightIcon, SettingsIcon, TranslateIcon, UsersIcon } from "@/assets/images/svg";
import { showModal } from "@/helpers/interfaces";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { changeTheme } from "@/stores/slices/themeSlice";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/components/sidebar.module.scss";
import SideBarItem from "./components/SideBarItem";
function SideBar() {
    const currentLanguage = useLocale();
    const currentPath = usePathname();
    const router = useRouter();
    const t = useTranslations("Sidebar");
    const [linkActive, setLinkActive] = useState<number>(1)
    const [sideBarCollapse, setSideBarCollapse] = useState('show')
    const pathname = usePathname()
    const theme = useAppSelector((state) => state.theme.name);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pathname === "/home") {
            setLinkActive(1)
        } else if (pathname === "/classes") {
            setLinkActive(2)
        } else if (pathname === "/statistics") {
            setLinkActive(3)
        } else if (pathname === "/chat") {
            setLinkActive(4)
        } else if (pathname === "/settings") {
            setLinkActive(5)
        }
    }, [linkActive, pathname])

    const handleChangeTheme = (themeSelected: 'light' | 'dark') => {
        dispatch(changeTheme({ name: themeSelected }))
    }

    const handleLanguageChange = () => {
        showModal({
            icon: <TranslateIcon props={'text-[30px]'} />,
            title: `${t('you_want_to_switch_to')} ${currentLanguage === 'vi' ? t('english') : t('vietnamese')}?`,
            textSelectedOne: t('close'),
            textSelectedTwo: `${t('switching_to')} ${currentLanguage === 'vi' ? t('english') : t('vietnamese')}`,
            onSelectedTwo: () => {
                if(currentPath.includes('/vi/')){
                    const newPath = currentPath.replace('/vi/', `/en/`);
                    router.replace(newPath);
                }else {
                    const newPath = currentPath.replace('/en/', '/vi/');
                    router.replace(newPath);
                }
            }
        })
    }

    const handleUpdateStatusActive = (): void => {
        setSideBarCollapse(sideBarCollapse === 'show' ? 'hide' : 'show')
    }

    return (<div className={
        `${styles.sidebar} ${sideBarCollapse === 'hide' ? 'w-[180px]' : 'w-[250px]'} 
        ${theme === 'light' ? styles.lightTheme : styles.darkTheme}
        ${sideBarCollapse === 'hide' ? styles.tabHide : styles.tabShow}
        relative left-0 top-0 w-[250px] min-h-full flex justify-start items-start overflow-hidden`
    }>
        <div className={`${styles.tabActive}  relative flex flex-col items-center justify-center gap-[50px] min-w-[70px] min-h-full py-[20px]`}>
            <button className={`${styles.logo} absolute !w-[70px] text-center flex justify-center top-[10px]`} onClick={() => handleUpdateStatusActive()}>
                <Electron props={'text-[45px] text-white cursor-pointer'} />
            </button>
            <div className={`${styles.themes} flex flex-col gap-[20px]`}>
                <button className={`${styles.theme} ${styles.light} ${theme === 'light' ? styles.focusTheme : ''}`} onClick={() => { handleChangeTheme('light') }}>
                    <LightIcon props={'text-[30px] text-white'} />
                </button>
                <button className={`${styles.theme} ${styles.dark} ${theme === 'dark' ? styles.focusTheme : ''}`} onClick={() => { handleChangeTheme('dark') }}>
                    <DarkIcon props={'text-[30px]'} />
                </button>
            </div>
            <button className={`${styles.languages} absolute bottom-[100px] z-10`} onClick={handleLanguageChange}>
                <TranslateIcon props={'text-[30px]'} />
                <span className="uppercase absolute bottom-[-25px] text-[16px] text-font-primary">{currentLanguage}</span>
            </button>
        </div>
        <div className={`${styles.navLinks} flex flex-1 flex-col justify-center items-center gap-[20px] min-h-full`}>
            <div className={`${styles.title} !w-full !h-[50px] flex justify-center items-center gap-[10px]`}>
                <h3>Explore</h3>
            </div>
            <SideBarItem 
                key={1}
                active={linkActive === 1}
                icon={<DashboardIcon props={'text-[30px]'} />}
                name={t('home')}
                sideBarCollapse={sideBarCollapse === 'hide'}
                url="/home"
            />
            <SideBarItem 
                key={2}
                active={linkActive === 2}
                icon={<UsersIcon props={'text-[30px]'} />}
                name={t('classes')}
                sideBarCollapse={sideBarCollapse === 'hide'}
                url="/classes"
            />
            <SideBarItem 
                key={3}
                active={linkActive === 3}
                icon={<ChartIcon props={'text-[30px]'} />}
                name={t('statistics')}
                sideBarCollapse={sideBarCollapse === 'hide'}
                url="/statistics"
            />
            <SideBarItem 
                key={4}
                active={linkActive === 4}
                icon={<ChatIcon props={'text-[30px]'} />}
                name={t('chat')}
                sideBarCollapse={sideBarCollapse === 'hide'}
                url="/chat"
            />
            <SideBarItem 
                key={5}
                active={linkActive === 5}
                icon={<SettingsIcon props={'text-[30px]'} />}
                name={t('settings')}
                sideBarCollapse={sideBarCollapse === 'hide'}
                url="/settings"
            />
        </div>
    </div>);
}

export default SideBar;