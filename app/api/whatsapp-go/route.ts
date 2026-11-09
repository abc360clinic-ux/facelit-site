import { readLead, sendLead, validate } from "@/lib/lead";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const number = (q.get("n") ?? "").replace(/\D+/g, "");
  const lead = readLead(Object.fromEntries(q));
  if (!number || validate(lead)) return new Response("Bad request", { status: 400 });
  await sendLead(lead, "whatsapp").catch(console.error); // never block the user's redirect on email
  const to = `https://wa.me/${number}?text=${encodeURIComponent(`Hi Facelit, I'm ${lead.name}. I'd like to book ${lead.treatment}${lead.location ? ` at ${lead.location}` : ""}.`)}`;
  return new Response(null, { status: 302, headers: { Location: to } });
}
