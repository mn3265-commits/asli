import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  TechStackDiagram,
  ComparisonDiagram,
  LifecycleDiagram,
  PriceShareDiagram,
  TargetsDashboard,
} from "@/components/memo-graphics";

export const metadata = {
  title: "Strategic memo — Asli",
  description:
    "Asli: selling Indonesia's commodities by name. A strategic memo, in the style of Harvard Business Review.",
};

// Section graphics — keyed to slugified H2 headings as they appear in the markdown.
const SECTION_GRAPHICS: Record<string, React.ReactNode> = {
  "ii-the-thesis-invert-the-unit-of-trust": <LifecycleDiagram />,
  "iii-the-technology-stack": <TechStackDiagram />,
  "iv-the-business-model": <PriceShareDiagram />,
  "v-why-this-isnt-another-traceability-startup": <ComparisonDiagram />,
  "vii-what-success-looks-like-in-18-months": <TargetsDashboard />,
};

export default async function StrategyPage() {
  const filePath = join(process.cwd(), "ASLI_STRATEGY.md");
  let markdown = "";
  try {
    markdown = await readFile(filePath, "utf-8");
  } catch {
    markdown = "# Document not found";
  }

  const sections = splitSections(markdown);

  return (
    <>
      {/* Print-controls — hidden on print */}
      <div className="print:hidden bg-[var(--fg)] text-[var(--ivory)] sticky top-[57px] z-30 border-b border-[var(--ivory)]/10">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-80 hover:opacity-100"
          >
            <ArrowLeft size={14} />
            Back to Asli
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-70 hidden sm:inline">
              Strategic memo · w/ figures
            </span>
            <PrintButton />
          </div>
        </div>
      </div>

      <article className="prose-asli max-w-3xl mx-auto px-5 sm:px-8 pt-10 pb-24">
        {sections.map((sec, i) => (
          <div key={i}>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(sec.body, { gfm: true }) as string,
              }}
            />
            {sec.slug && SECTION_GRAPHICS[sec.slug] && (
              <div className="my-2">{SECTION_GRAPHICS[sec.slug]}</div>
            )}
          </div>
        ))}
      </article>

      <style>
        {`
          .prose-asli {
            font-family: var(--font-jakarta), ui-sans-serif, system-ui;
            color: var(--fg);
            line-height: 1.65;
          }
          .prose-asli h1 {
            font-size: 2.5rem;
            line-height: 1.05;
            letter-spacing: -0.025em;
            font-weight: 800;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
          }
          .prose-asli h2 {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-top: 3.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--line);
            color: var(--moss);
          }
          .prose-asli h3 {
            font-size: 1.15rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 0.5rem;
          }
          .prose-asli p {
            margin: 1rem 0;
            font-size: 1.05rem;
            color: var(--fg-soft);
          }
          .prose-asli p em { color: var(--muted); font-style: italic; }
          .prose-asli strong { color: var(--fg); font-weight: 700; }
          .prose-asli blockquote {
            border-left: 4px solid var(--ochre);
            background: var(--ochre-soft);
            padding: 1.25rem 1.5rem;
            margin: 2rem 0;
            border-radius: 0 1rem 1rem 0;
            font-style: normal;
          }
          .prose-asli blockquote p { margin: 0.5rem 0; color: var(--fg); }
          .prose-asli blockquote p:first-child { margin-top: 0; }
          .prose-asli blockquote p:last-child { margin-bottom: 0; }
          .prose-asli blockquote strong {
            color: var(--clay);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.8rem;
            display: block;
            margin-bottom: 0.25rem;
          }
          .prose-asli hr {
            border: none;
            text-align: center;
            margin: 3rem 0;
          }
          .prose-asli hr::after {
            content: "§ § §";
            color: var(--muted);
            letter-spacing: 0.5em;
            font-size: 0.9rem;
          }
          .prose-asli ul, .prose-asli ol {
            margin: 1rem 0;
            padding-left: 1.5rem;
          }
          .prose-asli li { margin: 0.4rem 0; color: var(--fg-soft); }
          .prose-asli table {
            width: 100%;
            margin: 1.5rem 0;
            border-collapse: collapse;
            font-size: 0.95rem;
          }
          .prose-asli th {
            background: var(--moss-soft);
            color: var(--fg);
            padding: 0.75rem 1rem;
            text-align: left;
            font-weight: 700;
            font-size: 0.85rem;
            border-bottom: 2px solid var(--moss);
          }
          .prose-asli td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--line);
            color: var(--fg-soft);
          }
          .prose-asli tr:last-child td { border-bottom: none; }
          .prose-asli code {
            background: var(--bg-deep);
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9em;
            color: var(--clay);
          }
          .prose-asli a {
            color: var(--moss);
            font-weight: 600;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .prose-asli h1 + h3 {
            color: var(--muted);
            font-weight: 600;
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 2rem;
            line-height: 1.4;
          }

          @media print {
            @page { size: A4; margin: 25mm 22mm; }
            body { background: white !important; color: black !important; }
            .prose-asli {
              max-width: 100% !important;
              padding: 0 !important;
              font-size: 11pt;
              line-height: 1.55;
            }
            .prose-asli h1 { font-size: 24pt; page-break-after: avoid; }
            .prose-asli h2 { font-size: 14pt; page-break-after: avoid; color: #2f5d3a; }
            .prose-asli h3 { font-size: 12pt; page-break-after: avoid; }
            .prose-asli blockquote { background: #faf5e8 !important; page-break-inside: avoid; }
            .prose-asli table, .not-prose { page-break-inside: avoid; }
            .prose-asli p, .prose-asli li { orphans: 3; widows: 3; }
          }
        `}
      </style>
    </>
  );
}

function PrintButton() {
  return (
    <form action="javascript:window.print()">
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ochre)] text-[var(--fg)] text-xs font-bold tap"
      >
        <Printer size={12} />
        Save as PDF
      </button>
    </form>
  );
}

function splitSections(md: string): { slug: string; body: string }[] {
  const lines = md.split("\n");
  const out: { slug: string; body: string }[] = [];
  let currentSlug = "";
  let buf: string[] = [];

  const flush = () => {
    if (buf.length > 0) {
      out.push({ slug: currentSlug, body: buf.join("\n") });
      buf = [];
    }
  };

  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      flush();
      currentSlug = slugify(m[1]);
    }
    buf.push(line);
  }
  flush();
  return out;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
