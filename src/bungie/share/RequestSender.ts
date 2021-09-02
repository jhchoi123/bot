import fetch, {Request, RequestInit} from "node-fetch";

class RequestSender {
    private readonly request: Request;

    public constructor(url: string, option: RequestInit) {
        this.request = new Request(url, option);
    }

    public json(): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            fetch(this.request).then(fetchedData => {
                resolve(fetchedData.json());
            }).catch(reason => {
                reject(reason);
            })
        });
    }

    public text(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fetch(this.request).then(fetchedData => {
                resolve(fetchedData.text());
            }).catch(reason => {
                reject(reason);
            })
        });
    }
}

export default RequestSender;