# Human-facing Projection

`Human-facing Projection` は、caller が意味・構成・tone を確定した文章を、実際の読者が自然に理解できる表現へ整える共有 Method です。

文章の表現を扱いますが、文章が伝える意味と、caller が決めた構成の owner にはなりません。`clarify-it` では独立した workflow phase / state ではなく、
`Select & Present` の提示直前と `Completed` の説明を返す前に、必要な範囲で軽く適用します。

## Inputs and ownership

caller は次の内容を確定した通常の文章を渡します。

- **意味** — 判断対象、目的への影響、条件、制約、不確実性、判断、固有概念の関係
- **構成** — decision context、比較対象・判断軸、選択肢、判断材料、推奨と理由、提示順
- **tone / personality** — Human と用途に合わせた語り口

caller は、何を聞くか、何を推奨するか、どの順で提示するかを確定します。固定 schema、mode 指定、用語対応表、変換ログは要求しません。

Method は semantic model や structured data から新しい内容を生成せず、第二の Local Model も持ちません。

caller が意味・構成・tone を確定する前に、この Method が内容を補ったり、構成を決めたりしません。

## Result and caller boundary

通常は変換後の文章だけを返します。caller は返された文章を採用する責任と、意味・条件・判断の保持を確認する責任を所有し、必要な選択・判断・構成と、
表示・保存・送信などの Action を担います。

入力と出力は文章を表す Data です。Method はその Data の表現だけを整え、出力を適用する Action は caller に残します。

Method は文章を保存、表示、送信せず、caller の完了や後続 Action も決めません。

Method は新しい意味、条件、理由、判断を加えず、既存の意味要素を独自に削除しません。文・段落の表現を整えるための言い換えと、同じ意味を重ねた表現の整理は、
情報そのものの削除と区別します。

## Method

文・段落の表現は一つの固定手順で決めず、次の操作を必要な範囲で組み合わせます。

- 文を分ける、語順を変える、主語・対象・条件を明示する
- 圧縮された意味を、元の意味を保つ最小限の範囲で展開する
- 意味が重複する表現を統合する
- 説明用の内部抽象語を、Human が使用する言語で意味の取れる表現へ言い換える

名称そのものを読者が参照する必要がある正式名称や、後続で参照する名称は保持します。`Human Decision Point`、`decision context`、`Select & Present`、
`Completed` など、正式な構造・判定を指す名称を一律に言い換えません。

説明のためだけの内部語は、それを知らなくても意味が取れる文へ変えます。説明は Human が使用する言語で自然に読める状態を基本とします。

固定辞書による単語置換を主方式にしません。

自然に理解できるところまでだけ展開します。平易化を理由に背景、例、理由を新しく補ったり、説明を無制限に増やしたりしません。すでに読みやすい文章はそのまま返します。
繰り返し適用しても不要な表現の揺れを生まないことを優先しますが、数学的な冪等性や byte equality は保証しません。

安全に意味を展開できない箇所は元の表現を残します。他の箇所を安全に改善できるなら、その範囲で改善します。Method は調査、Human clarification、resolution loop を
開始しません。残った読みにくさは caller が確認する手掛かりです。

code、command、path、identifier、machine-readable output、source quotation は変換対象に含めず、その内容を保持します。説明文と混在する場合も同じ境界を守ります。

### Readability signals

次の signals は、変換の必要性を判断する手掛かりです。固定 score、合否判定、機械的な validator にはしません。

- 内部抽象語への依存
- 説明目的の英語混在
- 条件・対象・動作の過剰な圧縮
- 追いにくい修飾関係
- 主語・対象の不明瞭さ
- 一文への条件・判断・動作の詰め込み

### Scope in clarify-it

`clarify-it` では、対話中の説明と `Completed` 時の Human-facing な説明に適用します。後から単独で判断根拠にする成果物の strictness や利用条件は、
この Method の責務に含めず、必要なら別の caller が決めます。

## Autonomous Method boundary

文・段落の言い換えには複数の適切な結果があり、Human-facing Projection は autonomous な Method です。

Method は意味・構成・tone の判断を caller から引き取りません。

固定 Procedure、Programmatic Flow、辞書置換器、読みやすさ validator、score、固定 schema は追加しません。
