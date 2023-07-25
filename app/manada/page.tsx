import React from "react";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DogIcon } from "lucide-react";
import { DeletePackMemberBtn } from "./delete-pack-member-btn";

async function MyPackPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Debes estar logueado</div>;
  }

  const myPack = await db.pack.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      members: true,
    },
  });

  return (
    <div>
      <div className="my-4">
        <Link href="manada/nuevo">
          <Button>Agregar nuevo</Button>
        </Link>
      </div>

      {myPack?.members.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4">Aún no tienes miembros en tu manada</p>
          <Link href="manada/nuevo">
            <Button>Agregar nuevo</Button>
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4">Estos son los miembros de mi manada:</p>
          <ul>
            {myPack?.members.map((member) => (
              <li key={member.id}>
                <Card className="mb-4 w-[350px]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-2">
                    <div>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.breed}</CardDescription>
                    </div>

                    <Avatar>
                      <AvatarImage src={member.imageURL || undefined} />
                      <AvatarFallback>
                        <DogIcon />
                      </AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button className="w-full">Editar</Button>

                    <DeletePackMemberBtn memberId={member.id} />
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyPackPage;
