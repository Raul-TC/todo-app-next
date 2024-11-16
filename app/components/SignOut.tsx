import { FaUser } from 'react-icons/fa'
import { SignOutButton } from './SignOutButton';
import { Session } from 'next-auth';


export const SignOut = ({ session }: { session: Session | null }) => {
    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                    <FaUser className="dark:text-textDark text-containerLight text-2xl" />
                    <p className="text-xl dark:text-textDark text-containerLight transition-colors ease-in duration-300">Bienvenid@ {session?.user.name}</p>
                </div>
                <SignOutButton />
            </div >
        </>
    )
}
