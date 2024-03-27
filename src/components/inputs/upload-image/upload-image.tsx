import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { instance } from '@axios/axios';
import { IMAGE_URL_BASE, MAX_IMAGE_SIZE, PRIMARY_LIGHT_6_COLOR } from '@constants/constants';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { ImageResponseType } from '@typing/types/response-types';
import { Modal, Progress, Typography, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { AxiosResponse } from 'axios';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

import styles from './upload-image.module.scss'

const { Text } = Typography;

type UploadImagePropsType = {
  setImageSrc: (imageSrc: string | null) => void
}

export const UploadImage: React.FC<UploadImagePropsType> = ({ setImageSrc }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadButton = (
    <div className={styles.uploadButton}>
      <PlusOutlined />
      <Text
        type='secondary'
        className={styles.textImageButton}
      >
        Загрузить фото профиля
      </Text>
    </div>
  );

  const upladProgress = (
    <div>
      <Text>Загружаем</Text>
      <Progress
        percent={uploadProgress}
        size='small'
        showInfo={false}
        strokeColor={PRIMARY_LIGHT_6_COLOR}
      />
    </div>
  )
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt5M = file.size / 1024 / 1024 < MAX_IMAGE_SIZE;

    if(!isLt5M) {
      Modal.error({
        title: 'Файл слишком большой',
        content: `Выберите файл размером до ${MAX_IMAGE_SIZE} МБ.`,
        okText: 'Закрыть',
      })
    }

    return isJpgOrPng && isLt5M;
  }

  const customUpload = async (options: UploadRequestOption) => {
    const { file, onProgress } = options;
  
    const formData = new FormData();
  
    formData.append('file', file);

    const uploadFile = file as UploadFile<RcFile>;

    setIsUploading(true)
    setFileList([uploadFile]);
  
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
    }
     catch (error) {;
      const uploadFileError = file as UploadFile<RcFile>;

      uploadFileError.status = 'error';
      setIsUploading(false);
      setUploadProgress(0);
      setFileList([]);
    }
  }

  return (
    <Upload
      fileList={fileList}
      listType="picture-card"
      beforeUpload={beforeUpload}
      customRequest={customUpload}
    >
      {fileList.length === 0 && uploadButton}
      {isUploading && upladProgress}
    </Upload>
  )
}