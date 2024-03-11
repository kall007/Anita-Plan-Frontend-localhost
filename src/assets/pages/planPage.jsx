import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "../components/AddEventModal";

function PlanPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    setCalendarLoaded(true); // Set calendarLoaded to true when the component mounts
  }, []);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add a Plan</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        {calendarLoaded && (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
          />
        )}
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
}

export default PlanPage;
