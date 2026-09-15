import { buildContentMatrix } from "@/lib/content-matrix";
import { ContentMatrixEditor } from "@/components/content/ContentMatrixEditor";

export default function ContentPage() {
  const entries = buildContentMatrix();

  return <ContentMatrixEditor entries={entries} />;
}
