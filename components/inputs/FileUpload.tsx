import { useCallback, useState } from "react";
import Avatar from "../data-display/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { MdCameraEnhance } from "react-icons/md";

interface Props {
  value: string;
  disabled?: boolean;
  onChange: (image: string) => void;
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
  const { data: user } = useCurrentUser();
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
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
    <div
      {...getRootProps({
        className: `cursor-pointer border-0 outline-0 ${className}`,
      })}
    >
      <input {...getInputProps()} />
      {type === "avatar" && (
        <Avatar
          src={base64}
          name={user?.name || ""}
          size="lg"
          className="border-2 border-black"
        />
      )}
      {type === "cover" && (
        <div className="max-h-48">
          {base64 ? (
            <Image
              alt="Profile cover"
              src={base64}
              width={160}
              height={90}
              className="h-full max-h-48 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center">
              <MdCameraEnhance size={25} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
