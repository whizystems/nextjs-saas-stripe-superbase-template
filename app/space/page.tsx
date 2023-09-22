import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';

import SpaceUI from './QRSpaceUI';


export default async function Space() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);
  console.log(subscription);

  if (!session) {
    return redirect('/signin');
  }

  return (
    <SpaceUI />
  );
}