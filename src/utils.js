import {Request} from '@viur/vue-utils'

export function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

export function struct2dict(structure) {
  if (!Array.isArray(structure)) {
    return structure;
  }

  let result = {};
  structure.forEach((bone) => (result[bone[0]] = bone[1]));

  return result;
}

export async function getTranslations(languages=["de"],pattern=null){
  // fetch translations from server
  let retVal = languages.reduce((acc,item)=>{acc[item]={}; return acc;},{})
  try {
    let dataObj = {languages:languages}
    if(pattern){
      dataObj['pattern'] = pattern
    }

    let translations = await Request.get("/json/_translation/get_public",{dataObj:dataObj})
    const data = await translations.json()
    for (let country in data) {
      data[country] = Object.fromEntries(
        Object.entries(data[country]).map(
            ([key, value], idx) => [key, value.replaceAll('{{', '{').replaceAll('}}', '}').replace(/([@$|])/g, '{\'$1\'}')],
        ),
      )
    }
    retVal = data
  }catch(error){
    console.log("No Translation from server", error)
  }
  return retVal
}

export function getImage(image) {
  if (image !== undefined) return Request.downloadUrlFor(image);

  return 'PLACEHOLDER';
}

export function removeUndefinedValues(obj) {
  return Object.fromEntries(
      Object.entries(obj)
          .filter(([key, value]) => value !== undefined && value !== null),
  );
}