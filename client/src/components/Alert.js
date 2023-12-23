import React from 'react'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify';
import { MdOutlineDoneOutline } from 'react-icons/md';

function Alert() {
    const{alertText, alertType} = useAppContext();
    // toast.alertType(alertText)
    // switch(alertType){
    //   case 'success':
    //     toast.success(alertText,{
    //       position:'top-center',
    //       className:'alert alert-success',
    //       icon:<MdOutlineDoneOutline />
    //     });
    //     break;
    //   case 'error':
    //     toast.error(alertText);
    //     break;
    //   case 'info':
    //     toast.info(alertText);
    //     break;
    // }
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
    // <div className=''>{alertText}</div>
  )
}

export default Alert