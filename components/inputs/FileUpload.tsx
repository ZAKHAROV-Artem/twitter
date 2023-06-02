import { useCallback, useState } from "react";
import Avatar from "../data-display/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { MdCameraEnhance, MdOutlineClose } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

interface Props {
  value: string;
  disabled?: boolean;
  onChange: (image: any) => void;
  className?: string;
  type: "avatar" | "cover" | "post";
}
export default function FileUpload({
  value,
  disabled,
  onChange,
  className,
  type,
}: Props) {
  const [base64, setBase64] = useState<string>(value);
  const { user } = useCurrentUser();
  const handleChange = useCallback(
    (file: any) => {
      onChange(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <>
      <input {...getInputProps()} />
      {type === "avatar" && (
        <div
          {...getRootProps({
            className: `cursor-pointer border-0 outline-0  ${className}`,
          })}
        >
          <Avatar
            src={base64}
            name={user?.name || ""}
            size="lg"
            className="border-2 border-black"
          />
        </div>
      )}
      {type === "post" && (
        <div
          {...getRootProps({
            className: `cursor-pointer border-0 outline-0  ${className}`,
          })}
        >
          <CiImageOn size={35} className="text-blue-500 cursor-pointer"/>
        </div>
      )}
      {type === "cover" && (
        <>
          <div
            {...getRootProps({
              className: `cursor-pointer border-0 outline-0 relative h-48 overflow-hidden rounded-xl ${className}`,
            })}
          >
            {base64 && (
              <Image
                alt="Profile cover"
                src={base64}
                width={1600}
                height={900}
                className="h-full max-h-48 w-full object-cover"
              />
            )}
            <div className="absolute top-0 flex h-full w-full items-center justify-center gap-x-5 bg-slate-800/60">
              <MdCameraEnhance size={25} />
            </div>
          </div>
          {base64 && (
            <div
              className="absolute left-0 top-0 p-2"
              onClick={() => {
                handleChange("");
                setBase64("");
              }}
            >
              <MdOutlineClose size={25} />
            </div>
          )}
        </>
      )}
    </>
  );
}
