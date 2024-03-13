// any 타입 임시
const Alert = ({ alerts }: any) =>
  alerts !== null &&
  alerts?.length > 0 &&
  alerts?.map((alert: any) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

export default Alert;
