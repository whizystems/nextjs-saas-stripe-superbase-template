import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/72594568?s=200&v=4"
              width="64px"
              height="64px"
            />
            <AvatarFallback>Whizy</AvatarFallback>
          </Avatar>
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
