import { NotificationService } from 'app/services/notification.service';
import { IPatient } from '../../common/Dto/IPatient';
import di from '../../config/di';
import { PatientService } from '../../services/patient.service';

const notificationService: NotificationService = di.get('notification');

const notificationResolver = {
  Query: {
    getNotifications(_, {email}) {
      return notificationService.getNotifications(email);
    },
}
};

export default notificationResolver;
