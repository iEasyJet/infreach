import { updatePasswordAfterCheckEmail } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Set new password</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your new password"
          minLength={6}
          required
        />
        <SubmitButton
          formAction={updatePasswordAfterCheckEmail}
          pendingText="Setting..."
        >
          Set new password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
