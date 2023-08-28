import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 bg-black z-40 transition-all duration-150 h-16 md:h-20">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" aria-label="Logo">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/72594568?s=200&v=4" />
                <AvatarFallback>Whizy</AvatarFallback>
              </Avatar>
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/" className={s.link}>
                Pricing
              </Link>
              {user && (
                <Link href="/account" className={s.link}>
                  Account
                </Link>
              )}
              <Link href="/space" className={s.link}>
                Space
              </Link>
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
