import { checkEmail } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function CheckEamilForPassReset({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">
        Please enter your email <br />
        to reset your password
      </h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />

        <SubmitButton pendingText="Reseting..." formAction={checkEmail}>
          Reset
        </SubmitButton>
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center justify-center mt-3">
          <Link
            className="text-foreground font-medium underline"
            href="/sign-in"
          >
            Back to sign-in
          </Link>
        </div>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
