import { useState } from 'react';
import type { FormEvent } from 'react';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactFormProps {
    accessKey: string;
}

export function ContactForm({ accessKey }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8 animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                    <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Message Sent!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Thank you for reaching out. I'll get back to you soon!
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms Access Key - Hidden */}
            <input
                type="hidden"
                name="access_key"
                value={accessKey}
            />

            {/* Name Field */}
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'border-neutral-200 dark:border-neutral-700',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200'
                    )}
                    placeholder="Your name"
                />
            </div>

            {/* Email Field */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'border-neutral-200 dark:border-neutral-700',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200'
                    )}
                    placeholder="your@email.com"
                />
            </div>

            {/* Message Field */}
            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'border-neutral-200 dark:border-neutral-700',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200 resize-none'
                    )}
                    placeholder="Your message..."
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                    'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
                    'bg-emerald-600 hover:bg-emerald-700 text-white',
                    'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        <span>Send Message</span>
                    </>
                )}
            </button>
        </form>
    );
}
