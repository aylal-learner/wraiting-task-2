'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

export type TargetBand = '6.0' | '6.5' | '7.0' | '7.5+';
export type CurrentLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface OnboardingModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const TARGET_BANDS: readonly TargetBand[] = ['6.0', '6.5', '7.0', '7.5+'];
const LEVELS: readonly CurrentLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [targetBand, setTargetBand] = useState<TargetBand>('7.0');
  const [level, setLevel] = useState<CurrentLevel>('Intermediate');

  const canContinue = useMemo(() => Boolean(targetBand && level), [targetBand, level]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm [animation:fade-in_150ms_ease-out]"
        onClick={() => onClose?.()}
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl [animation:modal-pop_180ms_ease-out]" >
        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-lexend text-2xl font-semibold tracking-tight text-gray-900">
          Personalize Your Plan
        </h2>

        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700">Step 1</p>
            <p className="mt-1 text-base font-semibold text-gray-900">Target Band</p>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TARGET_BANDS.map(band => {
                const selected = band === targetBand;
                return (
                  <button
                    key={band}
                    type="button"
                    onClick={() => setTargetBand(band)}
                    className={
                      `relative flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition ` +
                      (selected
                        ? 'border-[#003366] bg-[#003366]/5 text-[#003366]'
                        : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50')
                    }
                  >
                    {band}
                    {selected ? (
                      <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#003366] text-white shadow">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Step 2</p>
            <p className="mt-1 text-base font-semibold text-gray-900">Current Level</p>

            <div className="mt-3 inline-flex w-full rounded-xl border border-gray-200 bg-gray-50 p-1">
              {LEVELS.map(option => {
                const selected = option === level;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLevel(option)}
                    className={
                      `w-full rounded-lg px-4 py-2 text-sm font-semibold transition ` +
                      (selected
                        ? 'bg-[#003366] text-white shadow'
                        : 'text-gray-700 hover:bg-white')
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => router.push('/dashboard')}
              className={
                'w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ' +
                (canContinue
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'cursor-not-allowed bg-gray-300')
              }
            >
              Go to Dashboard
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Your choices help tailor practice tasks and feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
