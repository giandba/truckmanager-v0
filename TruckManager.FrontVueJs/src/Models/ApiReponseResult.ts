export default class ApiReponseResult<T> {
    constructor(vdata:T){
        this.status = false;
        this.data = vdata;
    }
    status: boolean;
    data: T;
}