const EVENT_KEY = "event:logout";
const EVENT_VALUE = "true";

const dispatchLogoutEventToOtherTabs = () => {
  window.localStorage.setItem(EVENT_KEY, EVENT_VALUE);
  window.localStorage.removeItem(EVENT_KEY);
};

export const dispatchLogoutEventToAllTabs = () => {
  dispatchLogoutEventToOtherTabs();

  // Dispatch the event in the current tab
  const event = new StorageEvent("storage", {
    key: EVENT_KEY,
    newValue: EVENT_VALUE
  });
  window.dispatchEvent(event);
};

export const createLogoutEventListener = (callback: () => void) => (
  event: StorageEvent
) => {
  if (event.key === EVENT_KEY && event.newValue === EVENT_VALUE) {
    callback();
  }
};
