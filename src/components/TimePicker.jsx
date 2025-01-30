import React from 'react'
import { CCol, CRow } from '@coreui/react'
import { CTimePicker } from '@coreui/react-pro'
import '@coreui/coreui/dist/css/coreui.min.css'
import '@coreui/coreui-pro/dist/css/coreui.min.css'


export const TimePicker = () => {
  return (
      <CCol className="mb-3 mb-sm-0" sm={6} lg={12}>
        <CTimePicker  locale="en-US" seconds={false} />
      </CCol>
  )
}
