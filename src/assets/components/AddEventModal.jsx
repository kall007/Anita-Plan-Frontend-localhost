import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

export default function ({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Plan"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Corrected 'Value' to 'value'
        />
        <div>
          <label>Start Date</label>
          <Datetime
            value={start}
            onChange={(date) => setStart(date.toDate())}
          />{" "}
          {/* Extract Date from moment object */}
        </div>
        <div>
          <label>End Date</label>
          <Datetime
            value={end}
            onChange={(date) => setEnd(date.toDate())}
          />{" "}
          {/* Extract Date from moment object */}
        </div>
        <button>Add Plan</button>
      </form>
    </Modal>
  );
}
