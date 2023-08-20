import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import {DateObject} from "react-multi-date-picker";

export const jalaliDateToGregorian = (date: DateObject| string): DateObject => {
    return new DateObject(date).convert(gregorian, gregorian_en)
}

export const cs = (...args: string[]): string => {
    return [...args].join(' ');
}

export const stringToUnderscore = (
    text:string) => (text.toLowerCase().replace(/ /g,'_').replace(/[^\w-]+/g,'')
)



/* 
 * --- Convert Query String To Object 
 * --- ex: 'id=4&name=3' TO  {id: 4, name: 3}
 */
type queryStringMappingType = {
    [key: string]: string
}
export const queryStringToObject = (url: string): queryStringMappingType => 
{
    
    url = url.indexOf('?') > -1 ? url.split('?')[1] : url;

    const data: queryStringMappingType = {}

    url.replace(/\/\?/, '')
        .split('&')
        .map(x => x.split('='))
        .forEach(x => {
            data[x[0]] = x[1]
        })

    return data;
}

export function truncateText(sentences: string, maxLength: number): string {
    if(typeof sentences === 'undefined')
        return ''
    return sentences.length > maxLength ? sentences.substring(0, maxLength)+' ...': sentences
}

export function getExtensionOfFile(file: File | undefined) {
    return file?.name.split('.').pop()
}

/*
* Find Specified Coockie And Return it`s value if exists, othervise return null
*/
export const getCoockie = (coockieName: string): string|null => {
    let value = null;
    document.cookie.split(';').map((item) => {
        let cookie = item.trim();
        if(cookie.startsWith(coockieName)){
            value = cookie.replaceAll( coockieName+'=' , '' )
        }
    })
    return value;
}

/*
* Check if String Includes Any Value Of Array
*/
export const strIncludes = (haystack: string, needles: string[], endsWith = true) => {
    return needles.some(needle => endsWith ? haystack.endsWith(needle) : haystack.includes(needle));
}