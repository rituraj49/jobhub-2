import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,  } from 'recharts';

function Barchart({ data }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{top:50}} >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' stroke='#2cb1c' fill='#c298d7' />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default Barchart