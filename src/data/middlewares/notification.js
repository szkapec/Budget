import { toast } from 'react-toastify';


const notificationModdleware = () => next => action => {
    if(action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
        toast.success(action.successMessage)
    }

    next(action)
}


export default notificationModdleware;