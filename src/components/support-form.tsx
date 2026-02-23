import { useState } from 'react';
import { Coffee, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PRESET_AMOUNTS = [50, 100, 200];

export function SupportForm() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAmount = (): number => {
        if (customAmount) {
            return parseInt(customAmount, 10);
        }
        return selectedAmount || 0;
    };

    const handlePresetClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
        setError(null);
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
        setSelectedAmount(null);
        setError(null);
    };

    const handleSubmit = async () => {
        const amount = getAmount();

        if (amount < 20) {
            setError('Minimum amount is ₱20');
            return;
        }

        if (amount > 100000) {
            setError('Maximum amount is ₱100,000');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to PayMongo checkout
            window.location.href = data.url;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setIsLoading(false);
        }
    };

    const amount = getAmount();

    return (
        <div className="space-y-6">
            {/* Preset Amounts */}
            <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Choose an amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {PRESET_AMOUNTS.map((preset) => (
                        <button
                            key={preset}
                            type="button"
                            onClick={() => handlePresetClick(preset)}
                            className={cn(
                                'relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200',
                                selectedAmount === preset
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                    : 'border-neutral-200 dark:border-neutral-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                            )}
                        >
                            <Coffee
                                size={20}
                                className={cn(
                                    'mb-1',
                                    selectedAmount === preset
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-neutral-400'
                                )}
                            />
                            <span className={cn(
                                'text-lg font-semibold',
                                selectedAmount === preset
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-neutral-900 dark:text-neutral-100'
                            )}>
                                ₱{preset}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {preset === 50 ? '1 Coffee' : preset === 100 ? '2 Coffees' : '4 Coffees'}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Amount */}
            <div>
                <label
                    htmlFor="custom-amount"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                    Or enter a custom amount
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-medium">
                        ₱
                    </span>
                    <input
                        id="custom-amount"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className={cn(
                            'w-full pl-8 pr-4 py-3 rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                            'transition-all duration-200',
                            customAmount
                                ? 'border-emerald-500'
                                : 'border-neutral-200 dark:border-neutral-700'
                        )}
                    />
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Minimum ₱20, Maximum ₱100,000
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || amount < 20}
                className={cn(
                    'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-200',
                    'bg-emerald-600 hover:bg-emerald-700 text-white',
                    'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <Coffee size={20} />
                        <span>Support with ₱{amount || '—'}</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
        </div>
    );
}
