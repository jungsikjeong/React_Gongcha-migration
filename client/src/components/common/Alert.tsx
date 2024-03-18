import { IAlertAtoms } from '../../interface/alert';

interface IAlert {
  alert: IAlertAtoms;
}

const Alert = ({ alert }: IAlert) => {
  return (
    <div>
      {alert !== null && alert?.text !== '' && (
        <div className={`alert alert-${alert.alertType}`}>{alert?.text}</div>
      )}
    </div>
  );
};

export default Alert;
