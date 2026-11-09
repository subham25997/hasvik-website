import type { TechIconKey } from "./tech-icons.generated";

export type Tech = { key: TechIconKey; name: string; note: string };

export const frontendStack: Tech[] = [
  { key: "react", name: "React", note: "Component-driven, interactive UIs" },
  { key: "nextjs", name: "Next.js", note: "Fast, SEO-friendly React framework" },
  { key: "vue", name: "Vue.js", note: "Progressive, lightweight UI framework" },
  { key: "javascript", name: "JavaScript", note: "The language of the web" },
  { key: "typescript", name: "TypeScript", note: "Type-safe, maintainable code" },
  { key: "tailwind", name: "Tailwind CSS", note: "Utility-first, consistent design" },
];

export const backendStack: Tech[] = [
  { key: "nestjs", name: "NestJS", note: "Structured, scalable Node.js APIs" },
  { key: "java", name: "Java", note: "Robust enterprise back ends" },
  { key: "nodejs", name: "Node.js", note: "Fast JavaScript servers" },
  { key: "mongodb", name: "MongoDB", note: "Flexible document database" },
  { key: "postgresql", name: "PostgreSQL", note: "Reliable relational database" },
  { key: "mysql", name: "MySQL", note: "Proven relational database" },
];
