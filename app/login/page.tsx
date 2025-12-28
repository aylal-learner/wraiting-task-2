'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Chrome, FileText } from 'lucide-react';
import { OnboardingModal } from '../../components/OnboardingModal';

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#003366] px-10 py-14 text-white md:w-3/5">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:18px_18px]" />

          <div className="relative mx-auto max-w-md">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <FileText className="h-8 w-8" />
            </div>

            <h1 className="mt-8 font-lexend text-4xl font-semibold leading-tight tracking-tight">
              Achieve Band 7+ in Writing
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/80">
              Smart practice with instant structure analysis.
            </p>
          </div>
        </section>

        <section className="flex w-full items-center justify-center px-8 py-14 md:w-2/5">
          <div className="w-full max-w-sm">
            <h2 className="font-lexend text-3xl font-semibold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue your IELTS writing practice.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={e => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none ring-0 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none ring-0 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign In
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                onClick={() => setIsOpen(true)}
              >
                <Chrome className="h-5 w-5" />
                Continue with Google
              </button>

              <p className="pt-4 text-center text-sm text-gray-600">
                New here?{' '}
                <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>

      <OnboardingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
