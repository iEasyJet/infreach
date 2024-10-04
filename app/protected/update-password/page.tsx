import { updatePassword } from '@/app/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Please set new password</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your new password"
          minLength={6}
          required
        />
        <SubmitButton formAction={updatePassword} pendingText="Setting...">
          Set new password
        </SubmitButton>
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center justify-center mt-3">
          <Link
            className="text-foreground font-medium underline"
            href="/protected"
          >
            Back to profile
          </Link>
        </div>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
