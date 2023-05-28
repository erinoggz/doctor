/** @format */

import { IError, ISuccess } from "../common/IResponse";
import Helpers from "../lib/helpers";
import { NotificationModel } from "../model/notification.model";

export class NotificationService {
  constructor() {}

  public getNotifications = async (email: string): Promise<ISuccess | IError> => {
    try {
      const notifications = await NotificationModel.find(
        { recipient: email },
      ).populate('question').sort({updatedAt: 'desc'});
      return Helpers.success(notifications, "Notifications retrieved successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to retrieve notifications. An Error Occured While Trying to Retrieve Notifications"
      );
    }
  };
}
