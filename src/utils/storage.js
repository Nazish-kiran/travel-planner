export const saveTrip = (trip) => {
  localStorage.setItem("trip", JSON.stringify(trip));
};

export const loadTrip = () => {
  const data = localStorage.getItem("trip");
  return data ? JSON.parse(data) : null;
};

export const clearTrip = () => {
  localStorage.removeItem("trip");
};
