import { ChildProps } from '@/types';
import { Suspense as ReactSuspense } from 'react';
import { Loader } from '../shared/loader';

export const Suspense = ({ children }: ChildProps) => (
    <ReactSuspense fallback={<Loader />}>{children}</ReactSuspense>
);
