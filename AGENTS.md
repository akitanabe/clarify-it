# Repository Guidelines

## 開発規範

変更前に [`skill-coding-rules.md`](./docs/skill-coding-rules.md) を参照してください。clarify-it の意味や責務を変更する場合は、`docs/philosophy.md` と `docs/specification.md` も確認します。完了前に diff を `docs/skill-coding-rules.md` に照らしてレビューしてください。

## プロジェクト構成

`src/` は配布 Skill の canonical runtime source です。`src/SKILL.md` と `src/references/` を編集し、`skills/clarify-it/` を再生成してください。生成物である `skills/` は直接編集しません。

`docs/philosophy.md` は長期的な設計意図、`docs/specification.md` は詳細仕様の正本です。Skill、contract、Method を変更する前に philosophy を読み、仕様上の変更は specification と runtime source の双方へ反映します。

textlint の独自 rule は `lint/rules/`、対応する正常・異常例は `lint/fixtures/<rule-name>/{valid,invalid}.md`、テスト本体は `lint/rules.test.mjs` にあります。Gunte の生成設定と contract は `gunte.toml`、`contracts.toml`、`gunte.lock.json` で管理します。

## ビルド・テスト・開発コマンド

- `npm ci`: lockfile に従って Node.js の開発依存を導入します。
- `npm test`: 独自 lint rule と統合設定を `node:test` で検証します。
- `npm run lint`: 生成済み Skill に全 textlint rule を適用します。
- `gunte emit`: `src/` から配布 artifact を再生成します。
- `gunte lock`: 意図した source・contract 変更後に lockfile を更新します。
- `gunte check`: 生成物の drift と contract 違反を検出します。

Skill 変更時は生成を行い、必要なら lockfile を更新してから、npm の両検証と `gunte check` を実行してください。

## コーディング規約と命名

JavaScript は ESM とし、2 スペース、ダブルクォート、セミコロン、`camelCase` を使用します。lint rule と fixture のディレクトリ名には `approval-scope-expansion` のような kebab-case を使います。Markdown は既存の日本語用語に合わせ、非規範の philosophy から新しい規範を導入しないでください。

コードは How、テストは観測可能な What を表現します。コメントはコードから復元できない制約や却下理由（Why Not）に限定します。外部 I/O（Action）と決定処理（Calculation）を分け、事実を Data として受け渡してください。

## テスト方針

Red、Green、Refactor の順で TDD を行います。新しい lint rule には、finding がない `valid.md` と、rule ID を検出する `invalid.md` の両方を追加してください。数値の coverage 基準はありませんが、外部から観測できる受理・拒否経路を網羅します。提出前に `npm test`、`npm run lint`、関連する Gunte 検証を実行します。

## コミットと Pull Request

履歴では、英語または日本語の簡潔で説明的な件名が使われ、Issue・PR 番号が添えられる場合があります。Conventional Commits は必須ではありません。コミットには diff の言い換えではなく変更理由を記載します。Pull Request では関連 Issue、挙動への影響、正本と生成物の変更範囲、実行した検証コマンドを明示してください。表示結果が変わる場合のみ screenshot を添付します。
