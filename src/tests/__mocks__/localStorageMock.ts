/**
 * reference: https://stackoverflow.com/questions/65282181/how-to-use-jest-for-testing-a-react-component-with-localstorage
 */

class Storage {
  getItem(key) {
    return this[key] || null;
  }
  setItem(key, value) {
    this[key] = value.toString();
  }
  removeItem(key) {
    delete this[key];
  }
  clear() {
    Object.keys(this).forEach((key) => delete this[key]);
  }
}

export const localStorageMock = Object.create(new Storage());
