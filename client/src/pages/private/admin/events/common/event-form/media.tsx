
import { EventFormStepProps } from ".";
import { Button, Upload } from "antd";

function Media({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const onSelectedMediaFileRemove = (index: number) => {
    const existingSelectedMediaFiles = [...selectedMediaFiles];
    const newSelectedMediaFiles = existingSelectedMediaFiles.filter(
      (_, i) => i !== index
    );
    setSelectedMediaFiles(newSelectedMediaFiles);
  };

  const onAlreadyUploadedMediaFilesRemove = (index: number) => {
    const existingMediaFiles = [...eventData.media];
    const newMediaFiles = existingMediaFiles.filter((_, i) => i !== index);
    setEventData({ ...eventData, media: newMediaFiles });
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        multiple
        showUploadList={false}
        beforeUpload={(file) => {
          setSelectedMediaFiles((prev: any) => [...prev, file]);
          return false;
        }}
      >
        <span className="text-gray-500 text-xs">
          Click Here to upload media
        </span>
      </Upload>
      <div className="flex flex-wrap gap-5 mt-5">
        {selectedMediaFiles.map((file: any, index: any) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col gap-2 "
            key={file.name}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="media"
              className="w-40 h-40"
            />
            <div
              className="span underline text-sm text-center cursor-pointer"
              onClick={() => onSelectedMediaFileRemove(index)}
            >
              Remove
            </div>
          </div>
        ))}
      </div>
      {/* This shows media already uploaded */}
      <div className="flex flex-wrap gap-5 mt-5">
        {eventData.media?.map((url: any, index: any) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col gap-2 "
            key={url}
          >
            <img src={url} alt="media" className="w-40 h-40" />
            <div
              className="span underline text-sm text-center cursor-pointer"
              onClick={() => onAlreadyUploadedMediaFilesRemove(index)}
            >
              Remove
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-10 justify-between col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
