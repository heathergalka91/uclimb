import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoWigetDropzone from "./PhotoWidgetDropzone";
import PhotoWigetCropper from "./PhotoWigetCropper";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto}: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='purple' content='Step 1 - Add Photo' sub />
        <PhotoWigetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='purple' content='Step 2 - Resize image' sub />
        {files && files.length > 0 && (
          <PhotoWigetCropper setCropper={setCropper} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='purple' content='Step 1 - Preview & upload' sub />
        <>
          <div className='img-preview' style={{ minHeight: 200, overflow: "hidden" }}></div>
          {files && files.length > 0 && (
            <Button.Group widths={2}>
              <Button onClick={onCrop} positive icon='check' loading={loading} />
              <Button onClick={() => setFiles([])} icon='close' disabled={loading} />
            </Button.Group>
          )}
        </>
      </Grid.Column>
    </Grid>
  );
}
