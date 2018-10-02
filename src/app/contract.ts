export class Contract {
    contractNumber : string;
    firstParty : string;
    secondParty : string;
    startTime : string;
    carType : string;
    quantity : number;
    stageSum : number;
    amountSum : number;
    stages : {stage:Array<number>,time:string};
}