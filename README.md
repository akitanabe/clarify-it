# clarify-it

`clarify-it` は、まだ固まっていない設計や方針を、対話しながら段階的に詰めていくための Skill です。

Agent は、調べれば分かることや、すでに決まったことから導けることを先に片付けます。そのうえで、あなたにしか決められない
判断だけを、一度に一つずつ提示します。あなたの回答は個別の Q&A として積み上がるのではなく、その時点の結論全体と辻褄が
合うように組み直されます。過去に何をどういう前提で決めたかを、あなたが覚えておく必要はありません。

決めることに専念する Skill なので、成果物や Issue の編集、実装は行いません。特定の workflow や repository に固有でも
ないため、設計、仕様、方針など、決めごと全般に使えます。

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
