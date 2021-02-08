/**
 * @param backendTimestamp - backend time
 * Backend time is returned in the ISO format
 *
 * @return string - formatted time in the following format
 * YYYY//MM//DD
 */
export const formatDate = (s: string) => {
  return s.split('T')[0];
};
