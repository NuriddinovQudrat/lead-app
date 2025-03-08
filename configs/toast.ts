import { type ToastContainerProps } from 'react-toastify';

export const ContainerToastProps: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 5000,
    rtl: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastStyle: {
        borderRadius: '4px',
    },
};
