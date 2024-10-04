'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = createClient();
  const origin = headers().get('origin');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/protected');
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};

export const updatePassword = async (formData: FormData) => {
  const password = formData.get('password') as string;
  const supabase = createClient();

  if (!password) {
    return { error: 'Password is required' };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect(
      'error',
      '/protected/update-password',
      error.message
    );
  } else {
    return encodedRedirect(
      'success',
      '/protected',
      'Your password has been successfully changed.'
    );
  }
};

export const checkEmail = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const supabase = createClient();
  const origin = headers().get('origin');

  if (!email) {
    return { error: 'Email is required' };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback-password`,
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect(
      'error',
      '/check-email-for-pass-reset',
      error.message
    );
  } else {
    return encodedRedirect(
      'success',
      '/check-email-for-pass-reset',
      'Please check your email for a link for reset password.'
    );
  }
};

export const updatePasswordAfterCheckEmail = async (formData: FormData) => {
  const password = formData.get('password') as string;
  const supabase = createClient();

  if (!password) {
    return { error: 'Password is required' };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-in', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-in',
      'Your password has been successfully changed.'
    );
  }
};
