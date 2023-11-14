import './style.css';
import { OpenConnectionConfig } from '../../api/connection/types';
import { useForm } from 'react-hook-form';

interface IProps {
    onClickClose(): void;
    onClickOpenConnection(config: OpenConnectionConfig): void;
}

type FormData = {
    host: string;
    port: number;
    user: string;
    password: string;
}

const ConnectionModal = (props: IProps) => {
    const {
        register,
        handleSubmit
    } = useForm<FormData>();

    const onClickSubmit = (data: FormData) => {
        const config: OpenConnectionConfig = {
            host: data.host,
            port: data.port,
            user: data.user,
            password: data.password
        }

        props.onClickOpenConnection(config);
        props.onClickClose();
    }

    return (
        <div className={'connection-modal__container'} onClick={props.onClickClose}>
            <div className={'connection-modal__content'} onClick={(e) => e.stopPropagation()}>
                <form className={'connection-modal__content-form'} onSubmit={handleSubmit(onClickSubmit)}>
                    <label className={'connection-modal__content-form-header'}>Connection Config</label>
                    <label className={'connection-modal__content-form-label'}>Host:</label>
                    <input {...register('host')} type={'text'} name={'host'} placeholder='host'/>
                    <label className={'connection-modal__content-form-label'}>Port:</label>
                    <input {...register('port')} type={'number'} onInput={e => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))} name={'port'} placeholder='port'/>
                    <label className={'connection-modal__content-form-label'}>User:</label>
                    <input {...register('user')} type={'text'} name={'user'} placeholder='user'/>
                    <label className={'connection-modal__content-form-label'}>Password:</label>
                    <input {...register('password')} type={'password'} name={'password'} placeholder='password'/>
                    <button>Connect</button>
                </form>
            </div>
        </div>
    );
};

export default ConnectionModal;