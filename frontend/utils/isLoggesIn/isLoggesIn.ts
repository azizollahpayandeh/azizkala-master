import { getCookie } from 'cookies-next';

const token = getCookie('access');
const isLogging = !!token; // Use the !! operator to convert the token value to a boolean

export { isLogging }; // Export the variable isLogging
