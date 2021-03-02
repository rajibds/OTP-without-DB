import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import wait from '../app/javascript/shared/wait';
// *********************************
// mockStore
// *********************************
export const mockStore = configureMockStore([thunk]);
// ***************************************
// update mounted component with AJAX data
// ***************************************
export const startWithAsyncHandling = async func => {
  let wrapper;
  await act(async () => {
    wrapper = await func();
    await wait(0);
    wrapper.update();
  });
  return wrapper;
};

export const runWithAsyncHandling = async (wrapper, func) =>
  act(async () => {
    func();
    await wait(0);
    wrapper.update();
  });
