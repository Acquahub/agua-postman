import styles from "./contextMenu.module.css"

export default function ContextMenu({ options }) {

    return (
        <div className={`${styles['wrapper']}`}>
            <div className={`${styles['content']}`}>
                <ul className={`${styles['menu']}`}>
                    {options.map(option => (
                        <li className={`${styles['item']}`}>
                            <span>{option.name}</span>
                        </li>
                    ) )}
                </ul>
            </div>
        </div>
    );
}