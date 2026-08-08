import { currentUser } from '@clerk/nextjs/server';
import type { NavUser } from '@/types/users';

export async function useAuth() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const { firstName, lastName, emailAddresses, imageUrl } = user;

  const navUser: NavUser = {
    name: `${firstName} ${lastName}`,
    email: emailAddresses[0]?.emailAddress ?? '',
    avatar: imageUrl ?? '',
  };

  return {
    userId: user.id,
    navUser,
  };
}
