import { useState } from "react";
import { uploadImage } from "../services/uploadService";

function ImageUploader({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const uploadHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    setLoading(true);

    try {
      const res = await uploadImage(formData);

      onUpload(res.data.image);

      alert("Image Uploaded");
    } catch (err) {
      alert("Upload Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <input
        type="file"
        onChange={uploadHandler}
      />

      {loading && <p>Uploading...</p>}
    </>
  );
}

export default ImageUploader;