'use client';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FaGoogle } from 'react-icons/fa';
import { signIn, validateCode } from '@/server-actions/auth';

const LoginForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const handleSubmit = async (code: string) => {
    setLoading(true);
    const success = await validateCode(code);
    setLoading(false);

    if (success) {
      setValidated(true);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);
  if (!validated)
    return (
      <div className="flex items-center justify-center">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent
            className="w-96"
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Code Verification</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the code you received here.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              variant="outline"
              disabled={loading || code.length <= 15}
              onClick={() => handleSubmit(code)}
            >
              Submit
            </Button>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );

  return (
    <form
      action={signIn}
      className="flex min-h-screen flex-1 items-center justify-center"
    >
      <Button className="group flex h-max flex-col gap-4 p-8" variant="outline">
        <FaGoogle
          size={100}
          className="fill-slate-300 transition-colors duration-300 group-hover:fill-teal-400"
        />
        Sign in with Google
      </Button>
    </form>
  );
};

export default LoginForm;
