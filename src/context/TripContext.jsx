import { useEffect, useState } from "react";
import { TripContext } from "./TripContext";
import { saveTrip, loadTrip, clearTrip } from "../utils/storage";

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState(loadTrip());

  useEffect(() => {
    if (trip) {
      saveTrip(trip);
    } else {
      clearTrip();
    }
  }, [trip]);

  return (
    <TripContext.Provider value={{ trip, setTrip }}>
      {children}
    </TripContext.Provider>
  );
};
