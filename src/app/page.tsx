import type { Metadata } from "next";
import LandingContent from "./landing-content";

export const metadata: Metadata = {
  title: "French LMS — Aprenda Francês de Verdade",
  description:
    "Plataforma completa de ensino de francês para brasileiros. Aulas interativas, correção de áudio nativa, comunidade ativa e feedback individual.",
};

export default function LandingPage() {
  return <LandingContent />;
}
