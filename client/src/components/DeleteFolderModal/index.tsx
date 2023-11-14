import './style.css';

interface IProps {
    onClickClose(): void;
    onSubmitDeleteFolder(): void;
}

const DeleteFolderModal = (props: IProps) => {
    const onClickSubmit = () => {
        props.onSubmitDeleteFolder();
        props.onClickClose();
    }
    return (
        <div className={'delete-folder-modal__container'} onClick={props.onClickClose}>
            <div className={'delete-folder-modal__content'} onClick={(e) => e.stopPropagation()}>
                <label className={'delete-folder-modal__content-label'}>Delete folder</label>
                <p className={'delete-folder-modal__content-value'}>Are you sure that you want to delete the current folder. This action will not be reversible</p>
                <button onClick={onClickSubmit}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteFolderModal;