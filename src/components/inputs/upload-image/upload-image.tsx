import { Fragment, useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { instance } from '@axios/axios';
import { IMAGE_URL_BASE, MAX_IMAGE_SIZE, MOBILE_WIDTH, PRIMARY_LIGHT_6_COLOR } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useScreenWidth } from '@hooks/use-screen-width-hook';
import { userSelect } from '@redux/slices/user';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { ErrorStatus } from '@typing/enums/error-status';
import { ImageResponseType } from '@typing/types/response-types';
import { Button, Modal, Progress, Typography, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { AxiosError, AxiosResponse } from 'axios';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

import styles from './upload-image.module.scss'

const { Text } = Typography;

type UploadImagePropsType = {
  setImageSrc: (imageSrc: string | null) => void,
  setIsButtonSubmitDisabled: (isButtonSubmitDisabled: boolean) => void
}

export const UploadImage: React.FC<UploadImagePropsType> = ({ setImageSrc, setIsButtonSubmitDisabled }) => {
  const { userData } = useAppSelector(userSelect);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth && screenWidth > MOBILE_WIDTH;

  const setlistType = isMobile ? 'picture-card' : 'picture'


  useEffect(() => {
    if(userData?.imgSrc) {
      const initialFileList: UploadFile[] = [{
        uid: '-1',
        name: 'avatar.jpg',
        status: 'done',
        url: userData?.imgSrc,
      }];

      setFileList(initialFileList);
    }
  }, [userData])
  

  const uploadButton = (
    <div className={styles.uploadButton}>
      {isUploading 
      ? <Fragment>
          <Text>Загружаем</Text>
          <Progress
            percent={uploadProgress}
            size='small'
            showInfo={false}
            strokeColor={PRIMARY_LIGHT_6_COLOR}
          />
       </Fragment>
     : <Fragment>
        <PlusOutlined />
         <Text
           type='secondary'
           className={styles.textImageButton}
         >
           Загрузить фото профиля
         </Text>
      </Fragment>}
    </div>
  );

  const uploadButtonMobile = fileList.length === 0 && (
    <div className={styles.uploadButtonMobileWrapper}>
      <Text className={styles.textUploadMobile}>Загрузить фото профиля</Text>
      <Button
        icon={<UploadOutlined className={styles.iconMobile} />}
      >
        Загрузить
      </Button>
    </div>
  )

  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt5M = file.size / 1024 / 1024 < MAX_IMAGE_SIZE;

    if(!isLt5M || !isJpgOrPng) {
      const uploadFile = file as UploadFile<RcFile>;

      uploadFile.status = 'error';
      setFileList([uploadFile])
    }

    return isJpgOrPng && isLt5M;
  }

  const customUpload = async (options: UploadRequestOption) => {
    const { file, onProgress } = options;
  
    const formData = new FormData();
  
    formData.append('file', file);

    setIsUploading(true)

    try {
      const { data }: AxiosResponse<ImageResponseType> = await instance.post(
        AxiosPaths.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const currentPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                setUploadProgress(currentPercent);
                if (onProgress) {
                  onProgress({ percent: currentPercent });
                }
              }
            
          }
        }
      );

      const imageUrl = data.url;
      
      const uploadFileSuccess = file as UploadFile<RcFile>;

      uploadFileSuccess.url = `${IMAGE_URL_BASE}${imageUrl}`;

      setIsUploading(false);
      setUploadProgress(0);
      setImageSrc(uploadFileSuccess.url)
      setFileList([uploadFileSuccess]);
      setIsButtonSubmitDisabled(false);
    }
     catch (error) {;
      const uploadFileError = file as UploadFile<RcFile>;

      uploadFileError.status = 'error';

      const { response } = error as AxiosError;

      if(response?.status === ErrorStatus.EMAIL_EXISTS) {
        Modal.error({
          title: 'Файл слишком большой',
          content: `Выберите файл размером до ${MAX_IMAGE_SIZE} МБ.`,
          okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
        })
      }
      setIsUploading(false);
      setUploadProgress(0);
      setFileList([uploadFileError]);
      setIsButtonSubmitDisabled(true);
    }
  }

  return (
    <Upload
      fileList={fileList}
      beforeUpload={beforeUpload}
      customRequest={customUpload}
      listType={setlistType}
    >
      {fileList.length === 0 && isMobile ? uploadButton : uploadButtonMobile}
    </Upload>
  )
}