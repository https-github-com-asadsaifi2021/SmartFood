import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import notificationsReducer from "./notification/notificationSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
