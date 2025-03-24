'use server';

import { cookies } from 'next/headers';

export async function getCookies() {
  const storeCookies = cookies();

  return storeCookies;
}