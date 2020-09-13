const EVENT_KEY = "event:logout";
const EVENT_VALUE = "true";

export const dispatchLogoutEventToAllWindows = () => {
  window.localStorage.setItem(EVENT_KEY, EVENT_VALUE);

  // Dispatch the event in the current window
  const event = new StorageEvent("storage", {
    key: EVENT_KEY,
    newValue: EVENT_VALUE
  });
  window.dispatchEvent(event);

  window.localStorage.removeItem(EVENT_KEY);
};

export const createLogoutEventListener = (callback: () => void) => (
  event: StorageEvent
) => {
  if (event.key === EVENT_KEY && event.newValue === EVENT_VALUE) {
    callback();
  }
};
