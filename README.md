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

```sh
npm run lint          # eslint
npm run format        # prettier --write
npm run format:check  # prettier --check, same as CI
```

On commit, `lint-staged` formats the staged files with Prettier and _checks_
them with ESLint. It deliberately does not pass `--fix`: Prettier only ever
changes layout, but an ESLint autofix can rewrite logic — `vue/no-ref-as-operand`
turns `if (someRef)` into `if (someRef.value)` — and that should not land in a
commit unread. Run `npm run lint -- --fix` yourself when you want it, and read
the diff. CI runs the same checks on every pull request. `eslint-suppressions.json` records the lint
violations that already existed when linting was introduced, so the gate
stays green while still failing on anything new. Fixed one of them? Run
`npx eslint . --prune-suppressions` to drop it from the baseline.

### Structure

- **Main components** have to be exported in `./src/main.js`. Main Components should be in folder `./src/components`.
- **Ui Elements** for main components should be in `./src/components/ui` so everyone who contributes can see if there is an element/component already for their use.
- Components should be as small as possible to make the code easier to access and understand, thats why the directory structure has importance.
- Every logic/function according to articles/items/cart or anything else should be in the `cartStore` in `./src/stores/cart.js` - reason is as follows - all components get their data with so called props which are not "reactive" by nature. We want to trigger a rerender if we change/add/edit... items thats why anything according to that should be in the cartStore. Read the cartStore carefully and use the already existing states to grant a clean rerender/reactive process. The props all get updated as soon as the main states get updated in the `cartStore` -> rerender --> profit...

Try to understand this structure and adopt it with new components for easy implementation without much effort.

Real documentation is coming soon...
