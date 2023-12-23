import { FaBriefcase } from "react-icons/fa6"
import Wrapper from "../assets/wrappers/StatsContainer"
import StatItem from "./StatItem"
import { BiSolidCalendarCheck, BiSolidErrorAlt } from "react-icons/bi"

function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title:'pending applications',
      count: defaultStats?.pending || 0,
      icon: <BiSolidCalendarCheck />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title:'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaBriefcase />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title:'declined applications',
      count: defaultStats?.declined || 0,
      icon: <BiSolidErrorAlt />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
      {
        stats.map(item => <StatItem key={item.title} {...item} />)
      }
    </Wrapper>
  )
}
export default StatsContainer