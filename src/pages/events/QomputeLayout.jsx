import { Outlet } from 'react-router-dom';
import EventSubnav from '../../components/events/EventSubnav';

const QomputeLayout = () => (
  <>
    <EventSubnav />
    <Outlet />
  </>
);

export default QomputeLayout;
