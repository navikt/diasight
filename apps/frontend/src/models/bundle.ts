import { IComposition } from './';

export interface IBundle {
    type: BundleType;
    entry: IComposition[];
}

enum BundleType {
    Document = "document",
    Message = "message",
    Transaction = "transaction",
    TransactionResponse = "transaction-response",
    Batch = "batch",
    BatchResponse = "batch-response",
    History = "history",
    SearchSet = "searchset",
    Collection = "collection",
}