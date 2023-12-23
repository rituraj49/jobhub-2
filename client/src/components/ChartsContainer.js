import { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import Barchart from '../components/Barchart'
import AreaChart from './AreaChartComponent'

function ChartsContainer({ data }) {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)} >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {
        barChart ? <Barchart data={data} /> : <AreaChart data={data} />
      }
    </Wrapper>
  )
}
export default ChartsContainer