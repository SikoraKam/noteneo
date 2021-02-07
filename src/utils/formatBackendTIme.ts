/**
 * @param backendTimestamp - backend time
 * Backend time is returned in the following format
 * YYYY-MM-DD HH:MM:ss
 *
 * @return string - formatted time in the following format
 * DD/MM/YYYY HH:MM:ss
 */
export const formatDate = (backendTimestamp: string) => {
  const [date, time] = backendTimestamp.split(' ');
  const formattedDate = date.split('-').reverse().join('/');
  return `${formattedDate} ${time}`;
};
