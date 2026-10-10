import { Outlet } from 'react-router-dom';
import EventSubnav from '../../components/events/EventSubnav';
import Sponsors from '../../components/home/Sponsors';

const QomputeLayout = () => (
  <>
    <EventSubnav />
    <Outlet />
    <Sponsors />
  </>
);

export default QomputeLayout;
