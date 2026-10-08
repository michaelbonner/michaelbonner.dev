## Talking to Cloudflare

Use the `cf` CLI (Cloudflare's official CLI) for anything that reads or changes
Cloudflare: deploys, Workers secrets, D1, KV, R2, DNS, zones, logs, and account
settings. Don't reach for `wrangler`, raw `curl` against `api.cloudflare.com`, or
the dashboard when `cf` can do it.

- Find the right command with `cf cli search "<what you want to do>"` instead of
  walking nested `--help` output. Keep queries generic (action + resource type);
  never put domains, account/zone IDs, names, or tokens in a search query.
- Run `<command> --help` once you've found it; `cf schema <command>` shows the
  underlying API request.
- Check auth with `cf auth whoami`; use `--profile` / `cf auth activate` if this
  project needs a different account.
- Local-only tooling that the repo's scripts already wire up (e.g. `wrangler dev`,
  `wrangler types`, CI deploy workflows) can stay as is.
