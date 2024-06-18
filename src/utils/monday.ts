import { IMondayItem } from "../context/MondayContext";

// Easy way to get a value from monday board column
export const getColumn = (data: IMondayItem, name: string): string => {
  const col = data.column_values.find((it) => it.id === name);
  if (!col || !col.text.length) return "-";

  return col.text;
};

// Filter a string to find timezone information
export const parseTimezone = (tmString: string): string => {
  const pattern = /UTC([+-]\d{1,2}:\d{2})/;
  const match = tmString.match(pattern);

  return match?.[1] || "-";
};

// Generates a Google Map url from latitude and longitude
export const getMapURL = (data: IMondayItem): string => {
  const lat = getColumn(data, "latitude");
  const lon = getColumn(data, "longitude");

  return `https://www.google.com/maps/@${lat},${lon},5z`;
};
