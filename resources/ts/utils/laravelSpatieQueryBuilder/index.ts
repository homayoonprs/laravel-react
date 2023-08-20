export const toSpatieFilterQuery = (data: any): string =>
{
    let targets = Object.entries(data);
    let query: string = '';
    targets.forEach((item: any, index) => {
        index++;
        let key = item[0];
        item[1] = typeof item[1] == 'undefined' ? '' : item[1];
        let value = Array.isArray(item[1]) ? item[1].join(',') : item[1]
        query += `filter[${key}]=${value}${index != targets.length ? '&' : ''}`;
    })
    return query;
}