import DropDownAlert from '../lib/DropDownAlert';

const Toast = {
  success(message = '') {
    DropDownAlert.showSuccess(message);
  },
  info(message = '') {
    DropDownAlert.showInfo(message);
  },
  error(message = '') {
    DropDownAlert.showError(message);
  },
  warning(message = '') {
    DropDownAlert.showWarning(message);
  },
};

export default Toast;
