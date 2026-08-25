<div align="center">
    <img src="https://github.com/viur-framework/viur-artwork/raw/main/icons/icon-shop-components.svg" height="196" alt="A hexagonal logo of Shop Components" title="Shop Components logo"/>
    <h1>ViUR Shop Components</h1>
    <a href="https://www.npmjs.com/package/@viur/shop-components">
        <img alt="Badge showing current NPM version" title="PyPI" src="https://img.shields.io/npm/v/@viur/shop-components">
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/viur-framework/shop-components" alt="Badge displaying the license" title="License badge">
    </a>
    <br />
    A collection of Vue.js components for the <a href="https://www.viur.dev">ViUR</a>
    <a href="https://github.com/viur-framework/viur-shop">shop</a>.
</div>

### Development

#### Setup, once per clone

```sh
npm install     # also installs the pre-commit hook via the `prepare` script
```

If you work on this package as a git submodule of another project, run
`npm install` **inside this directory**, not in the parent. A parent install
does not run a workspace member's `prepare` script, so the hook would be
missing.

#### The loop

```sh
npm run build            # or: npm run watch
npm run lint             # what ESLint thinks
npm run format:check     # am I formatted the way CI wants?
npm run format           # reformat everything (safe, see below)
```

`npm run format` is safe to run and commit unread. Prettier reparses the file
and prints it again, so it can only change layout — never meaning. Verified on
this repo: reformatting all 42 source files changed nothing in the built bundle
except the `data-v-…` scoped-style hashes.

`npm run lint` is a different axis and will **not** be fixed by `format`.
Formatting rules are switched off in ESLint on purpose (`eslint-config-prettier`),
so the two never disagree.

#### Reading `npm run lint`

Warnings do not block anything — neither the hook nor CI. They are a to-do
list, not a wall. Only **errors** fail.

Want the autofixable ones applied?

```sh
npm run lint -- --fix
git diff                 # read this — do not skip it
```

Most of what `--fix` does is harmless attribute reordering, but some rules
rewrite logic. `vue/no-ref-as-operand` turns `if (someRef)` into
`if (someRef.value)`. That is usually correct and sometimes a real bug fix,
but it is a behaviour change and belongs in its own reviewed commit — not
bundled into unrelated work. This is why the pre-commit hook does _not_ run
`--fix` for you.

#### Committing

Just commit. The hook does the rest.

```sh
git add …
git commit -m "…"
```

`lint-staged` then runs Prettier over your staged files, restages them, and
checks them with ESLint.

| what happens                     | what you do                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| commit succeeds                  | nothing — your files were formatted for you                                                                                                                                          |
| `✖ eslint` and the commit aborts | a **new error** was introduced. The output names the rule, file and line. Fix it and commit again. Your work is not lost: `lint-staged` restores the original state before aborting. |
| the hook is in the way           | `git commit --no-verify`. CI will still catch it.                                                                                                                                    |

The hook is a convenience, not the gate. The gate is the GitHub Action, which
runs `npm run format:check` and `npm run lint` on every pull request.

#### `eslint-suppressions.json`

When linting was introduced this codebase already had 28 error-level
violations. Weakening the rules to get a green build would have hidden them
forever, so they are recorded in this file instead — ESLint's bulk suppressions.

What that buys: `npm run lint` exits 0 today, but every **new** violation still
fails. The baseline counts per file and per rule, so a _third_ `valid-typeof` in
a file already listed with two of them is rejected.

**You normally never touch this file.** Two cases where you do:

- **You fixed one of the listed violations.** The entry is now stale. Drop it:

  ```sh
  npx eslint . --prune-suppressions
  ```

  Commit the result together with your fix.

- **You are adding a rule to an existing codebase** and want the same
  treatment. `npx eslint . --suppress-all` writes the current state as the new
  baseline. Use this deliberately — it silences everything that exists right now.

What it is _not_ for: making your own new code pass. If the linter complains
about a line you just wrote, fix the line.

Curious what is hidden? Point ESLint at an empty baseline and the suppressed
errors come back:

```sh
echo '{}' > /tmp/none.json && npx eslint . --suppressions-location /tmp/none.json
```

`177 problems (0 errors, 177 warnings)` becomes `205 problems (28 errors, 177
warnings)` — those 28 are the baseline.

### Structure

- **Main components** have to be exported in `./src/main.js`. Main Components should be in folder `./src/components`.
- **Ui Elements** for main components should be in `./src/components/ui` so everyone who contributes can see if there is an element/component already for their use.
- Components should be as small as possible to make the code easier to access and understand, thats why the directory structure has importance.
- Every logic/function according to articles/items/cart or anything else should be in the `cartStore` in `./src/stores/cart.js` - reason is as follows - all components get their data with so called props which are not "reactive" by nature. We want to trigger a rerender if we change/add/edit... items thats why anything according to that should be in the cartStore. Read the cartStore carefully and use the already existing states to grant a clean rerender/reactive process. The props all get updated as soon as the main states get updated in the `cartStore` -> rerender --> profit...

Try to understand this structure and adopt it with new components for easy implementation without much effort.

Real documentation is coming soon...
