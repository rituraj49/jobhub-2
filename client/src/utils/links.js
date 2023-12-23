import { FaChartColumn } from "react-icons/fa6";
import { MdAssignmentAdd, MdQueryStats } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const links = [
    { id: 1, text: 'stats', path: '/', icon: <FaChartColumn /> },
    { id: 2, text: 'all jobs', path: '/all-jobs', icon: <MdQueryStats /> },
    { id: 3, text: 'add job', path: '/add-job', icon: <MdAssignmentAdd /> },
    { id: 4, text: 'profile', path: '/profile', icon: <ImProfile /> }
]

export default links;