import React from "react";

interface Props {
  setImage: (file: File) => void;
  imageName?: string;
}

const ImageUploadInput = ({ setImage, imageName }: Props) => {
  return (
    <div className="row justify-content-center image-upload-wrapper text-center">
      <label
        htmlFor="image-upload"
        className="image-upload-label w-100 h-100 py-2"
      >
        {imageName || "Kép kiválasztása"}
      </label>
      <input
        className="d-none"
        id="image-upload"
        type="file"
        name="imageUpload"
        onChange={(e) =>
          e.target.files &&
          e.target.files.length > 0 &&
          setImage(e.target.files[0])
        }
        accept="image/*"
      />
    </div>
  );
};

export default ImageUploadInput;
