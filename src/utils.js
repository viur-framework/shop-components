import { Request } from "@viur/vue-utils"
import { useTranslations } from "@viur/vue-utils/utils/translations"
import { de_translations, en_translations } from "@viur/vue-utils"
import en from "./translations/en"
import de from "./translations/de"
import fr from "./translations/fr"

export function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  )
}

export function struct2dict(structure) {
  if (!Array.isArray(structure)) {
    return structure
  }

  let result = {}
  structure.forEach((bone) => (result[bone[0]] = bone[1]))

  return result
}

export function getTranslations(languages = "de", pattern = null) {
  if (!Array.isArray(languages)) {
    languages = [languages]
  }

  const { fetchTranslations, updateLocaleMessages } = useTranslations()
  let default_messages = {
    de: { ...de_translations, ...de },
    en: { ...en_translations, ...en },
    fr: { ...fr }
  }

  for (const loc of languages) {
    if (default_messages?.[loc]) {
      updateLocaleMessages(loc, default_messages[loc])
    }
  }
  return fetchTranslations(languages, pattern)
}

export function getImage(image) {
  if (image !== undefined) return Request.downloadUrlFor(image)

  return "PLACEHOLDER"
}

export function removeUndefinedValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== undefined && value !== null))
}
