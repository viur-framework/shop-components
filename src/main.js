// imports
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { getTranslations } from "./utils";
import { de_translations, en_translations } from "@viur/vue-utils";
import en from "./translations/en"
import de from "./translations/de"
import fr from "./translations/fr"

export { default as ViurShop } from "./Shop.vue";

const ViurShopComponents = {
  async install(app,options) {

    let defaultLocale = options?.defaultLocale?options.defaultLocale:'de'
    let locale = options?.locale?options.locale:['de']
    let fallback = options?.fallback?options.fallback:'en'
    app.use(createPinia());

    let messages = {}
    // fetch translations from server
    let data = await getTranslations(locale)
    for(const loc of locale){
      if (loc === 'de'){
        messages[loc] = { ...de_translations, ...de, ...data[loc]}
      }else if (loc === 'fr'){
        messages[loc] = { ...fr, ...data[loc]}
      }else if (loc === 'en'){
        messages[loc] = {...en_translations, ...en, ...data[loc]}
      }else{
        messages[loc] = {...data[loc]}
      }
    }

    // server_translations will be overwritten by utils. Both are overwritten by local shop translations
    app.use(
      createI18n({
        locale: defaultLocale,
        fallbackLocale: fallback,
        messages: messages,
      })
    );
  },
};

// Export the plugin as default
export default ViurShopComponents;
