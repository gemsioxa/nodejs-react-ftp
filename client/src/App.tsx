import { useMemo, useState } from 'react';
import './App.css';
import api from './api';
import { OpenConnectionConfig } from './api/connection/types';
import { FileInfo } from 'basic-ftp';
import ListItem from './components/ListItem';
import ConnectionModal from './components/ConnectionModal';
import CreateFolderModal from './components/CreateFolderModal';
import DeleteFolderModal from './components/DeleteFolderModal';
import DeleteFileModal from './components/DeleteFileModal';
import UploadFileModal from './components/UploadFileModal';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
}

function App() {
  const {
    register,
    handleSubmit
  } = useForm<FormData>();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [list, setList] = useState<Array<FileInfo>>([]);
  const [fileName, setFileName] = useState<string>('');
  const [fileExt, setFileExt] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isOpenConnectionModalOpen, setIsOpenConnectionModalOpen] = useState<boolean>(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState<boolean>(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState<boolean>(false);
  const [isDeleteFileModalOpen, setIsDeleteFileModalOpen] = useState<boolean>(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onClickOpenConnectionModal = () => {
    setIsOpenConnectionModalOpen(true);
  };

  const onClickClose = () => {
    setIsOpenConnectionModalOpen(false);
    setIsCreateFolderModalOpen(false);
    setIsDeleteFolderModalOpen(false);
    setIsDeleteFileModalOpen(false);
    setIsUploadFileModalOpen(false);
  };

  const onClickSelect = (index: number) => () => {
    setSelectedIndex(index);
    const selectedFileExt = list[index].name.split('.').slice(-1)[0];
    const selectedFileName = list[index].name.split('.').slice(0, -1).join('.');
    setFileName(selectedFileName);
    setFileExt(selectedFileExt);
  }

  const onClickOpenConnection = (config: OpenConnectionConfig) => {
    api.connection.openConnection(config)
    .then((resp) => {
      setIsConnected(true);
      console.log(resp.data.message);

      api.navigation.getElements()
        .then((resp) => {
          console.log(resp.data.elements);
          setList(resp.data.elements);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  const onClickCloseConnection = () => {
    api.connection.closeConnection()
    .then((resp) => {
      setIsConnected(false);
      console.log(resp.data.message);
      setList([]);
      setCurrentPath('/');
    });
  }

  const onClickGoPreviousPath = () => {
    const newPath = currentPath.split('/').slice(0, -2).join('/') === '' ? '/' : `${currentPath.split('/').slice(0, -2).join('/')}/`;
    api.navigation.goToPath(newPath)
      .then((payload) => {
        if (typeof payload.data.code === 'string') {
          console.warn(payload.data.code);
          return api.connection.closeConnection()
          .then((resp) => {
              setIsConnected(false);
              console.log(resp.data.message);
              setList([]);
              setCurrentPath('/');
            });
        }
        api.navigation.getElements()
          .then((resp) => {
              console.log(resp.data);
              setCurrentPath(newPath);
              setList(resp.data.elements);
            })
          .catch((error) => {
              console.log(error);
            });
      })
  }

  const onClickGoToPath = (toPath: string) => () => {
    api.navigation.goToPath(`${currentPath}${toPath}/`)
     .then((payload) => {
        if (typeof payload.data.code === 'string') {
          console.warn(payload.data.code);
          return api.connection.closeConnection()
          .then((resp) => {
              setIsConnected(false);
              console.log(resp.data.message);
              setList([]);
              setCurrentPath('/');
            });
        }
        api.navigation.getElements()
         .then((resp) => {
              console.log(resp.data.elements);
              setCurrentPath(`${currentPath}${toPath}/`);
              console.log('new currentPath', `${currentPath}${toPath}/`);
              setList(resp.data.elements);
            })
         .catch((error) => {
              console.log(error);
            });
      })
  };

  const onClickCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
  };

  const onClickDeleteFolder = () => {
    setIsDeleteFolderModalOpen(true);
  };

  const onClickDeleteFile = () => {
    setIsDeleteFileModalOpen(true);
  };

  const onClickUploadFile = () => {
    setIsUploadFileModalOpen(true);
  }
  const elItems = useMemo(() => {
    if (list.length > 0) {
      return (
        list.map((item, index) => {
          return (
              <ListItem
                key={index}
                item={item}
                index={index}
                isSelected={selectedIndex === index}
                onClickGoToPath={onClickGoToPath}
                onClickSelect={onClickSelect}
              />
          );
        })
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, selectedIndex]);

  const elOpenConnectionModal = useMemo(() => {
    if (isOpenConnectionModalOpen) {
      return (
        <ConnectionModal
          onClickClose={onClickClose}
          onClickOpenConnection={onClickOpenConnection}
        />
      );
    }
  }, [isOpenConnectionModalOpen]);

  const onSubmitCreateFolder = (name: string) => {
    console.log(name);
    api.files.createFolder(`${name}`)
      .then(() => {
        api.navigation.getElements()
        .then((resp) => {
              console.log(resp.data.elements);
              setList(resp.data.elements);
            })
         .catch((error) => {
              console.log(error);
            });
      })
  };

  const onSubmitDeleteFolder = () => {
    console.log(currentPath);
    api.files.deleteFolder(`${currentPath}`)
     .then(() => {
        onClickGoPreviousPath();        
      })
  }

  const onSubmitDeleteFile = () => {
    if (list.length > 0 && selectedIndex!== null) {
      const fileName = list[selectedIndex].name;
      api.files.deleteFile(`${currentPath}${fileName}`)
      .then(() => {
          setSelectedIndex(null);
          api.navigation.getElements()
            .then((resp) => {
              console.log(resp.data.elements);
              setList(resp.data.elements);
            })
            .catch((err) => {
              console.warn(err);
            })
        })
    }
  };

  const onSubmitUploadFile = (localPath: string, fileName: string) => {
    api.files.uploadFile(`${localPath}`, `${currentPath}${fileName}`)
    .then(() => {
        api.navigation.getElements()
         .then((resp) => {
            console.log(resp.data.elements);
            setList(resp.data.elements);
          })
         .catch((err) => {
            console.warn(err);
          })
      })
  };

  const onClickDownloadFile = () => {
    console.log(currentPath);
    if (isConnected && (selectedIndex === 0 || selectedIndex)) {
      api.files.downloadFile(`${list[selectedIndex].name}`)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  };

  const onClickRenameFile = (data: FormData) => {
    console.log(data.name);
    if (list.length > 0 && selectedIndex !== null && fileName.length) {
      api.files.renameFile(`${currentPath}${list[selectedIndex].name}`, `${currentPath}${data.name}.${fileExt}`)
     .then(() => {
          setSelectedIndex(null);
          api.navigation.getElements()
           .then((resp) => {
              console.log(resp.data.elements);
              setList(resp.data.elements);
            })
           .catch((err) => {
              console.warn(err);
            })
        })
    }
  };

  const elCreateFolderModal = useMemo(() => {
    if (isCreateFolderModalOpen) {
      return (
        <CreateFolderModal
          onClickClose={onClickClose}
          onSubmitCreateFolder={onSubmitCreateFolder}
        />
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateFolderModalOpen]);

  const elDeleteFolderModal = useMemo(() => {
    if (isDeleteFolderModalOpen) {
      return (
        <DeleteFolderModal
          onClickClose={onClickClose}
          onSubmitDeleteFolder={onSubmitDeleteFolder}
        />
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteFolderModalOpen]);

  const elDeleteFileModal = useMemo(() => {
    if (isDeleteFileModalOpen) {
      return (
        <DeleteFileModal
          onClickClose={onClickClose}
          onSubmitDeleteFolder={onSubmitDeleteFile}
        />
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteFileModalOpen]);

  const elUploadFileModal = useMemo(() => {
    if (isUploadFileModalOpen) {
      return (
        <UploadFileModal
          onClickClose={onClickClose}
          onSubmitUploadFile={onSubmitUploadFile}
        />
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploadFileModalOpen]);

  const elOptions = useMemo(() => {
    if (selectedIndex || selectedIndex === 0) {
      const file = list[selectedIndex];
      return (
        <div className={'content__options'} onClick={(e) => e.stopPropagation()}>
          <label className={'content__options-header'}>File options</label>
          <div className={'content__options__info'}>
            <div className={'content__options__info-item'}>
              <label className={'content__options__info-item-label'}>Name: </label>
              {/* <span className={'content__options__info-item-value'}>{file.name}</span> */}
              <textarea 
                className={'content__options__info-item-textarea'} 
                defaultValue={fileName}
                {...register('name', { required: true })}
                name={'name'} 
              />
            </div>
            <div className={'content__options__info-item'}>
              <label className={'content__options__info-item-label'}>Size: </label>
              <span className={'content__options__info-item-value'}>{file.size} bytes</span>
            </div>
            <button disabled={!(isConnected && selectedIndex !== null)} onClick={handleSubmit(onClickRenameFile)}>{'Rename'}</button>
            <button className={'content__options__info-item-download'} onClick={onClickDownloadFile}>{'Download'}</button>
            <button disabled={!(isConnected && selectedIndex !== null)} onClick={onClickDeleteFile}>{'Delete'}</button>
          </div>
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, selectedIndex, list]);

  return (
    <>
      <div className={'app'}>
        {elOpenConnectionModal}
        {elCreateFolderModal}
        {elDeleteFolderModal}
        {elDeleteFileModal}
        {elUploadFileModal}
        <header className={'header'}>
          <div className={'header__title'}>
            <div>
              {isConnected ? (
                <span>{currentPath}</span>
              ) : (
                <span className={'header__title-text'}>FTP</span>
              )}
            </div>
          </div>
          {isConnected ? (
            <button onClick={onClickCloseConnection}>
              Close connection
            </button>
          ) : (
            <button onClick={onClickOpenConnectionModal}>
              Open Connection
            </button>
          )}
        </header>
        <section className={'content'} onClick={() => setSelectedIndex(null)}>
          <div className={'content__main'}>
            <div className={'content__main-controls'}>
              <button disabled={currentPath === '/'} onClick={onClickGoPreviousPath}>{'<-- ...'}</button>
              <button disabled={!isConnected} onClick={onClickCreateFolder}>{'Create folder'}</button>
              <button disabled={!(isConnected && currentPath !== '/')} onClick={onClickDeleteFolder}>{'Delete folder'}</button>
              <button disabled={!isConnected} onClick={onClickUploadFile}>{'Upload file'}</button>
            </div>
            <div className={'content__items'}>
              {elItems}
            </div>
          </div>
          {elOptions}
        </section>
      </div>
    </>
  )
}

export default App
