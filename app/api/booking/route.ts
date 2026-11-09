import { readLead, sendLead, validate } from "@/lib/lead";

export async function POST(req: Request) {
  const lead = readLead(await req.json().catch(() => ({})));
  const error = validate(lead);
  if (error) return Response.json({ code: "invalid", message: error }, { status: 400 });
  try {
    return Response.json({ id: await sendLead(lead) });
  } catch (e) {
    console.error(e);
    return Response.json({ code: "mail_failed", message: "Could not send your request. Please call or WhatsApp us." }, { status: 502 });
  }
}
