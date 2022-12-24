import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export  function  showSuccessToastMessage(message) {
    toast.success(`Successful ${message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose:1500,
    });
};
export  function  showErrorToastMessage(message) {
    toast.error(`${message} Error`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose:1500,
    });
};
