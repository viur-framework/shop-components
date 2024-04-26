import { createPinia } from "pinia";
import { createApp } from "vue";
// import bone from "@viur/vue-utils/bones/edit/bone.vue";
// import Wrapper_nested from "@viur/vue-utils/bones/edit/wrapper_nested.vue";

import App from "./App.vue";

// import CKEditor from "@ckeditor/ckeditor5-vue";

const pinia = createPinia();
const app = createApp(App)

app.use(pinia)
// app.use(CKEditor);

// app.component("Bone", bone);
// app.component("Wrapper_nested", Wrapper_nested);

app.mount("#app");
