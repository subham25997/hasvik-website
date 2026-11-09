import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";

async function MetadataRuntimeMarker() {
  await connection();
  return null;
}

function NotFound(): never {
  notFound();
}

export default function CatchAll() {
  return (
    <>
      <Suspense fallback={null}>
        <MetadataRuntimeMarker />
      </Suspense>
      <NotFound />
    </>
  );
}
