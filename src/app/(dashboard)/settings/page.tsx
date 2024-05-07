import InviteBadge from '@/components/InviteBadge';
import InviteForm from '@/components/InviteForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCurrUserId, getUserInvites } from '@/lib/fetch';
import { CircleSlash } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Settings() {
  const userId = await getCurrUserId();
  const user = await getUserInvites(userId);

  if (user === null) redirect('/not-found');

  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-2">
      <Card>
        {user.invites > 0 ? (
          <>
            <CardHeader className="pb-0">
              <CardTitle>Invite another User</CardTitle>
              <CardDescription>
                Remaining Invites: {user.invites}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" orientation="horizontal" />
              <InviteForm />
            </CardContent>
          </>
        ) : (
          <CardContent>{`You've used up all your invites already.`}</CardContent>
        )}
      </Card>
      <Card>
        <CardHeader className="space-y-3 p-6 pb-4">
          <CardDescription>{`Emails you've invited`}</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 pt-0">
          {user.Invite.length > 0 ? (
            user.Invite.map(({ email, used }) => (
              <InviteBadge key={email} used={used} email={email} />
            ))
          ) : (
            <span className="flex flex-col items-center gap-2 text-sm text-slate-500">
              <CircleSlash />
              {`You haven't invited anyone yet`}
            </span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
