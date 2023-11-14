import { FileInfo } from "basic-ftp";
import FolderSVG from '../../icons/folder.svg';
import FileSVG from '../../icons/file.svg';

import './style.css';
interface IProps {
    onClickGoToPath(toPath: string): () => void;
    onClickSelect(index: number): () => void;
    item: FileInfo;
    index: number;
    isSelected: boolean;
}

const ListItem = (props: IProps) => {
    const FileType = () => {
        switch (props.item.type) {
            case 1:
                return FileSVG
            case 2:
                return FolderSVG
        }
    }

    if (props.item.type === 1) {
        return (
            <div onClick={(e) => e.stopPropagation()}>
                <div className={`list-item ${props.isSelected && 'list-item-selected'}`} onClick={props.onClickSelect(props.index)}>
                    <img className={'list-item__img'} src={FileType()} alt={props.item.name} />
                    <span className={'list-item__text'}>{props.item.name}</span>
                </div>      
            </div>
        );
    }
    
    if (props.item.type === 2) {
        return (
            <div className={'list-item'} onClick={props.onClickGoToPath(props.item.name)}>
                <img className={'list-item__img'} src={FileType()} alt={props.item.name} />
                <span className={'list-item__text'}>{props.item.name}</span>
            </div>
        );
    }
};

export default ListItem;