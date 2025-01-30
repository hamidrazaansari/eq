import React , {useState} from 'react'
import { CCol } from '@coreui/react'
import { CTimePicker } from '@coreui/react-pro'
import '@coreui/coreui/dist/css/coreui.min.css'
import '@coreui/coreui-pro/dist/css/coreui.min.css'


export const TimePicker = () => {
  const [time, setTime] = useState(null);
  console.log(time);
  

  return (
    <div className="mb-3 mb-sm-0">
      <CTimePicker
        locale="en-US"
        seconds={false}
        value={time}
        onChange={(value) => setTime(value)}

      />
    </div>
  )
}
