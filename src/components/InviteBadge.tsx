'use client';

import React from 'react';
import { Badge } from './ui/badge';
import { Check, X } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { deleteInvite } from '@/server-actions/users';
import { toast } from './ui/use-toast';

const InviteBadge = ({ email, used }: { email: string; used: boolean }) => {
  const handleClick = async () => {
    const response = await deleteInvite(email);

    if (response === 'P2015') {
      toast({
        description:
          "Invite cannot be deleted since it's already been accepted by the user.",
        variant: 'destructive',
      });
    } else if (response) {
      toast({
        description: 'Invite successfully deleted!',
      });
    } else {
      toast({
        title: 'Something went wrong with deleting your invite.',
        description: 'An error in the server-side occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Badge
      variant="outline"
      className="flex h-10 w-full flex-row items-center p-2"
    >
      {used ? (
        <Check className="text-teal-500" size={16} strokeWidth={3} />
      ) : (
        <Button
          onClick={handleClick}
          variant="ghost"
          className="group size-max p-1"
          size="sm"
        >
          <X
            className="text-slate-500 transition-colors group-hover:text-rose-500"
            size={16}
            strokeWidth={3}
          />
        </Button>
      )}
      <Separator orientation="vertical" className="ml-1.5 mr-2" />
      <span className="mr-2">{email}</span>
    </Badge>
  );
};

export default InviteBadge;
