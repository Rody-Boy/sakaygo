import { couriers } from '@/mock/couriers';import { delay } from '@/lib/utils';
export class CourierService{static async list(){await delay();return couriers}static async create(){await delay(800);return{trackingCode:`SGX-${Math.floor(10000+Math.random()*89999)}`,eta:'24 minutes',fee:88}}}
