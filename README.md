<div align="center">
    <h1>ViUR Shop Components (WIP)</h1>
    <a href="https://www.npmjs.com/package/@viur/shop-components">
        <img alt="Badge showing current NPM version" title="PyPI" src="https://img.shields.io/npm/v/@viur/shop-components">
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/viur-framework/shop-components" alt="Badge displaying the license" title="License badge">
    </a>
    <br />
    A collection of Vue.js components for the <a href="https://www.viur.dev">ViUR</a>
    <a href="https://github.com/viur-framework/viur-shop">shop</a>.
    <br />
    Main components have to be exported in ./src/main.js. Main Components should be in folder ./src/components.
    <br />
    Ui Elements for main components should be in ./src/components/ui so everyone who contributes can see if there is an element/component already for their use.
    Components should be as small as possible to make the code easier to access and understand, thats why the directory structure has importance.
    Every logic/function according to articles/items/cart or anything else should be in the cartStore in ./src/stores/cart.js - reason is as follows - all components get their data with so called props which are not "reactive" by nature. We want to trigger a rerender if we change/add/edit... items thats why anything according to that should be in the cartStore. Read the cartStore carefully and use the already existing states to grant a clean rerender/reactive process. The props all get updated as soon as the main states get updated in the cartStore -> rerender --> profit...
    <br />
    Try to understand this structure and adopt it with new components for easy implementation without much effort.
    <br />
    Real documentation is coming soon...
</div>
