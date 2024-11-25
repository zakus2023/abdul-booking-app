
import PageTitle from "../../../../../components/page-title";

import EventForm from "../common/event-form";

function CreateEventsPage() {
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Create Events" />
      </div>
      <div className="mt-5">
      <EventForm />
      </div>
      
    </div>
  );
}

export default CreateEventsPage;
