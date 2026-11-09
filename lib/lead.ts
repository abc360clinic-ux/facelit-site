// Shared by /api/booking, /api/whatsapp-go, /api/call-go. Sends the lead through Resend's HTTP API.
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const FIELDS = ["formType", "name", "email", "phone", "location", "treatment", "timing", "message", "gender", "regarding",
  "heardAbout", "medicalHistory", "existingConditions", "pastSurgeries", "priorTreatment", "adverseReaction", "source", "pageUrl"] as const;
export type Lead = Partial<Record<(typeof FIELDS)[number] | "website", string>>;

export const readLead = (src: Record<string, unknown>): Lead =>
  Object.fromEntries([...FIELDS, "website"].map((k) => [k, String(src[k] ?? "").trim().slice(0, 2000)]));

export function validate(l: Lead): string {
  const email = !l.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l.email);
  if (l.formType === "consultation") return !l.name || (l.phone ?? "").length < 7 ? "Please fill in name and phone." : email ? "" : "Please enter a valid email.";
  if (!l.name || (l.phone ?? "").length < 7 || !l.treatment || !l.location) return "Please fill in name, phone, treatment, and location.";
  return email ? "" : "Please enter a valid email.";
}

/** Returns a lead id, or throws if the email could not be sent. Honeypot hits are dropped silently. */
export async function sendLead(l: Lead, via = "form"): Promise<string> {
  const id = crypto.randomUUID();
  if (l.website) return id; // honeypot filled -> pretend success, send nothing
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  const rows = FIELDS.filter((k) => l[k]).map((k) => `<tr><td><b>${k}</b></td><td>${esc(l[k]!)}</td></tr>`).join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM ?? "Facelit Leads <onboarding@resend.dev>",
      to: (process.env.LEAD_TO ?? "abc360clinic@gmail.com").split(","),
      reply_to: l.email || undefined,
      subject: `New lead (${via}): ${l.name} – ${l.treatment || l.formType || "enquiry"}${l.location ? ` – ${l.location}` : ""}`,
      html: `<table cellpadding="6">${rows}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return id;
}
