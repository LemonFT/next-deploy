'use client'
import { _SideBarItem } from "@/models/interfaces/sidebarItem";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import styles from "../../styles/components/sidebar.module.scss";
function SideBarItem(props: Readonly<_SideBarItem>) {
    const router = useRouter();
    const handleNavi = (path: string): void => {
        router.push(path)
    }
    return (
        <Tooltip>
            <button className={`${styles.link} ${props.active ? styles.active : ''}`} onClick={() => handleNavi(props.url)}>
                <span>{props.icon}</span>
                <span className={`${props.sideBarCollapse ? 'hidden' : ''}`}>{ props.name }</span>
            </button>
        </Tooltip>
    )
}

export default  SideBarItem;
