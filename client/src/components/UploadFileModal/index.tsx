import './style.css';
import { useForm } from 'react-hook-form';

interface IProps {
    onClickClose(): void;
    onSubmitUploadFile(localPath: string, fileName: string): void;
}

type FormData = {
    name: string;
    path: string;
}

const UploadFileModal = (props: IProps) => {
    const {
        register,
        handleSubmit
    } = useForm<FormData>();

    const onClickSubmit = (data: FormData) => {
        const localPath = data.path;
        const fileName = data.name;
        props.onSubmitUploadFile(localPath, fileName);
        props.onClickClose();
    }

    return (
        <div className={'connection-modal__container'} onClick={props.onClickClose}>
            <div className={'connection-modal__content'} onClick={(e) => e.stopPropagation()}>
                <form className={'connection-modal__content-form'} onSubmit={handleSubmit(onClickSubmit)}>
                    <label className={'connection-modal__content-form-header'}>Upload File</label>
                    <label className={'connection-modal__content-form-label'}>File name:</label>
                    <input {...register('name')} type={'text'} name={'name'} placeholder='Type the file path'/>
                    <label className={'connection-modal__content-form-label'}>File to upload:</label>
                    <input {...register('path')} type={'text'} name={'path'} placeholder='Type the file path'/>
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadFileModal;