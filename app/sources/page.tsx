import { SourcesContent } from "@/components/sources-content";

export const metadata = {
  title: "Sources — Asli",
  description:
    "Citations for every statistic on Asli — USDA, IFAD, ICCO, FAO, EUDR text, FSMA-204 rule, IPCC AR6, and more.",
};

export default function SourcesPage() {
  return <SourcesContent lang="en" />;
}
