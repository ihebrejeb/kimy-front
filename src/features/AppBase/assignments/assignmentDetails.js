import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AssignmentDetails({ currentId, setcurrentId }) {
  const [open, setOpen] = React.useState(false);

  const assignment = useSelector((state) =>
    currentId
      ? state.assignments?.values.find((c) => c._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentId) setOpen(true);
  }, [currentId]);

  return <div></div>;
}

export default AssignmentDetails;
