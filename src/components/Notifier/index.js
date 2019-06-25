import {
  notification,
} from 'antd'

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

return openNotificationWithIcon
