import { useUserStore } from '@/store/user';
import {
    AlertDialogDescription,
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '../ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/constants/router';

interface LogoutDialogProps {
    isOpenDialog: boolean;
    setIsOpenDialog: (isOpenDialog: boolean) => void;
}

const LogoutDialog = ({ isOpenDialog, setIsOpenDialog }: LogoutDialogProps) => {
    const router = useRouter();
    const clearUser = useUserStore(state => state.setClearUser);

    const logOut = () => {
        clearUser();
        router.push(ROUTER.HOME);
    };

    return (
        <AlertDialog open={isOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will log you out from your account. You can log in again anytime.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpenDialog(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            logOut();
                            setIsOpenDialog(false);
                        }}
                    >
                        Log out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutDialog;
