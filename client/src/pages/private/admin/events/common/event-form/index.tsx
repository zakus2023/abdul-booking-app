import { useState } from "react";
import General from "./general";
import Tickets from "./tickets";
import Media from "./media";
import LocationAndDate from "./location-and-date";
import { Form, Steps, message } from "antd";
import { uploadFileAndReturnUrl } from "../../../../../../api-services/storage-services";
import {
  createEvent,
  updateEvent,
} from "../../../../../../api-services/event-services";
import { useNavigate, useParams } from "react-router-dom";

export interface EventFormStepProps {
  eventData: any;
  setEventData: any;
  setCurrentStep: any;
  currentStep: number;
  selectedMediaFiles?: any;
  setSelectedMediaFiles?: any;
  loading?: boolean;
  onFinish?: any;
}
//the function should not have parameter at the start
function EventForm({
  initialData = {},
  type = "create",
}: {
  initialData?: any;
  type?: "create" | "edit";
}) {
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
  const [eventData, setEventData] = useState<any>(initialData); //this should initialized to {} at the start
  const [loading, setLoading] = useState(false);

  console.log(eventData);

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const params: any = useParams();
  

  const onFinish = async () => {
    try {
      setLoading(true);
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file: any) => {
          return await uploadFileAndReturnUrl(file);
        })
      );
      // eventData.media = urls; ---this is original and it was updated to the below statement after doing the edit event
// this is to avoid overwriting the existing media during update
      eventData.media = [...eventData?.media || [], ...urls]

      if (type == "edit") {//the if else was added after doing the edit event
        await updateEvent(params.id, eventData);//this was added later after doing edit event
        message.success("Event updated successfully");//this was added later after doing edit event
      } else {
        await createEvent(eventData);
        message.success("Event created successfully");
      }
      navigate("/admin/events");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    setCurrentStep,
    currentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  };

  const stepsData = [
    {
      name: "General",
      component: <General {...commonProps} />,
    },
    {
      name: "Location And Date",
      component: <LocationAndDate {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps} />,
    },
    {
      name: "Tickets",
      component: <Tickets {...commonProps} />,
    },
  ];

  return (
    <Form layout="vertical">
      <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
        {stepsData.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.name}
            disabled={index > currentStep}
          />
        ))}
      </Steps>
      <div className="mt-5">{stepsData[currentStep].component}</div>
    </Form>
  );
}

export default EventForm;
