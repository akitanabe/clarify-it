import { createParagraphRule } from "./shared.mjs";

const expansionPatterns = [
  /(?:`?ok`?|短い承認)\s*(?:を|は)\s*(?:モデル全体|追加\s+Reconstruction)[^。\n]*(?:承認|妥当性|根拠)[^。\n]*(?:として扱う|とみなす|にする|へ拡張する)/u,
];

export default createParagraphRule(
  expansionPatterns,
  "短い承認の対象範囲を明示的に拡張しています。",
);
