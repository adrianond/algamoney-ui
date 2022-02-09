import * as moment from 'moment';

export function ddMMyyyy(dt: Date, div: string = '-'): string {
    return moment(dt, 'YYYY-MM-DD').format(`DD${div}MM${div}YYYY`);
}

export function yyyyMMdd(dt: Date, div: string = '-'): string  {
    return moment(dt, 'YYYY-MM-DD').format(`YYYY${div}MM${div}DD`);
}