export type Role='rider'|'driver'|'admin';
export type RideStatus='searching'|'accepted'|'arriving'|'in_progress'|'completed';
export interface User{ id:string; name:string; role:Role; barangay:string; phone:string }
export interface Driver{ id:string; name:string; plate:string; barangay:string; rating:number; status:'available'|'busy'|'offline'; lat:number; lng:number }
export interface PickupPoint{ id:string; name:string; barangay:string; lat:number; lng:number; landmark:string }
export interface Ride{ id:string; riderName:string; driverId:string; pickup:string; dropoff:string; distanceKm:number; fare:number; status:RideStatus; requestedAt:string }
export interface CourierJob{ id:string; sender:string; recipient:string; pickup:string; dropoff:string; item:string; fee:number; status:'pending'|'assigned'|'delivered' }
export interface Feedback{ id:string; author:string; rating:number; comment:string; target:string }
export interface Notification{ id:string; title:string; body:string; type:'ride'|'courier'|'system'; read:boolean }
export interface Stat{ label:string; value:string; trend:string }
