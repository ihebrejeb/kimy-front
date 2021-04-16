import React from "react";

const ActivitiesList = ({ activitiesList = [] }) => {
  return (
    <>
      {activitiesList.map((data) => {
        if (data) {
          return (
            <div key={data.title}>
              <h1>{data.title}</h1>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default ActivitiesList;
