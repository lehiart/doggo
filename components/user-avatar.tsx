// import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: { name: string; image?: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  console.log(user);
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt='Foto de perfil' src={user.image} />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user.name}</span>
          <User2 className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
