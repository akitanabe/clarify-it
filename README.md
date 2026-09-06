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
   ├─ human-facing-projection.md
   └─ philosophy.md
```

`SKILL.md` が規範本体で、Specification / Method / Casebook を含みます。`SKILL.md` 単体で完結して動作します。
`references/human-facing-projection.md` は文章表現だけを整える共有 Method の詳細境界、`references/philosophy.md` は
矛盾や想定外ケースで設計意図を確認するための非規範 reference です。

## Documents

設計思想と詳細仕様の canonical source は `docs/` にあります。`docs/` は設計文書層です。

```text
docs/
├─ philosophy.md      # 長期的な設計思想の canonical source（非規範）
├─ specification.md   # maintainer 向け詳細仕様の canonical source
└─ skill-coding-rules.md # 開発規範
```

- `docs/philosophy.md` は長期的な設計思想の canonical source です。非規範であり、Skill runtime の新しい要件源にはなりません。
- `docs/specification.md` は maintainer 向け詳細仕様の canonical source です。
- `src/SKILL.md` は配布 Skill の canonical runtime source であり、自己完結した runtime normative surface です。
- `src/references/human-facing-projection.md` は Human-facing Projection の canonical reference です。
- `src/references/philosophy.md` は Skill runtime から参照可能な非規範 reference です。
- `skills/clarify-it/` は `src/` から生成される配布 artifact です。

`docs/specification.md` の意味上の変更は、配布 runtime source である `src/SKILL.md` へ反映します。

## Philosophy

`clarify-it` の設計判断は [`docs/philosophy.md`](./docs/philosophy.md) の理念に従います。中核は次の一文です。

> Human は結果に責任を持ち、Agent はその結果へ至る対話の整合性に責任を持つ。

`SKILL.md`、contract、Method のいずれを変更する場合も、着手前に必ず `docs/philosophy.md` を参照してください。
この repository の変更が妥当かどうかは、動くかどうかではなく、理念と整合するかどうかで決まります。特に次の
判断は、理念を読まずに決められません。

- ある事項を Human に問うのか、Agent が自分で決めるのか
- 規則を追加するのか、上位概念を更新するのか
- Method をどこまで詳細化してよいのか

ただし理念は非規範です。そこから Specification に無い MUST を直接導出はしません。矛盾や想定外ケースに直面した
とき、既存の規則が何を守ろうとしていたかを回復するために読みます。理念そのものを変える必要が生じた場合は、
`docs/philosophy.md` を改訂したうえで Specification へ明示的に反映します。

## Development

Skill source、reference、contract、test、lint rule を変更する場合は、
[`skill-coding-rules.md`](./docs/skill-coding-rules.md) の開発規範に従ってください。

`skills/` 配下は [Gunte](https://github.com/akitanabe/gunte) の生成物です。直接編集せず、`src/` の
source を変更してから再生成してください。

```bash
gunte emit    # source から artifact を生成する
gunte check   # artifact の drift と contract 違反を検査する
gunte lock    # gunte.lock.json を更新する
```

contract は `contracts.toml` で宣言します。Gunte は利用者側の dependency ではなく、この repository で Skill を
生成・検証するための道具です。

`docs/` は Gunte の管理外のため、`docs/` と `src/` の同期は `gunte check` では検知されません。

## License

MIT
