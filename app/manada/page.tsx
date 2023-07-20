import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import React from "react";

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
      members: true,
    },
  });

  // console.log(myPack);

  return (
    <div>
      <h1 className="mb-20">Mi Manada</h1>
      {myPack?.members.map((member) => (
        <div key={member.id}>
          <div>{member.name}</div>
          <Image
            quality={100}
            src={member.imageURL}
            alt={member.name}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
}

export default MyPackPage;
