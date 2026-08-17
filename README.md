# clarify-it

`clarify-it` は、Human の判断権限を維持したまま、意思決定モデルの構築・圧縮・整合性維持を Agent に委ねる Skill です。

Agent は調査、分析、技術的導出によって自分で解消できる不確実性を先に潰し、Human の価値判断だけが残る decision context を
一度に一つ提示します。Human の応答は局所回答として積み上げるのではなく、現在の一貫した意思決定モデルへ再統合されます。
成果物や Issue の編集、実装、後続 Action は行いません。

特定の workflow や repository に固有の Skill ではなく、対話しながら設計・方針・判断を段階的に固めたい場面で汎用に使えます。

## Installation

```bash
npx skills add akitanabe/clarify-it
```

Claude Code、Codex、Cursor など Skill に対応した Agent から利用できます。

## Skill artifact

配布対象は `skills/clarify-it/` です。

```text
skills/clarify-it/
├─ SKILL.md
└─ references/
   └─ philosophy.md
```

`SKILL.md` が規範本体で、Specification / Method / Casebook を含みます。`SKILL.md` 単体で完結して動作し、
`references/philosophy.md` は矛盾や想定外ケースで設計意図を確認するための非規範 reference です。

## Documents

`docs/` は Skill 化する前の原文です。

```text
docs/
├─ philosophy.md      # 基本理念の正本
└─ specification.md   # Specification / Method / Casebook の原文
```

`docs/philosophy.md` が理念の正本で、`src/references/philosophy.md` は同じ理念を Skill 実行時の参照向けに
圧縮・改編した派生です。理念そのものを変更する場合は `docs/` を起点にしてください。

`docs/` は Gunte の管理外のため、`docs/` と `src/` の乖離は `gunte check` では検知されません。src 側へ
反映するかどうかは、原文を改訂するたびに個別に判断します。

## Development

`skills/` 配下は [Gunte](https://github.com/akitanabe/gunte) の生成物です。直接編集せず、`src/` の
source を変更してから再生成してください。

```bash
gunte emit    # source から artifact を生成する
gunte check   # artifact の drift と contract 違反を検査する
gunte lock    # gunte.lock.json を更新する
```

contract は `contracts.toml` で宣言します。Gunte は利用者側の dependency ではなく、この repository で Skill を
生成・検証するための道具です。

## License

MIT
