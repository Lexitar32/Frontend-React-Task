import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const EventResult = ({ match }) => {
  const {
    params: { eventId },
  } = match;
  const [eventDetails, seteventDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://api.smarkets.com/v3/events/${eventId}`)
      .then((response) => {
        seteventDetails(response.data.events);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const prevPage = () => {
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className="jumbotron bg-dark">
        <span>
          <button className="btn btn-danger" onClick={prevPage}>
            Go Back
          </button>
        </span>
        <h1 className="display-4 text-center eventTitle">Top Event Details</h1>
      </div>
      <div className="eventDetails container text-center">
        {!isLoading &&
          eventDetails.map((eventDetail) => {
            return (
              <div key={eventDetail.id}>
                <p>Name of Event: {eventDetail.name} </p> <hr />
                <p>Event Type: {eventDetail.type}</p> <hr />
                <p>Start Date: {eventDetail.start_date}</p> <hr />
                <p>State of Event: {eventDetail.state} </p>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default EventResult;
