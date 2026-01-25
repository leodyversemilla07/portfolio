import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { amount } = await request.json();

        // Validate amount
        if (!amount || typeof amount !== 'number') {
            return new Response(
                JSON.stringify({ error: 'Amount is required and must be a number' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (amount < 20) {
            return new Response(
                JSON.stringify({ error: 'Minimum amount is ₱20' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (amount > 100000) {
            return new Response(
                JSON.stringify({ error: 'Maximum amount is ₱100,000' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const secretKey = import.meta.env.PAYMONGO_SECRET_KEY;
        const siteUrl = import.meta.env.SITE_URL || 'http://localhost:4321';

        if (!secretKey) {
            console.error('PAYMONGO_SECRET_KEY is not set');
            return new Response(
                JSON.stringify({ error: 'Payment service is not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create PayMongo Checkout Session
        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        description: 'Thank you for supporting my work!',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount * 100, // Convert to centavos
                                name: 'Buy Me a Coffee',
                                quantity: 1,
                            },
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'card'],
                        success_url: `${siteUrl}/support/success`,
                        cancel_url: `${siteUrl}/support/cancel`,
                    },
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('PayMongo API error:', data);
            return new Response(
                JSON.stringify({ error: data.errors?.[0]?.detail || 'Failed to create checkout session' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const checkoutUrl = data.data?.attributes?.checkout_url;

        if (!checkoutUrl) {
            console.error('No checkout URL in response:', data);
            return new Response(
                JSON.stringify({ error: 'Failed to get checkout URL' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ url: checkoutUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Checkout error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
