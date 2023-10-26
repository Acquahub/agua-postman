import styles from "./contextMenu.module.css"

export default function ContextMenu({ options, position, onClose }) {
    const handleOptionClick = (option) => {
        if(option.name === 'Delete') {
            handleDeleteOption(option.id);
        }

        onClose();
    }

    const handleDeleteOption = (id) => {
        alert('Delete collection');
    }


    return (
        <div className={`${styles['wrapper']}`}  style={{ top: position.y, left: position.x }}>
            <div className={`${styles['content']}`}>
                <ul className={`${styles['menu']}`}>
                    {options.map(option => (
                        <li key={option.id} className={`${styles['item']}`} onClick={() => handleOptionClick(option)} click={() => onClose()}>
                            <span>{option.name}</span>
                        </li>
                    ) )}
                </ul>
            </div>
        </div>
    );
}