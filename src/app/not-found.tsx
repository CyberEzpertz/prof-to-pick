import { buttonVariants } from '@/components/ui/button';
import { Bomb, CircleX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Bomb color="#e11d48" size={128} />
      <h2 className="flex flex-row items-center gap-2 text-7xl font-bold">
        Not Found
      </h2>
      <p className="mb-2 text-slate-500">
        {`Couldn't`} find what you were looking for. Sorry.
      </p>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Return Home
      </Link>
    </div>
  );
}
