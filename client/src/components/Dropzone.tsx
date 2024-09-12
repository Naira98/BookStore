import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { RegisterFormType } from "./RegisterForm";

const Dropzone = ({
  values,
  setFieldValue,
}: {
  values: RegisterFormType;
  setFieldValue: (key: string, value: File) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFieldValue("picture", acceptedFiles[0]);
    },
    [setFieldValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      className={`border-2 rounded-md py-4 px-2 cursor-pointer ${
        values.picture
          ? "border-dashed border-cyan-primary text-orange"
          : "border-solid border-gray-secondary text-gray-primary"
      }  `}
    >
      <div className="text-center" {...getRootProps()}>
        <input {...getInputProps()} />
        {!values.picture ? (
          <p className="px-2">Drag and drop your profile picture</p>
        ) : (
          <div className="flex justify-center gap-2 px-2">
            <p>{values.picture.name}</p>
            <span>
              <EditOutlinedIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
