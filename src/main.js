// imports
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { de_translations, en_translations } from "@viur/vue-utils";
import {useTranslations} from "@viur/vue-utils/utils/translations"

import en from "./translations/en"
import de from "./translations/de"
import fr from "./translations/fr"

export { default as ViurShop } from "./Shop.vue";

const ViurShopComponents = {
  async install(app,options) {
    


    
    let defaultLocale = options?.defaultLocale?options.defaultLocale:'de'
    let locale = options?.locale?options.locale:['de']
    let fallback = options?.fallback?options.fallback:'en'

    let additionals = options?.additionals?options.additionals:{}

    app.use(createPinia());

    let messages = {}
    const i18n = createI18n({
      locale: defaultLocale,
      fallbackLocale: fallback,
      messages: messages,
    })
    const {fetchTranslations, updateLocaleMessages} = useTranslations(i18n.global)
    // fetch translations from server
    let data = await fetchTranslations(locale,options?.pattern)
    for(const loc of locale){
      let locAdditionals = additionals?.[loc]?additionals[loc]:{}

      if (loc === 'de'){
        messages[loc] = { ...de_translations, ...de, ...locAdditionals, ...data[loc]}
      }else if (loc === 'fr'){
        messages[loc] = { ...fr, ...locAdditionals, ...data[loc]}
      }else if (loc === 'en'){
        messages[loc] = {...en_translations, ...en, ...locAdditionals, ...data[loc]}
      }else{
        messages[loc] = {...locAdditionals, ...data[loc]}
      }
      updateLocaleMessages(loc, messages[loc])
    }
    app.use(
      i18n
    );
  },
};

// Export the plugin as default
export default ViurShopComponents;
