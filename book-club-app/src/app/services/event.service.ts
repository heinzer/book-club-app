import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class EventService {
    private subject = new Subject<any>();

    constructor() {}

    sendMessage(message: any) {
        this.subject.next(message);
    }

    getData() {
        return this.subject.asObservable();
    }
}
