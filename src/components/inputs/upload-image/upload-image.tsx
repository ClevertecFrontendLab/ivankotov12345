import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { instance } from '@axios/axios';
import { IMAGE_URL_BASE, MAX_IMAGE_SIZE } from '@constants/constants';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { ImageResponseType } from '@typing/types/response-types';
import { Form, Modal, Typography, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { AxiosResponse } from 'axios';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

const { Text } = Typography;

type UploadImagePropsType = {
  setImageSrc: (imageSrc: string | null) => void
}

export const UploadImage: React.FC<UploadImagePropsType> = ({ setImageSrc }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const uploadButton = (
    <div>
      <PlusOutlined />
      <Text>Загрузить фото профиля</Text>
    </div>
  );
  
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
    const { file } = options;
  
    const formData = new FormData();
  
    formData.append('file', file);

    const uploadFile = file as UploadFile<RcFile>;

    uploadFile.status = 'uploading';
    setFileList([uploadFile]);
  
    try {
      const { data }: AxiosResponse<ImageResponseType> = await instance.post(
        AxiosPaths.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = data.url;
      
      const uploadFileSuccess = file as UploadFile<RcFile>;

      uploadFileSuccess.url = `${IMAGE_URL_BASE}${imageUrl}`;
      uploadFileSuccess.status = 'done';

      setImageSrc(uploadFileSuccess.url)
      setFileList([uploadFileSuccess]);
    }
     catch (error) {;
      const uploadFileError = file as UploadFile<RcFile>;

      uploadFileError.status = 'error';
      setFileList([uploadFileError]);
    }
  }

  return (
    <Form.Item>
      <Upload
        fileList={fileList}
        listType="picture-card"
        beforeUpload={beforeUpload}
        customRequest={customUpload}
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
    </Form.Item>
  )
}