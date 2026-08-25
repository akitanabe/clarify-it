import { createParagraphRule } from "./shared.mjs";

const exposurePatterns = [
  /(?:Human Decision Point|current context|Reconstruction|Frame|Resolve|Select & Present|Integrate|Reevaluate|内部\s+state\s+名|内部語彙|内部(?:の)?(?:構造|判定用語))\s*(?:という(?:ラベル|用語|名称)\s*)?を\s*(?:そのまま\s*)?Human\s*(?:に|へ)\s*(?:提示|表示|見せ|伝え|説明)/u,
  /Human\s*(?:に|へ)\s*(?:内部\s+state\s+名|内部語彙|内部(?:の)?(?:構造|判定用語)|Human Decision Point|current context|Reconstruction|Frame|Resolve|Select & Present|Integrate|Reevaluate)[^。\n]*(?:理解させ|理解するよう求め|提示|表示|見せ|伝え|説明)/u,
];

export default createParagraphRule(
  exposurePatterns,
  "clarify-it の内部語彙をそのまま Human に提示する指示です。",
);
