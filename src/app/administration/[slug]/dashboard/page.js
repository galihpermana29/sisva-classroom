'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    router.push(`/administration/${slug}/dashboard/school/profile`);
  });
}
