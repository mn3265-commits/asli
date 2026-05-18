import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACKS: Record<string, (params: { villageName: string; firstName: string }) => string> = {
  id: ({ villageName, firstName }) =>
    `Halo dari ${villageName}. Saya ${firstName}. Terima kasih sudah membeli hasil kebun saya hari ini. Batch ini datang dari pohon yang ditanam kakek saya. Setiap kilo dipilih dengan tangan saya.`,
  en: ({ villageName, firstName }) =>
    `Hello from ${villageName}. I'm ${firstName}. Thank you for buying from my farm today. This batch came from the same trees my grandfather planted. Every kilo was picked by my hands.`,
  nl: ({ villageName, firstName }) =>
    `Hallo vanuit ${villageName}. Ik ben ${firstName}. Dank je dat je vandaag van mijn boerderij koopt. Deze partij komt van dezelfde bomen die mijn grootvader plantte.`,
  de: ({ villageName, firstName }) =>
    `Hallo aus ${villageName}. Ich bin ${firstName}. Danke, dass Sie heute von meinem Hof kaufen. Diese Charge stammt von denselben Bäumen, die mein Großvater pflanzte.`,
  ja: ({ villageName, firstName }) =>
    `${villageName}からこんにちは。${firstName}です。今日、私の農場から購入してくださってありがとうございます。このバッチは祖父が植えた木から来ました。`,
};

const LANG_NAMES: Record<string, string> = {
  id: "Indonesian",
  en: "English",
  nl: "Dutch",
  de: "German",
  ja: "Japanese",
};

export async function POST(request: Request) {
  let body: {
    farmerName?: string;
    villageName?: string;
    sourceText?: string;
    targetLang?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad body" }, { status: 400 });
  }

  const firstName = body.farmerName?.split(" ").slice(-1)[0] ?? "the farmer";
  const villageName = body.villageName ?? "the village";
  const targetLang = body.targetLang ?? "en";

  // If no Anthropic key, return graceful fallback (still useful demo).
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const fallback = FALLBACKS[targetLang]?.({ villageName, firstName });
    return NextResponse.json({
      ok: true,
      text: fallback ?? FALLBACKS.en({ villageName, firstName }),
      source: "fallback",
    });
  }

  // Real Claude call
  try {
    const client = new Anthropic({ apiKey });
    const languageName = LANG_NAMES[targetLang] ?? "English";
    const sourceText =
      body.sourceText ??
      `Halo dari ${villageName}. Saya ${firstName}. Saya seorang petani. Terima kasih sudah membeli hasil kebun saya hari ini.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system: `You translate Indonesian farmer voice memos to ${languageName}. Keep it warm, first-person, conversational. Preserve the simple cadence of someone speaking, not writing. 2-3 short sentences max. Output ONLY the translation, nothing else.`,
      messages: [{ role: "user", content: sourceText }],
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("")
      .trim();

    return NextResponse.json({
      ok: true,
      text: text || FALLBACKS[targetLang]?.({ villageName, firstName }),
      source: "claude",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      ok: true,
      text: FALLBACKS[targetLang]?.({ villageName, firstName }) ?? "",
      source: "fallback",
    });
  }
}
