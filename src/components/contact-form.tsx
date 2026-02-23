import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

interface ContactFormProps {
    accessKey: string;
}

export function ContactForm({ accessKey }: ContactFormProps) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const onSubmit = async (values: FormValues) => {
        setServerError(null);
        const formData = new FormData();
        formData.append('access_key', accessKey);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('message', values.message);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setIsSuccess(true);
                reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (err) {
            setServerError(err instanceof Error ? err.message : 'Something went wrong');
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200',
                        errors.name
                            ? 'border-red-400 dark:border-red-600'
                            : 'border-neutral-200 dark:border-neutral-700'
                    )}
                    placeholder="Your name"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200',
                        errors.email
                            ? 'border-red-400 dark:border-red-600'
                            : 'border-neutral-200 dark:border-neutral-700'
                    )}
                    placeholder="your@email.com"
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email.message}</p>
                )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900',
                        'text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                        'transition-all duration-200 resize-none',
                        errors.message
                            ? 'border-red-400 dark:border-red-600'
                            : 'border-neutral-200 dark:border-neutral-700'
                    )}
                    placeholder="Your message..."
                />
                {errors.message && (
                    <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message.message}</p>
                )}
            </div>

            {/* Server Error */}
            {serverError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {serverError}
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
