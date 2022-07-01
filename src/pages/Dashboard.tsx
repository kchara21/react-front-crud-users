import TableDashboard from "../components/TableDashboard";
import { TableDashboardProvider } from "../context/TableDashboardContext";

const Dashboard = () => {
  return (
    <TableDashboardProvider>
      <TableDashboard />
    </TableDashboardProvider>
  );
};

export default Dashboard;
