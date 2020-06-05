import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
 
export const ImgUploader = () => { 
  const [state, setState] = useState([]);
  const onDrop = (picture) => {
    setState([
      ...state, picture
    ]);
  }

  return (
    <ImageUploader
      withIcon={true}
      buttonText='Choose images'
      onChange={onDrop}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
    />
  );
}