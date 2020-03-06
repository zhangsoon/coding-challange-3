
const SUCCESS_TYPE = 'success'
const INFO_TYPE = 'info'
const ERROR_TYPE = 'error'
const WARN_TYPE = 'warn'

export default class DropDownAlert {
  static dropDown

  static setDropDown (dropDown) {
    this.dropDown = dropDown
  }

  static getDropDown () {
    return this.dropDown
  }

  static showSuccess (message = '', title = 'Success') {
    this.dropDown.alertWithType(SUCCESS_TYPE, title, message)
  }
  static showInfo (message = '', title = 'Info') {
    this.dropDown.alertWithType(INFO_TYPE, title, message)
  }
  static showError (message = '', title = 'Error') {
    this.dropDown.alertWithType(ERROR_TYPE, title, message)
  }
  static showWarning (message = '', title = 'Warning') {
    this.dropDown.alertWithType(WARN_TYPE, title, message)
  }
}
