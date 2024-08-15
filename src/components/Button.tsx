"use client"
import { Loader } from "@/assets/images/svg";
import { useRouter } from "@/navigation";

interface PropsType {
    text?: string;
    icon?: React.ReactNode;
    className: string;
    link?: string;
    typeNavi?: number; // 1: push, 2: replace
    loading?: boolean;
    onclick?: () => void; 
}
const Button: React.FC<Readonly<PropsType>> = (props) => {
    const router = useRouter();
    return (
        <button
            type="button"
            className={`${props.className} flex justify-center items-center gap-[10px]`}
            onClick={() => {
                if (props?.onclick) {
                    props?.onclick()
                }
                if (props.typeNavi && props.link) {
                    props.typeNavi === 1 ? router.push(props.link) : router.replace(props.link);
                }
            }}
            style={{
                opacity: props.loading ? '.5' : '1',
                pointerEvents: props.loading ? 'none' : 'auto',
                userSelect: props.loading ? 'none' : 'auto',
            }}
        >
            {props.icon}
            {props.text}
            {props.loading && <Loader props={"text-[30px] text-white loader"} />}
        </button>
    );
}

export default Button;