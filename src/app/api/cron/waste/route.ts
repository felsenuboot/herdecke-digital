import { runWasteReminders } from '@/lib/waste-reminders';
import { config } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Evening cron (see vercel.json) — emails reminders for next-day collections. */
export async function GET(req: Request) {
  if (config.cronSecret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${config.cronSecret}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }
  try {
    const result = await runWasteReminders();
    console.log('[cron] waste reminders:', JSON.stringify(result));
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error('[cron] waste failed:', (err as Error).message);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
