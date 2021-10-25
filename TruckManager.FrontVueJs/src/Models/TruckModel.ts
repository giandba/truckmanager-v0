export class TruckModel {
    id:number= 0;
    name:string="";
    modelType:number=0;
    manufactureYear:number= (new Date()).getFullYear();
    modelYear:number= (new Date()).getFullYear();
}