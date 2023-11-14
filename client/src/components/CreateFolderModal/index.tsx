import { useForm } from 'react-hook-form';
import './style.css';

interface IProps {
    onClickClose(): void;
    onSubmitCreateFolder(name: string): void;
}

type FormData = {
    name: string;
}

const CreateFolderModal = (props: IProps) => {
    const {
        register,
        handleSubmit
    } = useForm<FormData>();

    const onSubmitCreate = (data: FormData) => {
        props.onSubmitCreateFolder(data.name);
        props.onClickClose();
    }
    return (
        <div className={'create-folder-modal__container'} onClick={props.onClickClose}>
            <div className={'create-folder-modal__content'} onClick={(e) => e.stopPropagation()}>
                <form className={'create-folder-modal__content-form'} onSubmit={handleSubmit(onSubmitCreate)}>
                    <label className={'create-folder-modal__content-form-header'}>Create folder</label>
                    <input {...register('name')} type={'text'} name={'name'} placeholder={'Type the folder name'} />
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateFolderModal;