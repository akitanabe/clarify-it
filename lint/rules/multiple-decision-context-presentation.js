import { createParagraphRule } from "./shared.mjs";

const presentationPatterns = [
  /複数の\s+decision context[^。\n]*(?:同時に|まとめて|一度に|同じ\s+turn)[^。\n]*(?:Human\s*(?:に|へ)\s*)?(?:提示|表示|扱|問|尋ね|要求)/u,
  /(?:同時に|まとめて|一度に|同じ\s+turn)[^。\n]*複数の\s+decision context[^。\n]*(?:Human\s*(?:に|へ)\s*)?(?:提示|表示|扱|問|尋ね|要求)/u,
];

export default createParagraphRule(
  presentationPatterns,
  "独立した複数の decision context を同時に提示する指示です。",
);
