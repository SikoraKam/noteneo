export interface ResponseErrors extends Record<string, string[]> {}

/**
 * Helper function for react-hook-form
 * Given an axios error and hook-form setError function
 * sets error messages witch matching keys
 * @param error - axios error
 * @param setError - react-hook-form setError function
 */
export const setResponseErrors = (error: any, setError: Function) => {
  const errors: Record<string, string[]> = error?.response?.data?.errors;
  if (!errors) {
    return;
  }
  Object.entries(errors).forEach(([key, messages]) => {
    setError(key, {
      type: 'server',
      message: messages[0],
    });
  });
};
